// Every [data-reveal] inside a .sec slides up as it enters the viewport (homepage below the hero, About).
// Start states are set in JS so no-JS visitors still see everything.
import { gsap, ScrollTrigger, prefersReducedMotion } from '../utils/motion';

const items = gsap.utils.toArray<HTMLElement>('.sec [data-reveal]');

if (items.length && !prefersReducedMotion()) {
  gsap.set(items, { y: 28, opacity: 0 });

  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        // A long batch (e.g. after a jump link) never takes longer than ~0.5s to stagger in
        stagger: Math.min(0.12, 0.5 / batch.length),
        overwrite: true,
      }),
  });
}
