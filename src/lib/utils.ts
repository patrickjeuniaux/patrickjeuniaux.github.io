import fs from 'node:fs';
import path from 'node:path';

export function getFileDates(filePath: string) {
  try {
    const stats = fs.statSync(filePath);
    return {
      birthtime: stats.birthtime,
      mtime: stats.mtime
    };
  } catch (e) {
    console.error(`Error getting dates for ${filePath}:`, e);
    return {
      birthtime: new Date(),
      mtime: new Date()
    };
  }
}

export function formatDateTime(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
