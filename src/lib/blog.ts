import type { CollectionEntry } from 'astro:content';
import { defaultLocale, normalizeLocale, locales, type Locale } from '../i18n/ui';

export type BlogEntry = CollectionEntry<'blog'>;

/** Derive a clean slug from entry.id by stripping the locale prefix.
 *  e.g. 'fra/2025-09-15/kg4j-soumission' → '2025-09-15/kg4j-soumission'
 *       'fra/first-note'                  → 'first-note'
 */
export function slugOf(entry: BlogEntry): string {
  const parts = entry.id.split('/');
  let idWithoutPrefix = entry.id;
  
  // Remove locale prefix (e.g., 'fra/')
  if (locales.includes(parts[0] as Locale)) {
    idWithoutPrefix = parts.slice(1).join('/');
  }
  
  // Remove collection prefix (e.g., 'blog/')
  if (idWithoutPrefix.startsWith('blog/')) {
    idWithoutPrefix = idWithoutPrefix.substring(5);
  }
  
  return idWithoutPrefix.replace(/\.[^/.]+$/, '');
}

export function getTranslationsForPost(allPosts: BlogEntry[], post: BlogEntry) {
  const key = translationKeyOf(post).toLowerCase();
  const translations = allPosts.filter(p => translationKeyOf(p).toLowerCase() === key);
  const map: Record<string, string> = {};
  translations.forEach(t => {
    map[t.data.locale] = `/${t.data.locale}/notes/${slugOf(t)}/`.replace(/\/+/g, '/');
  });
  return map;
}

const localeOrder = (locale: Locale): Locale[] => {
  const wanted = normalizeLocale(locale);
  const order: Locale[] = [wanted];
  if (wanted !== 'eng') order.push('eng');
  if (wanted !== defaultLocale) order.push(defaultLocale);
  return [...new Set(order)] as Locale[];
};

const translationKeyOf = (entry: BlogEntry) =>
  entry.data.translationKey || slugOf(entry);

export function pickLocalizedPost(entries: BlogEntry[], locale: Locale, keyOrSlug: string) {
  const normalizedKey = keyOrSlug.toLowerCase();
  const candidates = entries.filter((entry) =>
    translationKeyOf(entry).toLowerCase() === normalizedKey ||
    slugOf(entry).toLowerCase() === normalizedKey,
  );
  if (candidates.length === 0) return undefined;
  for (const wanted of localeOrder(locale)) {
    const match = candidates.find((entry) => entry.data.locale === wanted);
    if (match) return match;
  }
  return candidates.find((entry) => entry.data.canonical) || candidates[0];
}

export function getLocalizedBlogGroups(entries: BlogEntry[], locale: Locale) {
  const grouped = new Map<string, BlogEntry[]>();
  for (const entry of entries) {
    const key = translationKeyOf(entry).toLowerCase();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(entry);
  }
  return [...grouped.entries()]
    .map(([key, group]) => pickLocalizedPost(group, locale, key))
    .filter(Boolean)
    .sort((a, b) => b!.data.date.valueOf() - a!.data.date.valueOf()) as BlogEntry[];
}
