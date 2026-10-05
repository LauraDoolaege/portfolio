// Content collections. Astro 5+ reads this file from src/content.config.ts (the old
// src/content/config.ts location is no longer supported).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const works = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/works' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Intro shown under the title: a short hook, or for UX a two-sentence summary
      description: z.string(),
      // Decides the page layout: editorial article vs. gallery / lookbook
      type: z.enum(['ux', 'visual']),
      // Path relative to the .mdx file (e.g. "../../assets/images/frame_x.png"), optimized by
      // astro:assets. Left out until an image exists; the page then shows the flat placeholder frame.
      coverImage: image().optional(),
      // Header facts for the case-study layout (Role comes from `role`). When present the page uses
      // the case layout: compact header, sticky contents list, narrow reading column, gallery.
      facts: z.object({ scope: z.string(), context: z.string() }).optional(),
      // Full case study on Behance. Adds a top button and a quiet closing CTA when present.
      behanceUrl: z.string().optional(),
      role: z.string(),
      timeline: z.string(),
      tools: z.array(z.string()),
      team: z.array(z.string()).optional(),
    }),
});

export const collections = { works };
