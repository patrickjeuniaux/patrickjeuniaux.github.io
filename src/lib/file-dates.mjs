import { execFileSync } from 'node:child_process';
import { statSync } from 'node:fs';
import path from 'node:path';

/** @param {string} filePath @param {string} [cwd] */
export function getFileDates(filePath, cwd = process.cwd()) {
  const absolutePath = path.resolve(cwd, filePath);
  const git = (args) => execFileSync('git', args, {
    cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();

  try {
    const changed = git(['status', '--porcelain=v1', '--untracked-files=all', '--', absolutePath]);
    let history = [];
    try {
      history = git(['log', '--follow', '--format=%cI', '--', absolutePath])
        .split('\n').filter(Boolean).map((value) => new Date(value));
    } catch {
      // A repository with no commits can still contain locally edited content.
    }
    let mtime = history[0];
    if (changed) {
      // Only use the filesystem timestamp for a real local change, never a clean checkout.
      const localDate = statSync(absolutePath).mtime;
      if (!mtime || localDate > mtime) mtime = localDate;
    }
    if (!mtime) return null;
    return { birthtime: history.at(-1), mtime };
  } catch {
    return null;
  }
}

/** @param {string | undefined} filePath @param {string[]} [dependencies] @param {string} [cwd] */
export function getContentDates(filePath, dependencies = [], cwd = process.cwd()) {
  const primary = filePath ? getFileDates(filePath, cwd) : null;
  const dates = [primary?.mtime, ...new Set(dependencies.filter((entry) => entry !== filePath))]
    .map((entry) => typeof entry === 'string' ? getFileDates(entry, cwd)?.mtime : entry)
    .filter((date) => date !== undefined);
  if (!dates.length) return primary;
  return {
    birthtime: primary?.birthtime,
    mtime: new Date(Math.max(...dates.map((date) => date.getTime()))),
  };
}

/** @param {Date} date @param {boolean} [includeTime] */
export function formatFooterDate(date, includeTime = false) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('fr-BE', {
    timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZoneName: 'short',
  }).formatToParts(date).map(({ type, value }) => [type, value]));
  const day = `${parts.year}-${parts.month}-${parts.day}`;
  return includeTime ? `${day} ${parts.hour}:${parts.minute} (${parts.timeZoneName})` : day;
}
