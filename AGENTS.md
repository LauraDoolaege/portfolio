# CLAUDE.md

Operational rules distilled from [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md).
This file is the day-to-day guardrail; the brief is the source of truth for
anything not covered here or if the two ever disagree.

## What this project is

A personal portfolio for Laura (digital development & design student,
specializing in UX/experience design), built to let recruiters quickly judge
her process, taste, and credibility. Aesthetic: **contemporary editorial
design with a tactile, human edge** — disciplined whitespace and oversized
type. Never a cold SaaS dark-mode look, never a glossy stock-photo look,
never generic beige brutalist portfolio cliché, never full-bleed dark mode
as a base theme. (The brief's original "exactly one surprise per
composition" rule is superseded — see "Experimental design dials" below.)

## Experimental design dials (OVERRIDE the brief — confirmed explicitly)

The `design-taste-frontend` skill (`.agents/skills/design-taste-frontend/`)
defines three tunable dials — `DESIGN_VARIANCE`, `MOTION_INTENSITY`,
`VISUAL_DENSITY` — with a "Portfolio (Designer/studio)" baseline of
**8 / 7 / 3**. This project runs:

- **`DESIGN_VARIANCE: 9`** (up) — bolder, less predictable composition:
  asymmetric structure, varied section rhythm, layouts that don't repeat
  their neighbor, willing to break grid uniformity for effect.
- **`MOTION_INTENSITY: 8`** (up) — once interaction work starts (GSAP is
  the brief's named tool), reach for the fuller end of what's allowed:
  noticeable entrance/scroll reveals, hover physics, more energy than a
  minimal fade-in.
- **`VISUAL_DENSITY: 2`** (down) — fewer elements per viewport, more
  negative space than the baseline portfolio preset.

**Explicitly confirmed: these dials override the brief's composition/motion
rules where they conflict**, not just operate inside them. Concretely
superseded:

- Section 3 principle 2, "one surprise per composition" — no longer a hard
  cap. `DESIGN_VARIANCE: 9` permits more than one bold move per page.
- Section 3's macro-asymmetry limit ("asymmetry at macro level only...
  content blocks stay orderly") — no longer a ceiling; more aggressive
  grid-breaking is allowed.
- Section 3's motion ceiling ("250-500ms," "a playful gust of wind, not a
  tech demo," "no excessive parallax") — no longer a hard cap.
  `MOTION_INTENSITY: 8` can reach toward the skill's fuller range
  (longer/more elaborate sequences, more noticeable physics).

**What the dials do NOT touch** — they govern composition/motion/density,
not identity or accessibility, so these stay locked exactly as before
unless a future message says otherwise:

- Palette, type families, and imagery modes (Section 3's color/type/imagery
  rules) — untouched.
- `prefers-reduced-motion` — always respected regardless of
  `MOTION_INTENSITY`. This is an accessibility floor, not a style
  preference, so it's not part of what got overridden.
- Semantic HTML, focus states, contrast — unaffected baseline quality.

The skill's own stack defaults (React, Tailwind, Motion/Framer, GSAP,
shadcn/ui) don't apply here — this project stays Astro + plain CSS +
vanilla JS (see "Tech stack" below); only the dial _values_ and the
design-engineering judgment behind them (anti-center-bias, layout
diversification, anti-repetition rules, etc.) carry over, translated to
our actual tools.

## Current status

The full homepage and the full About page are built: Header/nav, Hero,
SelectedWork, Gallery, CurrentlyWorkingOn, HowIThink, ContactCTA, Footer,
and (About) AboutIntro, AboutStory, AboutProcess, AboutDrives. Every other
page is **not built yet** — Work index, case study, and Contact layouts
are still PROPOSED and unapproved. Don't build page content without
checking the brief section for that page first.

Two new reusable `ui/` primitives came out of the homepage build:
`ProjectCard.astro` (the brief's "ticket-card" module — image, number,
title, role tag, year, reused for all 6 Selected Work cards and meant for
the Work index later) and `SectionMarker.astro` (the "( 02 ) Selected
work" numbered running-head repeated at the top of each section below the
hero, echoing the numbered Context/Approach/Outcome pattern already
proposed for case studies in PROJECT_BRIEF.md Section 5).

The homepage's one locked terracotta "wink" (Section 3 palette table —
NOT touched by the design-variance override above) is the rotated
asterisk after "Currently working on" — the brief's own named example for
this color. Don't add a second terracotta moment anywhere else on the
homepage.

ContactCTA and Footer are both `dark-field`, deliberately paired as one
continuous dark closing zone (Section 3 permits "footer / at most one CTA
band"). Because `dark-field` is so close in value to `ink`, ContactCTA
uses a local dark-context copy of the button style rather than reusing
`Button.astro` directly, which hardcodes ink/porcelain colors.

Real project titles/images, the Gallery's images, and the exact
"Currently working on" / "How I think" intro copy are still placeholders
— see each component's own header comment for what's a direct brief
descriptor vs. an invented structural stand-in.

**About page (built):** content and section order are locked
(PROJECT_BRIEF.md Section 4/5 — intro+CV, "How I got here"+pull-quote,
"How I work", "What drives me", reused ContactCTA, reused Footer); all
copy was supplied directly by the user and kept close to verbatim. Layout
composition was resolved as an implementation decision inside the locked
system (see `.impeccable/surfaces/src-pages-about-astro.md` for the
recorded direction), the same freedom already used for every homepage
section — not a new identity exercise.

This page's own oversized type anchor is a plain "About" headline —
deliberately NOT Hero's edge-to-edge cqw sizing or its object-in-
letterform/mix-blend-mode device, which stays a homepage-only signature
move. Its one terracotta wink (locked per-composition, not per-site — see
CLAUDE.md "Design system") is a small rotated footnote card next to the
intro, built from the user's own aside almost verbatim. Its one
Instrument Serif moment is the "How I got here" pull-quote, which also
carries the page's one macro grid-break (wider than the body column, the
classic "the quote breaks the column" editorial move). "What drives me"
is the page's tactile centerpiece, per direct request ("have fun with it,
make it tactile"): four short statements as small rotated note cards on a
chalk field, echoing "paper, sticky notes, messy diagrams" from "How I
work" one section above — DESIGN_VARIANCE: 9 grid-breaking earned by the
content itself, not decoration.

Motion is deliberately varied across the page's four sections rather than
one reveal copy-pasted four times: AboutIntro gets a single restrained
load-in fade/rise; AboutStory's pull-quote gets its own scroll-triggered
emphasis reveal (rise + slight scale); AboutDrives' cards get a
rotational settle (start flatter and lower, ease into their resting
tilt); AboutProcess is deliberately left still — a page needs a quiet
beat between its louder ones as much as it needs the loud ones. A new
`.site-header__link[aria-current="page"]` style (compares `Astro.url.pathname`
against each nav item, `trailingSlash: 'never'` means no normalization is
needed) shows which page you're on in the site nav — added because it
directly serves "clear and easy to navigate," not a pre-planned feature.

**One more bug found and fixed, same family as the others:** GSAP's
`rotate` tween property doesn't animate the standalone CSS `rotate`
property — it still consolidates into the `transform` shorthand (and
explicitly zeroes the standalone `rotate` out), even though the tween
config used the property name `rotate`. A breakpoint override written
against the standalone `rotate` property (meant to flatten AboutDrives'
cards on mobile) was therefore silently inert once the entrance animation
ran — confirmed via `getComputedStyle().transform`/`.rotate` on the live
page, not assumed. Fixed by removing the override rather than chasing the
right property: the rotated look reads fine at any width, so the
"simpler" fix was to stop trying to override it, not to fight GSAP for
control of a property it doesn't actually write to.

**About page brutalist-structure pass:** explicit follow-up request ("use
your brutalist design skill and taste skill... make it more modern") after
the first build read as too safe. Read `.agents/skills/industrial-
brutalist-ui/SKILL.md` and `.agents/skills/design-taste-frontend/SKILL.md`
directly (neither is registered as an invokable skill in this harness —
their guidance is applied by hand, same as the taste-frontend dials
already were). The brutalist skill's literal palette (hazard red or CRT
black, zero radius, ASCII framing) directly conflicts with this project's
own locked "never generic beige brutalist portfolio cliché" rule, so
before touching anything this was surfaced to the user with three concrete
scope options; they picked **structure only, About page only** — borrow
brutalist grid discipline and type contrast, keep the locked palette/type
families, touch only About's 4 section files. Nothing sitewide (Header,
Footer, SectionMarker.astro, global.css) changed.

What actually changed, all within that scope:

- A repeated hairline `border-top` on AboutStory/AboutProcess/AboutDrives
  turns section padding into a visible "plate boundary" — a dossier-page
  break instead of implicit whitespace. AboutIntro skips it (Header's edge
  already reads as the page top).
- SectionMarker's plain index text gets a hairline box, and AboutIntro
  gets its own matching "( 01 )" plate mark (authored locally — Intro
  isn't a labeled section, so it doesn't use SectionMarker itself). The
  box style is declared once, in AboutStory, via `:global(.section-marker__index)`
  — Astro only ships a component's CSS to pages that import it, so this
  reaches every SectionMarker instance on the About page without touching
  the shared component file or leaking to the homepage bundle.
- Sharp (zero-radius) corners on the footnote card and the "What drives
  me" cards, replacing the sitewide `--radius-image` token locally —
  reads more like cut paper than a soft printed card, which fits "pinned/
  placed by hand" better, and borrows the brutalist skill's "reject
  border-radius" discipline without touching the token itself.
- "What drives me" cards gained a corner-plate number (01-04), reusing
  ProjectCard's own already-locked corner-number device rather than
  inventing a new one — declared as a block line above the text, not an
  absolutely-positioned corner mark like ProjectCard's, since these cards
  are pure text and an absolute mark risked colliding with a longer item's
  first line.
- The "How I got here" pull-quote's thin mauve `border-left` became a
  real 3px ink rule (a separate element, not `border-left` — GSAP needs a
  node it can scale independently) that draws down before the text
  settles in, instead of a plain fade. Ink, not accent: a thicker
  structural mark reads as a blueprint annotation rather than the colored-
  border-as-decoration pattern craft-floor already refuses.
- AboutIntro's headline reveal changed from a soft fade/rise to a hard
  `clip-path` wipe (reads like the word being printed by a scanning bar),
  and AboutDrives' card settle got a tighter overshoot and shorter
  duration (a firm stamp rather than a bouncy toss) — both read as more
  mechanical-precision, which suits the page's more structural character
  better than the previous softer entrances.
- Fixed four em dashes in About's visible copy (two in AboutStory, one
  each in AboutIntro and AboutProcess) that CLAUDE.md's own quality
  guardrails already ban but the first build had missed — rewritten as
  separate sentences or a colon, not cut. The site's other pre-existing
  em dashes (two in SelectedWork's group labels) were left alone; that's
  outside this pass's About-only scope, not an oversight.

**Header/Hero rebuild v1 (superseded by v2 below):** the wordmark moved
out of Hero's big type into a small corner mark in Header — Hero's
oversized moment became a "Portfolio" headline with a year mark and a
placeholder overlapping it, same locked object-in-letterform device,
different word. Header's `border-bottom` and SectionMarker's
`border-bottom` were removed (explicit request — they read as
overplayed). Header + Hero got wrapped in `.intro` in `index.astro` with
`min-height: 100dvh` so they fill the opening screen together. Gallery
became a horizontal scroll strip, not the earlier asymmetric collage
grid — this part is unchanged by v2.

**Header/Hero rebuild v2 (current):** rebuilt again to a precise 12-column
grid spec matching a target wireframe, on top of v1's foundation. New
shared tokens in `global.css`: `--intro-max-width` (1600px) /
`--intro-margin` (`clamp(20px, 5vw, 72px)`) / `--intro-gutter`, used by
_both_ Header and Hero so the logo, nav/CV, the hero title, and the hero
bottom block all land on the same margin lines (verified pixel-exact via
`getBoundingClientRect()`) — separate from the sitewide
`--content-max-width`/`--space-outer` (1320px/100px) every section below
the fold still uses. Also added a general-purpose 8px spacing scale
(`--space-4` through `--space-128`).

Hero.astro structure: a portrait image slot (`aspect-ratio: 5/7`,
`max-height: 36dvh` so it doesn't push the page past one viewport)
replaces the placeholder blob; "Portfolio" is sized with **cqw**
(container query units, via `container-type: inline-size` on the `<h1>`)
rather than a hand-tuned `clamp()`, measured so the rendered word width
matches its container edge-to-edge at any viewport; year + tags form one
right-aligned "meta" cluster above the image; role/intro/CTA sit
left-aligned in a `.hero__bottom` grid, CTA now a plain secondary
(text-link) button per the target wireframe, not the boxed primary style.
Header's nav switched to the mono "Label" type style and gained a
text-roll hover (two stacked label copies, CSS grid + transform, no JS).

**This is the project's first real animation work** — `src/utils/motion.ts`
was plumbing-only before this. Hero's script sets up a GSAP entrance
timeline (image clip-path reveal, per-letter stagger rise, meta/bottom
fade-up) plus a ±40px scroll-linked parallax on the image via
ScrollTrigger, all gated behind `prefersReducedMotion()`. The entrance
timeline gives each element its own ease and lets groups overlap instead
of running strictly one-after-another (per-element `power3.out` /
`back.out(1.5)` / `sine.inOut` stagger / `power2.out`, not one uniform
curve) — a follow-up pass after the first version read as mechanical.
Header's nav text-roll hover and Button's icon-nudge-on-hover both moved
from plain CSS transitions to GSAP for the same reason (independent
easing per element instead of a lockstep mirror swap); their hidden/rest
states are set via `gsap.set()` at script-init, not static CSS — see bug
4 below for why.

**Three real bugs found and fixed during this rebuild, worth knowing for
future work in this file or nearby:**

1. Passing `class="foo"` into `<Button>` and writing `.foo {}` in the
   _parent's_ `<style>` block silently does nothing — Astro scopes that
   rule to the parent's own `data-astro-cid`, but `Button.astro`'s `<a>`
   carries Button's own cid instead, so the selector never matches. Wrap
   it in `:global()` (see `.hero__cta` in Hero.astro). Plain
   `<div>`/`<span>` children you author yourself don't need this — only
   classes landing on another component's own root element do.
2. `mix-blend-mode` only blends against content painted in the _same_
   stacking context. `position: relative` + `z-index` on an ancestor of
   a blended element creates a new stacking context and silently isolates
   the blend from everything outside it (the image, the page background)
   — it'll render as if blend-mode were `normal`. Paint order from plain
   DOM order was already correct here; the z-index was never needed.
3. A negative `margin-top` used to pull an element up into its previous
   sibling only works if the parent doesn't margin-collapse with that
   child — a plain block parent with one child _does_ collapse by
   default, silently reporting 0 height. `display: flow-root` on the
   parent fixes it without clipping the intentional overflow (unlike
   `overflow: hidden`, which would also hide the overlap). Separately:
   never combine CSS `transform` used for static positioning (e.g. a
   centering `translate()`) with a GSAP tween that also animates
   `transform` on the same element — the tween's inline style silently
   replaces the CSS one the instant it runs. Use `inset: 0; margin: auto;`
   for transform-free centering when an element also needs `transform`
   for something else (see `.hero__image`'s mobile rule). The same clash
   also breaks a _static CSS rule_ that sets `transform` on an element
   GSAP later animates (not just static-positioning trick) — see bug 4.
4. Any element with an active `transform` (even `position: static`)
   establishes its own stacking context, as if it had
   `position: relative; z-index: 0`. Hero's scroll parallax writes an
   inline `transform` to `.hero__image` on load (immediate-render, not
   just once scrolled into range), which silently promoted it above
   Header's mobile nav overlay (`position: absolute`, `z-index: auto`) —
   the open Work/About/Contact panel rendered, but the image sat on top
   of it and ate every tap. Fix: give `.site-header` an explicit
   `z-index` (`10`) so the header/nav always wins regardless of what
   transform-bearing content Hero animates. Any future GSAP work that
   transforms Hero (or other in-flow) content should assume it can jump
   ahead of unrelated positioned siblings unless they have a real
   z-index — `position: relative` alone isn't enough.

**Homepage polish pass:** a systematic desktop/tablet/mobile sweep (contrast
math + `getBoundingClientRect()`/hit-testing, not just eyeballing
screenshots) turned up three more issues beyond bug 4 above, all fixed:
`--color-text-secondary` and `--color-accent` are tuned for the light
backgrounds and drop to 3.03:1 / 3.49:1 on `dark-field` — under the 4.5:1
minimum for the footer's 12px meta row and its hover states. Added
`--color-text-secondary-on-dark` / `--color-accent-on-dark` (global.css) —
tints of the same two colors, not new accents — for that one context.
Separately, the tablet range (640-1023px) never got the "space-between is
a desktop-only ask" fix that mobile already had (see `.hero__inner`), so
a portrait tablet viewport (820×1100 measured) showed a ~265px dead gap
between the hero's visual block and its role/intro/CTA block; extended
the same `flex-start` override to that range.

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

**Buttons (revised twice from the brief's original "solid ink pill")** —
the brief's Section 3 originally locked "solid ink pill for primary
actions." Current state (`components/ui/Button.astro`): primary is a
hairline-bordered **ink/charcoal** box (not mauve, not a pill, no bracket
glyphs), with a fill that sweeps in on hover/focus. It briefly went
through a bracket-tag mono-label phase (`[ cv ]`) matching the site's
`[ case study ]` device — that's gone too; the brackets now live on tags
instead (see below), not buttons. Secondary (quiet underline text link)
is unchanged. Treat this file's description as current, not the brief's
original pill wording or CLAUDE.md's own earlier bracket-button
description — both superseded, same as the palette's terracotta draft.

**Tags** — plain bracketed mono text (`[ ux / experience design ]`), ink
colored, **no background fill**. `accent-soft` is no longer used for tag
backgrounds (an earlier version filled tags with it; that's been dropped
in favor of a quieter, brackets-only treatment) — it's still available
for other decorative fills per its locked usage note, just not this one.

Full palette/type/spacing/grid values with exact numbers live in
`src/styles/global.css` as CSS custom properties — treat that file as the
canonical, machine-readable copy of this section, and update both together
if a value changes.

## Open decisions (do not silently resolve these — ask or flag)

Breakpoints, mobile type scale, mobile spacing, mobile fallback for macro
asymmetry, ticket-card mobile column count, touch fallback for hover-only
motion, and mobile nav pattern are all **unresolved** in the brief (its
Section 8). If a page-building task needs one of these, surface it rather
than picking a number and moving on. Where a component genuinely can't
ship without a value (e.g. the hero name would overflow mobile at the
locked 96px), a fluid `clamp()` has been used as a documented stopgap
(see the component's own header comment) — not a proposal for the real
mobile type scale, which still needs to be decided as its own thing.

Also unresolved: Work/case-study/Contact page layouts (proposed only),
content max-width (1320px is a working default, not locked), and the
mauve accent's WCAG contrast ratio (not yet verified against either
background token — verify before using it for body-sized text/links, not
just decorative use).

**Resolved:** final display name is **Laura Doolaege** (confirmed via a
layout sketch that used the real surname, matching the account's own
email domain) — the brief's "Laura [Name]" placeholder is superseded in
the header wordmark and hero name.

## Component architecture

- `src/components/ui/` — generic, content-agnostic primitives (buttons,
  tags/pills). Reusable across unrelated pages.
- `src/components/layout/` — structural chrome shared across pages (nav,
  footer).
- `src/components/sections/` — larger page-specific content blocks, still
  extracted for readability, not meant to be reused elsewhere.
- `src/layouts/` — full HTML-document shells (`BaseLayout.astro`). Page
  content goes in `src/pages/`, not in a layout.

**Do not create a component before a page actually needs it.** Built so
far: `Header`, `Button`, `Tag`, `Hero` (see each folder's README.md for the
current list) — the brief's "suggested component set" (Footer, ProjectCard,
SectionHeader, CardTriptych, SpecRow/SpecTable, CaseStudyHeader, Marquee,
ImageReveal) is a naming reference for when that component is actually
needed, not a checklist to scaffold in advance.

The one component-shaped rule worth remembering early: the ticket-card
module is meant to be **one** component reused everywhere a project
thumbnail appears (homepage, Work index) — don't fork it into near-duplicate
variants per section.

## Content

Homepage and About copy in the brief is final, not placeholder. Project
titles/images/descriptions, case-study copy, and final Contact copy are
still missing — use clearly-labeled placeholders, not invented content,
when a page needs them before they exist. Once real
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
- **Animation**: `gsap` is installed with a canonical entry point at
  `src/utils/motion.ts` — it imports `gsap`, registers `ScrollTrigger`
  once, and exports a `prefersReducedMotion()` guard. Nothing animates
  yet (plumbing only, added ahead of need per explicit request); when
  animation work starts, import `gsap`/`ScrollTrigger` from that file
  rather than from the `gsap` package directly, and rather than
  registering the plugin again in each component. Client-only — import
  it from a component's `<script>` tag, not from Astro frontmatter.
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
