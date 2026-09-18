// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: set once the GitHub Pages repo type is confirmed (PROJECT_BRIEF.md
  // Open Decisions). Leave both as-is ('/') for a <username>.github.io repo.
  // For a project repo (e.g. github.com/<user>/portfolio), set:
  //   site: 'https://<user>.github.io',
  //   base: '/portfolio',
  site: undefined,
  base: '/',

  trailingSlash: 'never',
});
