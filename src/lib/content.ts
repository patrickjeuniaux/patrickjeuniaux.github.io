import { getEntry } from 'astro:content';
import { defaultLocale, fallbackLocales, normalizeLocale, type Locale } from '../i18n/ui';

export async function getLocalizedPage(locale: Locale, slug: string) {
  const wanted = normalizeLocale(locale);
  const order = [wanted, ...fallbackLocales.filter((code) => code !== wanted && code !== defaultLocale), defaultLocale];
  for (const code of [...new Set(order)]) {
    const entry = await getEntry('pages', `${code}/pages/${slug}`);
    if (entry) return entry;
  }
  return undefined;
}
