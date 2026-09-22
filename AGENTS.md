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

**Gallery rebuild (floating, auto-scrolling, draggable, with a lightbox):**
explicit request, replacing the earlier plain horizontal-scroll strip.
Tiles now sit at alternating heights and aspect ratios (wide/tall/square,
up/flat/down, two independent cycles offset by one so they don't lock
step) and drift continuously; the strip is grab-to-drag (mouse/pen; touch
keeps native momentum scrolling) and opens into a full-viewport lightbox
with prev/next, a counter, and an exit control, all keyboard-accessible.

The continuous auto-drift is a deliberate, informed exception to Section
3's locked "no constant/looping animation" line — that phrase specifically
wasn't among the three quoted as superseded by the `DESIGN_VARIANCE`
override ("250-500ms," "playful gust of wind, not a tech demo," "no
excessive parallax"), so this was surfaced rather than silently assumed
covered. It fully stands down under `prefers-reduced-motion` (no slower
fallback, no motion at all) and pauses on hover/focus/drag/touch/wheel/tab
-hidden, resuming only after ~1.8s idle.

Technical approach: position (`scrollLeft`), not a CSS `transform`, drives
both the auto-scroll and the drag — this sidesteps the whole GSAP-vs-
static-transform conflict class of bug documented elsewhere in this file
(bug 4 above), since nothing here ever writes `transform` on the
scrolling track. The tile list renders three times (prev/current/next
set); the viewport starts scrolled into the middle set, and `scrollLeft`
silently jumps back a full set-width whenever it crosses into a
neighboring set, in either direction — verified seamless by sampling
which tile sits at each of 5 fixed x-positions immediately before and
after a scroll-triggered wrap and confirming identical content, not just
eyeballed. Only the middle (real) set of triggers is keyboard/screen-
reader reachable; the other two are `aria-hidden` + untabbable, present
purely for the loop illusion.

**Three real bugs found and fixed while testing this, all confirmed via
`getBoundingClientRect()`/computed styles rather than assumed from the
code reading right:**

1. A stale `pointerup` resume-timer could re-enable `autoScrollActive`
   mid-drag on a quick drag-release-drag-release sequence, since `pause()`
   only flipped the flag and never cancelled a pending `resumeSoon()`
   timeout from the previous interaction. Harmless in practice (the tick
   loop also gates on `!isPointerDown`, so nothing visibly broke), but
   fixed by cancelling the pending timer inside `pause()` too, so the
   intended ~1.8s cooldown is accurate after rapid successive drags.
2. `closeBtn.focus()` was silently failing on lightbox open — focus
   landed on `<body>` instead. Cause: `gsap.set(lightbox, { autoAlpha: 0 })`
   sets `visibility: hidden` synchronously, and `autoAlpha` only flips it
   back to visible when the following `.to()` tween actually starts
   ticking (next animation frame), not synchronously — so the
   `.focus()` call, running in the same synchronous block, targeted an
   element that was still `visibility: hidden` and therefore unfocusable.
   Fixed by animating plain `opacity` instead of `autoAlpha` for the
   lightbox and its stage: the native `hidden` attribute (already toggled
   before the animation starts) already handles show/hide and removes it
   from the tab order/a11y tree while closed, so `autoAlpha`'s extra
   `visibility` toggle was never actually needed.
3. On a 390px viewport, the lightbox's next button measured **outside the
   viewport entirely** (`right: 482.8px` against `innerWidth: 390`) —
   found via `getBoundingClientRect()`, not visible in a screenshot at a
   glance. Cause: prev/next/close were flex-siblings of the image in one
   row (`[prev, image, next]`), so their widths added on top of the
   image's own width; at narrow viewports the row's total content
   exceeded the panel's `max-width`, and flex children overflow a
   too-small container by default rather than shrinking below their
   content size. Fixed by pinning close/prev/next to the lightbox's own
   (viewport) edges with `position: absolute` instead of laying them out
   beside the image — their position now never depends on the image's
   size at any breakpoint.

Also worth knowing: a `position: fixed`, full-viewport lightbox is
genuinely hard to verify by screenshot in this environment — captures
consistently showed the dark backdrop clipped to roughly the first third
of the viewport height even though `getBoundingClientRect()` confirmed it
spans the true full 100vh and `elementFromPoint()` at the bottom of the
viewport still resolved to the backdrop. Treated as a capture-tool
limitation (reproduced identically in a brand-new tab), not a product
bug — verified via hit-testing instead, same approach already established
in this file for the mobile-nav z-index bug above. The same screenshot
tool turned out to also crop very wide (1440px) emulated viewports in
this environment specifically — a 1024px viewport captured reliably, a
1440px one didn't, both confirmed against identical DOM measurements —
worth remembering before trusting a screenshot's negative result on a
wide layout.

**Gallery refinement pass (explicit follow-up request):** slower
auto-scroll, a subtle continuous bob per tile while the section is
hovered (killed back to rest on pointerleave), full-bleed edges (broke
`.gallery__viewport` out of the sitewide `--content-max-width` via a new
`.gallery__stage` wrapper and the standard `100vw` / negative-margin
technique — `.gallery__inner` now holds only SectionMarker, so its own
inset margins stay untouched), a large "Gallery" wordmark sitting behind
the strip as a low-contrast textural watermark (`aria-hidden`, since
SectionMarker's own h2 is still the accessible heading), and the lightbox
open/close is a plain opacity fade now with no scale.

**One more real bug, the most interesting of this pass:** dropping the
auto-scroll speed constant from `0.4` to `0.15` silently stopped the
strip from moving at all. Cause: the browser rounds/snaps `scrollLeft` on
every write, and a sub-pixel delta below whatever that rounding threshold
is never survives a single write — confirmed directly, not assumed, by
running `scrollLeft += 0.15` twenty times in a row from the console and
finding zero net change (`0.4` happened to clear the threshold every
time, `0.15` never did). Fixed by moving the true scroll position into a
plain JS number (`scrollPos`, full float precision, immune to whatever
the DOM does to `scrollLeft`) that drives both the auto-scroll tick and
the drag handler; `scrollLeft` is only ever written from it, never read
back as the source of truth for the next frame. Any lesson here
generalizes: a slow/subtle animation driven by repeatedly reading back
and incrementing a DOM property that the browser is free to round
(`scrollLeft`, and worth remembering for similar properties elsewhere)
needs its true state kept in a plain variable instead, not trusted to
survive the round-trip through the DOM.

**Gallery, third pass — the interaction model changed, not just tuned:**
explicit, detailed follow-up request replaced the independent auto-
scrolling/draggable marquee from the previous two passes with a
scroll-linked pinned reveal (GSAP's canonical "horizontal-pan" pattern):
at rest, the "Gallery" watermark fills roughly half the viewport width
with the first tile overlapping its tail end; scrolling the page pins
the section and feeds that scroll input into a `ScrollTrigger` scrub
instead of moving the page, sliding the track across while the watermark
slides out of the way; scrolling back up reverses it exactly, because
that reversibility is what `scrub` already does, not something built
separately (verified directly: scrolled forward 300px, back 300px,
`track`'s and the title's computed `transform` matched the pre-scroll
values to the pixel once the `scrub: 1` smoothing settled). Once the
track finishes travelling the pin releases and the page continues
normally.

Since page scroll itself now drives the horizontal motion, the previous
pass's whole mechanism for that — the infinite 3×-duplicated tile loop,
the `scrollPos` accumulator, the pointer-drag handlers, the
hover/touch/wheel pause-and-resume listeners — no longer had a job and
was removed rather than kept alongside the new one (two systems fighting
over the same scroll input would have been the outcome otherwise). Tiles
render once now, not three times, which also simplified the lightbox
wiring (no more duplicate-set `aria-hidden`/`tabindex="-1"` handling —
every trigger is real). The hover-only hop bob survived unchanged from
the previous pass; it targets a different element and a different GSAP
property than the scroll-pin, so the two run independently without
conflict. `prefers-reduced-motion` skips the pin/scrub entirely (not a
slower version of it) and falls back to a plain native
`overflow-x: auto` strip, same "functional equivalent, motion removed"
principle used everywhere else in this project.

**Gallery, fourth pass — refinement, not a mechanism change:** four
explicit follow-up requests, all additive on top of the third pass's
pin/scrub: (1) the giant "Gallery" watermark became a small "(scroll)"
cta, styled with the site's mono/bracket-adjacent label device (see
Tag.astro) instead of the display-headline treatment — since the at-rest
reveal amount was previously derived from that watermark's own rendered
width, it's now a fixed `REVEAL_FRACTION` of the stage's width set
directly in the script, so a much smaller label doesn't collapse the
layout it used to size. (2) A custom circular "View" cursor replaces the
system pointer over a tile - GSAP `quickTo` on `x`/`y` for the follow-lag,
gated on both `prefers-reduced-motion` and `(pointer: fine)` since it's
meaningless on touch. (3) The pin's `ScrollTrigger` start moved from
`top top` to `top 65%`, plus trimmed block padding on `.gallery` and
`.gallery__viewport` - per direct feedback that desktop needed "too far"
a scroll before the pinned reveal engaged; `top top` only pins once the
stage's top edge reaches the very top of the viewport, so the section
could already be substantially visible without anything happening yet.
(4) A subtle 1px progress line sits under the strip, its bar scaled via
the same `ScrollTrigger`'s `onUpdate` (`self.progress`) while pinned, and
via a plain `scrollLeft`-driven listener in the reduced-motion static
fallback - two different drivers for the same visual, matched to
whichever mechanism is actually moving the strip in each mode.

**One more real bug, caught the same way as the others in this file (DOM
measurement, not a screenshot):** the custom cursor's `position: fixed`
initially failed to track the real viewport once pinning engaged -
`getBoundingClientRect()` returned coordinates in the thousands instead
of viewport-space ones. Cause: GSAP's pin writes an inline `transform` to
`.gallery__stage` while pinned (even the identity matrix
`matrix(1, 0, 0, 1, 0, 0)`, not just a moving one), and _any_ non-`none`
transform on an ancestor makes that ancestor the containing block for a
`position: fixed` descendant - the same "a transform, even a static one,
promotes its own containing/stacking context" family of bug already
documented for Hero's scroll parallax elsewhere in this file. The cursor
was originally nested inside `.gallery__stage`; moved it to be a sibling
instead (still inside `<section class="gallery">`, which itself is never
transformed), which was enough to restore true viewport-relative
positioning once pinning starts. The progress bar didn't need the same
fix - it's `position: absolute`, not `fixed`, so it's supposed to move
with the pinned stage rather than stay outside it.

**Gallery, fifth pass — the cursor still didn't work, plus a real
restructure:** direct follow-up after the fourth pass shipped: the
circular cursor still wasn't working, "(scroll)" read as brackets rather
than a cta, the section's chalk background was unwanted, and - the
substantial one - the title was scrolling away from the tiles while
pinned, which wasn't the ask at all.

**Why the title scrolled away:** the fourth pass's `ScrollTrigger` still
only pinned `.gallery__stage`, not the section - `.gallery__inner` (which
holds the `SectionMarker` title) sits in normal document flow next to it,
so once the stage locked in place, the page kept scrolling underneath and
carried the title off the top of the screen while the tiles stayed put.
Per direct feedback ("I want them to stay in place, just scroll
horizontally... once the section is into full view"), the fix pins the
whole `<section class="gallery">` instead - `trigger` and the implicit
pin target both changed from `stage` to `section` - so the title and the
strip now lock together for the entire scrub. `start` went back to
`top top`, but on the whole section this time: since the section (title
included) starts higher up the page than the stage alone did, reaching
`top top` this way needed _less_ scroll than the stage-only version did
even with its `top 65%` patch, and because the section's total height
comfortably fits inside a typical viewport, "top of section at top of
viewport" already means the whole thing is in full view - solving both
the title-separation problem and the earlier "too far to scroll"
complaint from the fourth pass, without needing a separate early-start
hack anymore.

**Why the cursor still didn't work:** two bugs stacked on each other.
First, moving the whole section (not just the stage) meant the cursor -
previously a sibling of `.gallery__stage` but still a child of
`<section class="gallery">` - was still nested inside the newly-pinned
transform, so the fourth pass's containing-block fix no longer held once
the pin target changed; moved the cursor to be a sibling of the `<section>`
itself (same level as the lightbox markup), which is never transformed by
anything. Second, and the one that actually explains "the circle doesn't
scale in even when it should be visible": `.gallery__cursor` used GSAP
`quickTo`/`gsap.set` for `x`/`y` positioning _and_ a CSS `transform: scale()`
toggled by `.is-active` on the very same element - GSAP's inline
`transform` silently wins once it's touched the property, so the CSS
scale never actually applied once the pointer moved even a single pixel
(confirmed directly: `getComputedStyle` showed `matrix(0.6, 0, 0, 0.6, ...)`
permanently, even with `.is-active` present in the class list). Same
family of bug as bug 3 in this file's Header/Hero section, just hitting
a script this project itself wrote instead of a component. Fixed the
way that whole bug family gets fixed here: two elements instead of one -
`.gallery__cursor` is now a pure GSAP-owned positioning wrapper (`x`/`y`
only, no CSS transform of its own), and a new `.gallery__cursor-inner`
span inside it owns the CSS `scale`/`opacity` for the hover state, so the
two never touch the same property. Also hardened the event wiring while
in there: listeners moved from a single delegated `pointermove` on
`.gallery__viewport` to per-trigger `pointerenter`/`pointermove`/
`pointerleave`, with `pointerenter` snapping the cursor to the entry
point via `gsap.set` before the eased `quickTo` takes over for movement
within the tile - the previous version let `quickTo` ease in from
wherever it last was (often the origin corner), which could read as
broken rather than as a deliberate lag on a fast first hover.

**The other two, smaller:** the "(scroll)" hint dropped its parentheses
and gained a small inline arrow SVG (`.gallery__hint-arrow`, matching the
stroke style already used for `.gallery__expand`'s icon) instead of
reading as a bracketed label - "Scroll" plus an arrow, not another
`[ bracketed ]` tag. `.gallery`'s `background: var(--color-bg-secondary)`
was removed outright per direct request; the section now sits on the
page's own porcelain background like the rest of the homepage instead of
the chalk field it shared with a couple of neighboring sections.

**Gallery, sixth pass — arrow out, hint folded into the track, a real
progress-bar bug, and an intentional locked-rule exception:** four more
direct follow-ups on the fifth pass.

The fifth pass's inline arrow SVG next to "Scroll" is gone again per
direct request ("remove the arrow"). More structurally, the hint itself
moved from an absolutely-positioned overlay with its own `REVEAL_FRACTION`/
`OVERLAP` reveal math into a plain `<li>` at the head of `.gallery__track`
itself - it's a real flex item now, sitting directly next to the first
tile because it's laid out next to it, not because a tween was aimed to
put it there. This deleted the separate `tl.to(hint, ...)` tween and the
constants that sized the old reveal window; the track's resting `x` is
now just `.gallery__inner`'s own left padding (read via
`getComputedStyle` so it can't drift out of sync with the title's actual
margin), not a fraction of the stage's width.

**A real, confirmed bug in the progress bar:** direct feedback that "the
line underneath is not updating" turned out to be a positioning bug, not
a dead script - `.gallery__progress-bar` had `top: 1.5rem` while its
1px-tall container `.gallery__progress` only ever had a ~2px box, so the
bar was scaling correctly the entire time, just a full line-height below
where the (also-present, low-opacity) static backing line actually sat -
invisible in practice. Fixed by moving the bar to `top: 0`, and used the
same follow-up to redesign the visual per direct request: the static
`::before` backing line is gone outright, the bar itself is thicker
(1px → 2px) and switched from a low-opacity `--color-accent` to a solid
`--color-text-secondary` - the same weight and color the placeholder
tiles' own borders use - so it now appears from nothing and grows only
as far as it already used to reach at 100% scroll, instead of always
being faintly visible as an unchanging full-width line with an
invisible bar drawn somewhere beneath it.

**The hover-bob became a locked-rule exception, on purpose, same as
before:** direct request - "while hovering, only the image being hovered
stops moving, the rest of the gallery continues its breathing motion" -
means the bob can no longer be "off until the section is hovered, then
all 15 tiles bob together." It now runs continuously, for as long as the
page is open, and a specific tile's own `pointerenter`/`pointerleave`
only `pause()`/`resume()` _that tile's_ tween (pausing freezes it exactly
where it is in its cycle; resuming continues from that same point, not a
reset). This is a second, explicit instance of the same locked-rule
exception CLAUDE.md's design system section flags for "no constant/
looping animation" - the first was the second pass's auto-scrolling
marquee (since removed). Surfacing it again here for the same reason:
`prefers-reduced-motion` skips it entirely as always, so it never becomes
motion nobody asked for, but it is a genuine ambient loop the rest of the
time, and worth a future reader knowing that was a deliberate, requested
trade-off rather than an oversight.

**Gallery, seventh pass — small progress-line refinements:** three
direct tweaks to the sixth pass's progress bar, no mechanism changes.
`transform-origin` moved from `left center` to `center` - since the bar
already spans the container's full inset width via `left: 0; right: 0`,
that one property change was enough to make it grow outward from the
middle as you scroll, instead of filling left-to-right. `margin-top`
went from `1.5rem` to `3rem` after direct feedback that the line sat too
close to the tiles above it - verified with `getBoundingClientRect()`
sampled across several seconds (to catch the continuous bob near its
peak dip, not just whatever phase a single snapshot happened to catch)
that the gap between the lowest possible tile edge and the line is a
steady 20px, not overlapping at any point in the bob's cycle. Also
re-verified the whole pinned section (title + stage + progress line)
still fits inside one viewport at a shorter-than-usual 760px height, not
just the 900px this project's checks default to - per the same "make
sure the whole section is still in view" instruction that shaped the
fifth pass's pin restructure. Thickness came down slightly, 2px → 1.5px,
to sit closer to the weight of the "Scroll" label and the placeholder
tiles' own hairline borders rather than reading heavier than either.

**Navigation pass — Work/Contact anchors, full-screen tablet+mobile menu,
About's back-link, title/subtitle parity:** six explicit requests
covering Header.astro, Footer.astro, and AboutIntro.astro. None of the
homepage/About locked content or copy changed — this pass is wayfinding
and typography-alignment only.

Work and Contact in Header's nav no longer point at `/work` and
`/contact` — those pages don't exist yet (CLAUDE.md "Current status":
still proposed, unbuilt) and previously 404'd. Work now points at
`${withBase('/')}#work` (SelectedWork.astro already had `id="work"` from
an earlier pass — nothing to add there), which always resolves to the
homepage's own section regardless of which page you click it from.
Contact points at a bare `#contact`, a new id on Footer's contact row
(`.site-footer__row--contact`) — since Footer renders on every page, a
plain hash (no leading path) scrolls to the current page's own footer
instead of forcing a navigation to the homepage, which reads smoother
when you're already on a page that has one. The header wordmark already
linked home (`withBase('/')`) before this pass — confirmed, not changed.

**The mobile nav breakpoint moved from 768px to 1023px, and the panel
itself became a full-screen overlay instead of a small dropdown** — per
direct request ("the menu on tablet and mobile screens should fill the
entire screen"). 1024px matches this project's own established tablet/
desktop split used elsewhere (Hero's tablet range, AboutIntro/
AboutStory's breakpoints), not the narrower boundary this used before,
when tablet still got the plain inline nav. The panel is `position: fixed;
inset: 0`, body scroll gets locked while it's open (same pattern the
lightbox already uses), and the entrance uses a softer fade + gentle
scale(0.98→1) on a custom `cubic-bezier(0.22, 1, 0.36, 1)` curve instead
of the old translateY(-8px) snap on the sitewide `--motion-easing` (a
plain `ease-out`, which accelerates hard out of the gate) — per direct
request that the animation read as softer.

**A real bug, caught by DOM measurement, not the screenshot (which showed
the CV button simply missing):** giving the logo/CV/toggle a higher
`z-index` than the now-full-screen nav should have kept them visible
above it, but the CV button stayed invisible anyway - `getComputedStyle`
showed its `z-index` was still `0`, not the `2` just set. Cause: the same
Astro-scoping specificity trap already documented once in Hero.astro -
`Button.astro`'s own `.btn--primary` rule already sets
`position: relative; z-index: 0`, and its selector (a class plus Astro's
scope-hash attribute) outranks a plain `:global(.site-header__cv)` class
selector regardless of source order. Hero's own mobile CTA override hit
this exact problem before and settled on `!important` rather than relying
on a specificity tie that stylesheet injection order would resolve
unpredictably; used the same fix here for the same reason, and left a
comment pointing at that precedent so a future z-index override on
anything wrapping `<Button>` knows to expect this.

**AboutIntro gained a "back to homepage" link** (small mono label style,
matching the plate mark rather than a bold CTA, with the same left-arrow
SVG the lightbox's prev control already uses) sitting above the "(01)"
plate mark. First attempt used `display: inline-flex` on the link, which
kept it on the same line as the plate mark that follows it in the markup
instead of stacking above it as intended - `display: flex` (block-level
by default) plus `width: fit-content` (so the link's own hit area/outline
doesn't stretch to the full line) fixed it, caught by screenshot before
calling the work done, not assumed correct from the code alone.

**Title/subtitle typography now matches Hero's, where the two pages have
real equivalents:** `.about-intro__headline`'s `line-height`/
`letter-spacing` now match `.hero__title-visual` exactly (0.8 /
-0.03em) — font-size keeps its own `clamp()` rather than adopting Hero's
cqw mechanism, since that edge-to-edge device is still deliberately
homepage-only (see this file's earlier "Header/Hero rebuild v2" section
and AboutIntro's own file-header comment). `.about-intro__text` - the
paragraph directly under the headline, About's closest equivalent to
Hero's `.hero__intro` subtitle paragraph - now matches its font-size
`clamp()`, `line-height: 1.5`, and `color: var(--color-text-secondary)`
instead of its own previous bespoke values (a larger clamp, full ink).
Hero's own bold-uppercase `.hero__role` treatment was deliberately not
copied onto this paragraph — that's a short role label, not body prose,
and forcing that treatment onto several full sentences would hurt
readability rather than align two pages' styles in any way that reads as
consistent.

**A real bug in `withBase()`, breaking every link to the homepage:**
direct report - "on the about page it leads to portfolio/... this slash
prevents the link from working... same with the name at the top."
`trailingSlash: 'never'` (astro.config.mjs) means the homepage's own
emitted route is slash-free (`/portfolio`, not `/portfolio/`), but
`withBase('/')` joined `base + "/"` unconditionally, producing
`/portfolio/` — a URL that doesn't match any emitted route. Every other
call site was fine (`withBase('/about')` never had a trailing slash to
begin with), so this only ever bit the root path specifically, which is
exactly the two places it surfaced: Header's logo and (from the previous
pass) AboutIntro's new back-link. Fixed in the one shared utility
(`src/utils/url.ts`) rather than patching each call site - `withBase('/')`
now returns the bare base with no trailing slash, matching the project's
own `trailingSlash: 'never'` convention consistently instead of treating
root as a special case that happened to be wrong.

**Gallery spotlight - the hover interaction reads as more intentional
now, per direct request** ("make the gallery feel more intentional and
apparent... when one card is hovered it should be clear that this is in
focus, with the rest of the page temporarily darkening, like in the image
preview"): a new `.gallery__spotlight` element, living outside `<section
class="gallery">` for the same containing-block reason the cursor and
lightbox already do, uses the classic box-shadow cutout technique - a
small box positioned/sized to match the hovered trigger's own rect, with
`box-shadow: 0 0 0 9999px rgb(23 21 15 / 0.7)`. A box-shadow never paints
inside its own element's box, so the shadow darkens the entire viewport
except that one rectangle, and the real tile underneath (an unrelated
element, unaffected by any of this) simply shows through the gap at full
brightness. This sidesteps the alternative approach entirely - raising
the actual tile's z-index above a full-page overlay - which would have
meant fighting the tile's own nested, transformed, pinned ancestor chain
for stacking priority (the same class of problem the cursor and CV
z-index bugs above already ran into twice this session). Reuses the
lightbox's own backdrop color/opacity rather than inventing a new one, so
the two "something is in focus, everything else recedes" moments in this
section share one visual language. Gated the same way as the custom
cursor (`prefers-reduced-motion` and `pointer: fine` both skip it) since
it's a decorative focus cue, not something the gallery depends on to stay
usable.

**Progress line, one more small pass:** per direct follow-up, thinner
again (1.5px → 1px) and a bit more clearance above the tiles
(`margin-top`: 3rem → 3.5rem) - verified against the same "whole pinned
section still fits in one viewport" budget as the previous pass rather
than assumed fine.

**The brutalist-pass hairline boxes around SectionMarker's index and
AboutIntro's own "(01)" plate are gone again**, per direct request
("remove the squares around the (01) etc on the about page"). Both now
fall back to SectionMarker's own plain index styling (mono,
text-secondary, no border) - the same look the homepage's SectionMarker
instances already have, so About's index marks no longer diverge from
that shared default. See AboutStory.astro and AboutIntro.astro's own
comments for exactly which rule was removed.

**Lightbox open/close became a FLIP transition, not a plain fade** - per
direct request ("make it look like the card moves, grows from its hover
state to the detail view... feel tactile and effortless"). FLIP
(First/Last/Invert/Play): read the clicked tile's own current box
("first"), diff it against the lightbox image's natural, already-laid-
out box ("last"), then play that diff as a single transform tween. The
browser never renders an intermediate layout state, only a GPU
transform, which is what makes this read as one continuous physical
motion - "the card becomes the detail view" - rather than two competing
effects (a fade layered under an unrelated move), which is what the
previous version's separate opacity tween on the whole lightbox
container would have produced if scale were simply added on top of it.
The image itself (`.lightbox__placeholder`) never fades - it's fully
visible the instant the tile is clicked, it just grows into position/
size - while the backdrop and chrome (close/nav/counter) still fade in
as before, on a short delay so they settle in just after the image
arrives rather than fighting for attention at the same time. `.lightbox__
placeholder` also picked up the same `border-radius: var(--radius-image)`
`.gallery__placeholder` already uses, so the shape reads as continuous
through the whole grow, not a rounded tile snapping to a square panel
partway through.

Closing reverses the same diff, but against whichever tile is _currently_
being viewed, not the one originally clicked - looked up fresh by
`data-index` (`currentTrigger()`) rather than trusting the `lastFocused`
reference the open handler captured, since that would otherwise point at
the wrong tile after navigating with prev/next while the lightbox was
open (verified directly: opened tile 3, stepped to tile 4, closed -
confirmed via `getBoundingClientRect()` that the placeholder shrank
toward tile 4's box, not tile 3's, at every sampled point mid-tween, not
just at the end). If the current tile somehow isn't in the DOM, closing
falls back to a plain fade instead of leaving the placeholder stuck
mid-transform with nothing to diff against.

Also clears any lingering `.is-active` state on the custom cursor and
the hover spotlight when a tile is clicked - both would otherwise stay
"active" (just invisible, hidden behind the now-opaque lightbox) since
opening the lightbox doesn't itself fire a `pointerleave` on the trigger.
Harmless as a rendering matter, but cleaning it up avoids leaving stale
state around for its own sake.

**Mouse-magnetic image shift, on Selected Work's ProjectCard and Gallery
tiles both** - per direct request ("a lot of Awwwards type websites, the
images kind of shift to the mouse position"). Same technique in both
places: on `pointermove`, the cursor's position within the card/tile is
normalized to roughly [-0.5, 0.5] on each axis, multiplied by a small px
range, and applied as `x`/`y` via `gsap.quickTo` for a smooth trailing
follow, alongside a modest scale-up on `pointerenter`. Gated on
`prefers-reduced-motion` and `pointer: fine`, same reasoning as the
Gallery cursor/spotlight - this is a continuous mouse-follow effect with
no touch equivalent.

The two components don't share a markup shape, so the implementation
isn't identical: ProjectCard already had a `.project-card__frame` (clips,
stays put) wrapping a separate `.project-card__image` (scales), so the
shift landed on the image layer specifically, same split as before.
Gallery's `.gallery__placeholder` has always done both jobs at once (its
own border/radius/overflow: hidden, and the thing that scaled on hover) -
no separate frame to add without restructuring markup for an effect this
size, so the shift and scale both land on the placeholder directly; the
tile's border moving a few px with the mouse reads the same as the
ProjectCard version in practice, just without an inner layer isolating
it.

Both components' existing CSS `:hover { transform: scale(1.03) }` rules
stay in their stylesheets as the reduced-motion/no-JS fallback rather
than being deleted - GSAP's inline `transform` always wins over a
stylesheet rule once the script runs (regardless of source order), so
there's no double-scaling risk, and when the script doesn't run at all
(reduced motion, JS disabled), the plain CSS hover state still gives a
functional response, just without the mouse-follow.

Gallery's `openLightbox` also resets every tile's shift/scale to neutral
before it measures the clicked tile's box for the FLIP transition above -
clicking a tile happens while it's mid-hover-shift, and without this the
FLIP's "first" rect would capture that in-flight offset instead of the
tile's true resting position. The reset is a synchronous `gsap.set` (no
easing) read back immediately by `getBoundingClientRect()` in the same
tick, so the correction itself is invisible - no intermediate frame
renders between the snap and the measurement.

**A real bug the mouse-shift pass above introduced, caught from a
screenshot showing the gap directly:** the spotlight's hole stayed put
while the tile shifted out from under it, since it was positioned once
from the trigger's own (unmoving) rect on `pointerenter` and never
updated again - the mouse-magnetic shift didn't exist yet when the
spotlight was first built, so nothing had a reason to keep them in sync
before this. Fixed by decoupling the two entirely: instead of the
spotlight computing a position itself, it now just mirrors whatever
`.gallery__placeholder`'s own `getBoundingClientRect()` reports, every
frame, via a `gsap.ticker.add()` loop started on `pointerenter` and
removed on `pointerleave`. Since `getBoundingClientRect()` reflects
whatever transform is currently applied regardless of which script
applied it, the spotlight now tracks the shift and its scale correctly
without needing to know anything about how the placeholder got there -
verified by comparing both rects directly after moving the pointer to
different corners of a tile, matching to well under a pixel each time.

**Scrolling while hovering a tile was "very buggy," per direct report -
root cause and the fix, discussed with the user before implementing.**
Every hover-driven effect (bob-pause, the mouse-shift, the custom
cursor, the spotlight) is wired only to `pointerenter`/`pointermove`/
`pointerleave`. Gallery's horizontal motion isn't driven by the mouse
though - it's driven by page scroll, via the pin+scrub - so scrolling
while the cursor sits still moves a tile out from under it without firing
any pointer event at all (the mouse itself never moved). Every hover
effect then stays frozen on stale geometry, and the spotlight in
particular visibly drifted away still glued to a tile that had scrolled
somewhere else.

Two fixes were on the table: (A) treat any scroll as an implicit
"stopped hovering" - clear whatever's active the instant scrolling
starts, nothing re-engages until a real pointermove says otherwise; or
(B) make hover fully scroll-aware - continuously re-derive what's
actually under the last-known cursor position during scroll and
synthesize proper enter/leave transitions as the answer changes. (B) is
the more "physically correct" version but meaningfully more code and
more edge cases (throttling, avoiding the cursor/spotlight's own
overlay elements, flicker on fast scrubs) for a benefit that mostly only
shows up if you're scrolling and hover-exploring at the literal same
instant. Went with (A) first, per direct instruction, with (B) left as
the fallback if (A) doesn't feel sufficient.

Implementation: a single `hoveredTrigger` reference, updated by one
small tracker block (separate from the four effects themselves, which
don't need to know about each other or about this). The pin's own
`onUpdate` - already firing every scroll tick for the progress bar -
dispatches a real `pointerleave` at whatever `hoveredTrigger` currently
points at. That reuses each effect's own existing cleanup logic instead
of duplicating four separate reset paths in one place - a synthetic
event dispatched via `element.dispatchEvent()` fires attached listeners
identically to a trusted one, so bob resume, the shift snapping back to
neutral, the cursor deactivating, and the spotlight's ticker stopping
all happen from that one dispatch. Verified directly: hovered a tile
(confirmed cursor + spotlight both active), scrolled without touching
the mouse, confirmed both deactivated and the tile's shift eased back
toward identity - not just assumed from the code reading right.

**One more small stacking bug, caught from a screenshot:** the custom
"View" cursor (`z-index: 5`) sat below the spotlight (`z-index: 50`), so
whenever the cursor circle overhung past a tile's edge - which is exactly
where it tends to sit, since it follows the pointer and the pointer is
often near an edge - the spotlight's box-shadow darkened that sliver of
the circle, reading as the cursor getting "cut off." Bumped the cursor to
`z-index: 55`, still under the lightbox's `100`.

**Gallery tiles overlap into a card-deck stack now**, per direct request
("make the images stack on top of each other while scrolling") - scoped
via three clarifying questions asked before touching anything: Gallery
only (not Selected Work too), a card-deck peel look (not a full-overlap
pile or a fanned cascade), and keeping the existing pin+scrub strip
rather than replacing its mechanism - the overlap happens tile-to-tile
within the strip, not as a separate scroll-position-driven "pile up at
the viewport edge" system (which would have been the more literal, but
much more complex and jank-prone, reading of "at the edges").

Each tile gets an increasing `z-index` (set server-side, per index, in
the markup - CSS alone can't generate an incrementing integer per item)
so later tiles are "dealt" on top of earlier ones, combined with a
negative `margin-left` on `.gallery__tile + .gallery__tile` (the sibling
combinator naturally excludes the "Scroll" hint before the first real
tile, which keeps its normal spacing) pulling each tile 24px into its
neighbor. `position: relative` on `.gallery__tile` is required for that
inline z-index to do anything at all - it's inert on a
statically-positioned element. A leftward `box-shadow` on
`.gallery__placeholder` originally sold the "resting on top of" read
here, but was dropped again on direct follow-up ("I don't like the
shadows") - the overlap and z-index ordering carry the stacking read on
their own without it.

Hovering a tile lifts its z-index to the top of the whole stack (folded
into the existing pointer-tracking block rather than a fifth separate
trigger loop), so a mostly-covered tile becomes fully visible and
clickable on hover instead of staying stuck under its neighbor - this
pairs naturally with the spotlight from an earlier pass (dims everything
else while one tile is "in focus"), reinforcing the same idea from two
angles at once. Restores each tile's own resting z-index on
`pointerleave` (captured once per tile up front) rather than clearing it
outright, which would leave the tile with no z-index instead of putting
it back in its place in the deck - and since the scroll-driven implicit
"unhover" from the previous pass already dispatches a real `pointerleave`
on whatever's hovered, this restoration falls out of that same mechanism
for free, verified directly (hovered a tile mid-deck, confirmed z-index
jumped to 100, scrolled without touching the mouse, confirmed it settled
back to its original index-based value rather than getting stuck at 100
or dropping to nothing).

**Gallery, card-deck stack v2 — the first version broke down past ~5
tiles, per direct report ("a huge distance once we reach over 5 ish
cards").** The first version froze the track entirely and gave each
tile its own fixed-endpoint tween onto tile 0's spot - which meant every
tile beyond whatever fit in one viewport-width's worth of the original
strip started out sitting far past the right edge, with nothing bringing
it closer until its own turn arrived, so getting there took a long
stretch of scroll with nothing visibly happening.

Fixed by bringing back the track's own continuous scroll-driven motion
(same as the section's very first pin/scrub pass, before any stacking
existed) and layering the "lock onto tile 0" behavior on top of it,
rather than replacing it. The whole thing runs off one continuous
per-tile formula evaluated in `onUpdate` (no more `tl.to()` calls with
fixed start/end values, which can't express "stay pinned regardless of
where the continuously-moving track currently is" - confirmed by
checking the GSAP docs' own behavior for function-based tween values:
they're only re-evaluated on `ScrollTrigger.refresh()`, not every scrub
tick, so they can't reference the track's live position either): tile 0
gets a local `x` that exactly cancels the track's own motion every tick
(`trackStartX - trackX`), which is what keeps it - and only it - visually
fixed at its starting screen position for the whole scroll, the one
anchor everything else piles onto. Every other tile rides along with the
track uncorrected until scroll progress reaches its own `arrival` value -
solved once, from the tiles' own static `offsetLeft` positions, as the
exact progress at which its natural track-adjusted position first
coincides with tile 0's fixed spot - at which point it switches to the
same compensation tile 0 uses, locking it at that same spot for the rest
of the scroll. Both branches agree exactly at `progress === arrival`, so
there's no jump the instant a tile locks in. Verified by sampling how
many tiles are on screen at 250px scroll intervals across the whole pin
range and confirming the count climbs steadily (6 → 7 → 8 → ... → 15,
one earlier check) rather than jumping or stalling anywhere.

The shrink/tilt on the tile being covered moved from a `tl.to()` slot to
the same per-tick model - interpolated linearly over a small `SETTLE`
window (2% of total progress) right before the next tile's `arrival`,
so it still eases in smoothly rather than snapping the instant a
threshold is crossed, just computed inline instead of via a timeline.

**Header gained a location/availability line** - per direct request, "a
classy and creative way to incorporate my location (belgium) and
'seeking internship february 2027'." Landed as a small mono line next to
the wordmark: `Laura Doolaege │ Belgium / Available Feb 2027`, separated
by a hairline rule rather than a status dot - CLAUDE.md's own quality
guardrails name "decorative status dots" specifically as something to
avoid, which rules out the single most common way sites signal "open to
work." The "/" is the header's own existing separator glyph (already
used between Work/About/Contact), reused here rather than reaching for
an em dash the same guardrails ban in copy. `.site-header__status` hides
below 640px (a `display: none`, not a truncation) - the mobile row is
already tight with the name, CV, and toggle sharing one line, and a quiet
secondary detail is what should give way first when space runs out, not
the primary nav or wordmark.

**Three direct follow-ups, same session: phone gets a plain gallery
again, the mobile menu centers, and the header status line's separator
changed.**

Phone specifically now gets the exact same static, native-scrollable
Gallery strip `prefers-reduced-motion` already used - not a smaller
version of the card-deck stack, "a regular scrollable gallery like
before." Two independent things needed fixing, because the stacking
pass added two independent mechanisms: the JS pin/scrub (now off on
phone via the shared `reduceMotion` flag, which folds in
`window.matchMedia('(max-width: 639px)')` alongside the OS-level
preference - every branch in the script already treats that flag as
"use the simple path," so this was a one-line change) and the CSS-only
visual overlap from the earlier card-deck pass (`.gallery__tile +
.gallery__tile`'s negative margin, which applies regardless of the JS
flag and needed its own reset - the existing mobile breakpoint's
`-1.5rem` value went back to `0`, falling back to the track's own plain
gap). Missing either half would have left phone either still pinning
and scroll-jacking, or visually overlapped without the JS mechanism to
justify it.

The full-screen mobile/tablet menu's Work/About/Contact links are now
centered (`align-items: center` on the column, `text-align: center` on
each link) instead of left-aligned within the centered panel - per
direct request.

The header status line's "/" is gone again - a direct follow-up that it
read as a navigation element, since "/" is already this same header's
own separator between Work/About/Contact, and reusing it for an
unrelated purpose a few pixels away created exactly the confusion that
risks. Replaced with a plain "|" (matching the wordmark/status divider
already used one hairline rule to the left) and a small location-pin
icon in front of "Belgium" (16x16, `stroke-width: 1.3`-adjacent weight
matching the site's other inline icons) - `Laura Doolaege │ [pin]
Belgium | Available Feb 2027`.

**Immediate correction to the phone-gallery fix above: "no stacking on
phone" didn't mean "no scroll-linked pin on phone" either** - direct
follow-up, "i still meant that on phone it scrolls on scroll." The first
attempt folded phone width into the same `reduceMotion` flag the OS-level
preference uses, which dropped the pin/scrub entirely in favor of the
plain native swipe-the-strip fallback - too much at once. Split into two
independent flags instead: `reduceMotion` (OS preference only, unchanged
meaning) and a separate `isPhone` (still `max-width: 639px`). The
`if (reduceMotion) {...} else if (isPhone) {...} else {...}` three-way
branch now gives phone its own middle path - the same page-scroll-driven
pin+scrub every other width gets (literally the pre-stacking-pass
mechanism, restored verbatim: `gsap.set(track, {x: startX})` then a
single `tl.to(track, {x: endX})` scrubbed across the pin), just without
the card-deck convergence logic the desktop/tablet branch layers on top.
Verified directly: at phone width, `.gallery__viewport--static` is no
longer added, the track's own computed `transform` changes as the page
scrolls (confirmed before/after a scroll), and consecutive tiles sit a
plain 24px apart with no overlap - the strip reveals by scrolling, same
as before any of the stacking passes, without literally reverting to a
swipe-only strip.

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
