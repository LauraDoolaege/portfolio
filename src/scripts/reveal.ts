// Scroll reveals, site-wide. One language (see utils/reveal.ts):
//   text and content  ->  rise + fade
//   images            ->  dissolve in from grain
// Start states are set in JS so no-JS visitors still see everything.
import { ScrollTrigger } from '../utils/motion';
import { fadeUp, grainIn, hideForFadeUp, hideForGrain } from '../utils/reveal';

{
  // Authored opt-ins (homepage and About sections), plus the blocks of a case study or design page
  const TEXT = [
    '[data-reveal]:not([data-reveal="grain"])',
    '.chead > *',
    '.facts__item',
    '.vhead > *',
    '.case__main > :is(h2, h3, h4, p, ul, ol, .pullquote, .funnel, .ruled, .parts)',
    '.vbody > :is(p, h2)',
    '.card__body',
    '.card__tags',
  ].join(', ');

  // Frames that hold only a picture
  const IMAGES = [
    '[data-reveal="grain"]',
    '.case-image__frame',
    '.parts__image',
    '.card__frame',
    '.theater__frame',
  ].join(', ');

  const unique = (list: HTMLElement[]) => Array.from(new Set(list));
  const images = unique(Array.from(document.querySelectorAll<HTMLElement>(IMAGES)));
  // A card's text is revealed separately from its image, so the card itself is not a text item
  const text = unique(Array.from(document.querySelectorAll<HTMLElement>(TEXT))).filter(
    (el) => !images.includes(el) && !el.matches('.card') && !el.closest('.timeline'),
  );

  if (text.length) {
    hideForFadeUp(text);
    ScrollTrigger.batch(text, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => fadeUp(batch as HTMLElement[]),
    });
  }

  if (images.length) {
    hideForGrain(images);
    ScrollTrigger.batch(images, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        (batch as HTMLElement[]).forEach((el, i) => grainIn(el, Math.min(i * 0.12, 0.4))),
    });
  }

  // Images and fonts settle after first paint and move the triggers
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
