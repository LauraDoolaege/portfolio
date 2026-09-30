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
  root.innerHTML = '<div class="cursor__ball"></div><div class="cursor__label"></div>';
  document.body.appendChild(root);
  document.documentElement.classList.add('has-custom-cursor');

  const ball = root.querySelector<HTMLElement>('.cursor__ball')!;
  const label = root.querySelector<HTMLElement>('.cursor__label')!;

  // The ball is authored at 60px and scaled down to a dot, so every state change is a cheap transform
  const DOT = 10 / 60;
  gsap.set(root, { xPercent: -50, yPercent: -50, opacity: 0 });
  gsap.set(ball, { scale: DOT });

  const follow = reduceMotion ? 0 : 0.35;
  const x = gsap.quickTo(root, 'x', { duration: follow, ease: 'power3.out' });
  const y = gsap.quickTo(root, 'y', { duration: follow, ease: 'power3.out' });

  type State = 'dot' | 'text' | 'link' | 'media';
  let state: State = 'dot';

  const set = (next: State, text = '') => {
    if (next === state && label.innerHTML === text) return;
    state = next;
    const d = reduceMotion ? 0 : 0.45;
    const to: gsap.TweenVars = { duration: d, ease: 'power3.out', overwrite: 'auto' };
    if (next === 'media') {
      gsap.to(ball, { ...to, scaleX: 1, scaleY: 1, backgroundColor: 'var(--accent-text)' });
      label.innerHTML = text;
      gsap.to(label, { ...to, opacity: 1 });
    } else {
      gsap.to(label, { duration: d / 2, ease: 'power2.out', opacity: 0, overwrite: 'auto' });
      const target =
        next === 'text'
          ? { scaleX: 2 / 60, scaleY: 22 / 60 } // a thin vertical line
          : next === 'link'
            ? { scaleX: 16 / 60, scaleY: 16 / 60 }
            : { scaleX: DOT, scaleY: DOT };
      gsap.to(ball, { ...to, ...target, backgroundColor: 'var(--accent)' });
    }
  };

  const MEDIA = '.hero__img, .card__media, .manifesto__img, .about-hero__frame, [data-cursor]';
  const INTERACTIVE = 'a, button, [data-magnetic]';
  const TEXT = 'p, h1, h2, h3, h4, blockquote, dt, dd, li';

  let shown = false;
  window.addEventListener(
    'mousemove',
    (e) => {
      if (!shown) {
        shown = true;
        // First move: jump to the pointer, then fade in
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
    } else if (t.closest(TEXT)) {
      set('text');
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

if (finePointer) {
  cursor();
  if (!reduceMotion) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => magnetic(el));
  }
}
