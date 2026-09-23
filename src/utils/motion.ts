// Canonical GSAP entry point. Nothing animates yet — this just wires up
// GSAP + ScrollTrigger correctly in one place so future animation work
// imports from here instead of every component registering the plugin
// and re-checking reduced-motion itself.
//
// Client-only: import this from a component's <script> tag, never from
// Astro frontmatter (no `window`/DOM at build/SSR time).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

gsap.registerPlugin(ScrollTrigger, Draggable);

// CLAUDE.md "Motion": prefers-reduced-motion must always be respected.
// The global CSS reset (global.css) already neutralizes CSS
// transitions/animations for users who request it, but that reset can't
// reach GSAP-driven motion — check this before registering any tween or
// ScrollTrigger, and skip straight to the end state instead.
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export { gsap, ScrollTrigger, Draggable };
