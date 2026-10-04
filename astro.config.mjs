import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { locales, defaultLocale } from './src/i18n/config.mjs';
import { unified } from '@astrojs/markdown-remark';

const site = 'https://patrickjeuniaux.github.io';

export default defineConfig({
  site,
  i18n: {
    locales,
    defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  compressHTML: true,
  scopedStyleStrategy: 'where',
});
