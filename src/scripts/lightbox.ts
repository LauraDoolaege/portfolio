// Detail gallery for project pages. Every [data-lightbox] on the page (CaseImage) opens the shared
// <dialog> (Lightbox.astro) at its own position; thumbnails below jump between them. Progressive
// enhancement: no JS leaves the figures as plain images.

const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-root]');
const items = Array.from(document.querySelectorAll<HTMLElement>('[data-lightbox]'));

if (dialog && items.length) {
  const stage = dialog.querySelector<HTMLElement>('.lb__stage')!;
  const caption = dialog.querySelector<HTMLElement>('.lb__caption')!;
  const count = dialog.querySelector<HTMLElement>('.lb__count')!;
  const thumbs = dialog.querySelector<HTMLElement>('.lb__thumbs')!;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let index = 0;
  let opener: HTMLElement | null = null;

  /** The visual to show: a clone of the frame's image (or the placeholder tone), at the frame's ratio */
  const media = (item: HTMLElement) => {
    const src = item.querySelector<HTMLElement>('.media-frame__img')!;
    const frame = item.querySelector<HTMLElement>('.media-frame')!;
    const clone = src.cloneNode(true) as HTMLElement;
    clone.removeAttribute('style');
    clone.removeAttribute('loading');
    if (clone instanceof HTMLImageElement) {
      clone.sizes = '90vw';
      clone.alt = item.dataset.label ?? '';
    }
    return { clone, ratio: frame.offsetWidth / frame.offsetHeight };
  };

  const buttons = items.map((item, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'lb__thumb';
    b.setAttribute('aria-label', `Show ${item.dataset.label}`);
    b.appendChild(media(item).clone);
    b.addEventListener('click', () => show(i));
    li.appendChild(b);
    thumbs.appendChild(li);
    return b;
  });

  function show(i: number) {
    index = (i + items.length) % items.length;
    const item = items[index];
    const { clone, ratio } = media(item);
    stage.style.setProperty('--r', String(ratio));
    stage.replaceChildren(clone);
    caption.textContent = item.dataset.caption ?? '';
    count.textContent = `${item.dataset.label}  ·  ${index + 1} / ${items.length}`;
    buttons.forEach((b, n) => b.setAttribute('aria-current', String(n === index)));
    buttons[index].scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function open(i: number, from: HTMLElement) {
    opener = from;
    show(i);
    dialog!.showModal();
    // Next frame: the dialog is in the DOM at opacity 0, so the fade and the reveal can run
    requestAnimationFrame(() => dialog!.classList.add('is-open'));
    buttons[index].scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  function close() {
    dialog!.classList.remove('is-open');
    const done = () => {
      dialog!.close();
      opener?.querySelector<HTMLElement>('.case-image__open')?.focus();
    };
    if (reduceMotion) done();
    else setTimeout(done, 350);
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => open(i, item));
    item.style.cursor = 'zoom-in';
  });

  dialog.querySelector('[data-lb-close]')!.addEventListener('click', close);
  dialog.querySelector('[data-lb-prev]')!.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lb-next]')!.addEventListener('click', () => show(index + 1));

  // Esc goes through the same animated close; the backdrop (the dialog element itself) closes too
  dialog.addEventListener('cancel', (e) => {
    e.preventDefault();
    close();
  });
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe between images on touch
  let startX = 0;
  dialog.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  dialog.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
}
