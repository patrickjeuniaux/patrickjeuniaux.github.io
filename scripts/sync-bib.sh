#!/usr/bin/env bash
set -euo pipefail
SOURCE="${1:-/home/pjeuniaux/Documents/study/BibTeX/merged.bib}"
TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/data"
TARGET="$TARGET_DIR/index.bib"

if [[ ! -f "$SOURCE" ]]; then
  echo "Source BibTeX file not found: $SOURCE" >&2
  exit 1
fi
mkdir -p "$TARGET_DIR"
cp "$SOURCE" "$TARGET"
echo "Synchronized: $SOURCE -> $TARGET"
