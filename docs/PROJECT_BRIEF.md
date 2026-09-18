# PROJECT_BRIEF.md

Handoff document for implementation. This is a design/architecture reference, not a spec to code from blindly, since several sections below are explicitly marked PROPOSED or OPEN and still require approval before being built.

---

## 1. PROJECT OVERVIEW

**Purpose**
A personal portfolio website for Laura, a digital development & design student with a background in marketing communication, currently specialising in UX / experience design. Primary purpose: let recruiters and hiring managers quickly understand her process, taste, and credibility, and get to her CV or contact details fast.

**Overall concept**
"Contemporary editorial design with a tactile, human edge." A structured visual system inspired by independent magazines, art books, architecture, photography and modernist graphic design, with occasional raw, human interventions to keep it from feeling sterile. The site should feel like contemporary printed matter translated into digital form: precise without being sterile, experimental without becoming chaotic, personal without becoming decorative.

**Intended audience / context**

- Primary: recruiters / hiring managers scanning quickly, evaluating both craft and thinking.
- Secondary: peers, collaborators, potential clients for freelance/group work.
- Context: portfolio site, not a product marketing site. First 5 seconds should communicate scale → typography → composition → imagery before UI chrome.

---

## 2. CREATIVE DIRECTION

**Core aesthetic**
Documentary and editorial, built on warm neutral grounds with oversized black type as the anchor. Every composition stays disciplined (generous whitespace, restrained color) and then allows itself exactly one bold or playful move: an object standing in for a letter, an asterisk, a rotated label. Summarized in the brief's own words: "refined and bold. minimal with a wink."

**Visual principles (design principles, locked from source material)**

1. Let one oversized type statement anchor every page. Never split attention between two competing headlines.
2. Budget exactly one "surprise" per composition (an object-in-type moment, a rotated label, an illustrated flourish). Never zero, never more than one.
3. Color comes from value contrast (cream / ink), not hue. Earth tones and the accent are seasoning, not the base flavor.
4. Treat process documentation like product photography: desaturated, tactile, unpolished on purpose.
5. Reuse the ticket-card module everywhere a thumbnail is needed. One component, many contexts.
6. Whitespace is generous by default. Density only in deliberately administrative moments (e.g. the About spec-table).
7. The italic serif appears once per page, never as a body font.
8. Dark/near-black sections are a controlled contrast tool (footer, one CTA band), not the site's default mode.

**Moodboard observations (underlying DNA, from moodboard analysis)**

- Strong: warm off-white/cream backgrounds paired with near-black ink; near-total absence of saturated color; value contrast over hue.
- Strong: oversized, bold, black display type as the primary anchor on nearly every composition.
- Strong: small caption/label type, uppercase, wide letter-spacing.
- Moderate: an italic or script serif used sparingly as a counterpoint to the bold sans, never the dominant voice.
- Moderate-strong: vertical/rotated type as an occasional editorial flourish.
- Strong: a recurring "card with photo + label footer" module, reused across contexts (this became the ticket-card component).
- Strong: two photography modes only, both documentary in spirit: (1) black-and-white/desaturated process shots, (2) warm single-object still-life shots with soft natural light. No glossy/staged studio polish.
- Strong, most ownable idea in the source moodboard: an object replacing or interrupting a letterform in a logotype/headline.
- Central tension identified across both source documents: discipline with one permitted surprise per page. Not minimal, not maximal.

**Things the design should feel like**

- An independent design journal or field notebook that happens to be a website.
- Considered, quietly confident, grounded, a little wry.
- Technical capability paired with genuine craft sensibility; someone who documents process, not just outcomes.
- Contemporary printed matter translated into digital form.

**Things it should explicitly avoid**

- A cold SaaS / dark-mode tech portfolio.
- A glossy stock-photo agency site.
- A Dribbble-trend gradient showcase.
- Generic "beige brutalist portfolio" cliche (this was directly named as a risk in the source material and is part of why the palette was later revised, see Section 3).
- Full-bleed glossy hero photography as a default.
- More than one "surprise"/flourish per composition.
- Dark mode as the base theme (dark is a controlled accent, not a toggleable site-wide mode).

---

## 3. LOCKED DESIGN SYSTEM

These are the final, approved values from the design conversation, including the palette revision requested after the mauve reference image. Treat this section as the single source of truth; it supersedes any earlier hex values discussed in this project's process (both the original Art Direction Brief PDF values and the first merged-palette draft are superseded).

### Palette (LOCKED)

| Token                        | Value     | Usage                                                                                                                                                       |
| ---------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bg-primary` (Porcelain)     | `#F8F6F1` | Primary page background, warm paper                                                                                                                         |
| `bg-secondary` (Chalk)       | `#ECE8DE` | Section breaks, card backgrounds                                                                                                                            |
| `ink` (Charcoal)             | `#17150F` | Primary text, near-black, kept intentionally unchanged through the palette revision                                                                         |
| `text-secondary` (Warm grey) | `#6C665A` | Secondary/supporting text, metadata                                                                                                                         |
| `accent` (Mauve)             | `#8C6670` | Locked, primary interactive accent: links, underlines, tags, hover states, UI                                                                               |
| `accent-soft` (Soft mauve)   | `#C8AEB2` | Decorative fills, tag backgrounds, card washes (lighter companion to `accent`, for use where the darker mauve would be too heavy)                           |
| `accent-signal` (Terracotta) | `#A65139` | Rare "wink" accent only. Used for exactly one surprise per composition: an asterisk, a rotated label, a single accent stroke. Not a general-purpose accent. |
| `dark-field`                 | `#1C1B16` | Footer and at most one controlled dark CTA band. Not a togglable dark mode.                                                                                 |

Design intent behind the palette: olive was deliberately removed in favor of mauve as the single everyday accent, to move the system away from the most common "warm beige + clay/terracotta + espresso ink" AI-portfolio default and toward something more distinctive and, per direct request, more feminine. Terracotta was kept but demoted to a rare, single-use accent rather than a general one. `accent` (`#8C6670`) is deliberately the darker of the two mauve tones so it can carry text/link contrast; `accent-soft` (`#C8AEB2`) is for larger decorative fills where the darker mauve would read too heavy. Exact WCAG contrast ratios have not yet been verified against both background tokens; this should be checked during implementation (see Open Decisions).

### Typography (LOCKED)

- **Display**: Barlow Condensed. Uppercase, tight leading, often used oversized.
- **Editorial accent**: Instrument Serif, italic. Used sparingly, once per page maximum, never as a body font.
- **Body / UI**: IBM Plex Sans. Clean, readable.
- **Labels / tags / metadata**: Space Mono. Uppercase, bracketed style (e.g. `[ case study ]`).

Note on how this was decided: the two source documents (Art Direction Brief PDF and the moodboard analysis PDF) disagreed on the display font (Archivo Black vs. Barlow Condensed) and on exact palette hex values. Barlow Condensed and the moodboard analysis document's palette family were chosen because they matched what was actually realized in the approved styleboard image, and the palette was then further revised per Section 3's Palette table above.

### Type hierarchy (LOCKED, as specified in the Art Direction Brief)

| Level         | Spec                                              |
| ------------- | ------------------------------------------------- |
| H1            | Display, 64-96px, tight leading, often uppercase  |
| H2            | Display, 36-48px                                  |
| H3            | Body Semibold, 22-28px                            |
| Body          | Body Regular, 16-18px / 1.5 line-height           |
| Caption       | Body Medium, 12-13px, uppercase, +0.06em tracking |
| Navigation    | Body Medium, 13-14px, uppercase, wide tracking    |
| Labels / tags | Mono, 11-12px, uppercase, bracketed               |

### Spacing (LOCKED)

- Wide outer margins: 80-120px desktop, so oversized type has room to breathe.
- Large section rhythm: 120-160px between major sections.
- Whitespace is an active design element, not empty space; generous by default, density only in administrative moments.

### Grid / layout principles (LOCKED)

- 12-column grid, content max-width approximately 1320px (source documents vary slightly, 1200-1440px range appears across drafts; treat ~1320px as the working default, confirm at implementation).
- Asymmetry at the macro level only: one offset element per page. Content blocks internally stay orderly.
- Images sit beside or inside type, rarely full-bleed.
- Mobile: typography remains large, grid simplifies to single column, asymmetry becomes vertical, margins stay generous, vertical/rotated text is dropped (does not translate to mobile).

### Borders / radii (LOCKED)

- Hairline rules: 1px, used for tables and card dividers, not heavy borders.
- Sharp or subtly rounded image containers rather than heavily rounded SaaS-style cards. No large border-radius as a default treatment.
- Buttons: solid ink pill for primary actions; underline or subtle border transition for secondary/text links, not large pill buttons for everything.

### Imagery (LOCKED, two modes only)

1. **Documentary / process**: black-and-white or desaturated, candid. Sketches, whiteboards, screens mid-edit, hands-on work. Proof of process, not polish.
2. **Warm still-life / hero object**: shipped work or finished piece treated as a hero object, centered, soft natural light, cream/neutral ground.

Both avoid glossy/staged studio polish and full-bleed treatment; images are cropped tight and used at real scale rather than dominating the composition.

### Motion / interaction principles (LOCKED)

- Subtle and functional: soft fade / slide reveals on scroll. Should feel like "a playful gust of wind," not a tech demo.
- Hover state system: default state is ink text on neutral background; hover state is accent underline or accent text. Images may subtly zoom 1.02-1.04x, shift slightly, reveal metadata, or shift from muted to full color on hover.
- Transitions: roughly 250-500ms.
- Explicitly avoid: excessive parallax, flashy effects, constant/looping animation.
- GSAP is the named animation tool in the source brief for scroll-based reveals.

### Other locked tokens

- Icons: very small and utilitarian (arrow, plus, dash style glyphs), not elaborate iconography.
- Graphic devices: object-in-letterform as a signature move (used sparingly, e.g. homepage hero), asterisk as decorative/functional punctuation, bracket-tag labels (`[ case study ]`), the ticket-card module as the one reusable thumbnail component.
- One accent color family used consistently site-wide (mauve), with terracotta reserved for the rare single "wink" moment; this is a hard rule, not a suggestion.

---

## 4. INFORMATION ARCHITECTURE

**Navigation (LOCKED)**
`Laura [Name] | Work | About | CV | Contact`
CV is a direct-download button (downloads a PDF), not a page. Full display name still needs to be confirmed/finalized (see Open Decisions).

**Homepage structure (LOCKED, content from Website Structure document)**

1. Hero: greeting, name, role line ("Experience designer to-be"), short intro, primary CTA (`Get to know me`), role tags (UX / Experience Design, Digital Design, Motion Design).
2. Selected work, split into two groups:
   - Design: individual work (3 projects)
   - Experience design: group projects (3 projects)
3. Gallery of older works / process screenshots.
4. "Currently working on" (2 items: Blender 3D header learning, decentering-human-design hedgehog UX project).
5. "How I think" narrative intro, followed by 3 cards: "Understand before designing," "Creative, but defendable," "Make it make sense."
6. Contact CTA block ("Enough about me. Let's hear your side of the story.").
7. Footer.

**About page structure (LOCKED, content from Website Structure document)**

1. Intro restating specialization and current focus, CV download.
2. "How I got here" narrative (copywriting-to-marketing-to-UX origin story), including one pull-quote.
3. "How I work" (analog-first process description).
4. "What drives me" list.
5. Contact CTA block (same as homepage).
6. Footer.

**Work (PROPOSED, not yet approved, see Section 5)**

**CV (LOCKED as a mechanism, asset not yet available)**
Download button appearing in nav, homepage, and About. No separate CV page. File does not exist yet; treat as placeholder until supplied.

**Contact (PROPOSED, not yet approved, see Section 5)**

**Other routes**
Individual case study pages (one per project) are implied by the "Selected work" grids but not yet specified as routes; the case-study layout is PROPOSED only, see Section 5. No other routes have been established.

---

## 5. PAGE SPECIFICATIONS

### Homepage — LOCKED

Content, section order, and copy are taken directly from the Website Structure document (see Section 4). Visual system per Section 3 applies. Layout composition within each section (exact grid treatment of the two work groups, card sizing, etc.) has not been wireframed in detail and can be treated as an implementation decision guided by the locked design system, not a new creative decision.

### About — LOCKED

Content and section order per Section 4. Same note as above regarding layout-level implementation freedom within the locked design system.

### Work / Project index — PROPOSED, requires approval

Draft layout discussed:

```
[NAV]
WORK
(optional short intro line)

— DESIGN, INDIVIDUAL WORK —
[ticket-card] [ticket-card] [ticket-card]

— EXPERIENCE DESIGN, GROUP PROJECTS —
[ticket-card] [ticket-card] [ticket-card]

— OLDER WORK —
[loose gallery grid]

[CONTACT CTA — reused block]
[FOOTER]
```

Assumption behind this proposal: reuses the homepage's two-group taxonomy (individual design work vs. group experience-design projects) so a recruiter's mental model stays consistent between homepage and index. Each ticket-card reuses the same module (image placeholder, project number, title, one-line role tag, year). Not yet approved.

### Individual case study — PROPOSED, requires approval

Draft layout discussed:

```
[NAV]
[PROJECT TITLE]                     01 / 06
role / tools / year                 (large image placeholder, hero object treatment)

01  CONTEXT
    (problem/brief, text column, max ~65ch)

02  APPROACH
    (process, documentary/desaturated image placeholders, 2-3, real scale)

03  SYSTEM / OUTCOME
    (what shipped, large warm still-life hero-object image placeholder)

[NEXT PROJECT →]
[CONTACT CTA — reused block]
[FOOTER]
```

Assumption behind this proposal: no real case-study copy exists yet, so this borrows the Context/Approach/System-Outcome structure suggested in the moodboard analysis document, adapted toward UX-process language rather than art-direction language. Uses the two locked imagery modes deliberately (documentary for process, still-life for outcome). Not yet approved. Actual number of case studies and per-project content are not yet defined.

### Contact — PROPOSED, requires approval

Draft layout discussed:

```
[NAV]
ENOUGH ABOUT ME.
LET'S HEAR YOUR SIDE OF THE STORY.

[email, large tappable link]

[Get in touch]   [Download my CV]

Email · LinkedIn · CV

[FOOTER]
```

Assumption behind this proposal: the existing "Enough about me..." block that already closes the homepage and About page is the real contact copy, simply promoted to its own full page rather than staying a teaser. Assumes no contact form (source material contains no form copy or fields); email-as-primary-contact carried over from the homepage/About pattern. Not yet approved, and whether a form is wanted at all is an open question, not just the layout.

---

## 6. CONTENT / ASSET STATUS

**Existing content**

- Full homepage copy (hero, tags, section labels, "Currently working on" items, "How I think" cards).
- Full About page copy (origin story, pull-quote, "How I work," "What drives me" list).
- All of the above sourced directly from the Website Structure document; treat as final copy, not placeholder.

**Missing content**

- Titles, images, and descriptions for all 6+ homepage/Work-index project cards.
- Case-study copy (Context / Approach / Outcome content) for each individual project.
- Contact page copy beyond the reused "Enough about me" block (if a form or additional content is wanted).
- Final display name/handle for nav and footer (currently placeholder "Laura [Name]").

**Placeholder requirements**

- Images: use flat gray divs, high-fidelity-wireframe style, no stock or generated photography until real assets exist.
- CV: placeholder download button, non-functional or pointing to a placeholder file until the real CV is supplied.
- Project content: clearly labeled placeholder titles/copy where real case-study content doesn't exist yet, so it's obvious what still needs to be replaced.

**Future assets (known but not yet provided)**

- Real project photography (documentary/process shots and still-life/hero-object shots per the two locked imagery modes).
- Final CV PDF.
- Possibly a portrait photo for About (referenced in the moodboard analysis's page-translation notes, not yet confirmed as wanted).

---

## 7. TECHNICAL DIRECTION

- **Framework**: Astro.
- **Language**: TypeScript.
- **Deployment**: GitHub Pages.
- **Architecture**: component-driven. Suggested (not yet built) component set: Nav, Footer, Button (primary/secondary), ProjectCard (ticket-card module), SectionHeader, TagPill, CardTriptych (the "How I think" cards), SpecRow/SpecTable (for About's "Selected Experience"/structured content), CaseStudyHeader, Marquee (max one use per page if used at all), ImageReveal (scroll-in wrapper).
- **Content structure suggestion**: case studies are a natural fit for an Astro content collection (one markdown/MDX file per project) once real case-study content and the Work/Case-study page layouts are approved, rather than hardcoded pages.
- **Animation requirements**: GSAP for scroll-based reveals per the locked motion principles in Section 3; must respect `prefers-reduced-motion`.
- **GitHub Pages note**: `base` path in `astro.config.mjs` needs to be set correctly if this is not a `username.github.io` root repository.
- **TasteSkill's role**: used as an engineering/quality guardrail layer, not as the source of aesthetic decisions. Specifically adopted: hard layout rules (hero-fits-viewport, no orphaned grid cells, mobile collapse declared per section), image strategy discipline (no fake div-based screenshots, real placeholders instead), motion discipline (correctly configured GSAP ScrollTrigger, motion must be motivated, reduced-motion respected), accessibility guardrails (contrast checks, one locked theme per page with the dark footer/CTA band as the sanctioned exception), and the AI-tell bans (no em-dashes, no fake stats/names, no decorative status dots, eyebrow rationing, one consistent accent color site-wide). Deliberately overridden where the project's own locked brief conflicts with TasteSkill's generic defaults: Instrument Serif and the warm paper/mauve/terracotta palette family are used despite being flagged as common AI-portfolio defaults in TasteSkill, because they are this project's own explicit, deliberately-chosen system, not a lazy default.

---

## 8. RESPONSIVE BEHAVIOR — OPEN

Everything locked in Section 3 is specified at desktop scale only. No mobile-scale companion values were established during the design conversation. The items below are gaps, not decisions already made in some other form; they should be resolved (by you, or conversationally with Claude Code) before responsive implementation, rather than left to be silently decided by whoever writes the CSS.

- **Breakpoints**: no `sm/md/lg` pixel values have been locked anywhere in this project.
- **Type hierarchy at mobile scale**: H1 (64-96px), H2 (36-48px), H3, Body, Caption, Navigation, and Labels are all specified desktop-only in Section 3. Applied literally on a narrow viewport, the display sizes will overflow or force horizontal scroll. A mobile type scale needs to be defined, not inferred.
- **Spacing at mobile scale**: the locked 80-120px outer margins and 120-160px section rhythm are desktop values. Applied literally on mobile they produce mostly empty screens; mobile-scale margin/rhythm values need to be defined.
- **Macro asymmetry fallback**: the Website Structure document states asymmetry "becomes vertical" on mobile, but this is prose intent, not a rule tied to specific components. Unresolved per-component, e.g.: does the homepage's offset hero element center-stack? Does a rotated label disappear, rotate to 0deg, or reposition?
- **Ticket-card grid collapse**: the 3-across project card rows (`[card][card][card]`) have no locked mobile column-count rule (1-column stack vs. 2-column).
- **Hover-dependent motion has no touch fallback**: the locked motion system (accent-underline on hover, 1.02-1.04x image zoom on hover, metadata reveal on hover) assumes a cursor. Undecided whether touch devices get a tap-equivalent, always show that state, or drop it entirely.
- **Vertical/rotated type**: "dropped on mobile" is stated in prose in the source material but not tied to a specific locked component, so it's unclear exactly which element(s) this applies to.
- **Navigation mobile pattern**: the 5-item nav (`Laura [Name] | Work | About | CV | Contact`) has no locked mobile treatment (hamburger, condensed inline, or wrap).

---

## OPEN DECISIONS CHECKLIST

- [ ] Confirm full display name/handle to use in nav, footer, and page titles (currently placeholder "Laura [Name]").
- [ ] Approve, modify, or reject the proposed Work / Project index layout (Section 5).
- [ ] Approve, modify, or reject the proposed Individual case study layout (Section 5), including whether the Context/Approach/Outcome structure is right for UX case studies specifically.
- [ ] Approve, modify, or reject the proposed Contact page layout (Section 5), including whether a contact form is wanted at all or email-only is correct.
- [ ] Confirm exact content max-width (1200px / 1320px / 1440px appear inconsistently across source material; a working default of ~1320px was assumed, not locked).
- [ ] Verify WCAG contrast ratios for the mauve accent (`#8C6670`) against both `bg-primary` and `bg-secondary` before it's used for body-sized text/links; may need a slightly adjusted value if it fails.
- [ ] Decide how many case studies exist and gather/confirm their real titles, roles, tools, and years.
- [ ] Supply project images (or confirm gray-div placeholders should remain until real assets are ready) and the real CV PDF.
- [ ] Decide whether a portrait photo is wanted on the About page.
- [ ] Confirm final component list and naming before scaffolding the Astro project.
- [ ] Confirm GitHub Pages repo type (project repo vs. `username.github.io`) to set the correct Astro `base` path.
- [ ] Lock breakpoint values (`sm/md/lg`) for the project.
- [ ] Define a mobile-scale type hierarchy to accompany the locked desktop hierarchy in Section 3.
- [ ] Define mobile-scale spacing (outer margins, section rhythm) to accompany the locked desktop values in Section 3.
- [ ] Define the mobile fallback for macro-level asymmetry on a per-component basis (hero offset, rotated labels).
- [ ] Define mobile column-count behavior for ticket-card project grids.
- [ ] Define the touch-device equivalent (or absence of one) for hover-dependent motion states.
- [ ] Confirm exactly which component(s) the "rotated type is dropped on mobile" rule applies to.
- [ ] Define the mobile navigation pattern (hamburger vs. condensed inline vs. wrap).
