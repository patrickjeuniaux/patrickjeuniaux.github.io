import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import * as yaml from 'js-yaml';
import { createHash } from 'node:crypto';

const cli = fileURLToPath(new URL('./content.mjs', import.meta.url));
const checker = fileURLToPath(new URL('./check-content.mjs', import.meta.url));
const linkChecker = fileURLToPath(new URL('./check-links.mjs', import.meta.url));
function run(script, args, cwd) {
  const result = spawnSync(process.execPath, [script, ...args], { cwd, encoding: 'utf8' });
  if (result.error) throw result.error;
  return result;
}
async function workspace(t) {
  const dir = await mkdtemp(path.join(tmpdir(), 'ppjmhj-content-test-'));
  await mkdir(path.join(dir, 'src/content'), { recursive: true });
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

test('création, préparation de traduction et détection d’une modification du français', async (t) => {
  const dir = await workspace(t);
  assert.equal(run(cli, ['pages', 'teaching', 'Enseignement'], dir).status, 0);
  const frenchPath = 'src/content/fra/pages/teaching.md';
  const french = await readFile(path.join(dir, frenchPath), 'utf8');
  assert.match(french, /draft: true/);
  const prompt = run(cli, ['prompt', frenchPath, 'eng'], dir);
  assert.equal(prompt.status, 0);
  assert.match(prompt.stdout, /src\/content\/eng\/pages\/teaching.md/);
  const hash = createHash('sha256').update(french).digest('hex');
  assert.ok(prompt.stdout.includes(hash));
  assert.ok(prompt.stdout.includes(french));
  const translated = french.replace('locale: fra', 'locale: eng').replace(/\n---\n/, `\nsourceHash: "${hash}"\n---\n`);
  await mkdir(path.join(dir, 'src/content/eng/pages'), { recursive: true });
  await writeFile(path.join(dir, 'src/content/eng/pages/teaching.md'), translated);
  assert.equal(run(checker, [], dir).status, 0);
  assert.match(run(cli, ['translations', frenchPath], dir).stdout, /suivies : eng/);
  await writeFile(path.join(dir, frenchPath), french + '\nUn nouveau cours.\n');
  assert.match(run(cli, ['translations', frenchPath], dir).stdout, /à revoir : eng/);
});

test('protection des contenus existants, adresses réservées et dates de notes', async (t) => {
  const dir = await workspace(t);
  assert.equal(run(cli, ['pages', 'notes', 'Notes'], dir).status, 1);
  assert.equal(run(cli, ['projects', 'research', 'Recherche'], dir).status, 0);
  const before = await readFile(path.join(dir, 'src/content/fra/projects/research.md'), 'utf8');
  assert.equal(run(cli, ['pages', 'research', 'Autre page'], dir).status, 1);
  assert.equal(await readFile(path.join(dir, 'src/content/fra/projects/research.md'), 'utf8'), before);
  assert.equal(run(cli, ['blog', 'announcement', 'Annonce', '--date', '2026-02-30'], dir).status, 1);
  assert.equal(run(cli, ['blog', 'announcement', 'Annonce', '--date', '2026-10-04'], dir).status, 0);
  const note = await readFile(path.join(dir, 'src/content/fra/blog/2026-10-04/announcement.md'), 'utf8');
  const metadata = yaml.load(note.split('---')[1]);
  assert.equal(metadata.draft, true);
  assert.equal(metadata.translationKey, 'blog-announcement');
  assert.equal(run(cli, ['blog', 'announcement', 'À écraser', '--date', '2026-10-04'], dir).status, 1);
});

test('détection d’une traduction avec une langue ou une adresse incohérente', async (t) => {
  const dir = await workspace(t);
  assert.equal(run(cli, ['projects', 'research', 'Recherche'], dir).status, 0);
  const original = await readFile(path.join(dir, 'src/content/fra/projects/research.md'), 'utf8');
  await mkdir(path.join(dir, 'src/content/eng/projects'), { recursive: true });
  await writeFile(path.join(dir, 'src/content/eng/projects/research.md'), original.replace('routeSlug: research', 'routeSlug: studies'));
  const result = run(checker, [], dir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /locale doit être eng/);
  assert.match(result.stderr, /routeSlug doit rester identique/);
});

test('vérification des redirections, fichiers publics et ancres', async (t) => {
  const dir = await workspace(t);
  await mkdir(path.join(dir, 'dist/cible'), { recursive: true });
  await writeFile(path.join(dir, 'dist/index.html'), '<a href="/cible/#section">Lien</a><img src="/image.png"><a href="https://example.com/absent">Externe</a>');
  await writeFile(path.join(dir, 'dist/image.png'), 'fixture');
  await writeFile(path.join(dir, 'dist/cible/index.html'), '<h1 id="section">Section</h1>');
  assert.equal(run(linkChecker, [], dir).status, 0);
  await writeFile(path.join(dir, 'dist/cible/index.html'), '<meta http-equiv="refresh" content="0;url=/absent/">');
  const result = run(linkChecker, [], dir);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /ancre absente/);
  assert.match(result.stderr, /cible absente : \/absent\//);
});
