# CLAUDE.md

Operational rules distilled from [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md).
This file is the day-to-day guardrail; the brief is the source of truth for
anything not covered here or if the two ever disagree.

## What this project is

A personal portfolio for Laura (digital development & design student,
specializing in UX/experience design), built to let recruiters quickly judge
her process, taste, and credibility. Aesthetic: **contemporary editorial
design with a tactile, human edge** — disciplined whitespace and oversized
type, with exactly one deliberate "surprise" per composition. Never a cold
SaaS dark-mode look, never a glossy stock-photo look, never generic beige
brutalist portfolio cliché, never full-bleed dark mode as a base theme.

## Current status

Technical foundation only. **No pages have been designed or built yet** —
homepage and About have locked content/structure in the brief, but no
layout has been implemented; Work index, case study, and Contact layouts
are still PROPOSED and unapproved. Don't build page content without
checking the brief section for that page first.

## Design system (LOCKED — see `src/styles/global.css` for the actual tokens)

**Color** — value contrast, not hue. `bg-primary` (#F8F6F1 porcelain) and
`bg-secondary` (#ECE8DE chalk) are the only backgrounds in normal use.
`ink` (#17150F) is primary text. `accent` (#8C6670 mauve) is the _only_
everyday interactive accent — links, underlines, tags, hover states.
`accent-signal` (#A65139 terracotta) is reserved for exactly one "wink"
moment per composition (an asterisk, a rotated label) — never a general
accent, never used twice on the same page. `dark-field` (#1C1B16) is a
controlled contrast tool for the footer / at most one CTA band — it is
not a dark mode and must never be user-toggleable.

**Type** — four families, each with one job. Barlow Condensed (display,
uppercase, oversized, one headline anchor per page — never split attention
between two competing headlines). Instrument Serif italic (editorial accent,
**once per page maximum**, never a body font). IBM Plex Sans (body/UI).
Space Mono (uppercase, bracketed labels, e.g. `[ case study ]`).

**One surprise per composition** — this is a hard rule, not a stylistic
suggestion. Every page gets exactly one bold/playful move (object-in-type,
rotated label, illustrated flourish). Zero feels unfinished; two feels
chaotic.

**Imagery** — two modes only: (1) documentary/process, black-and-white or
desaturated, unpolished on purpose; (2) warm still-life/hero-object, centered,
soft natural light. No glossy/staged studio photography, no full-bleed hero
images as a default. **No real photography exists yet** — use flat gray
placeholder divs, not stock or generated images, until real assets are
supplied.

**Motion** — subtle and functional (soft fade/slide reveals, 250-500ms),
"a playful gust of wind," never a tech demo. No excessive parallax, no
constant/looping animation. GSAP is the intended tool for scroll-based
reveals once interaction work starts. `prefers-reduced-motion` must always
be respected — the base reset in `global.css` already disables animation
globally for users who request it; don't build animations that bypass this.

**Borders/radii** — hairline (1px) rules only; sharp or subtly rounded
image containers, not SaaS-style large border-radius cards.

Full palette/type/spacing/grid values with exact numbers live in
`src/styles/global.css` as CSS custom properties — treat that file as the
canonical, machine-readable copy of this section, and update both together
if a value changes.

## Open decisions (do not silently resolve these — ask or flag)

Breakpoints, mobile type scale, mobile spacing, mobile fallback for macro
asymmetry, ticket-card mobile column count, touch fallback for hover-only
motion, and mobile nav pattern are all **unresolved** in the brief (its
Section 8). If a page-building task needs one of these, surface it rather
than picking a number and moving on.

Also unresolved: final display name/handle, Work/case-study/Contact page
layouts (proposed only), content max-width (1320px is a working default,
not locked), and the mauve accent's WCAG contrast ratio (not yet verified
against either background token — verify before using it for body-sized
text/links, not just decorative use).

## Component architecture

- `src/components/ui/` — generic, content-agnostic primitives (buttons,
  tags/pills). Reusable across unrelated pages.
- `src/components/layout/` — structural chrome shared across pages (nav,
  footer).
- `src/components/sections/` — larger page-specific content blocks, still
  extracted for readability, not meant to be reused elsewhere.
- `src/layouts/` — full HTML-document shells (`BaseLayout.astro`). Page
  content goes in `src/pages/`, not in a layout.

**Do not create a component before a page actually needs it.** All three
component folders are currently empty on purpose (see each folder's
README.md) — the brief's "suggested component set" (Nav, Footer, Button,
ProjectCard, SectionHeader, TagPill, CardTriptych, SpecRow/SpecTable,
CaseStudyHeader, Marquee, ImageReveal) is a naming reference for when that
component is actually built, not a checklist to scaffold in advance.

The one component-shaped rule worth remembering early: the ticket-card
module is meant to be **one** component reused everywhere a project
thumbnail appears (homepage, Work index) — don't fork it into near-duplicate
variants per section.

## Content

Homepage and About copy in the brief is final, not placeholder. Project
titles/images/descriptions, case-study copy, final Contact copy, and the
real display name are all still missing — use clearly-labeled placeholders,
not invented content, when a page needs them before they exist. Once real
case studies are approved, they're a natural fit for an Astro content
collection (one entry per project) rather than hardcoded pages — don't
hardcode a growing list of near-identical case-study pages instead.

## Tech stack

- **Astro** (TypeScript, `strict` preset via `astro/tsconfigs/strict`).
- **Styling**: plain CSS with custom properties as design tokens
  (`src/styles/global.css`), plus Astro's native scoped `<style>` per
  component. No CSS framework/utility library — the design system is a
  small, bespoke, precisely-specified token set, not a general-purpose
  utility scale, so a framework would add indirection without saving
  work. Revisit only if a real need shows up (e.g. a design-token build
  step); don't add one preemptively.
- **Fonts**: self-hosted via `@fontsource/*` packages (imported in
  `src/styles/fonts.css`), not a Google Fonts `<link>`, so there's no
  runtime dependency on an external font host and no render-blocking
  cross-origin request. Only the weights actually used are imported —
  add a weight there (not a generic "import everything") if a design
  needs one that isn't already present.
- **Images**: use `astro:assets` (import from `src/assets/`) for anything
  going through the build pipeline, so images get optimized automatically.
  `public/` is for files that must keep an exact path or bypass processing
  (favicon, robots.txt).
- **Deployment**: GitHub Pages, via `.github/workflows/deploy.yml` (builds
  and deploys on every push to `main`). Repo is a project repo
  (`github.com/LauraDoolaege/portfolio`), so `site`/`base` in
  `astro.config.mjs` are set to `https://LauraDoolaege.github.io` /
  `/portfolio`. Any internal link to a `public/` asset must go through
  `import.meta.env.BASE_URL` (see `BaseLayout.astro`'s favicon link) or it
  will 404 once deployed under the `/portfolio` subpath — this is easy to
  forget locally since `base` only bites once you deploy.
- **Linting/formatting**: ESLint (flat config, `typescript-eslint` +
  `eslint-plugin-astro`) and Prettier (`prettier-plugin-astro`). Run
  `npm run lint` / `npm run format` / `npm run check` (the last is Astro's
  own type checker) before considering page-building work done.

## Quality guardrails for future page-building work

Carried over from the brief's TasteSkill section — apply these once real
pages get built:

- Hero content must fit the viewport; no orphaned grid cells; every section
  needs a declared mobile collapse behavior.
- No fake div-based "screenshot" mockups — real (even if placeholder) image
  slots only.
- Motion must be motivated by content, not decorative; GSAP ScrollTrigger
  configured correctly; `prefers-reduced-motion` always respected.
- Verify contrast, especially anywhere `accent` (mauve) is used for text.
  One locked visual theme per page — the dark footer/CTA band is the only
  sanctioned exception, not a precedent for more dark sections.
- No em-dashes in copy, no fabricated stats/names, no decorative status
  dots, ration "eyebrow" labels, one consistent accent color site-wide
  (mauve — terracotta stays a rare single-use wink, not a second accent).
