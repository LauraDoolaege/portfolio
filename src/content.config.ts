// Content collections. Astro 5+ reads this file from src/content.config.ts (the old
// src/content/config.ts location is no longer supported).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    // Short hook shown under the title
    description: z.string(),
    // Decides the page layout: editorial article vs. gallery / lookbook
    type: z.enum(['ux', 'visual']),
    // Path under /public (e.g. "/images/plan-a/cover.jpg"). Left out until real photography
    // exists; the page then shows the flat placeholder frame.
    coverImage: z.string().optional(),
    // UX only: two bold sentences on the impact, shown under the meta grid
    tldr: z.string().optional(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()),
    team: z.array(z.string()).optional(),
  }),
});

export const collections = { works };
