import { getCollection, type CollectionEntry } from 'astro:content';
import { normalizeLocale, type Locale, localizePath } from '../i18n/ui';
import { localeOrder, reservedSlugs } from '../i18n/config.mjs';

export function pageSlugOf(entry: CollectionEntry<'pages'>) {
  return entry.id.split('/').slice(2).join('/').replace(/\.(md|mdx)$/, '').toLowerCase();
}

export async function getLocalizedPage(locale: Locale, slug: string) {
  const wanted = normalizeLocale(locale);
  const pages = await getCollection('pages', (entry) => !entry.data.draft);
  for (const code of localeOrder(wanted)) {
    const entry = pages.find((entry) => entry.data.locale === code && pageSlugOf(entry) === slug.toLowerCase());
    if (entry) return entry;
  }
  return undefined;
}

export async function getExtraNavigation(locale: Locale) {
  const pages = await getCollection('pages', (entry) => !entry.data.draft);
  const slugs = [...new Set(pages.map(pageSlugOf))].filter((slug) => !reservedSlugs.includes(slug));
  const links = await Promise.all(slugs.map(async (slug) => {
    const entry = await getLocalizedPage(locale, slug);
    return entry?.data.navTitle ? {
      title: entry.data.navTitle,
      href: localizePath(locale, `/${slug}/`),
      order: entry.data.navOrder,
    } : undefined;
  }));
  return links.filter((link): link is NonNullable<typeof link> => Boolean(link)).sort((a, b) => a.order - b.order);
}
