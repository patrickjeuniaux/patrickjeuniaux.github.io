// Configuration partagée par Astro, le site et les outils de contenu.
export const locales = ['fra', 'nld', 'eng', 'deu', 'ita', 'spa', 'por', 'zho', 'rus', 'jpn', 'hin', 'ara'];
export const defaultLocale = 'fra';
export const fallbackLocales = ['eng', 'fra'];
export const languageNames = {
  fra: 'français', nld: 'néerlandais', eng: 'anglais', deu: 'allemand',
  ita: 'italien', spa: 'espagnol', por: 'portugais', zho: 'chinois',
  rus: 'russe', jpn: 'japonais', hin: 'hindi', ara: 'arabe',
};

// Ces noms sont déjà utilisés par des routes ou par le sélecteur de langue.
export const reservedSlugs = [...locales, 'home', 'about', 'work', 'projects', 'notes', 'contact', 'collaborations', 'blog', 'publications'];

export function localeOrder(locale) {
  return [...new Set([locale, ...fallbackLocales])];
}
