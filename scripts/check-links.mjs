import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import { site } from '../src/site.config.mjs';

const root = path.resolve('dist');
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}
function collect(node, links, ids) {
  const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
  if (attrs.id) ids.add(attrs.id);
  if (node.tagName === 'a' && attrs.name) ids.add(attrs.name);
  if (['a', 'area', 'link'].includes(node.tagName) && attrs.href) links.push(attrs.href);
  if (['img', 'script', 'source', 'iframe'].includes(node.tagName) && attrs.src) links.push(attrs.src);
  if (node.tagName === 'meta' && attrs['http-equiv']?.toLowerCase() === 'refresh') {
    const match = /url\s*=\s*(.*)/i.exec(attrs.content ?? '');
    if (match) links.push(match[1].replace(/^['"]|['"]$/g, ''));
  }
  for (const child of node.childNodes ?? []) collect(child, links, ids);
}

try {
  const files = await walk(root);
  const pages = new Map();
  for (const file of files) {
    const links = [], ids = new Set();
    collect(parse(await readFile(file, 'utf8')), links, ids);
    pages.set(file, { links, ids });
  }
  const failures = new Set();
  for (const [file, { links }] of pages) {
    const pathname = '/' + path.relative(root, file).split(path.sep).join('/').replace(/index\.html$/, '');
    const base = new URL(pathname, site);
    for (const link of links) {
      let url;
      try { url = new URL(link, base); } catch { failures.add(`${pathname} → URL invalide : ${link}`); continue; }
      if (url.origin !== base.origin) continue;
      let target = path.resolve(root, '.' + decodeURIComponent(url.pathname));
      if (target !== root && !target.startsWith(root + path.sep)) { failures.add(`${pathname} → ${link}`); continue; }
      try {
        if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
        await stat(target);
        if (url.hash && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) failures.add(`${pathname} → ancre absente : ${link}`);
      } catch { failures.add(`${pathname} → cible absente : ${link}`); }
    }
  }
  if (failures.size) throw new Error([...failures].join('\n'));
  console.log(`Liens internes vérifiés dans ${pages.size} pages HTML (y compris les redirections et les ancres).`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
