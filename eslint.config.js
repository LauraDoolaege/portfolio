// @ts-check
import { defineConfig } from 'eslint/config';
import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  {
    // Mirrors .gitignore/.prettierignore: .agents/ is third-party design-
    // reference skill content, and the rest are local agent-tool config/
    // skill installs (Claude Code, Codex, GitHub agents) — none of it is
    // project source.
    ignores: [
      'dist/',
      '.astro/',
      'node_modules/',
      '.agents/',
      '.claude/',
      '.codex/',
      '.github/agents/',
      '.github/hooks/',
      '.github/skills/',
      '.impeccable/',
    ],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);
