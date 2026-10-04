export { getFileDates, getContentDates, formatFooterDate } from './file-dates.mjs';

export function formatDateTime(date: Date, locale: string) {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}
