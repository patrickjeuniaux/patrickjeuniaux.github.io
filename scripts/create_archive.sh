#!/bin/bash

# Ce script crée une archive du code source pour la partager facilement
# Les dossiers lourds et inutiles sont ignorés.

# Obtenir la date du jour
DATE=$(date +"%Y-%m-%d")
ARCHIVE_BASE="$HOME/dev/web/archives/$DATE"

# Créer le dossier du jour s'il n'existe pas
mkdir -p "$ARCHIVE_BASE"

# Chercher le prochain numéro (1, 2, 3...) qui n'existe pas encore
NEXT_NUM=1
while [ -d "$ARCHIVE_BASE/$NEXT_NUM" ]; do
    NEXT_NUM=$((NEXT_NUM + 1))
done

# Créer le sous-répertoire numéroté
NEXT_DIR="$ARCHIVE_BASE/$NEXT_NUM"
mkdir -p "$NEXT_DIR"

# Nom et destination du fichier ZIP
ARCHIVE_NAME="CodeSourceAstro.zip"
DESTINATION="$NEXT_DIR/$ARCHIVE_NAME"

echo "⏳ Préparation de l'archive source Astro..."

# Se déplacer à la racine du projet (un niveau au-dessus du dossier 'scripts')
cd "$(dirname "$0")/.."

# Création de l'archive ZIP
# On exclut tous les répertoires et fichiers lourds ou inutiles
zip -rq "$DESTINATION" . -x \
  "node_modules/*" \
  "dist/*" \
  ".astro/*" \
  ".git/*" \
  ".github/*" \
  "package-lock.json" \
  "os/*" \
  "shutil/*" \
  "temp_context/*" \
  "*.zip" \
  "*.tar.gz"

# Vérification
if [ -f "$DESTINATION" ]; then
    echo "✅ Terminé ! L'archive a été générée dans le dossier d'archives :"
    echo "   👉 $DESTINATION"
    echo "   Vous pouvez maintenant glisser/déposer ce fichier dans ChatGPT."
else
    echo "❌ Une erreur s'est produite lors de la création de l'archive."
fi
