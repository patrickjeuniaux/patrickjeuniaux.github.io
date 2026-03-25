import type { CollectionEntry } from 'astro:content';
import { defaultLocale, normalizeLocale, type Locale } from '../i18n/ui';

export type ProjectEntry = CollectionEntry<'projects'>;

const localeOrder = (locale: Locale): Locale[] => {
  const wanted = normalizeLocale(locale);
  const order: Locale[] = [wanted];
  if (wanted !== 'eng') order.push('eng');
  if (wanted !== defaultLocale) order.push(defaultLocale);
  return [...new Set(order)] as Locale[];
};

const translationKeyOf = (entry: ProjectEntry) => {
  if (entry.data.translationKey) return entry.data.translationKey;
  const parts = entry.id.split('/');
  // If format is [lang]/projects/[slug], return [slug]
  if (parts.length > 2 && parts[1] === 'projects') {
    return parts.slice(2).join('/').replace(/\.[^/.]+$/, '');
  }
  // Fallback to original logic if it doesn't match the expected new pattern
  return entry.id.replace(/\.[^/.]+$/, '');
};

export function pickLocalizedProject(entries: ProjectEntry[], locale: Locale, keyOrSlug: string) {
  const normalizedKey = keyOrSlug.toLowerCase();
  const candidates = entries.filter((entry) =>
    translationKeyOf(entry).toLowerCase() === normalizedKey || entry.data.routeSlug.toLowerCase() === normalizedKey,
  );
  if (candidates.length === 0) return undefined;
  for (const wanted of localeOrder(locale)) {
    const match = candidates.find((entry) => entry.data.locale === wanted);
    if (match) return match;
  }
  return candidates.find((entry) => entry.data.canonical) || candidates[0];
}

export function getLocalizedProjectGroups(entries: ProjectEntry[], locale: Locale) {
  const grouped = new Map<string, ProjectEntry[]>();
  for (const entry of entries) {
    const key = translationKeyOf(entry).toLowerCase();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(entry);
  }
  return [...grouped.entries()]
    .map(([key, group]) => pickLocalizedProject(group, locale, key))
    .filter(Boolean)
    .sort((a, b) => (a!.data.order ?? 999) - (b!.data.order ?? 999)) as ProjectEntry[];
}

export function getCanonicalProjectGroups(entries: ProjectEntry[]) {
  const grouped = new Map<string, ProjectEntry[]>();
  for (const entry of entries) {
    const key = translationKeyOf(entry).toLowerCase();
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(entry);
  }
  return [...grouped.values()].map((group) =>
    group.find((entry) => entry.data.canonical) ||
    group.find((entry) => entry.data.locale === defaultLocale) ||
    group[0],
  );
}
