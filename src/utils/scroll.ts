// Client-only. Runs `fn` at most once per animation frame while the page scrolls or resizes, so scroll-linked
// UI (contents list, timelines) never does layout work on every raw scroll event. That matters most on iPads,
// where scroll events fire at 120Hz and a main thread stuck in layout makes scrolling feel stuck. `fn` should
// read layout first and write styles after. Returns a function that stops listening.
export function onScrollFrame(fn: () => void): () => void {
  let queued = false;
  const run = () => {
    queued = false;
    fn();
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(run);
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  // Mobile browsers resize the visual viewport as their toolbars collapse; the reading line moves with it
  window.visualViewport?.addEventListener('resize', schedule, { passive: true });
  fn();

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.visualViewport?.removeEventListener('resize', schedule);
  };
}
