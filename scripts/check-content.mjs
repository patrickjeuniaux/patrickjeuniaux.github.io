import { allContent } from './content-lib.mjs';
import { locales, reservedSlugs } from '../src/i18n/config.mjs';

try {
  const entries = await allContent();
  const errors = [];
  const groups = new Map();
  const urls = new Map();
  for (const entry of entries) {
    const fail = (message) => errors.push(`${entry.relative} : ${message}`);
    if (entry.data.locale !== entry.locale) fail(`locale doit être ${entry.locale}, comme le dossier.`);
    for (const field of ['title', 'translationKey', ...(entry.collection === 'projects' ? ['routeSlug', 'summary'] : []), ...(entry.collection === 'blog' ? ['description'] : [])]) {
      if (typeof entry.data[field] !== 'string' || !entry.data[field].trim()) fail(`champ ${field} absent ou vide.`);
    }
    if (entry.collection === 'blog' && !Number.isFinite(new Date(entry.data.date).valueOf())) fail('date absente ou invalide.');
    const key = `${entry.collection}/${String(entry.data.translationKey).toLowerCase()}`;
    const group = groups.get(key) ?? [];
    if (group.some((other) => other.locale === entry.locale)) fail('translationKey déjà utilisée dans cette langue et cette collection.');
    if (group.length && group[0].name.toLowerCase() !== entry.name.toLowerCase()) fail('utilise le même chemin et le même nom de fichier que les autres traductions.');
    if (entry.collection === 'projects' && group.length && group[0].data.routeSlug !== entry.data.routeSlug) fail('routeSlug doit rester identique dans toutes les langues.');
    group.push(entry);
    groups.set(key, group);

    if (entry.collection !== 'blog') {
      const slug = entry.collection === 'projects' ? entry.data.routeSlug : entry.name.replace(/\.(md|mdx)$/, '').toLowerCase();
      if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('nom de page ou routeSlug invalide : minuscules, chiffres et tirets, sans sous-dossier.');
      if (entry.collection === 'projects' && reservedSlugs.includes(slug)) fail(`URL réservée : /${slug}/.`);
      if (entry.collection === 'pages' && (locales.includes(slug) || ['work', 'blog'].includes(slug))) fail(`nom de page réservé : ${slug}.`);
      const owner = urls.get(slug);
      if (owner && owner !== key) fail(`URL /${slug}/ déjà utilisée par ${owner}.`);
      urls.set(slug, key);
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
  console.log(`Contenu cohérent : ${entries.length} fichiers, ${groups.size} groupes de traductions.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
