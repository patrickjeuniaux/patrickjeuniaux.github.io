import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { locales } from './i18n/ui';

const metadata = {
  locale: z.enum(locales as [typeof locales[number], ...typeof locales[number][]]),
  translationKey: z.string().min(1),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  autoTranslated: z.boolean().default(false),
  sourceHash: z.string().regex(/^[a-f0-9]{64}$/).optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '*/blog/**/*.{md,mdx}', base: './src/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    ...metadata,
    canonical: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
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
    ...metadata,
    canonical: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*/pages/**/*.{md,mdx}', base: './src/content' }),
  schema: z.looseObject({
    lead: z.string().optional(),
    eyebrow: z.string().optional(),
    note: z.string().optional(),
    noteTitle: z.string().optional(),
    noteText: z.string().optional(),
    title: z.string(),
    ...metadata,
    draft: z.boolean().default(false),
    navTitle: z.string().optional(),
    navOrder: z.number().default(100),
  }),
});

export const collections = { blog, projects, pages };
