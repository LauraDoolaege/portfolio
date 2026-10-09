// The tactile layer: magnetic controls and a contextual cursor. Client-only, loaded from BaseLayout.
// Everything here is progressive enhancement for a fine pointer; touch devices, no-JS and
// reduced-motion users keep the plain behaviour.
import { gsap } from 'gsap';

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Magnetic physics ---------- */

interface MagneticOptions {
  /** How far the element follows the cursor (fraction of the offset from its center) */
  strength?: number;
  /** Extra follow for the inner text so it leads the shape slightly */
  textStrength?: number;
}

function magnetic(el: HTMLElement, { strength = 0.15, textStrength = 0.09 }: MagneticOptions = {}) {
  // Wrap the content so the text can move a touch further than its container
  const inner = document.createElement('span');
  inner.className = 'magnetic__inner';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.appendChild(inner);

  // Plain tweens with overwrite: 'auto', not quickTo: the elastic reset on leave has to replace the
  // follow tween without killing it, or the next hover would have nothing left to drive.
  const follow = (x: number, y: number, tx: number, ty: number) => {
    const vars = { duration: 0.9, ease: 'power3.out', overwrite: 'auto' } as const;
    gsap.to(el, { x, y, ...vars });
    gsap.to(inner, { x: tx, y: ty, ...vars });
  };

  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    // The live rect includes the element's current translate; remove it so the pointer is measured
    // from the resting center and the follow doesn't feed back into itself.
    const dx = e.clientX - (r.left + r.width / 2 - Number(gsap.getProperty(el, 'x')));
    const dy = e.clientY - (r.top + r.height / 2 - Number(gsap.getProperty(el, 'y')));
    follow(dx * strength, dy * strength, dx * textStrength, dy * textStrength);
  });

  // Spring back to center
  el.addEventListener('mouseleave', () => {
    const spring = {
      x: 0,
      y: 0,
      duration: 1.4,
      ease: 'elastic.out(1, 0.55)',
      overwrite: 'auto',
    } as const;
    gsap.to(el, spring);
    gsap.to(inner, spring);
  });
}

/* ---------- Contextual cursor ---------- */

const ARROW =
  '<svg viewBox="0 0 12 12" width="14" height="14" fill="none" aria-hidden="true"><path d="M3 9L9 3M4 3h5v5" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/></svg>';

function cursor() {
  const root = document.createElement('div');
  root.className = 'cursor';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML =
    '<div class="cursor__dot"></div><div class="cursor__disc"></div><div class="cursor__label"></div>';
  document.body.appendChild(root);
  document.documentElement.classList.add('has-custom-cursor');

  const dot = root.querySelector<HTMLElement>('.cursor__dot')!;
  const disc = root.querySelector<HTMLElement>('.cursor__disc')!;
  const label = root.querySelector<HTMLElement>('.cursor__label')!;

  gsap.set(root, { opacity: 0, force3D: true });
  gsap.set(disc, { scale: 0 });

  // Position: quickTo on x/y writes translate3d on the fixed, pointer-events-none anchor.
  // Kept very short so the dot stays on the pointer tip, where the sand effect is centred.
  const follow = reduceMotion ? 0 : 0.05;
  const x = gsap.quickTo(root, 'x', { duration: follow, ease: 'power3.out' });
  const y = gsap.quickTo(root, 'y', { duration: follow, ease: 'power3.out' });

  type State = 'dot' | 'link' | 'media';
  let state: State = 'dot';
  let labelHtml = '';
  // Set by interactive elements that want a bigger dot (the hero signature, via 'cursor:grow')
  let grown = false;

  // Non-media states. The grown state uses the disc (authored at full size) rather than
  // scaling the 10px dot up, so it stays sharp instead of being rasterised small and stretched.
  const rest = (d: number) => {
    const ease = 'power3.out';
    // Grown (hovering the hero signature): the full 60px disc, labelled "Grab"
    if (grown) label.textContent = 'Grab';
    gsap.to(disc, { scale: grown ? 1 : 0, duration: d, ease, overwrite: 'auto' });
    gsap.to(label, {
      opacity: grown ? 1 : 0,
      duration: grown ? d : d / 2,
      ease,
      overwrite: 'auto',
    });
    // Links and buttons: the dot swells a little. Text and empty space: always the plain dot.
    gsap.to(dot, {
      scale: grown ? 0 : state === 'link' ? 1.6 : 1,
      duration: d,
      ease,
      overwrite: 'auto',
    });
  };

  document.addEventListener('cursor:grow', (e) => {
    grown = (e as CustomEvent<boolean>).detail;
    if (state !== 'media') rest(reduceMotion ? 0 : 0.35);
  });

  const set = (next: State, html = '') => {
    if (next === state && html === labelHtml) return;
    state = next;
    labelHtml = html;
    const d = reduceMotion ? 0 : 0.4;
    const ease = 'power3.out';

    if (next === 'media') {
      label.innerHTML = html;
      gsap.to(dot, { scale: 0, duration: d, ease, overwrite: 'auto' });
      gsap.to(disc, { scale: 1, duration: d, ease, overwrite: 'auto' });
      gsap.to(label, { opacity: 1, duration: d, ease, overwrite: 'auto' });
    } else {
      rest(d);
    }
  };

  const MEDIA = '.card__media, .manifesto__img, .about-hero__frame, [data-cursor]';
  const INTERACTIVE = 'a, button, [data-magnetic]';

  let shown = false;
  // pointermove, not mousemove: a component that cancels pointerdown (the hero signature) suppresses
  // the compatibility mouse events until release, which would freeze the cursor mid-drag.
  window.addEventListener(
    'pointermove',
    (e) => {
      if (!shown) {
        shown = true;
        gsap.set(root, { x: e.clientX, y: e.clientY });
        gsap.to(root, { opacity: 1, duration: 0.3 });
      }
      x(e.clientX);
      y(e.clientY);
    },
    { passive: true },
  );

  document.addEventListener('mouseover', (e) => {
    const t = e.target as Element | null;
    if (!t) return;
    const media = t.closest<HTMLElement>(MEDIA);
    if (media) {
      // Over a project card's image the cursor turns into the "View" disc, as big as the hero's "Grab"; the rest of the card is a plain link; decorative floating images just get the arrow
      if (media.closest('[data-lightbox]')) set('media', '<span class="cursor__sm">Enlarge</span>');
      else if (media.closest('.card')) set('media', 'View');
      else set('media', ARROW);
    } else if (t.closest(INTERACTIVE)) {
      set('link');
    } else {
      set('dot');
    }
  });

  document.documentElement.addEventListener('mouseleave', () =>
    gsap.to(root, { opacity: 0, duration: 0.25 }),
  );
  document.documentElement.addEventListener('mouseenter', () => {
    if (shown) gsap.to(root, { opacity: 1, duration: 0.25 });
  });
}

/* ---------- Project image frames: physical pan, plus the spotlight in the soft mask ---------- */

function pan(frame: HTMLElement) {
  const img = frame.querySelector<HTMLElement>('.card__img, .media-frame__img');
  if (!img) return;

  // Resting scale hides the edges while the image shifts (5px travel needs ~2% headroom per side)
  gsap.set(img, { scale: 1.05 });
  const px = gsap.quickTo(img, 'x', { duration: 0.6, ease: 'power3.out' });
  const py = gsap.quickTo(img, 'y', { duration: 0.6, ease: 'power3.out' });

  frame.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    // The image drifts opposite to the pointer, like looking around inside a print
    px(-nx * 10);
    py(-ny * 10);
  });
  frame.addEventListener('mouseleave', () => {
    px(0);
    py(0);
  });
}

// The overlay in global.css (.is-sanded::before) reads --x/--y/--spot. --x/--y are the pointer's
// position inside the frame (never the window) and follow it with a short lag; --spot is the
// overlay's radius, opened on enter and closed on leave, after which the overlay is hidden again.
function spotlight(frame: HTMLElement) {
  const REST = 0.01;
  const OPEN = 120;
  // The pointer's position inside the frame, written straight to the CSS variables with no
  // smoothing, so the sand sits exactly under the cursor tip.
  const place = (e: MouseEvent) => {
    const r = frame.getBoundingClientRect();
    frame.style.setProperty('--x', `${e.clientX - r.left}px`);
    frame.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  const radius = { v: REST };
  const to = (v: number, done?: () => void) =>
    gsap.to(radius, {
      v,
      duration: reduceMotion ? 0 : 0.6,
      ease: 'power3.out',
      overwrite: true,
      onUpdate: () => frame.style.setProperty('--spot', `${radius.v}px`),
      onComplete: done,
    });

  frame.addEventListener('mouseenter', (e) => {
    place(e);
    frame.classList.add('is-sanded', 'is-hover');
    to(OPEN);
  });
  frame.addEventListener('mousemove', place, { passive: true });
  frame.addEventListener('mouseleave', () => {
    frame.classList.remove('is-hover');
    to(REST, () => frame.classList.remove('is-sanded'));
  });
}

// Project cards keep the paper grain on hover but not the sand spotlight: their hover is the veil + call to action.
function grainOnly(frame: HTMLElement) {
  frame.addEventListener('mouseenter', () => frame.classList.add('is-hover'));
  frame.addEventListener('mouseleave', () => frame.classList.remove('is-hover'));
}

// Images with no Enlarge or View option (the About photos, the home portrait) get a drag trail instead of the
// spotlight: moving over the print is like drawing a hand through sand. Soft blobs are stamped along the path,
// one that wears the print away to paper inside the frame, one in the print's own colours that is pushed along
// and spreads out past the frame's edges. A fixed canvas draws them, and the same #sand-dispersion filter as the
// buttons' sweep (see .dust-canvas) breaks the soft edges into fine grain, so the trail has their texture.
function dustTrail(frames: HTMLElement[]) {
  if (!frames.length) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'dust-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  type RGB = [number, number, number];
  interface Stamp {
    x: number;
    y: number;
    vx: number;
    vy: number;
    born: number;
    life: number;
    r: number;
    peak: number;
    color: RGB;
    /** Wearing the print away: paper-coloured, stays put, only drawn inside its frame */
    clip: DOMRect | null;
    /** The frame the sand came from: it is only drawn outside it, so the print itself is never smeared */
    from?: DOMRect;
  }
  let stamps: Stamp[] = [];
  let running = false;
  const MAX = 360;

  const paperRgb = (): RGB => {
    const hex = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary').trim();
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return [243, 242, 238];
    const n = parseInt(m[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };

  // The print's pixels, read once per frame size, so a stamp can take the colour of the spot it was lifted from
  const prints = new WeakMap<
    HTMLElement,
    { w: number; h: number; data: Uint8ClampedArray | null }
  >();
  const printOf = (frame: HTMLElement, r: DOMRect) => {
    const k = Math.min(1, 480 / Math.max(r.width, r.height));
    const w = Math.max(1, Math.round(r.width * k));
    const h = Math.max(1, Math.round(r.height * k));
    const known = prints.get(frame);
    if (known && known.w === w && known.h === h) return known;
    let data: Uint8ClampedArray | null = null;
    const img = frame.querySelector<HTMLImageElement>('img.media-frame__img');
    if (img && img.complete && img.naturalWidth) {
      try {
        const off = document.createElement('canvas');
        off.width = w;
        off.height = h;
        const c = off.getContext('2d', { willReadFrequently: true })!;
        // object-fit: cover, as the frame shows it
        const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * scale;
        const dh = img.naturalHeight * scale;
        c.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        data = c.getImageData(0, 0, w, h).data;
      } catch {
        data = null;
      }
    }
    const entry = { w, h, data };
    prints.set(frame, entry);
    return entry;
  };
  const colorAt = (frame: HTMLElement, r: DOMRect, x: number, y: number): RGB => {
    const p = printOf(frame, r);
    if (!p.data) return [168, 106, 85];
    const px = Math.min(p.w - 1, Math.max(0, Math.round(((x - r.left) / r.width) * p.w)));
    const py = Math.min(p.h - 1, Math.max(0, Math.round(((y - r.top) / r.height) * p.h)));
    const i = (py * p.w + px) * 4;
    return [p.data[i], p.data[i + 1], p.data[i + 2]];
  };

  let last = 0;
  const tick = (now: number) => {
    const dt = Math.min(now - last, 48) / 16.67;
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stamps = stamps.filter((g) => now - g.born < g.life);
    // Worn-away patches first, then the displaced sand on top of them
    for (const wear of [true, false]) {
      for (const g of stamps) {
        if ((g.clip !== null) !== wear) continue;
        const t = (now - g.born) / g.life;
        let r = g.r;
        if (!g.clip) {
          // Pushed along the path: slows to a stop, and spreads as it goes
          g.x += g.vx * dt;
          g.y += g.vy * dt;
          const damp = Math.pow(0.95, dt);
          g.vx *= damp;
          g.vy *= damp;
          r *= 1 + t * 0.5;
        }
        const a = g.peak * Math.pow(1 - t, 1.6);
        const [cr, cg, cb] = g.color;
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, r);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},${a})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.save();
        if (g.clip) {
          ctx.beginPath();
          ctx.rect(g.clip.left, g.clip.top, g.clip.width, g.clip.height);
          ctx.clip();
        } else if (g.from) {
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.rect(g.from.left, g.from.top, g.from.width, g.from.height);
          ctx.clip('evenodd');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - r, g.y - r, r * 2, r * 2);
        ctx.restore();
      }
    }
    if (stamps.length) requestAnimationFrame(tick);
    else running = false;
  };

  // Stamps are laid along the segment the pointer just travelled, so a fast drag is as smooth as a slow one
  const lay = (frame: HTMLElement, x0: number, y0: number, x1: number, y1: number) => {
    const r = frame.getBoundingClientRect();
    const now = performance.now();
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.min(10, Math.max(1, Math.round(dist / 9)));
    const paper = paperRgb();
    for (let i = 1; i <= steps && stamps.length < MAX; i++) {
      const f = i / steps;
      const x = x0 + (x1 - x0) * f;
      const y = y0 + (y1 - y0) * f;
      stamps.push({
        x,
        y,
        vx: 0,
        vy: 0,
        born: now,
        life: 850,
        r: 23,
        peak: 0.46,
        color: paper,
        clip: r,
      });
      // The sand follows the hand: it is carried a little way in the direction of travel
      const dir = dist || 1;
      stamps.push({
        x,
        y,
        vx: ((x1 - x0) / dir) * 1.8,
        vy: ((y1 - y0) / dir) * 1.8,
        born: now,
        life: 1600,
        r: 30,
        peak: 0.46,
        color: colorAt(frame, r, x, y),
        clip: null,
        from: r,
      });
    }
    if (!running) {
      running = true;
      last = now;
      requestAnimationFrame(tick);
    }
  };

  frames.forEach((frame) => {
    let lx = 0;
    let ly = 0;
    let seen = false;
    frame.addEventListener('pointerenter', () => (seen = false));
    frame.addEventListener(
      'pointermove',
      (e) => {
        if (seen && (e.clientX !== lx || e.clientY !== ly))
          lay(frame, lx, ly, e.clientX, e.clientY);
        lx = e.clientX;
        ly = e.clientY;
        seen = true;
      },
      { passive: true },
    );
  });
}

if (finePointer) {
  cursor();
  // `[data-plain]` (a gallery item set to `plain`) opts out of the grain and sand hover
  // Frames with an Enlarge or View option keep the sand spotlight; the rest get the drag trail (not under reduced motion)
  const WITH_OPTION = '[data-plain] .media-frame, [data-lightbox] .media-frame, .card .media-frame';
  const bare = Array.from(
    document.querySelectorAll<HTMLElement>(`.media-frame:not(:is(${WITH_OPTION}))`),
  );
  document
    .querySelectorAll<HTMLElement>(
      `.media-frame:is([data-lightbox] .media-frame, .card .media-frame):not([data-plain] .media-frame)`,
    )
    .forEach(spotlight);
  bare.forEach(grainOnly);
  if (!reduceMotion) dustTrail(bare);
  document.querySelectorAll<HTMLElement>('.card__media').forEach(grainOnly);
  if (!reduceMotion) {
    document
      .querySelectorAll<HTMLElement>('[data-magnetic], .btn, .btn-link')
      .forEach((el) => magnetic(el));
    document
      .querySelectorAll<HTMLElement>(
        '.card__media, .media-frame:not([data-no-pan]):not([data-no-pan] .media-frame)',
      )
      .forEach(pan);
  }
}
