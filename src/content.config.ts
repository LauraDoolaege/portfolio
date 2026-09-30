// Content collections. Astro 5+ reads this file from src/content.config.ts (the old
// src/content/config.ts location is no longer supported).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
  schema: z.object({
    title: z.string(),
    // Intro shown under the title: a short hook, or for UX a two-sentence summary
    description: z.string(),
    // Decides the page layout: editorial article vs. gallery / lookbook
    type: z.enum(['ux', 'visual']),
    // Path under /public (e.g. "/images/plan-a/cover.jpg"). Left out until real photography
    // exists; the page then shows the flat placeholder frame.
    coverImage: z.string().optional(),
    // Full case study on Behance. Adds a top button and the massive bottom CTA when present.
    behanceUrl: z.string().optional(),
    role: z.string(),
    timeline: z.string(),
    tools: z.array(z.string()),
    team: z.array(z.string()).optional(),
  }),
});

export const collections = { works };
