# Laura's Portfolio

Personal portfolio site. See [`docs/PROJECT_BRIEF.md`](docs/PROJECT_BRIEF.md)
for the full design/content brief and [`CLAUDE.md`](CLAUDE.md) for the
distilled technical/design rules this codebase follows.

**Status**: technical foundation only — no pages are built yet.

## Stack

- [Astro](https://astro.build) + TypeScript (strict)
- Plain CSS with design tokens as custom properties (`src/styles/global.css`)
- Self-hosted fonts via `@fontsource` (Barlow Condensed, Instrument Serif,
  IBM Plex Sans, Space Mono)
- ESLint + Prettier
- Deploys to GitHub Pages

## Project structure

```
docs/
  PROJECT_BRIEF.md      # design/content source of truth
src/
  assets/
    icons/               # small utilitarian glyphs
    images/               # photography, imported via astro:assets
  components/
    ui/                   # generic reusable primitives (buttons, tags)
    layout/               # nav, footer
    sections/             # larger page-specific content blocks
  layouts/
    BaseLayout.astro      # root HTML shell
  pages/
    index.astro           # temporary scaffold-check page
  styles/
    global.css             # design tokens, reset, base styles
    fonts.css               # self-hosted font imports
```

## Commands

| Command                | Action                                     |
| :--------------------- | :----------------------------------------- |
| `npm install`          | Install dependencies                       |
| `npm run dev`          | Start local dev server at `localhost:4321` |
| `npm run build`        | Build production site to `./dist/`         |
| `npm run preview`      | Preview the production build locally       |
| `npm run check`        | Type-check the project (`astro check`)     |
| `npm run lint`         | Lint with ESLint                           |
| `npm run format`       | Format with Prettier                       |
| `npm run format:check` | Check formatting without writing           |

## Before deploying

`astro.config.mjs` has a `site`/`base` TODO that depends on whether this
repo is a GitHub Pages project repo or a `<username>.github.io` repo — set
it once that's decided (see `CLAUDE.md` "Open decisions").
