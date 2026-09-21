# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and hiring managers scanning quickly, evaluating both
craft and thinking, wanting to reach her CV or contact details fast.
Secondary: peers, collaborators, and potential clients for freelance/group
work.

## Product Purpose

A personal portfolio for Laura Doolaege (digital development & design
student, background in marketing communication, currently specialising in
UX/experience design) that lets a recruiter quickly judge her process,
taste, and credibility, and get to her CV or contact details fast.

## Positioning

Contemporary editorial design with a tactile, human edge — reads like an
independent design journal or field notebook, not a generic SaaS
portfolio template, a glossy agency site, or the common beige-brutalist/
gradient AI-portfolio look. Disciplined whitespace and oversized type,
with exactly one bold "surprise" per composition.

## Operating Context

Personal static portfolio site, not a product marketing site. Visited
briefly by someone scanning several candidates — tone needs to land in
the first few seconds, before UI chrome. No login, no dynamic backend;
content is static/prebuilt (Astro static output), deployed to GitHub
Pages under a project-repo subpath (`/portfolio`).

## Capabilities and Constraints

Astro static site (TypeScript strict), plain CSS custom properties as
design tokens, self-hosted `@fontsource` fonts, GSAP for scroll/hover
motion (must respect `prefers-reduced-motion`). No CMS/backend. CV is a
direct-download button (PDF), not a page — the file doesn't exist yet,
treat as a placeholder. No real project photography yet — flat gray
placeholder divs only, never stock or generated imagery. Work index,
individual case-study, and Contact page layouts are still PROPOSED/
unapproved — don't build their content without separate confirmation.
Homepage and About copy are final content, not placeholder.

## Brand Commitments

Name: Laura Doolaege. Voice: considered, quietly confident, grounded, a
little wry — "refined and bold, minimal with a wink." The locked design
system (palette, type families, spacing/grid, motion principles, imagery
modes) is documented in `AGENTS.md`/`src/styles/global.css` — not open
for reinterpretation on a per-page basis.

## Evidence on Hand

Full, final About page copy was supplied directly by the user (intro,
"How I got here" origin story with one pull-quote, "How I work," "What
drives me" list). Homepage is already built and live. No About portrait
photo exists yet, and whether one is wanted was never confirmed
(PROJECT_BRIEF.md Open Decisions) — build without one for now. No CV PDF
yet.

## Product Principles

- Speed-to-credibility: a recruiter should reach the CV/contact and form
  a craft impression within seconds, not by scrolling and hunting.
- Show the person behind the portfolio without diluting the professional
  read — About is the one place warmth/personality is allowed to lead,
  but it stays grounded, never casual.
- One disciplined system, applied consistently — About reuses Header,
  Footer, ContactCTA, Button, SectionMarker rather than inventing
  parallel chrome.
- Content over decoration — real, final copy already exists for this
  page; don't pad it, don't invent facts.

## Accessibility & Inclusion

`prefers-reduced-motion` must always be respected (already enforced
sitewide in `global.css` plus a GSAP guard in `src/utils/motion.ts`).
WCAG AA contrast is required for all text — established this session as
a real, checked requirement, not just an aspiration (dark-field sections
need dedicated on-dark tints; see the homepage polish pass in `AGENTS.md`).
