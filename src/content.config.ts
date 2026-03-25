import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '*/blog/**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    locale: z.string().default('fra'),
    translationKey: z.string().optional(),
    canonical: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*/projects/**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    routeSlug: z.string(),
    summary: z.string(),
    order: z.number().default(999),
    status: z.string().optional(),
    domain: z.string().optional(),
    startYear: z.string().optional(),
    endYear: z.string().optional(),
    funder: z.string().optional(),
    role: z.string().optional(),
    budget: z.string().optional(),
    keywords: z.array(z.string()).default([]),
    locale: z.string().default('fra'),
    translationKey: z.string().optional(),
    canonical: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/pages/**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    locale: z.string().default('fra'),
    translationKey: z.string(),
  }).passthrough(),
});

export const collections = { blog, projects, pages };
