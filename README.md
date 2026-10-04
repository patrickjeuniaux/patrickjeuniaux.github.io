# Mettre à jour le site de Patrick Jeuniaux

Ce guide explique comment modifier le site, ajouter une page, publier une nouvelle et préparer ses traductions. Pour ces opérations, tu écris dans des fichiers texte : tu n'as pas besoin de programmer en Astro.

Le site est **statique** : Astro transforme les sources en pages HTML, puis GitHub Pages les publie. Les traductions sont des fichiers enregistrés dans le dépôt. Elles ne sont pas produites à la volée quand un visiteur change de langue.

## 1. Commencer : ouvrir le site sur ton ordinateur

### La première fois

Il faut **Git**, **Node.js 22.12 ou supérieur** et **npm**, fourni avec Node.js. Vérifie leur présence dans un terminal :

```bash
git --version
node --version
npm --version
```

Si tu as déjà le projet, ouvre son dossier dans ton éditeur. Sinon :

```bash
git clone https://github.com/patrickjeuniaux/patrickjeuniaux.github.io.git
cd patrickjeuniaux.github.io
```

Toutes les commandes suivantes se lancent **depuis le dossier contenant `package.json` et ce README**. Sur ton installation actuelle, il s'appelle `PPJMHJ`.

```bash
npm ci
npm run dev
```

`npm ci` installe les versions exactes enregistrées dans `package-lock.json`. Refais-le après avoir récupéré une modification de ce fichier.

`npm run dev` démarre le site local. Ouvre l'adresse affichée, généralement **http://localhost:4321**. Garde ce terminal ouvert pendant que tu travailles. Pour arrêter le serveur, appuie sur **Ctrl+C**.

### Les fois suivantes

1. Ouvre le projet dans ton éditeur.
2. Lance `npm run dev` dans un terminal.
3. Modifie un fichier et enregistre-le : le navigateur se met à jour.
4. Utilise un **second terminal**, dans le même dossier, pour les autres commandes du guide.

La règle de nommage des pages est définie dans les [spécifications du site](SPECIFICATIONS.md) : **les noms de fichiers et identifiants d’URL sont toujours en anglais**, dans toutes les langues. Les titres et le texte sont traduits.

## 2. Savoir quel fichier modifier

Les dossiers sont organisés **d'abord par langue, puis par type de contenu** :

```text
src/content/
├── fra/                        ← français
│   ├── pages/                  ← pages du site
│   │   ├── home.md
│   │   ├── about.md
│   │   └── ...
│   ├── projects/               ← fiches de projets
│   │   └── KG4J.md
│   └── blog/                   ← nouvelles et notes
│       └── 2026-03-25/
│           └── KG4J-job-offering.md
├── eng/                        ← mêmes contenus en anglais
├── nld/                        ← mêmes contenus en néerlandais
└── ...
```

| Tu souhaites modifier… | Fichier ou dossier |
| --- | --- |
| L'accueil | `src/content/fra/pages/home.md` |
| Ton parcours | `src/content/fra/pages/about.md` |
| Tes coordonnées | `src/content/fra/pages/contact.md` |
| Les collaborations | `src/content/fra/pages/collaborations.md` |
| La présentation et les missions du laboratoire DAT | `src/content/fra/pages/DAT.md` |
| La nouvelle annonçant sa création | `src/content/fra/blog/2026-06-02/DAT-creation.md` |
| L'introduction de la liste des projets | `src/content/fra/pages/projects.md` |
| La fiche KG4J | `src/content/fra/projects/KG4J.md` |
| Une nouvelle ou une note | `src/content/fra/blog/` |
| L'introduction des publications | `src/content/fra/pages/publications.md` |
| Les références bibliographiques | `data/index.bib` |
| Les textes du menu principal, boutons et filtres | `src/i18n/ui.ts` |
| Les couleurs, polices et espacements | `src/styles/global.css` |
| Des images ou PDF | `public/` |

**Attention aux adresses :** les publications s'affichent à `/work/`, les nouvelles à `/notes/`. Les noms de dossiers décrivent des collections de contenu, pas directement des adresses publiques.

Le français s'affiche sans préfixe : `/about/`. L'anglais utilise `/eng/about/`, le néerlandais `/nld/about/`. Les anciennes adresses `/fra/.../` restent disponibles. `/blog/` redirige vers `/notes/` et `/publications/` vers `/work/`.

Le laboratoire DAT dispose de deux textes distincts : une **nouvelle datée** à `/notes/2026-06-02/dat-creation/` pour annoncer sa création, et une **page de présentation** à `/dat/` pour décrire ses missions. La page `/dat/` se trouve au même niveau d'URL que `/nicc/`, et précise que le laboratoire appartient à l'INCC. La nouvelle renvoie vers cette présentation ; les pages INCC, À propos et Collaborations y donnent également accès. Pour faire évoluer les missions du laboratoire, modifie `pages/DAT.md`, puis ses traductions après autorisation.

Les fichiers des pages DAT, DRDC et Thales s'appellent respectivement `DAT.md`, `DRDC.md` et `Thales.md`. Leurs adresses restent en minuscules : `/dat/`, `/drdc/` et `/thales/`. Toute création ou modification d'une traduction nécessite un feu vert explicite.

## 3. Comprendre un fichier Markdown

Un fichier `.md` comprend deux parties :

```markdown
---
title: "Ma page"
locale: fra
translationKey: pages-my-page
lead: "Une introduction courte."
---

## Une première section

Voici le texte. Un mot peut être **en gras** ou *en italique*.

- Premier élément
- Deuxième élément

[Voir mes projets](/projects/)
```

La partie entre les lignes `---` s'appelle **l'en-tête YAML** ou *frontmatter*. Elle fournit les informations utilisées par le site. Le texte après la seconde ligne `---` est le corps de la page.

- Garde exactement les noms des champs (`title`, `locale`, etc.).
- Mets les textes contenant un `:` entre guillemets.
- Écris `true` et `false` sans guillemets.
- Utilise `##` pour les sections : le site affiche déjà le titre principal.
- Laisse une ligne vide avant une liste et entre les paragraphes.
- Choisis `.md` pour les contenus ordinaires. `.mdx` sert aux contenus avec des composants et demande davantage de connaissances techniques.

Certaines pages principales utilisent beaucoup de champs dans l'en-tête. **L'accueil est construit à partir de ses champs** (`lead`, `axis1Text`, `newsTitle`, etc.) : ajouter du texte au bas de `home.md` ne l'affichera pas. Sur les autres pages, les champs pilotent les titres et encadrés, et le corps Markdown fournit le texte principal.

## 4. Modifier une page existante

Exemple : changer un paragraphe de ta présentation.

1. Ouvre `src/content/fra/pages/about.md`.
2. Repère le paragraphe concerné après l'en-tête.
3. Modifie-le et enregistre le fichier.
4. Ouvre `http://localhost:4321/about/` pour vérifier le résultat.
5. Si nécessaire, adapte aussi `lead`, le court texte d'introduction.
6. Mets ensuite à jour les traductions avec la section 7.

Modifier le français **ne modifie pas les autres langues**. Une traduction existante continue à être affichée tant que tu ne la remplaces pas.

## 5. Ajouter une page, sans modifier le code

Prenons une page « Enseignement ».

### Étape 1 — Créer le fichier

Dans le second terminal :

```bash
npm run new:page -- teaching "Enseignement"
```

La commande crée `src/content/fra/pages/teaching.md` avec un modèle. Elle refuse d'écraser un contenu existant ou d'utiliser une adresse déjà prise.

`teaching` est l'**identifiant de l'adresse**, aussi appelé *slug*. Choisis un identifiant **en anglais**, en minuscules, avec des chiffres et tirets, sans espace ni accent : `my-courses`, par exemple. Les noms des pages principales, les codes de langue et les noms de projets existants sont réservés.

### Étape 2 — Écrire et préparer l'affichage

Ouvre le fichier créé. Adapte l'en-tête et remplace le texte du modèle :

```yaml
---
title: "Enseignement"
locale: fra
translationKey: pages-teaching
lead: "Mes cours et ressources pédagogiques."
draft: true
navTitle: "Enseignement"
navOrder: 100
---
```

| Champ | Rôle |
| --- | --- |
| `title` | Titre affiché dans la page |
| `locale` | Langue du fichier, identique à celle du dossier |
| `translationKey` | Identifiant partagé par toutes les traductions de cette page |
| `lead` | Introduction facultative, également utilisée comme description de la page |
| `draft` | `true` masque la page ; `false` permet sa publication |
| `navTitle` | Libellé ajouté automatiquement au menu ; supprime ce champ pour une page sans lien dans le menu |
| `navOrder` | Ordre entre les nouvelles pages du menu : les plus petits nombres passent d'abord |

Les nouvelles entrées apparaissent après le menu principal. Si tu ajoutes beaucoup de pages, garde les entrées essentielles dans le menu et relie les autres depuis le corps des pages.

### Étape 3 — Afficher la page localement

Passe à **`draft: false`**, enregistre et ouvre :

```text
http://localhost:4321/teaching/
```

Un brouillon est masqué aussi en développement. Mettre `draft: false` sur ton ordinateur ne publie pas encore le site sur Internet : la publication intervient après l'envoi sur GitHub.

### Étape 4 — Traduire et vérifier

Suis la section 7 pour créer `src/content/eng/pages/teaching.md`, puis les autres langues souhaitées. Termine avec les vérifications de la section 9.

Tu peux aussi créer le fichier à la main avec le même en-tête. **Aucun fichier `.astro` supplémentaire n'est nécessaire.** Les nouvelles pages ordinaires restent directement dans `pages/`, sans sous-dossier.

## 6. Ajouter une nouvelle ou un projet

### Une nouvelle ou une note

```bash
npm run new:note -- new-course "Un nouveau cours"
```

La commande utilise la date du jour à Bruxelles et crée un fichier dans `src/content/fra/blog/AAAA-MM-JJ/`. Pour choisir la date :

```bash
npm run new:note -- new-course "Un nouveau cours" --date 2026-10-04
```

1. Ouvre le fichier créé.
2. Écris le texte et remplace `description` par un résumé.
3. Ajoute éventuellement des catégories : `tags: ["Enseignement", "Actualité"]`.
4. Passe `draft` à `false`.
5. Vérifie `/notes/` et l'accueil.

La note apparaît automatiquement dans la liste des notes et, si sa date est parmi les cinq plus récentes, dans les nouvelles de l'accueil. Sa page est `/notes/2026-10-04/new-course/`.

La date détermine le classement ; **une date future ne programme pas une publication**. Utilise `draft: true` jusqu'au moment souhaité. Conserve la date, le dossier et le nom du fichier dans les traductions.

### Un projet

```bash
npm run new:project -- my-project "Mon nouveau projet"
```

La commande crée `src/content/fra/projects/my-project.md`. Complète le résumé, le texte et les informations utiles :

```yaml
routeSlug: my-project
summary: "Un résumé du projet."
order: 20
status: "En cours"
domain: "Graphes de connaissances"
startYear: "2026"
endYear: "2029"
funder: "Nom du financeur"
role: "Mon rôle"
budget: "100 000 €"
keywords: ["justice", "données"]
```

Le projet apparaît dans `/projects/`, et sa fiche à `/my-project/`. `order` règle sa position dans la liste. Écris les années **entre guillemets**. Les projets n'ont pas de champ de brouillon : termine la fiche avant de l'envoyer sur GitHub.

Le nom du fichier et `routeSlug` doivent être **en anglais**, et identiques dans toutes les traductions. Changer une adresse déjà publiée peut casser les anciens liens : conserve l'identifiant et modifie seulement le titre si possible.

## 7. Traduire avec ChatGPT, sans clé API

La méthode est la même pour les pages, notes et projets : préparer une consigne, la copier dans ChatGPT, relire le résultat et l'enregistrer. Le site n'appelle aucune API et n'ajoute aucun coût de traduction ; l'utilisation de ChatGPT dépend de ton compte habituel.

### Étape 1 — Terminer le français

Relis d'abord le français. Mets les champs dans leur état définitif, notamment `draft`, avant de préparer la traduction. Tout changement ultérieur du fichier français sera signalé dans le suivi.

### Étape 2 — Préparer la consigne pour l'anglais

```bash
npm run translate:prompt -- src/content/fra/pages/teaching.md eng
```

Le terminal affiche une consigne à partir de « Traduis le document suivant… », suivie du français. Copie **la consigne et le document source**, puis colle-les dans une conversation ChatGPT.

Pour obtenir un fichier texte plus facile à copier :

```bash
node scripts/content.mjs prompt src/content/fra/pages/teaching.md eng > /tmp/traduction-teaching-eng.txt
```

Ouvre ce fichier dans ton éditeur. La commande de préparation ne crée ni ne remplace la traduction.

### Étape 3 — Enregistrer le résultat

Crée `src/content/eng/pages/teaching.md` et colle le fichier retourné par ChatGPT. Si la réponse est entourée de lignes avec trois accents graves, retire ces délimitations : elles ne font pas partie du fichier.

L'en-tête doit notamment contenir :

```yaml
locale: eng
translationKey: pages-teaching
autoTranslated: true
sourceHash: "…l'empreinte de 64 caractères fournie dans la consigne…"
```

Ce bloc est une illustration : **garde la vraie empreinte fournie dans la consigne**, pas les points de suspension.

`autoTranslated: true` affiche une mention de traduction automatique. Mets `false` pour un texte rédigé directement par une personne. `canonical: false`, demandé dans les traductions, indique que ce fichier n'est pas la version de référence des notes ou projets ; ce champ ne définit pas une balise SEO.

### Étape 4 — Relire

Vérifie les faits, dates, noms propres, liens et termes scientifiques. Vérifie que ChatGPT a conservé :

- Le même **nom de fichier en anglais et chemin après le code de langue**, sans traduction des identifiants d’URL.
- La même `translationKey`, même si le titre est traduit.
- Le même `routeSlug` pour un projet.
- La même date et le même dossier de date pour une note.
- Les nombres, formules, balises HTML et classes CSS.
- Les chemins des images et PDF, sans ajout d'un préfixe de langue.

Pour les liens vers d'autres pages, utilise `/eng/projects/` en anglais, `/nld/projects/` en néerlandais, etc. En français, préfère `/projects/`.

### Étape 5 — Vérifier

```bash
npm run check
npm run translations -- src/content/fra/pages/teaching.md
```

Ouvre `http://localhost:4321/eng/teaching/` et teste le sélecteur de langue. Pour une nouvelle traduction non détectée immédiatement, arrête puis relance `npm run dev`.

### Étape 6 — Faire les autres langues

Relance la préparation en remplaçant `eng` par le code voulu :

| Code | Langue | Code | Langue |
| --- | --- | --- | --- |
| `fra` | Français, source | `eng` | Anglais |
| `nld` | Néerlandais | `deu` | Allemand |
| `ita` | Italien | `spa` | Espagnol |
| `por` | Portugais | `zho` | Chinois |
| `rus` | Russe | `jpn` | Japonais |
| `hin` | Hindi | `ara` | Arabe |

Exemple pour une note :

```bash
npm run translate:prompt -- src/content/fra/blog/2026-10-04/new-course.md nld
```

Enregistre la réponse dans `src/content/nld/blog/2026-10-04/new-course.md`.

### Si une traduction manque

Le site utilise la langue demandée, puis l'anglais, puis le français. Ce mécanisme **affiche un texte existant ; il ne le traduit pas**. L'interface conserve la langue choisie, mais le contenu peut provenir d'une langue de secours.

Une traduction avec `draft: true` est ignorée pour les pages et notes. Le site peut alors afficher une autre version publiée. Pour masquer complètement une page ordinaire ou une note, mets toutes ses versions en brouillon.

### Si tu modifies le français plus tard

```bash
npm run translations
```

Le rapport distingue :

- **manquantes** : aucun fichier de traduction dans cette langue ;
- **à revoir** : le français a changé depuis la préparation de la traduction ;
- **suivies** : le français n'a pas changé ; cela ne certifie pas la qualité de la traduction ;
- **sans empreinte (à vérifier)** : traduction historique sans `sourceHash`, dont la fraîcheur est inconnue.

Pour mettre une traduction à jour, reprends la procédure avec la nouvelle source et remplace le fichier après relecture. Ne recopie pas simplement une nouvelle empreinte dans une ancienne traduction : cela masquerait le besoin de mise à jour. Les traductions historiques n'ont pas été déclarées à jour artificiellement.

## 8. Ajouter une image, un PDF ou une publication

### Une image ou un PDF

Place une image dans `public/img/`, par exemple `mon-schema.png`, puis écris :

```markdown
![Description du schéma](/img/mon-schema.png)
```

Pour un PDF, crée par exemple `public/documents/cv.pdf`, puis ajoute :

```markdown
[Télécharger mon CV](/documents/cv.pdf)
```

Les chemins commencent par `/`, sans `public` et sans code de langue. Ils sont identiques dans les traductions. Utilise des noms simples et respecte leur casse. Les fichiers de `public/` sont mis à disposition tels quels.

### Une référence bibliographique

Les références sont lues directement dans `data/index.bib`. Ajoute une entrée BibTeX, par exemple :

```bibtex
@article{jeuniaux2026exemple,
  author = {Jeuniaux, Patrick and Dupont, Marie},
  title = {Titre de la publication},
  year = {2026},
  journal = {Nom de la revue},
  language = {fra},
  doi = {10.xxxx/exemple},
  selected = {true}
}
```

Remplace les valeurs fictives, notamment le DOI, par les vraies informations. Vérifie `/work/`. Seules les entrées où Patrick Jeuniaux figure parmi les auteurs sont retenues. La sélection met en avant les entrées explicitement marquées ou celles où il est premier auteur. Les références restent dans leur langue originale.

Ton fichier bibliographique habituel est `/home/pjeuniaux/Documents/study/library.bib`. Pour mettre le site à jour à partir de ce fichier :

```bash
npm run sync-bib
npm run build
```

Pour utiliser un autre fichier :

```bash
npm run sync-bib -- /chemin/vers/mes-references.bib
```

Cette commande **remplace `data/index.bib`**. Sans argument, elle copie `/home/pjeuniaux/Documents/study/library.bib` ; le fichier source reste intact. La copie n'est pas automatique : relance `npm run sync-bib` après avoir modifié ta bibliothèque, puis vérifie `/work/` avant publication. Le lecteur couvre les champs utilisés par ce site ; il ne constitue pas un moteur BibTeX complet.

## 9. Vérifier avant de publier

```bash
npm run check
npm test
npm run build
npm run preview
```

| Commande | Ce qu'elle fait |
| --- | --- |
| `npm run check` | Vérifie les contenus, langues, clés, conflits d'URL et types du code Astro |
| `npm test` | Teste les outils de création et de suivi des traductions |
| `npm run build` | Valide les contenus, construit le site et vérifie les liens internes du HTML généré |
| `npm run preview` | Sert la dernière construction, généralement sur `http://localhost:4321` |

Le vérificateur contrôle les cibles internes, ancres HTML et redirections. Il ne teste pas les sites externes, liens injectés par JavaScript ou ressources référencées uniquement dans le CSS. Relis dans le navigateur le rendu, les filtres et les traductions.

`preview` ne reconstruit pas le site : après une modification, relance `build` pour voir le nouveau résultat.

### Publier sur GitHub Pages

1. Vérifie les modifications :

   ```bash
   git status
   git diff
   ```

2. Dans ton éditeur, sélectionne les fichiers voulus et crée un commit. En terminal, ajoute explicitement les fichiers, par exemple :

   ```bash
   git add src/content/fra/pages/teaching.md src/content/eng/pages/teaching.md
   git commit -m "Ajouter la page teaching et sa traduction anglaise"
   ```

3. Vérifie la branche avec `git branch --show-current`. Le déploiement automatique est configuré pour **`master`**. Depuis une autre branche, intègre les modifications dans `master` selon ta méthode habituelle.
4. Envoie les commits avec `git push`.
5. Sur GitHub, ouvre **Actions**, puis **Deploy to GitHub Pages**. Attends que le workflow soit terminé et vert.
6. Vérifie **https://patrickjeuniaux.github.io**.

Dans les paramètres du dépôt, GitHub Pages doit utiliser **GitHub Actions** comme source. Une erreur de contenu, de code ou un lien interne cassé empêche le déploiement.

Ne modifie pas `dist/` : ce dossier est recréé à chaque construction et n'est pas suivi par Git.

## 10. Les dates affichées dans le pied de page

Tu peux préciser des dates éditoriales dans l'en-tête d'une page ou d'un projet :

```yaml
publishedAt: 2026-10-04
updatedAt: 2026-10-05
```

Pour une note, `date` fournit la date de publication ; `updatedAt` peut préciser sa dernière révision. Les traductions conservent les dates éditoriales de la source.

Sans date explicite, le site utilise le premier et le dernier commit Git touchant le fichier. Ce sont des dates d'historique, qui peuvent différer de la publication réelle. Le workflow récupère l'historique complet pour les conserver après déploiement. Sans historique, aucune date de fichier n'est inventée.

## 11. Résoudre les problèmes courants

| Problème | Que vérifier ? |
| --- | --- |
| npm échoue dès le départ | Dossier contenant `package.json`, Node au moins en version 22.12 et installation avec `npm ci` |
| Une nouvelle page est invisible | `draft: false` dans au moins une version disponible, nom du fichier et adresse |
| Une traduction est ignorée | Dossier et `locale` correspondants, nom du fichier et `translationKey` identiques à la source |
| Le menu n'affiche pas ma page | Champ `navTitle` et page publiée ; les fiches projets apparaissent dans la liste des projets |
| Erreur dans l'en-tête YAML | Deux lignes `---`, guillemets, listes et indentation |
| Conflit d'URL | Choisir un autre nom de page ou `routeSlug` ; les noms principaux sont réservés |
| Cible absente au build | Corriger le lien dans le contenu source de la page indiquée ou ajouter le fichier public manquant |
| Le site public n'a pas changé | Push sur `master`, résultat dans Actions, puis rechargement du navigateur |
| Une ancienne traduction reste affichée | Préparer une nouvelle traduction et remplacer le fichier après relecture |

## 12. Repères pour la maintenance technique

Les modifications éditoriales courantes restent dans `src/content/`, `public/` et `data/`. Pour changer le fonctionnement du site :

| Fichier ou dossier | Responsabilité |
| --- | --- |
| `src/i18n/config.mjs` | Langues, ordre de secours et noms réservés, partagés avec Astro et les outils |
| `src/i18n/ui.ts` | Textes d'interface traduits et construction des liens |
| `src/content.config.ts` | Champs acceptés et validation des collections |
| `src/lib/` | Sélection des traductions, regroupement des projets et notes, lecteur BibTeX |
| `src/components/pages/` | Présentation des pages principales et fiches |
| `src/pages/` | Adresses et redirections |
| `src/layouts/BaseLayout.astro` | Cadre commun, menus et pied de page |
| `scripts/content.mjs` | Création, consignes ChatGPT et suivi des traductions |
| `scripts/check-content.mjs` | Cohérence des fichiers et adresses |
| `scripts/check-links.mjs` | Liens après construction |
| `.github/workflows/deploy.yml` | Vérification, construction et publication |

La configuration conserve le rendu Markdown avec remark/rehype pour les formules mathématiques. Les choix de migration suivent le [guide officiel Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/).

Pour entretenir les dépendances, lance `npm audit`, applique les mises à jour compatibles et refais les vérifications de la section 9. Une mise à jour majeure demande de lire le guide de migration. Enregistre toujours `package.json` **et** `package-lock.json` ensemble.

Ajouter une langue supplémentaire est une modification technique : configuration, textes d'interface, formats de date et types doivent être complétés. Ajouter des pages dans les douze langues existantes suit simplement ce guide.
