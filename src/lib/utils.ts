import { execFileSync } from 'node:child_process';
import path from 'node:path';

const dateCache = new Map<string, { birthtime: Date; mtime: Date } | null>();

export function getFileDates(filePath: string) {
  if (dateCache.has(filePath)) return dateCache.get(filePath);
  try {
    const history = execFileSync('git', ['log', '--follow', '--format=%aI', '--', path.relative(process.cwd(), filePath)], {
      cwd: process.cwd(), encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'],
    }).trim().split('\n').filter(Boolean);
    const dates = history.length ? {
      birthtime: new Date(history[history.length - 1]),
      mtime: new Date(history[0]),
    } : null;
    dateCache.set(filePath, dates);
    return dates;
  } catch {
    dateCache.set(filePath, null);
    return null;
  }
}

export function formatDateTime(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
