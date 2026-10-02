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

function magnetic(el: HTMLElement, { strength = 0.3, textStrength = 0.18 }: MagneticOptions = {}) {
  // Wrap the content so the text can move a touch further than its container
  const inner = document.createElement('span');
  inner.className = 'magnetic__inner';
  while (el.firstChild) inner.appendChild(el.firstChild);
  el.appendChild(inner);

  const moveX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
  const textX = gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3.out' });
  const textY = gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3.out' });

  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    moveX(dx * strength);
    moveY(dy * strength);
    textX(dx * textStrength);
    textY(dy * textStrength);
  });

  // Spring back to center
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', overwrite: true });
    gsap.to(inner, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, 0.4)', overwrite: true });
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

  // Non-media states. The grown state uses the disc (authored at full size, scaled down) rather than
  // scaling the 10px dot up, so it stays sharp instead of being rasterised small and stretched.
  const rest = (d: number) => {
    const ease = 'power3.out';
    gsap.to(disc, { scale: grown ? 0.67 : 0, duration: d, ease, overwrite: 'auto' });
    gsap.to(label, { opacity: 0, duration: d / 2, ease, overwrite: 'auto' });
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
  window.addEventListener(
    'mousemove',
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
      // Project cards read as "View"; decorative floating images just get the arrow
      set('media', media.closest('.card') ? 'View' : ARROW);
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

if (finePointer) {
  cursor();
  document.querySelectorAll<HTMLElement>('.card__media, .media-frame').forEach(spotlight);
  if (!reduceMotion) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => magnetic(el));
    document.querySelectorAll<HTMLElement>('.card__media, .media-frame').forEach(pan);
  }
}
