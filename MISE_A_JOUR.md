# Mise à jour du 7 octobre 2026

Cette livraison repart de CodeSourceAstro(1).zip. Les contenus et la présentation sont conservés.

## Installer dans ton dépôt existant

1. Sauvegarde tes modifications locales (commit ou copie).
2. Décompresse ce ZIP dans le dossier du projet, en remplaçant les fichiers concernés. Inclus les fichiers cachés, notamment `.github`, `.nvmrc` et `.gitignore`. Conserve ton dossier `.git` : il contient ton historique et la connexion au dépôt.
3. Depuis ce dossier :

```sh
npm ci
npm run verify
npm run dev
```

Arrête le serveur local avec Ctrl+C. Pour publier, examine les changements avec `git diff` et `git status`, puis crée ton commit et pousse vers `master`. Aucun script de cette livraison ne publie ou ne crée de commit automatiquement.

Le nouveau `.github/workflows/deploy.yml` remplace l'ancien workflow de publication. Si ton dépôt contient un autre workflow déployant aussi Pages, désactive ce doublon. GitHub Pages doit utiliser GitHub Actions comme source. Les règles d'approbation de l'environnement github-pages restent celles définies dans GitHub.

## Commandes principales (Linux et Windows)

| Commande | Fonction |
| --- | --- |
| `npm run dev` | Serveur de travail, à arrêter avec Ctrl+C. |
| `npm run verify` | Tests, validation Astro, construction et vérification des liens. |
| `npm run preview` | Consulte le dernier site construit. |
| `npm run sync-bib -- "chemin/vers/library.bib"` | Copie le BibTeX dans data/index.bib. |
| `npm run archive` | ZIP horodaté dans archives/. |

Sur Windows, un chemin peut être `"C:\Users\Patrick\Documents\library.bib"`. Sans argument, sync-bib lit BIB_SOURCE ; il échoue explicitement si elle n'est pas définie. L'ancien chemin personnel Linux n'est plus implicite.

Les anciens scripts Bash restent des raccourcis ; Windows peut utiliser directement les commandes npm sans MSYS2. Le nouveau run.sh doit être placé dans le projet. Il ne contient aucun identifiant et remplace la procédure mêlant serveur local, commit et push. Si tu conserves ailleurs ton ancien run.sh, retire-le de ton usage ; le jeton précédemment partagé doit être révoqué s'il est encore valide.

## Archives et reproductibilité

L'archive inclut les sources, contenus, images, BibTeX, documentation, package-lock.json et .github/. Elle exclut node_modules, dist, .astro, .git, archives, caches et fichiers locaux de secrets (.env*, .npmrc, .pem, .key). Elle n'est donc pas une sauvegarde de l'historique Git ni des secrets, et n'inclut pas des PDF stockés hors du projet. npm ci reconstruit les dépendances avec accès au registre npm.

Le verrouillage a été généré pour cette livraison : l'ancien fichier était absent du ZIP reçu. Les versions exactes sont désormais enregistrées. Une dépendance légère, fflate, permet de produire les ZIP sans programme zip externe. Une détection de formats courants de jetons GitHub bloque l'archivage ; ce contrôle ne garantit pas la détection de tous les secrets.

## Déploiement et contrôles

GitHub installe avec npm ci et exécute npm run verify. Les pull requests sont validées sans publication. Les publications sur master sont sérialisées ; une publication active n'est pas interrompue. Les droits Pages sont limités au travail de déploiement. L'historique Git complet est récupéré pour calculer les dates.

L'adresse publique est centralisée dans src/site.config.mjs. Les liens absolus vers ce domaine sont maintenant vérifiés comme les liens relatifs ; les sites externes ne sont pas interrogés.

La branche Node utilisée par GitHub est définie dans .nvmrc (22). Le projet demande au minimum Node 22.12. Le ZIP n'inclut pas d'environnement Node.

## Vérifications de cette livraison

- 12 tests automatisés réussis, dont le nouveau contrôle des liens absolus internes.
- Astro check : 43 fichiers, aucune erreur, aucun avertissement, aucune suggestion.
- Construction : 520 pages annoncées par Astro ; vérification de 514 fichiers HTML réussie.
- ZIP relu avec contrôle d'intégrité et vérification de la présence du verrouillage et du workflow.
- Synchronisation BibTeX testée depuis un autre dossier, avec un chemin contenant des espaces, et avec une source absente.
- Contenus Markdown, fichiers publics et bibliographie comparés octet par octet avec le ZIP reçu : inchangés.

Exécution locale sous Linux avec Node 24.19.0. Windows et le déploiement réel GitHub n'ont pas été exécutés ici. L'archive source ne contient pas l'historique Git : pour conserver les dates calculées à partir des commits, installe cette livraison dans ton dépôt existant.
