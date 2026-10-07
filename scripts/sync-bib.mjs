import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
try {
  const source = process.argv[2] || process.env.BIB_SOURCE;
  if (!source || process.argv.length > 3) throw new Error('Usage : npm run sync-bib -- "chemin/vers/library.bib" (ou définir BIB_SOURCE).');
  const target = path.join(root, 'data', 'index.bib');
  if (!(await stat(source)).isFile()) throw new Error('La source doit être un fichier.');
  if (path.resolve(source) !== target) {
    await mkdir(path.dirname(target), { recursive: true });
    await copyFile(source, target);
  }
  console.log(`Bibliographie synchronisée : ${target}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
