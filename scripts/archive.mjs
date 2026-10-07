import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';
const root = fileURLToPath(new URL('../', import.meta.url));
const excluded = new Set(['node_modules', 'dist', '.astro', '.git', 'archives', 'os', 'shutil', 'temp_context']);
function omit(name) {
  return excluded.has(name) || /^\.env(?:\.|$)/.test(name) || name === '.npmrc' ||
    /\.(?:zip|tar\.gz|log|pem|key)$/i.test(name) || ['.DS_Store', 'Thumbs.db'].includes(name);
}
try {
  // Refuse an incomplete source package instead of silently omitting the recipe.
  await readFile(path.join(root, 'package-lock.json'));
  await readFile(path.join(root, '.github/workflows/deploy.yml'));
  const files = {};
  async function walk(dir, prefix = '') {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (omit(entry.name)) continue;
      const name = prefix + entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Lien symbolique non archivé : ${name}`);
      if (entry.isDirectory()) await walk(path.join(dir, entry.name), name + '/');
      else if (entry.isFile()) {
        const bytes = await readFile(path.join(dir, entry.name));
        if (/(?:github_pat_[A-Za-z0-9_]{20,}|gh[pousr]_[A-Za-z0-9]{20,})/.test(bytes.toString('utf8'))) {
          throw new Error(`Jeton GitHub potentiel dans ${name} : retire-le avant de partager une archive.`);
        }
        files[name] = bytes;
      }
    }
  }
  await walk(root);
  const destination = path.join(root, 'archives');
  await mkdir(destination, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const output = path.join(destination, `CodeSourceAstro-${stamp}.zip`);
  await writeFile(output, zipSync(files, { level: 6 }), { flag: 'wx' });
  console.log(`Archive complète des sources (${Object.keys(files).length} fichiers) : ${output}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
