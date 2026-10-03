// Theme toggle with a grainy sweep. The View Transitions API snapshots the old theme, we flip
// data-theme underneath, then reveal the new snapshot through a mask whose leading edge is run
// through the same noise + hard-threshold recipe as the #sand-dispersion filter in BaseLayout
// (an SVG image can't reference that filter, so the recipe is repeated inside the mask SVG).
// Browsers without View Transitions, and reduced-motion users, get an instant switch.

type Theme = 'light' | 'dark';

const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
const label = toggle?.querySelector('.theme-toggle__label');
const icon = toggle?.querySelector<HTMLElement>('.theme-toggle__icon');
const themeColor = document.querySelector('meta[name="theme-color"]');
const COLORS: Record<Theme, string> = { light: '#f3f2ee', dark: '#161513' };

const current = (): Theme => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: Theme) {
  root.dataset.theme = theme;
  themeColor?.setAttribute('content', COLORS[theme]);
  if (label) label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  toggle?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/**
 * Mask image for the diagonal sweep: opaque toward the bottom-right, transparent toward the top-left.
 * The front's axis runs along the viewport diagonal. Its edge is first torn up by a low-frequency
 * displacement (ragged, uneven reach), then run through the #sand-dispersion recipe (noise added to
 * alpha, hard threshold, unioned with the fully-opaque core so no grain holes survive behind the front) with the noise turned up so the dissolve reads as raw scattered sand.
 * The image is rendered once per toggle and only translated, so the grain never rescales mid-sweep.
 */
function sweepMask(vw: number, vh: number, band: number) {
  const w = Math.round(2 * vw + 2.4 * band);
  const h = Math.round(2 * vh + 2.4 * band);
  const d = Math.hypot(vw, vh);
  const gx = ((vw / d) * band) / 2;
  const gy = ((vh / d) * band) / 2;
  const cx = w / 2;
  const cy = h / 2;
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<defs><linearGradient id='g' gradientUnits='userSpaceOnUse' x1='${cx - gx}' y1='${cy - gy}' x2='${cx + gx}' y2='${cy + gy}'>` +
    `<stop offset='0' stop-color='#000' stop-opacity='0'/><stop offset='1' stop-color='#000'/></linearGradient>` +
    `<filter id='s' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
    `<feTurbulence type='fractalNoise' baseFrequency='0.008' numOctaves='2' seed='3' result='warp'/>` +
    `<feDisplacementMap in='SourceGraphic' in2='warp' scale='${Math.round(band * 0.9)}' xChannelSelector='R' yChannelSelector='G' result='torn'/>` +
    `<feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' seed='7' result='n'/>` +
    `<feColorMatrix in='n' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0' result='grain'/>` +
    `<feComposite in='torn' in2='grain' operator='arithmetic' k1='0' k2='1' k3='1.7' k4='-0.85' result='noisy'/>` +
    `<feComponentTransfer in='noisy' result='cut'><feFuncA type='linear' slope='11' intercept='-4.5'/></feComponentTransfer>` +
    `<feComponentTransfer in='torn' result='solid'><feFuncA type='linear' slope='40' intercept='-38'/></feComponentTransfer>` +
    `<feComposite in='cut' in2='solid' operator='arithmetic' k1='0' k2='1' k3='1' k4='0' result='both'/>` +
    `<feFlood flood-color='#000' result='ink'/><feComposite in='ink' in2='both' operator='in'/></filter></defs>` +
    `<rect width='${w}' height='${h}' fill='url(#g)' filter='url(#s)'/></svg>`;
  const src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return { src, url: `url("${src}")`, w, h };
}

/** Runs `update` (a DOM change) under the grainy sweep. Also used by the mobile menu. */
export async function sweepWith(update: () => void) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const d = Math.hypot(vw, vh);
  const band = Math.max(320, d * 0.38);
  const { src, url, w, h } = sweepMask(vw, vh, band);

  // Decode the mask before the transition starts so the first frames don't hitch
  const img = new Image();
  img.src = src;
  await img.decode().catch(() => {});

  // The front's centre travels the diagonal from just past the bottom-right corner (where the
  // toggle lives) to just past the top-left. The mask is centred on it, so position = front - half size.
  const nx = vw / d;
  const ny = vh / d;
  // The displacement pushes stray grains well past the gradient's own edge, so travel a full band
  // beyond the corners: the animation only ends once no grain is left on screen.
  const reach = band * 1.1;
  const from = { x: vw + nx * reach, y: vh + ny * reach };
  const to = { x: -nx * reach, y: -ny * reach };
  const pos = (f: { x: number; y: number }) => `${f.x - w / 2}px ${f.y - h / 2}px`;

  const t = (
    document as Document & {
      startViewTransition: (cb: () => void) => { ready: Promise<void> };
    }
  ).startViewTransition(update);

  t.ready
    .then(() => {
      const size = `${w}px ${h}px`;
      root.animate(
        {
          maskImage: [url, url],
          maskSize: [size, size],
          maskPosition: [pos(from), pos(to)],
        },
        {
          duration: 1400,
          // Gentle ease-out: a harder one (like --ease-out) leaves the sparse grain tail creeping for most of the run
          easing: 'cubic-bezier(0.4, 0.1, 0.3, 1)',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    })
    .catch(() => {});
}

toggle?.addEventListener('click', () => {
  const next: Theme = current() === 'dark' ? 'light' : 'dark';
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* private mode: the choice just won't persist */
  }
  // Icon only: a Y-axis spin, the label stays put
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    icon?.animate(
      [
        { transform: 'perspective(120px) rotateY(0deg)' },
        { transform: 'perspective(120px) rotateY(360deg)' },
      ],
      { duration: 480, easing: 'ease-out' },
    );
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('startViewTransition' in document)) apply(next);
  else sweepWith(() => apply(next));
});

// Sync label/meta with the theme the head script already set
apply(current());
