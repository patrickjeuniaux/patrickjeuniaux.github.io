# Spécifications du site

## Noms des pages et adresses

- Les noms des nouvelles pages, notes et fiches de projets doivent toujours être en **anglais**, quelle que soit la langue du contenu.
- Les identifiants d’URL (*slugs*) sont en anglais, en minuscules, avec des tirets entre les mots, sans espaces ni accents.
- Les noms de fichiers peuvent conserver la casse des noms propres et acronymes, par exemple `DAT.md`, `DRDC.md` ou `Thales.md`. Les identifiants d’URL restent en minuscules : `dat`, `drdc`, `thales`.
- Toutes les traductions partagent exactement le même nom de fichier, le même chemin après le dossier de langue et la même `translationKey`.
- Le champ `routeSlug` d’un projet est identique dans toutes les langues. Les nouvelles clés `translationKey` sont également nommées en anglais.
- Les titres, textes, résumés et libellés du menu restent rédigés dans la langue de chaque version.

Exemples :

| Contenu | Nom de fichier | Adresse française |
| --- | --- | --- |
| Page Enseignement | `teaching.md` | `/teaching/` |
| Annonce d’un nouveau cours | `2026-10-04/new-course.md` | `/notes/2026-10-04/new-course/` |
| Création du laboratoire DAT | `2026-06-02/DAT-creation.md` | `/notes/2026-06-02/dat-creation/` |

La version anglaise de la nouvelle DAT se trouve à `/eng/notes/2026-06-02/dat-creation/`, et la version néerlandaise à `/nld/notes/2026-06-02/dat-creation/`.

Les outils vérifient le format et la cohérence des identifiants. Leur sens anglais doit être vérifié lors de la rédaction et de la revue.

## Organisation et traduction

### Présentation du laboratoire DAT

- La nouvelle de création est conservée à `/notes/2026-06-02/dat-creation/`.
- La présentation des missions est une page ordinaire dans `pages/DAT.md`, à `/dat/`, au même niveau d’URL que `/nicc/`. DAT est un laboratoire de l’INCC.
- La nouvelle renvoie vers `/dat/`, qui renvoie vers `/nicc/`. Les pages INCC, À propos et Collaborations mentionnent la direction du laboratoire et donnent accès à sa présentation.
- Le lien `DAT` dans le menu utilise la page de présentation. Ces liens restent dans la langue de chaque version.

### Collections et langues

- Le contenu est organisé sous `src/content/<langue>/<pages|projects|blog>/`.
- Le français est la langue par défaut, sans préfixe dans les liens générés.
- L’ordre de secours est : langue demandée, anglais, français.
- Les nouvelles portent la date de l’événement dans `date` et dans le dossier de la note.
- Les traductions automatiques sont signalées avec `autoTranslated: true` et conservent l’empreinte `sourceHash` du français.
- Toute création ou modification d’une traduction nécessite un feu vert explicite de l’utilisateur.

Le [README](README.md) décrit les procédures éditoriales et de publication pas à pas.
