import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import * as yaml from 'js-yaml';
import { locales } from '../src/i18n/config.mjs';

export const contentRoot = path.resolve('src/content');

export async function readContent(file) {
  const absolute = path.resolve(file);
  const relative = path.relative(contentRoot, absolute).split(path.sep).join('/');
  const [locale, collection, ...parts] = relative.split('/');
  if (!locales.includes(locale) || !['pages', 'projects', 'blog'].includes(collection) || !/\.(md|mdx)$/.test(relative)) {
    throw new Error(`Chemin de contenu invalide : ${file}. Attendu : src/content/<langue>/<pages|projects|blog>/<fichier>.md`);
  }
  const raw = (await readFile(absolute, 'utf8')).replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---(?:\n|$)/.exec(raw);
  if (!match) throw new Error(`En-tête YAML absent ou mal délimité : ${file}`);
  const data = yaml.load(match[1]);
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error(`En-tête YAML invalide : ${file}`);
  return {
    file: absolute, relative, locale, collection, name: parts.join('/'),
    data, raw, body: raw.slice(match[0].length),
    hash: createHash('sha256').update(raw).digest('hex'),
  };
}

export async function listContent(root = contentRoot) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const file = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await listContent(file));
    else if (/\.(md|mdx)$/.test(entry.name)) files.push(file);
  }
  return files.sort();
}

export async function allContent() {
  return Promise.all((await listContent()).map(readContent));
}
