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
SelectedWork, CurrentlyWorkingOn, Principles, Gallery, ContactCTA,
Footer (in that page order), and (About) AboutIntro, AboutStory,
AboutProcess, AboutDrives (in that page order). `AboutTools.astro` was
built and later removed outright once Tools moved to the homepage's own
Hero instead - see this file's later history for why. `HowIThink.astro`
was, separately, also built and removed outright per direct
request — see this file's own history below for why. Every other
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

Selected Work's project titles are real now (see this file's later
entry on that) - only the images (Selected Work and Gallery both) and
the exact "Currently working on" intro copy are still placeholders — see
each component's own header comment for what's a direct brief descriptor
vs. an invented structural stand-in.

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

**Hero gained a mobile-only echo of the header's location/availability
line** - per direct request ("on mobile formats, add the location and
available under the paragraph" naming the "I'm Laura..." intro copy).
Header's own `.site-header__status` already hides below 640px because
that row is already tight with the name/CV/toggle sharing one line - this
adds the same fact (icon, "Belgium | Available Feb 2027", same markup
shape) as a new `.hero__status` line directly under `.hero__intro` in
Hero.astro, shown only inside that same `max-width: 639px` breakpoint (a
plain `display: none` outside it, same "give way first" pattern already
used for the header version at that width). Verified directly, not just
assumed from the media queries: at 375px only the Hero copy is visible
(`getComputedStyle` on the header version reports `display: none`), and
at a real desktop width (1400px) only the header copy is visible (Hero's
reports `display: none`) - no width shows both or neither.

**Two direct follow-ups on the Hero bottom block: equal spacing around
the status tag, and the CTA button switched from a text link to a box.**
The status tag's margin-top (space-16, echoing the paragraph above) and
the CTA's own margin-top (space-48, unrelated to the tag) didn't match,
so the tag read as sitting closer to the paragraph than to the button
below it. Both are now `var(--space-24)`, verified via
`getComputedStyle` rather than eyeballing the rect (the raw
`getBoundingClientRect()` gap differs by a few px either side of 24,
which is just line-height/box differences between a `<p>` and a button,
not a real margin mismatch). Separately, "Get to know me" changed from
`variant="secondary"` (a quiet underline text link) to
`variant="primary"` (the hairline-box, fill-sweeps-in-on-hover style) -
per direct request that it match "the other buttons on the page," i.e.
the header's CV button and ContactCTA's own local copy of the same
style, both boxes. The mobile-only `!important` font-size override this
used to need (Button.astro's `.btn--secondary` rule outranked a plain
global class without it) is gone - `.btn--primary` already renders at
`--text-label` by default, so there's no specificity fight left to work
around; what's left of that override is just the margin-top equalization
above and the existing 44px touch-target min-height.

**Selected Work rebuilt around an asymmetric bento grid with real hover
micro-interactions, replacing the equal-width three-card rows** - per
direct, detailed request ("the selected work section needs work...
change the layout to something like [an Awwwards-style featured-card
bento]"). Both groups (Design and Experience) now use the same 7fr/5fr
device: the first project in each group's array is `featured` (a new
`ProjectCard` prop), spanning both rows of the wide column, with the
other two stacked in the narrow column - previously only the Experience
row broke from uniformity (a single nth-child stagger), so this is both
a bolder move and a more consistent one, applied identically to both
groups rather than singling one out. The old `--design`/`--experience`
grid modifier classes and the stagger hack are gone, replaced by three
plain `:nth-child` position rules shared by both grids.

Getting the featured card to actually fill the bento cell's height (not
just its own aspect-ratio) needed `grid-auto-rows: auto` on the grid
(not an explicit `1fr 1fr`, which needs a definite container height to
mean anything) plus a `min-width: 900px` rule in `ProjectCard.astro`
itself: past that width, `.project-card--featured` becomes a flex column
with `height: 100%` and its frame set to `flex: 1 1 auto; aspect-ratio:
auto` instead of holding a fixed ratio - so it stretches to match
whatever height the two stacked cards on its own row happen to produce,
rather than dictating a height of its own that they'd then have to
match. Below that width (mobile/tablet portrait), the grid itself falls
back to a plain single-column stack (`grid-template-columns: 1fr`) and
the featured card is just a normal stacked card with a bigger title -
flagging this rather than silently deciding it, per PROJECT_BRIEF.md
Section 8's "mobile fallback for macro asymmetry" being an explicitly
open decision: this reuses the same "asymmetry drops to an equal stack
below a width threshold" pattern already established for AboutDrives'
scattered cards and Hero's own grid, not a new one invented for this
component.

`ProjectCard.astro` itself picked up a real card shell it didn't have
before, per direct feedback that the section needed better hierarchy
("make them feel more like cards"): previously the image, dashed stub,
and info block sat loose in the anchor with no unifying edge, reading as
three stacked parts. Now the whole card is one bordered, backgrounded,
radius'd box (`overflow: hidden`, so the image's top corners inherit the
card's own radius for free instead of needing one of their own), with
the stub/tag/title padded into a `.project-card__body` instead of
floating directly in the anchor. The old fade-in text link ("[ view
project -> ]") is gone, replaced by a circular arrow badge pinned to the
image's bottom-right corner - hairline outline at rest, filling solid
ink (the arrow flips to the porcelain background color via `currentColor`)
on hover/focus, the same fill-sweep visual language `Button.astro`'s
primary variant already uses elsewhere on this page, just circular. That
badge is the card's one "go" affordance now; keeping the old text link
alongside it would have meant two competing CTAs doing the same job.

The other three requested micro-interactions layer on top without
touching how the mouse-magnetic image shift already works (unchanged
from an earlier pass, still gated on `prefers-reduced-motion` +
`pointer: fine`, still only ever writing to `.project-card__image`'s own
transform): the whole card lifts (`translateY(-6px)`) with a soft
`box-shadow` and its border darkens to ink on `:hover`/`:focus-visible`,
plain CSS transitions on `.project-card` itself, an element the
mouse-shift script never touches, so there's no risk of the two systems
fighting over the same property (the same reasoning already documented
elsewhere in this file for why GSAP and static CSS can't both own one
element's `transform`). The title-to-accent-color hover was already
implemented from an earlier pass and needed no change. On touch,
everything gated on `pointer: fine` simply doesn't run - no separate
opt-out was needed, since that gate already existed - and the CSS
`:hover`/`:focus-visible` rules still give a plain functional response
via tap-and-hold, same "reduced-motion/no-JS fallback stays useful"
principle used throughout this file. Verified in the browser at both a
1400px and a 375px viewport: the bento grid and the flex-stretch
featured card render correctly above 900px, the plain single-column
fallback (with the featured card's title still visibly larger) renders
below it, and a real hover on a card shows the lift, the border going to
ink, the arrow badge filling solid, and the title switching to accent -
not just assumed from the CSS reading right.

**A real bug in the Hero status tag, caught on certain screen widths
only:** direct report that "the belgium and available" line sometimes
sat next to the CTA button instead of above it. Cause: `display:
inline-flex` on `.hero__status` (needed for the icon+text row inside it)
is an inline-level _outer_ display, not a block one - inside
`.hero__bottom`'s mobile `display: block` layout, an inline-level
element doesn't get its own line, it just joins the inline flow beside
the next inline-level sibling, which here was `.hero__cta` (itself
`display: inline-flex` via `Button.astro`'s `.btn`). At any width wide
enough for both to fit side by side, that's exactly what rendered - the
tag and the button on one line. Below that width they still wrapped
separately (two inline boxes that don't both fit share a line box but
break across it like text would), which is why the bug only showed up
"on certain screen sizes" rather than always. Fixed the same way
`.hero__role-soft` one rule up already solves an identical problem:
`display: flex` (block-level outside, flex inside) instead of
`inline-flex` - the icon/text row layout is unaffected, only the outer
box type changes, plus `width: fit-content` so it doesn't stretch to the
full row now that it's block-level.

Also on the same block: `.selected-work__group-label` ("Design:
individual work" / "Experience design: group projects") now matches the
Belgium tag's own fine-print weight - `--text-label` (12px) and
`--color-text-secondary` instead of `--text-nav` (14px) and full ink -
per direct request to put it "in the same fine font as the belgium tag."

**Gallery: the card-deck stacking is gone, restoring the plain
scroll-linked reveal; the progress line grows from the left again and
gained flanking tile-count labels** - two direct follow-ups. On
stacking: the `else if (isPhone) {...} else {...}` split that used to
separate "plain strip" (phone) from "card-deck convergence" (desktop/
tablet) collapsed back into one branch, since removing the stacking
meant both were already the same code - tile 0 no longer needs to
cancel the track's own motion to stay pinned, nothing needs a computed
`arrival` progress, and nothing shrinks/tilts as a neighbor arrives. The
per-tile server-side `z-index` (in the markup) and the negative
`margin-left` overlap (`.gallery__tile + .gallery__tile`, both the
desktop value and the phone-only reset back to 0) are gone too - with
tiles no longer overlapping, there's nothing left for either to do. The
hover block that used to lift a covered tile's z-index above its
neighbors on `pointerenter` and restore it on `pointerleave` lost that
half as well; it still tracks `hoveredTrigger` (needed so the pin's own
`onUpdate` can dispatch a synthetic `pointerleave` when scroll moves a
tile out from under a stationary cursor - unrelated to stacking, so this
part stayed).

On the progress line: it went back to `transform-origin: left` (a
previous pass had changed this to `center`, growing the bar outward both
ways - per direct request, reverted). Separately, per a reference image
showing a timeline with year labels flanking a line and a bolder
highlighted sub-segment, the progress line gained the same structure:
`1` and `{TOTAL}` (Astro's own `TOTAL` constant, not hardcoded, so it
stays correct if the tile count ever changes) now flank a new faint
full-width `.gallery__progress-track`, with the existing
`.gallery__progress-bar` drawn over it as the solid segment tracking
actual scroll progress - same `--color-text-secondary` this already
used, per direct request to keep it "still black like it is now" rather
than adopting the reference image's gold. Verified in the browser, not
just from the CSS: at 1400px the tiles render with even, non-overlapping
gaps (no stacking), and the progress bar's computed `transform` mid-scroll
showed a partial `scaleX` with `transform-origin: 0px` (left), not
center.

**New homepage section, `Principles.astro` - "3 design principles" sitting
between Hero and Selected Work, "in a really subtle fashion,"** per direct
request. The content is deliberately not new copy: it's the same three
sentences as About's own "How I work" section (`AboutProcess.astro`),
reused verbatim rather than rewritten or summarized, per this project's
"no fabricated copy" rule - the user's own framing was "the 3 principles
are the content from 'How I work' - the title just needs to change as
well as the layout and position." So the title changed (a small "Approach"
mono kicker, not "How I work" a second time - see below for why it's not
even a real headline), and the layout/position are new (a quiet
three-column strip before Selected Work, not About's larger prose block).

Two structural decisions kept this genuinely subtle rather than "a
smaller version of a normal section": it sits entirely outside the
numbered `SectionMarker` rhythm (Selected Work is "02," Gallery "03," and
so on) rather than claiming "02" and bumping every numbered section after
it by one - renumbering the whole site wasn't asked for, and a numbered
running-head would also make it read as a peer to the sections it's
meant to quietly precede. And it skips the display-font headline
entirely: Barlow Condensed is the homepage's one-headline-anchor type
(PROJECT_BRIEF.md Section 3, "never split attention between two competing
headlines"), already spent on Hero's "PORTFOLIO" - giving this section
its own big headline would compete with that rather than stay quiet. Both
the kicker and the three lines are mono/body type only, sized and colored
to read as fine print (`--text-label`/`--text-caption`, both
`--color-text-secondary`), the same register the header/hero status tag
already established elsewhere on this page.

Layout: three columns with hairline dividers between them (`border-left`,
skipped on the first item so the row doesn't open with a stray rule),
collapsing to a single stacked column with horizontal dividers - same
device, rotated 90 degrees - below 900px. Entrance motion is a single
plain fade/rise on the whole block, no stagger or per-element
choreography, since drawing attention to itself would defeat the point;
every other homepage section with motion gets its own distinct reveal; a
uniform "smaller version of AboutDrives' card settle" or similar would
also have been the wrong instinct here. Verified in the browser at both
1400px (three columns, vertical dividers) and 375px (stacked, horizontal
dividers, still legible at the small caption size).

**Selected Work rebuilt a second time in the same session - the bento
from the earlier pass is gone, replaced by an expanding accordion strip.**
Direct follow-up feedback: "Im not fond of the current layout for the my
works section. I would like something that expands," and when asked to
choose between a few concrete readings of "expands," picked the
Awwwards-style version - a row of narrow panels, one growing to take most
of the row on hover/focus while its siblings compress. Both groups
(Design, Experience) use the same device, continuing the pattern the
bento itself established (one asymmetric device shared by both groups,
not one singled out).

Mechanism: a fixed-height flex row (`height: 30rem`, so the row reads as
one steady object while only each panel's width share changes) where
every `<li>` starts at `flex-grow: 1` and steps up to `flex-grow: 6` on
`:hover`/`:focus-within`, transitioning `flex-grow` itself rather than
`width` - no JS, no per-panel measurement needed for the expand/contract
motion itself. `ProjectCard.astro`'s own now-unused `featured` prop (and
its CSS) was removed rather than left dead - an accordion has no "lead
item" concept, every panel is equal until hovered, so there was nothing
left for it to do. The collapsed/expanded look is applied entirely from
`SelectedWork.astro`'s own stylesheet via `:global()` overrides scoped
under `.selected-work__accordion`, not by adding accordion-awareness to
`ProjectCard.astro` itself - that component stays the plain, generic
ticket-card module the brief specifies, unaware that this one section
reshapes it. This is a deliberate, repeatable pattern now (the bento did
the same thing with its own `:global()` overrides before this replaced
it): section-specific layout presentation lives in the section, the
reusable card component itself never grows section-specific modes.

Collapsed panels have no room for the card's normal horizontal title/tag/
year row, so `.project-card__title` rotates to `writing-mode: vertical-rl`
(a spine label running the height of the panel) and `.project-card__stub`/
`.project-card__meta` (the dashed rule, tag, year) are hidden outright
rather than shrunk into something illegible - the number and arrow badges
stay, since both are already small and legible at any width. Hovering
reverts all of it: title back to horizontal, stub/tag/year back, body
padding back to the card's usual `--space-24` inset. Below 900px (no
touch equivalent for hover-driven expansion, same reasoning already used
for the bento and for AboutDrives/Hero's own asymmetry before it) this
drops to the plain equal-width stack of upright cards that's been the
mobile fallback in this section since the bento pass - unchanged.

Verified in the browser: at rest all panels in a row measure equal
widths (~363px each in a 1120px-wide, three-panel row); a genuine
pointer hover (not a synthetic dispatch, which doesn't trigger CSS
`:hover`) showed one panel expanded with its arrow badge filled solid
and its title horizontal while its siblings stayed narrow with vertical
titles; and at 375px the accordion drops to `display: grid;
grid-template-columns: 1fr` (no flex row, no hover mechanism at all).

**A large, multi-part follow-up pass** - one message, several distinct
direct requests, covering Hero, Selected Work, a new page reorder,
Principles, Gallery, and a new shared motion token.

Hero lost its third tag ("Motion Design" - two tags now, "UX /
Experience Design" and "Digital Design"). Nothing else in the file
assumed a specific tag count, so this needed no other changes.

**Homepage reordered and "How I think" removed outright**, both per
direct request: Selected Work now leads (numbered "01," was "02"),
Currently Working On moved to sit directly below it, then Principles,
then Gallery, into ContactCTA/Footer - see `index.astro`'s own comment.
"How I think" (`HowIThink.astro`) is deleted, not just unrouted - "i do
not need it anymore" - but its three short principle titles
("Understand before designing" / "Creative, but defendable" / "Make it
make sense") were folded into Principles.astro first, per the same
message ("add the titles from the last section... to the 3 design
principles"), paired in order with Principles' existing three process
sentences rather than re-authored.

Principles itself changed from a deliberately unnumbered "Approach"
aside (see its own earlier entry in this file) to a real numbered
kicker, "( 02 ) My design principles" - exact text per direct request -
still in the small mono kicker style rather than promoted to a full
`SectionMarker` h2 (Barlow Condensed stays Hero's one-headline-anchor
type). This created a numbering puzzle: Selected Work is "01," this is
"02," but Currently Working On now sits physically between them
("directly below the selected works," a separate direct request). Rather
than let the page's numbered sections read out of order (01, 04-or-
whatever, 02, 03), `SectionMarker.astro`'s `index` prop became optional -
CurrentlyWorkingOn dropped its own number in the move instead of forcing
it into the sequence, so the numbered running-head (01 Selected Work, 02
Principles, 03 Gallery, unchanged) still reads as a clean ascending
sequence with Currently Working On as a quiet, unnumbered aside in
between - the same role Principles itself used to play before this pass.

**A shared "smooth transition" seam, Gallery/Principles (porcelain) into
ContactCTA (dark-field)** - per direct request ("make a smooth
transition in the page between the design principles, gallery and
contact me/footer"). Principles and Gallery already share the plain
porcelain page background, so the one real color seam left is Gallery
into ContactCTA's dark-field. Fixed with a porcelain-to-transparent
`::before` gradient painted over ContactCTA's own top ~8rem - a
positioned pseudo-element paints after its parent's own solid
background-color (CSS painting order), so the gradient sits visibly on
top of the dark-field without a second wrapper element. Only the two
already-locked tokens (bg-primary, dark-field) are used, no new hue.
`.contact-cta__inner` picked up an explicit `position: relative; z-index:
1` so its text/button paint above the gradient rather than being caught
in the same "positioned descendants" paint step as the pseudo-element.

**Selected Work's accordion got shorter and the harsh-hover fix that
started here spread sitewide.** Per direct feedback ("now they are quite
tall on desktop... make cards more rectangular, horizontal, shorter"),
the accordion's fixed row height dropped from 30rem to 18rem - same
flex-grow mechanism, just a shorter, more landscape-proportioned strip.
Separately, per "the movement in the work cards is very harsh, make it a
soft, tactile glide, and add that improvement to the buttons on the page
as well," a new `--motion-easing-soft` token
(`cubic-bezier(0.22, 1, 0.36, 1)`, global.css) replaced the plain
ease-out `--motion-easing` on every hover/press transition this pass
touched: `ProjectCard.astro`'s card lift/border-color/arrow/title,
`Button.astro`'s color/fill-sweep/new press transform (both variants,
via the shared base `.btn` rule), `ContactCTA.astro`'s own local copy of
that button style, the Selected Work accordion's own flex-grow
transition (already using this exact curve as a hand-typed literal - now
references the token instead), and Header's mobile nav panel entrance
(same reasoning - promoted the curve to a real token now that a fourth
place wants the identical value, rather than a fourth copy-pasted
cubic-bezier literal). `ProjectCard.astro`'s hover box-shadow is gone
outright too, per the same feedback ("remove the drop shadow") - the
lift and the border darkening to ink already carry the "this one's
active" read without it.

**Gallery's progress line gained a second, thicker mark riding on top of
the existing fill bar** - per direct request for "a subtle thicker line
on top of the gallery progress bar, to show more or less where in the
collection you are." A new `.gallery__progress-thumb`, sized to roughly
`viewport.clientWidth / track.scrollWidth` (how much of the collection
is visible at once, clamped to [8%, 90%] so it never collapses to
nothing or balloons to the full track) and positioned at
`progress * (1 - ratio)` along the track - a classic scrollbar-thumb
calculation, computed fresh on every tick alongside the existing fill
bar rather than once, since the ratio can shift on resize. Both the fill
bar and the new thumb are now driven by one shared `setProgress()`
helper (previously the fill bar's `scaleX` was set inline at each of the
two call sites - the reduced-motion static-scroll listener and the
pin's own `onUpdate`) so the two mechanisms can't drift out of sync with
each other.

Verified in the browser (a fresh tab, after finding the original one was
serving a stale cached script from before a mid-session server restart -
not a real bug, just a caching artifact of restarting the dev server
under an open tab): the reordered sections measure in the requested
order via `getBoundingClientRect()`; Selected Work reads "( 01 )";
Currently Working On has no index span at all; Principles reads "( 02 )
My design principles" with all three reused titles present; the
accordion still expands correctly at its new 18rem height with no
box-shadow; the progress bar and thumb both update in tandem during a
real scroll (`scaleX` and `left`/`width` moving together, not just
assumed from the code); and the ContactCTA gradient is visible as a
soft lightening at the very top of the dark section rather than a hard
cut from Gallery's porcelain.

**Four more direct follow-ups on the previous pass: black progress
indicator, real project titles revealed on hover, and the ContactCTA
gradient reverted.**

Gallery's progress bar (`.gallery__progress-bar`) switched from
`--color-text-secondary` to `--color-ink` - "make the progress bar
indicator black," and ink is this project's actual black token. The
thinner "you are here" thumb from the previous pass was already ink-
colored, so only the fill bar itself needed the change.

**Real project titles landed** - the first non-placeholder content
Selected Work has had. Per direct message: Design group is "Nine to
Thrive" / "Miles and Meals" / "Kickstarter: Izumi"; Experience group is
"A Space Journey through Screentime" / "Nexxus" / "Plan A". But the
generic "Project N" label stays what's visible at rest - "keep the
titles as project 1 in the initial state but on hover give the full
project title" - so `ProjectCard.astro` gained an optional `fullTitle`
prop: two stacked spans inside `.project-card__title`
(`.project-card__title-rest` / `.project-card__title-full`), a plain
`display: none`/`display: inline` swap on `:hover`/`:focus-within`, not
an opacity cross-fade - cross-fading would mean both strings briefly
occupy layout at once, and "Project 01" next to "A Space Journey through
Screentime" are wildly different lengths, so the invisible one would
still reserve space for whichever is longer. `display: none` removes it
from layout entirely instead. The anchor's own `aria-label` now prefers
`fullTitle` when present, since that's the actually meaningful
description regardless of what's visible before hover. `SelectedWork.astro`'s
own `design`/`experience` arrays each gained a `fullTitle` field: this
was silent-content-decision territory before ("use clearly-labeled
placeholders... until real assets are supplied," CLAUDE.md "Content") -
now real, supplied directly, so used verbatim rather than paraphrased.

**The ContactCTA gradient from the previous pass is gone again** - "remove
the awful fade at the bottom of the page with the footer." The
underlying ask behind it (Principles/Gallery/ContactCTA reading as
flowing into each other, not cutting) is still open per the same
message ("but we will find a fix for that later") - explicitly not
re-attempted with a different technique in the same breath; `ContactCTA.astro`
is back to a plain solid `dark-field` background, and the
`.contact-cta__inner` `position: relative; z-index: 1` that only existed
to layer content above that gradient came out with it.

**A large `/impeccable`-driven redesign pass, spanning both pages** - one
message covering several distinct direct requests plus an open-ended
"upgrade the about page... give both pages that extra awwwards feel"
brief with reference imagery (Loop, Tsunami Solutions, Craig Reynolds,
Acne Studios, a 3D-skills report), explicitly not to be copied literally
but used for inspiration on layout/imagery/motion. Header and Hero's
core layout were explicitly out of scope ("does not need to be touched
for now" / "the main layout will also remain the same").

**ProjectCard's title reverted from hover-reveal to always-visible** -
"the full project title should be visible at all times instead of just
on hover," directly reversing the previous pass's own explicit request.
The two stacked `.project-card__title-rest`/`-full` spans and their
display-swap CSS are gone; the component just renders `fullTitle ?? title`
once, always. This mattered most for the Selected Work accordion's
collapsed, rotated spine label, which surfaced a real bug once real
(long) titles had to render there unconditionally instead of a short
"Project N" placeholder: with no explicit height on the title, the
browser let the vertical text run as long as it needed rather than
wrapping into new columns, which on the longest title ("A Space Journey
through Screentime") squeezed `.project-card__frame` down to ~44px tall
on that one card while its shorter-titled siblings kept a normal,
balanced frame/body split - each card looked like a different
proportions system depending on its own title length. Fixed by giving
`.project-card__body` a fixed `flex: 0 0 9rem` (not content-driven) and
the collapsed title an explicit `height: 7rem` - in `writing-mode:
vertical-rl`, `height` maps to the _inline_ size (block flows
horizontally), so an explicit value is what actually forces the wrap
into additional narrow columns instead of one arbitrarily tall one.
Verified directly: all six collapsed cards now measure an identical
142px frame / 144px body split regardless of title length, and the long
title itself wraps into three ~19px columns rather than overflowing.

**Section subtitles made consistent site-wide, per direct request**
("small number indication and bigger bolder font for the title, like it
already is on the homepage for selected work and gallery"). Two
sections had drifted from the shared `SectionMarker` device
(mono index + bold Barlow Condensed h2) for reasons that made sense in
isolation at the time but broke consistency once asked for directly:

- `Principles.astro` had been deliberately built as a small, unnumbered
  mono kicker (see its own earlier entries in this file) to stay a
  "quiet aside." That reasoning is retired now that site-wide
  consistency was explicitly asked for - it renders a real
  `SectionMarker` (`index="03"`, `label="My design principles"`) like
  every other section, with standard `--space-section` padding instead
  of its own smaller clamp().
- `CurrentlyWorkingOn.astro` had dropped its own index in an earlier
  pass specifically to keep the numbered sequence from reading out of
  order once it moved to sit between Selected Work and Principles. With
  Principles now numbered "03" instead of literally "02," that
  constraint is gone - Currently Working On reclaimed `index="02"`, and
  the full sequence (Selected Work 01, Currently Working On 02,
  Principles 03, Gallery 04) now reads as a clean ascending sequence by
  physical page order, with no unnumbered exception anywhere.

**Currently Working On and Principles both got a redesign pass of their
own**, per direct feedback that "for all other sections im not 100%
pleased... they feel too stale or too condensed": Currently Working On
gained an image placeholder per item (previously two lines of text
alone in a wide empty row) and its first-ever entrance motion (a plain
staggered settle - it had none before at all). Principles' item titles
moved from a small mono line to the same bold Barlow Condensed treatment
as the rest of the site's item titles, and gained their own entrance
stagger. `ContactCTA.astro` (shared by both pages) also gained an
entrance reveal - headline then button, a beat apart - since it had no
motion of its own before either.

**Hero gained a second image placeholder, per direct request ("maybe
just think to add more images or some animation there to the current
image")** - `.hero__image-chip`, a smaller tilted collage element
overlapping the main portrait's lower-left corner. Grid-placed (an
overlapping `grid-column`/`grid-row` range on `.hero__visual`, layered
via `z-index`) rather than absolutely positioned, so it tracks the
responsive column widths for free instead of needing a hand-computed
offset - and hidden outright below 1024px rather than repositioned,
since re-tuning a decorative collage overlap for every breakpoint wasn't
worth the complexity. It fades in with the rest of the entrance
timeline, then picks up a slow, continuous 8px idle float once that
settles (`repeat: -1, yoyo: true`, prefers-reduced-motion gated) - the
same kind of deliberate, informed "locked-rule exception for a genuine
ambient loop" already documented elsewhere in this file for the Gallery
tiles' own continuous bob, not an oversight.

**About page: a real content-driven redesign, not a re-skin** - the
direct instruction was to "really read the content... and understand
the story, then proceed to convey that story in the layout," so each
section's own copy shaped what changed, not a uniform template applied
four times:

- **AboutIntro** gained this page's first image placeholder - a
  portrait, tilted, with the existing terracotta footnote card now
  overlapping its lower-right corner instead of sitting in its own
  clear column - the two read as one small pinned collage. A real bug
  here, caught by screenshot at 375px and not by the 1023px breakpoint
  check alone: the mobile override set the aside's `max-width` to
  `none`, so on a narrow viewport the portrait stretched to the full
  content width at its 3:4 aspect ratio (~450px tall) and the modest 2°
  rotation read as a heavy, skewed diagonal at that size. Fixed with a
  real mobile max-width (14rem) instead of removing the constraint.
- **AboutStory** ("How I got here") gained a documentary-style image
  placeholder sitting in the two grid columns the pull-quote's own
  `1 / 11` span already leaves open on the right - both explicitly
  `grid-row: 3` so they share a row instead of the image falling to its
  own line below.
- **AboutProcess** ("How I work") was the biggest change: it was
  deliberately the one still, imageless section on this page before (a
  considered choice at the time - a page needs a quiet beat). Once every
  other section gained placeholders and motion of its own, "quiet" had
  drifted into "underbuilt," per the same "too stale" feedback. It now
  has a small scattered collage of three image placeholders next to the
  text - a literal visualization of the copy's own language ("paper,
  whiteboards, sticky notes, messy diagrams"), not decoration for its
  own sake - with a settle-in stagger reusing AboutDrives' own rotational
  device (tilted, easing into a resting angle) rather than inventing a
  third animation recipe on one page.
- **AboutDrives** ("What drives me") is unchanged beyond its `index`
  moving from "04" to "05" to make room for the new section below.

**New section, `AboutTools.astro` ("Tools I work with," index "04"),
placed directly after "How I work"** - per direct request: "at some
point, I will have to also tell them what tools I use... think of a way
to show it, use your judgement to add it to a section that makes sense
for recruiters." Placed right after the process section specifically so
a recruiter reading About encounters it while process/fit is still the
active question, not tacked onto the very end of the page. No real tool
list was supplied - "I will have to also tell them" describes a future
action, not content given now - so this ships as a real, working,
three-category grid (Design / Prototyping & motion / Development) of
clearly-placeholder `Tag.astro` chips (`[ Tool ]`, repeated), the same
"real placeholder, not invented content" rule this project already
applies to project titles/images (CLAUDE.md "Content"). A code comment
marks exactly where to swap in the real list; the layout doesn't need to
change when that happens.

**Another large follow-up pass on Selected Work, the homepage's section
weight, and Tools' final home** - several distinct direct requests in
one message, plus a reference screenshot (a friend's site: name/intro on
the left, a small icon row labeled "Tools:" and a career timeline on the
right) used for inspiration on the icon treatment and placement, not
copied wholesale.

**The accordion's expansion is less dramatic now** - "I don't like how
dramatically the project cards stretch, my images will not be that big."
The hovered/focused panel's `flex-grow` dropped from 6 to 3 (roughly 3/5
of the row instead of 6/8), a smaller, more proportionate reveal that
still reads as an accordion without ballooning as far.

**The arrow moved off the image and became the cursor** - "the arrow
should appear as the cursor upon hovering a project. For screens where
hover states do not apply, add it at the bottom right of the card, on
the same line as the title." `ProjectCard.astro`'s old circular badge
(floating over the image, filling solid on hover) is gone; the arrow now
sits inline at the end of `.project-card__title-row`, next to the title
text, and is hidden outright under `(hover: hover) and (pointer: fine)`

- on a device with real hover, `SelectedWork.astro` gained its own
  cursor + spotlight, adapted directly from Gallery.astro's already-proven
  version (same two-element cursor split so GSAP's x/y positioning and the
  CSS scale/opacity toggle never fight over one element's `transform`;
  same box-shadow-cutout spotlight, reused per direct request - "the same
  fading effect you applied to the gallery on hover, should be applied to
  the project cards"). Both live in `SelectedWork.astro` itself, not
  `ProjectCard.astro`, matching this project's established pattern of
  keeping section-specific interaction out of the generic, reusable card
  component.

**Each group label gained a fine line beside it** - "make... look more
delicate with a little fine line next to it" - `.selected-work__group-label`
is now a flex row (label text + a thin, low-opacity rule filling the
remaining width) rather than plain standalone text.

**Design: individual work / Experience design: group projects now sit
behind a real pop-open disclosure** - "so the user doesn't feel like
they have to scroll endlessly at once." Each group's label became a
button (a plus that rotates into a minus) toggling a height-animated
panel below it. Renders fully open in plain HTML/CSS - `aria-expanded="true"`,
no inline hidden styling - so the projects stay reachable if this script
never runs (the same "if JS fails, everything still renders in its
final, reachable position" principle Hero's own entrance animation
already documents); the script collapses both panels once it runs,
using GSAP's native support for animating to `height: 'auto'` (it
measures the natural height, then tweens toward it) rather than a
hand-guessed max-height.

**Currently Working On demoted back to a small, unnumbered aside** - "the
currently working on should not be a major section as it is now, rather
a little sneak peek to what I'm up to." Its own recent promotion to a
full numbered section (image grid, `--space-section` padding, its own
`SectionMarker`) is reverted - no images, no big title, just the wink
line and the two items as a plain inline list, back to
`clamp(2.5rem, 5vw, 3.5rem)` padding. This reopened the same numbering
question its own earlier promotion had closed: with it unnumbered again,
`Principles.astro` and `Gallery.astro` both had their own `index` moved
back down (03→02, 04→03) to close the gap, so the visible numbered
sequence (Selected Work "01," Principles "02," Gallery "03") still reads
as a clean ascending sequence with no unnumbered section awkwardly
sitting mid-sequence.

**Tools moved off the About page entirely, onto the homepage, as a
plain icon row** - "the tools can be just icons like in this example...
I think I should include them at the top of the page close to the
experience designer to-be paragraph." `AboutTools.astro` (the bracket-tag
chip version from the previous pass) is deleted outright, not just
unrouted - About's own numbering closed back up (Process "03," Drives
"04," was "05"). A new `.hero__tools` block landed in `Hero.astro`
instead, sharing row 1 with `.hero__role` via the grid's own row-sparse
auto-placement (`.hero__role` only claims columns 1/6, leaving 8/13 open
in that same row for `.hero__tools` to land in without an explicit
`grid-row`). Still placeholder - five plain gray squares, no real tool
icons or confirmed toolkit yet, same "real placeholder, not invented
content" rule as before, just restyled to plain icons instead of
bracket-tag chips per the reference image's own visual language (no real
brand logos used - we don't have those assets, and the reference was for
layout/style inspiration, not literal tool confirmation).

**Two more direct follow-ups: Selected Work's group labels/default-open
state, and a chapter/zigzag redesign of About's "How I got here."**

Group labels shortened again - "change the title from design: individual
work to simply individual work with the number of projects stated, same
applies for experience design." `SelectedWork.astro`'s two labels are now
plain "Individual work" / "Group projects," each with `({design.length})`/
`({experience.length})` in parens right after - read from the array's own
length, not a hand-typed number, so it can't silently drift if a project
is ever added or removed. Separately, "have the first one popped open by
default": the disclosure-collapse script now skips the first
`.selected-work__toggle` (`index === 0`) entirely, leaving it
`aria-expanded="true"` with `height: 'auto'` instead of collapsing it
like the second - the page no longer opens with zero projects visible.

**AboutStory.astro's "How I got here" is no longer one straight column** -
per direct request ("add subtitles and subtle delicate chapter names to
make the story feel more like a story... does it have to be straight up
and down or do we travel across the page gently"). The five paragraphs
(plus the closing two) are now five small "beats," each with a delicate
chapter caption above it - a plain mono index plus an italic body-font
name (deliberately not Instrument Serif, which stays this page's one
italic moment, spent on the pull-quote alone) - and each beat's own
`grid-column` range alternates between two positions (`2 / 8` and
`4 / 10`), both narrower than the quote's own `1 / 11` break so nothing
competes with it; the closing beat after the quote gets a third, smaller
shift (`3 / 9`) that reads as the drift settling back down rather than
snapping to an earlier position. Removing the quote/image's own
hardcoded `grid-row: 3` (a relic from when there were only two elements
before them) was necessary, not just simplification - with four beats
now ahead of them, that row number would have been wrong; letting the
grid's own row-sparse auto-placement figure it out instead happens to
still land the image in the same row as the quote (it fits neatly in
the two columns the quote's own `1 / 11` span leaves open), so the
visual result is unchanged. Falls back to a single straight column below
1024px, same "macro asymmetry drops at a width threshold" pattern used
everywhere else in this project - a zigzag reading path needs room to
zig. The copy itself is untouched, split only at its own existing
sentence/paragraph breaks - no line was rewritten to make the five-beat
grouping work, and the chapter names are new structural captions
(objective one/two-word labels), not new claims put in her own voice.

Verified in the browser: Selected Work's first group renders open by
default with the second collapsed, and a genuine hover on one of its
cards showed the spotlight dimming the rest of the page and the custom
arrow cursor active at once (resolving the "couldn't get a reliable
hover in this sandbox" caveat from the previous pass's summary - this
time it triggered from a real interaction, not a leftover mouse
position). AboutStory's beats visibly alternate left/right down the page
at 1400px and collapse to one straight column at 375px, with the chapter
captions still legible at both widths.

**Selected Work's spotlight removed, and the accordion stretch toned
down a third time.** Two direct follow-ups in one message: "I dont want
the spotlight anymore for selected works you can remove it" and "the
stretching of the cards still feels too plastic and extreme for my
brand."

The spotlight (the box-shadow-cutout dim effect adapted from Gallery's
own, added two passes ago) is gone outright - the markup
(`.selected-work__spotlight`), the script's `syncSpotlight`/ticker/
class-toggling, and its CSS all removed rather than just disabled. The
custom arrow cursor stays; only the spotlight half of that pass is gone.

On the stretch: `flex-grow: 3` (already once reduced from `6`) still
read as "too plastic and extreme." Rather than just picking a third,
smaller number, the actual cause got named this time: a fixed-height
(`18rem`) row with a `flex-grow`-driven width change is, mechanically,
one rectangle's aspect ratio being pulled sideways every tick of the
transition (height pinned, width changing) - that distortion is what
reads as "plastic" regardless of how far it goes, since a real photo
cropped to one shape stretching toward a very different one never looks
like a considered reveal. The fix: `flex-grow: 1.6` (hovered card ~44%
of the row instead of ~60%, versus ~33% at rest for all three), and the
transition slowed from `0.6s` to `0.8s` so the motion itself reads
calmer, not just smaller. Verified in the browser: a genuinely hovered
card measured 483px against 302px siblings (was 634px/326px at
`flex-grow: 3`) - a real, confirmed reduction, not just a smaller number
in the source that might not have translated to a visibly calmer effect.

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
