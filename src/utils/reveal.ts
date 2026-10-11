// The one reveal language for the whole site, client-only (import from a script, never from frontmatter).
//   Text and content:  fadeUp, a short rise plus fade
//   Images:            grainIn, the picture resolves out of the same grain as the hover and page-transition effects
import { gsap, prefersReducedMotion } from './motion';

const calm = () => prefersReducedMotion();

// Visitors who prefer reduced motion still get every reveal, as a plain, short fade: no travel, no grain
export const REVEAL = {
  get dy() {
    return calm() ? 0 : 24;
  },
  get duration() {
    return calm() ? 0.5 : 0.9;
  },
  ease: 'power3.out',
  stagger: 0.12,
} as const;

/** Start state for text, set in JS so visitors without JS still see everything */
export function hideForFadeUp(items: HTMLElement[]) {
  gsap.set(items, { y: REVEAL.dy, opacity: 0 });
}

/** Rise and fade; a long batch (e.g. after a jump link) never takes longer than ~0.5s to stagger in */
export function fadeUp(items: HTMLElement | HTMLElement[], delay = 0) {
  const list = Array.isArray(items) ? items : [items];
  return gsap.to(list, {
    y: 0,
    opacity: 1,
    duration: REVEAL.duration,
    ease: REVEAL.ease,
    stagger: Math.min(REVEAL.stagger, 0.5 / list.length),
    delay,
    overwrite: true,
  });
}

/* ---------- Grain ---------- */

const NS = 'http://www.w3.org/2000/svg';
let defs: SVGDefsElement | null = null;
let seq = 0;

function getDefs() {
  if (!defs) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    defs = document.createElementNS(NS, 'defs');
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }
  return defs;
}

function node<K extends string>(tag: K, attrs: Record<string, string>) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  return n;
}

/** Start state for an image: invisible until its grain filter takes over */
export function hideForGrain(items: HTMLElement[]) {
  gsap.set(items, { opacity: 0 });
}

/**
 * Dissolve an image in from grain. Each call gets its own copy of the sand filter so several images can be
 * mid-reveal at once: noise is added to the picture's alpha and thresholded hard, and the offset (k4) is
 * animated from "nothing passes" to "everything passes", so the grains appear in a random order until the
 * picture is whole. The filter is removed afterwards, so the finished image is untouched.
 */
export function grainIn(el: HTMLElement, delay = 0, duration = 1.5) {
  if (calm()) {
    gsap.to(el, { opacity: 1, duration: 0.5, delay, ease: 'power2.out' });
    return;
  }
  const id = `grain-reveal-${seq++}`;
  const filter = node('filter', {
    id,
    x: '-2%',
    y: '-2%',
    width: '104%',
    height: '104%',
    'color-interpolation-filters': 'sRGB',
  });
  const mix = node('feComposite', {
    in: 'SourceAlpha',
    in2: 'grain',
    operator: 'arithmetic',
    k1: '0',
    k2: '1',
    k3: '0.8',
    k4: '-1.35',
    result: 'noisy',
  });
  const cut = node('feComponentTransfer', { in: 'noisy', result: 'cut' });
  cut.appendChild(node('feFuncA', { type: 'linear', slope: '9', intercept: '-4' }));
  filter.append(
    node('feTurbulence', {
      type: 'fractalNoise',
      baseFrequency: '0.9',
      numOctaves: '2',
      seed: String(7 + (seq % 5)),
      result: 'noise',
    }),
    node('feColorMatrix', {
      in: 'noise',
      type: 'matrix',
      values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0',
      result: 'grain',
    }),
    mix,
    cut,
    node('feComposite', { in: 'SourceGraphic', in2: 'cut', operator: 'in' }),
  );
  getDefs().appendChild(filter);

  el.style.filter = `url(#${id})`;
  gsap.set(el, { opacity: 1 });

  const state = { k: -1.35 };
  gsap.to(state, {
    k: -0.2,
    duration,
    delay,
    ease: 'power1.inOut',
    onUpdate: () => mix.setAttribute('k4', String(state.k)),
    onComplete: () => {
      el.style.filter = '';
      filter.remove();
    },
  });
}

export { prefersReducedMotion };
