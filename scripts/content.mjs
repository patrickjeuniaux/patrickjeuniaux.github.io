import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { defaultLocale, locales, languageNames, reservedSlugs } from '../src/i18n/config.mjs';
import { allContent, readContent } from './content-lib.mjs';

const [command, ...args] = process.argv.slice(2);

async function create(collection) {
  const [slug, title, ...options] = args;
  if (!slug || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Indique un identifiant en anglais, en minuscules sans espaces, et un titre entre guillemets. Exemple : npm run new:page -- teaching "Enseignement"');
  }
  if (collection !== 'blog' && reservedSlugs.includes(slug)) throw new Error(`Le nom « ${slug} » est réservé par le site.`);
  const entries = await allContent();
  if (collection !== 'blog' && entries.some((entry) => entry.collection !== 'blog' &&
    (entry.collection === 'projects' ? entry.data.routeSlug : entry.name.replace(/\.(md|mdx)$/, '').toLowerCase()) === slug)) {
    throw new Error(`L'adresse /${slug}/ existe déjà. Choisis un autre nom.`);
  }
  const dateIndex = options.indexOf('--date');
  if (options.some((value, index) => value !== '--date' && index !== dateIndex + 1) || (options.length && (dateIndex !== 0 || options.length !== 2 || collection !== 'blog'))) {
    throw new Error('Option inconnue. Seule une note accepte --date AAAA-MM-JJ.');
  }
  const date = dateIndex >= 0 ? options[dateIndex + 1] : new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
    throw new Error('Date invalide. Utilise AAAA-MM-JJ, par exemple 2026-10-04.');
  }
  const data = { title, locale: defaultLocale, translationKey: `${collection}-${slug}` };
  if (collection === 'pages') Object.assign(data, { lead: 'Une courte introduction à remplacer.', draft: true, navTitle: title, navOrder: 100 });
  if (collection === 'projects') Object.assign(data, { routeSlug: slug, summary: 'Un résumé du projet à remplacer.', order: 999, startYear: date.slice(0, 4) });
  if (collection === 'blog') Object.assign(data, { description: 'Un bref résumé à remplacer.', date, draft: true, canonical: true, tags: [] });
  const name = collection === 'blog' ? `${date}/${slug}.md` : `${slug}.md`;
  const target = path.join('src/content', defaultLocale, collection, name);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `---\n${yaml.dump(data, { lineWidth: -1, quotingType: '"' })}---\n\n## Première section\n\nÉcris ton texte ici.\n`, { flag: 'wx' });
  console.log(`Créé : ${target}\nModifie le texte et l'en-tête.${collection !== 'projects' ? '\nPasse draft à false pour publier ce contenu.' : '\nCe projet apparaîtra dans la liste des projets dès la prochaine construction.'}`);
}

async function prompt() {
  if (args.length !== 2) throw new Error('Usage : npm run translate:prompt -- src/content/fra/pages/my-page.md eng');
  const [file, locale] = args;
  if (!locales.includes(locale) || locale === defaultLocale) throw new Error(`Langue cible invalide : ${locale}`);
  const source = await readContent(file);
  if (source.locale !== defaultLocale) throw new Error('Utilise la version française comme source de traduction.');
  const target = `src/content/${locale}/${source.collection}/${source.name}`;
  let exists = false;
  try { await access(target); exists = true; } catch {}
  console.log(`Traduis le document suivant du français vers cette langue : ${languageNames[locale]}.
Retourne uniquement le fichier Markdown ou MDX complet, avec son en-tête YAML, sans commentaire ni bloc de code autour du fichier.
Traduis le corps et tous les textes destinés aux lecteurs dans l'en-tête, y compris les titres, résumés, navTitle, mots-clés, statuts et domaines.
Préserve la structure Markdown/MDX, les balises HTML, les classes CSS, le code, les formules, les noms propres et les faits. N'ajoute aucune information.
Préserve exactement translationKey, routeSlug, order, navOrder, date, publishedAt, updatedAt, startYear, endYear, budget, draft et les autres identifiants techniques.
Les noms de fichiers et identifiants d’URL restent en anglais dans toutes les langues. Ne traduis ni le nom du fichier ni les slugs des liens internes ; seul le préfixe de langue change.
Mets locale: ${locale}, canonical: false et autoTranslated: true dans l'en-tête.
Ajoute sourceHash: "${source.hash}" dans l'en-tête.
Dans les liens internes vers le site, remplace le préfixe /fra/ par /${locale}/ et ajoute /${locale}/ aux liens commençant par / sans préfixe de langue. Préserve les autres préfixes de langue explicites, les liens //, les adresses externes, les images, /img/, les fichiers publics et les ancres #.
Conserve les liens complets vers des fichiers publics (par exemple /documents/cv.pdf) sans préfixe de langue.
Le résultat sera enregistré dans ${target}.${exists ? ' Une traduction existe déjà : elle sera à réviser avant de la remplacer.' : ''}

Document source :

${source.raw}`);
}

async function translations() {
  if (args.length > 1) throw new Error('Usage : npm run translations -- [chemin du fichier français]');
  const entries = await allContent();
  const source = args[0] ? await readContent(args[0]) : undefined;
  if (source && source.locale !== defaultLocale) throw new Error('Indique un fichier français.');
  const originals = source ? [source] : entries.filter((entry) => entry.locale === defaultLocale);
  for (const original of originals) {
    const states = { manquantes: [], 'à revoir': [], suivies: [], 'sans empreinte (à vérifier)': [] };
    for (const locale of locales.filter((code) => code !== defaultLocale)) {
      const translated = entries.find((entry) => entry.collection === original.collection && entry.locale === locale && entry.data.translationKey === original.data.translationKey);
      if (!translated) states.manquantes.push(locale);
      else if (!translated.data.sourceHash) states['sans empreinte (à vérifier)'].push(locale);
      else if (translated.data.sourceHash !== original.hash) states['à revoir'].push(locale);
      else states.suivies.push(locale);
    }
    console.log(`\n${original.relative}${original.data.draft ? ' (brouillon français)' : ''}`);
    for (const [state, languages] of Object.entries(states)) if (languages.length) console.log(`  ${state} : ${languages.join(', ')}`);
  }
  console.log('\n« suivies » signifie que le français n’a pas changé depuis la traduction ; une relecture humaine reste nécessaire.');
}

try {
  if (['pages', 'projects', 'blog'].includes(command)) await create(command);
  else if (command === 'prompt') await prompt();
  else if (command === 'translations') await translations();
  else throw new Error('Commande inconnue : pages, projects, blog, prompt ou translations.');
} catch (error) {
  console.error(`Erreur : ${error.message}`);
  process.exitCode = 1;
}
