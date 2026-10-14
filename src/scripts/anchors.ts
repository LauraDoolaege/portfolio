// In-page anchors that land where they say. The browser jumps to a #hash as soon as it can, before the fonts, images and
// scroll-driven layout above the target have settled, so on a real device it can stop short or overshoot. This script
// (1) scrolls to the target itself when a same-page hash link is clicked and (2) re-aligns once the page has settled
// when it was opened with a hash, unless the visitor has already started scrolling. Reduced motion: no smooth scrolling.
import { ScrollTrigger } from '../utils/motion';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Top of the target in page coordinates, minus the page's scroll padding (the sticky bar) */
function topOf(el: HTMLElement) {
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  return Math.max(0, el.getBoundingClientRect().top + window.scrollY - pad - margin);
}

// Our own eased scroll: native smooth scrolling is cancelled by scroll-driven layout in some browsers, so it can silently
// do nothing. Any wheel, touch or key press hands control back to the visitor at once.
let raf = 0;
function scrollToEl(el: HTMLElement) {
  cancelAnimationFrame(raf);
  const from = window.scrollY;
  if (reduce) {
    window.scrollTo(0, topOf(el));
    return;
  }
  const dist = Math.abs(topOf(el) - from);
  const duration = Math.min(1400, 500 + dist * 0.18);
  const start = performance.now();
  const cancel = () => cancelAnimationFrame(raf);
  window.addEventListener('wheel', cancel, { once: true, passive: true });
  window.addEventListener('touchstart', cancel, { once: true, passive: true });
  window.addEventListener('keydown', cancel, { once: true });
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const e = 1 - Math.pow(1 - t, 4);
    // Re-read the target every frame: layout above it can still move while we travel
    window.scrollTo(0, from + (topOf(el) - from) * e);
    if (t < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function target(hash: string): HTMLElement | null {
  if (hash.length < 2) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

// Same-page hash links (including "/portfolio#work" clicked while on the homepage)
document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href*="#"]');
  if (!a || a.target === '_blank') return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname) return;
  const el = target(url.hash);
  if (!el) return;
  e.preventDefault();
  history.pushState(null, '', url.hash);
  scrollToEl(el);
});

// Opened with a hash: wait for the page to settle, then align once
if (location.hash && target(location.hash)) {
  let moved = false;
  const stop = () => (moved = true);
  window.addEventListener('wheel', stop, { once: true, passive: true });
  window.addEventListener('touchstart', stop, { once: true, passive: true });
  window.addEventListener('keydown', stop, { once: true });
  const align = () => {
    if (moved) return;
    ScrollTrigger.refresh();
    const el = target(location.hash);
    if (el) window.scrollTo(0, topOf(el));
  };
  const settle = () => {
    align();
    window.setTimeout(align, 500);
    window.setTimeout(align, 1400);
  };
  if (document.readyState === 'complete') settle();
  else window.addEventListener('load', settle, { once: true });
  document.fonts?.ready.then(() => window.setTimeout(align, 150));
}
