import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const site = 'https://patrickjeuniaux.github.io';

export default defineConfig({
  site,
  i18n: {
    locales: ['fra', 'nld', 'eng', 'deu', 'ita', 'spa', 'por', 'zho', 'rus', 'jpn', 'hin', 'ara'],
    defaultLocale: 'fra',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  scopedStyleStrategy: 'where',
});
