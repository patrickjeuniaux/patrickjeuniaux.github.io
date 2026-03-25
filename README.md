# Guide de Gestion du Contenu - PPJMHJ

Ce site est construit avec **Astro**, un framework web moderne axé sur le contenu. La quasi-totalité du contenu textuel (pages, projets, notes) est géré via des fichiers **Markdown (.md)** ou **MDX (.mdx)** situés dans le dossier `src/content/`.

---

## 1. Comment fonctionne le site ?

Astro utilise le concept de **Collections de contenu**. Chaque dossier dans `src/content/` correspond à un type de données :

- `pages/` : Contenu statique des pages principales (Accueil, À propos, Contact).
- `projects/` : Liste des projets de recherche et d'infrastructure.
- `blog/` : Notes de travail et nouvelles qui apparaissent sur la page d'accueil.

Le site est **multilingue**. Chaque collection est organisée par code de langue (ex: `fra/`, `eng/`, `nld/`).

---

## 2. Ajouter ou Modifier des Nouvelles (Blog)

Les nouvelles en page d'accueil sont tirées automatiquement des 5 dernières notes ajoutées dans `src/content/blog/fra/`.

### Pour ajouter une nouvelle :
1. Créez un dossier par date dans `src/content/blog/fra/YYYY-MM-DD/`.
2. Créez un fichier `.md` dedans (ex: `mon-annonce.md`).
3. Remplissez le **Frontmatter** (l'en-tête entre `---`) :
   ```yaml
   ---
   title: "Titre de la nouvelle"
   description: "Bref résumé pour le SEO"
   date: 2026-03-22
   draft: false
   locale: fra
   translationKey: ma-nouvelle-unique
   canonical: true
   ---
   ```
4. Écrivez votre texte en dessous. Il s'affichera sur sa propre page quand on clique sur le titre dans la sidebar.

---

## 3. Ajouter ou Modifier des Projets

Les projets se trouvent dans `src/content/projects/fra/`.

### Champs importants :
- `title`: Titre complet du projet.
- `routeSlug`: L'URL du projet (ex: `kg4j`).
- `status`: "En cours" ou "Terminé".
- `domain`: "Criminal Justice", "Knowledge Graphs", etc.
- `startYear` / `endYear`: Dates du projet.
- `funder`: Le bailleur de fonds (ex: "BELSPO").
- `keywords`: Liste de mots-clés (ex: `['NLP', 'Law']`).

---

## 4. Modifier les informations de base (Tagline, Menus)

Les textes d'interface (boutons, filtres, menus) sont centralisés dans `src/i18n/ui.ts`.

Si vous voulez changer le titre d'un filtre ou traduire un mot dans une autre langue, c'est là qu'il faut intervenir. Les langues sont identifiées par des codes ISO à 3 lettres (`fra`, `eng`, `nld`, etc.).

---

## 5. Maintenance technique

- **Développement** : `npm run dev` pour voir les changements en local.
- **Vérification** : `npm run build` pour s'assurer que tous les liens sont valides (Astro vérifie les 404 au build).
- **Style** : La mise en page globale est gérée dans `src/styles/global.css`.

---
*Ce guide a été généré pour aider Patrick Jeuniaux à faire croître son espace intellectuel stable.*


## Contenu français à réviser en priorité

- `src/content/pages/fra/home.md`
- `src/content/pages/fra/about.md`
- `src/content/pages/fra/projects.md`
- `src/content/pages/fra/publications.md`
- `src/content/pages/fra/notes.md`
- `src/content/pages/fra/contact.md`
- `src/content/pages/fra/collaborations.md`
- `src/content/projects/fra/*.md`
