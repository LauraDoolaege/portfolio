// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Project repo: github.com/LauraDoolaege/portfolio, served under a subpath.
  site: 'https://LauraDoolaege.github.io',
  base: '/portfolio',

  trailingSlash: 'never',

  integrations: [mdx()],
});
