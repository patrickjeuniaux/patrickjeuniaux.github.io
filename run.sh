#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
if [ "$#" -eq 0 ]; then
  echo 'Usage : bash run.sh dev|verify|archive|sync-bib [arguments]'
  exit 0
fi
command="$1"
shift
case "$command" in
  dev|verify|archive|sync-bib|preview) exec npm run "$command" -- "$@" ;;
  *) echo "Commande inconnue : $command" >&2; exit 1 ;;
esac
