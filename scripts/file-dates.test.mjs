import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, writeFile, utimes, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { getFileDates, getContentDates, formatFooterDate } from '../src/lib/file-dates.mjs';

async function workspace(t, withGit = true) {
  const cwd = await mkdtemp(path.join(tmpdir(), 'ppjmhj-file-dates-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  if (withGit) execFileSync('git', ['init', '-q'], { cwd });
  return cwd;
}

function commit(cwd, date) {
  execFileSync('git', ['add', '.'], { cwd });
  execFileSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'Content update'], {
    cwd, env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
  });
}

test('dates des commits conservées malgré les horodatages d’un téléchargement ou d’une reconstruction', async (t) => {
  const cwd = await workspace(t);
  const file = path.join(cwd, 'page.md');
  await writeFile(file, 'Original');
  commit(cwd, '2000-01-01T12:00:00Z');
  await writeFile(file, 'Updated');
  commit(cwd, '2000-02-01T12:00:00Z');
  await utimes(file, new Date('2035-01-01'), new Date('2035-01-01'));
  const dates = getFileDates(file, cwd);
  assert.equal(dates.birthtime.toISOString(), '2000-01-01T12:00:00.000Z');
  assert.equal(dates.mtime.toISOString(), '2000-02-01T12:00:00.000Z');
});

test('une modification locale est détectée à chaque lecture et une annulation retrouve la date Git', async (t) => {
  const cwd = await workspace(t);
  const file = path.join(cwd, 'page.md');
  await writeFile(file, 'Original');
  commit(cwd, '2000-01-01T12:00:00Z');
  for (const date of ['2001-01-01T12:00:00Z', '2001-02-01T12:00:00Z']) {
    await writeFile(file, `Updated ${date}`);
    await utimes(file, new Date(date), new Date(date));
    assert.equal(getFileDates(file, cwd).mtime.toISOString(), new Date(date).toISOString());
  }
  await writeFile(file, 'Original');
  assert.equal(getFileDates(file, cwd).mtime.toISOString(), '2000-01-01T12:00:00.000Z');
});

test('un fichier nouveau affiche sa modification locale sans inventer une publication', async (t) => {
  const cwd = await workspace(t);
  const file = path.join(cwd, 'new-page.md');
  await writeFile(file, 'New content');
  const date = new Date('2001-01-01T12:00:00Z');
  await utimes(file, date, date);
  const dates = getFileDates(file, cwd);
  assert.equal(dates.birthtime, undefined);
  assert.equal(dates.mtime.toISOString(), date.toISOString());
});

test('la première publication est conservée après un renommage', async (t) => {
  const cwd = await workspace(t);
  await writeFile(path.join(cwd, 'old-page.md'), 'Content');
  commit(cwd, '2000-01-01T12:00:00Z');
  execFileSync('git', ['mv', 'old-page.md', 'new-page.md'], { cwd });
  commit(cwd, '2000-02-01T12:00:00Z');
  const dates = getFileDates('new-page.md', cwd);
  assert.equal(dates.birthtime.toISOString(), '2000-01-01T12:00:00.000Z');
  assert.equal(dates.mtime.toISOString(), '2000-02-01T12:00:00.000Z');
});

test('une page de liste suit ses contenus sans changer sa date de première publication', async (t) => {
  const cwd = await workspace(t);
  await writeFile(path.join(cwd, 'page.md'), 'List');
  commit(cwd, '2000-01-01T12:00:00Z');
  await writeFile(path.join(cwd, 'data.bib'), 'Bibliography');
  commit(cwd, '2000-03-01T12:00:00Z');
  let dates = getContentDates('page.md', ['data.bib'], cwd);
  assert.equal(dates.birthtime.toISOString(), '2000-01-01T12:00:00.000Z');
  assert.equal(dates.mtime.toISOString(), '2000-03-01T12:00:00.000Z');
  await writeFile(path.join(cwd, 'data.bib'), 'Updated bibliography');
  await utimes(path.join(cwd, 'data.bib'), new Date('2001-01-01'), new Date('2001-01-01'));
  dates = getContentDates('page.md', ['data.bib'], cwd);
  assert.equal(dates.mtime.toISOString(), '2001-01-01T00:00:00.000Z');
});

test('absence de date inventée sans dépôt Git ou pour un fichier ignoré', async (t) => {
  const plain = await workspace(t, false);
  await writeFile(path.join(plain, 'page.md'), 'Content');
  assert.equal(getFileDates('page.md', plain), null);
  const cwd = await workspace(t);
  await writeFile(path.join(cwd, '.gitignore'), 'ignored.md\n');
  commit(cwd, '2000-01-01T12:00:00Z');
  await writeFile(path.join(cwd, 'ignored.md'), 'Ignored');
  assert.equal(getFileDates('ignored.md', cwd), null);
  assert.equal(getContentDates(undefined, [], cwd), null);
});

test('les dates affichées suivent Bruxelles, avec l’heure d’été et l’heure d’hiver', () => {
  assert.equal(formatFooterDate(new Date('2026-10-04T22:30:00Z')), '2026-10-05');
  assert.match(formatFooterDate(new Date('2026-10-04T22:30:00Z'), true), /^2026-10-05 00:30 /);
  assert.match(formatFooterDate(new Date('2026-01-04T22:30:00Z'), true), /^2026-01-04 23:30 /);
});
