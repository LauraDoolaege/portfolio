// Grainy page transition for project links. Clicking a project dissolves the current page into paper from the
// centre outwards, through the same grain as the card hover, then the next page dissolves back out the same way.
// Plain multi-page navigation underneath: if anything here fails, the link simply works. A flag in sessionStorage
// tells the next page to arrive covered (see the inline script in BaseLayout, which sets html.pt-arriving).
// Reduced-motion users get no transition.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

const overlay = document.createElement('div');
overlay.className = 'pt';
overlay.setAttribute('aria-hidden', 'true');
document.body.appendChild(overlay);

const clearFlag = () => {
  try {
    sessionStorage.removeItem('pt');
  } catch {
    /* storage unavailable: nothing to clear */
  }
};

// Arrival: the overlay takes over from the static cover and dissolves away
if (root.classList.contains('pt-arriving')) {
  clearFlag();
  if (reduceMotion) {
    root.classList.remove('pt-arriving');
  } else {
    overlay.dataset.state = 'covered';
    overlay.classList.add('is-on');
    // Force the covered state to be computed, so the clearing has something to transition from
    void overlay.offsetWidth;
    root.classList.remove('pt-arriving');
    overlay.dataset.state = 'clearing';
    window.setTimeout(() => {
      overlay.classList.remove('is-on');
      overlay.dataset.state = '';
    }, 800);
  }
}

// Back/forward can restore a page frozen mid-transition
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    root.classList.remove('pt-arriving');
    overlay.classList.remove('is-on');
    overlay.dataset.state = '';
  }
});

if (!reduceMotion) {
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    // Project links only: same site, under /works/
    if (url.origin !== location.origin || !url.pathname.includes('/works/')) return;
    if (url.pathname === location.pathname) return;

    e.preventDefault();
    // Start state first, painted, so the cover has something to transition from
    overlay.dataset.state = 'cover0';
    overlay.classList.add('is-on');
    void overlay.offsetWidth;
    overlay.dataset.state = 'covering';
    window.setTimeout(() => {
      try {
        sessionStorage.setItem('pt', '1');
      } catch {
        /* no storage: the next page just won't fade in */
      }
      location.href = url.href;
    }, 450);
  });
}
