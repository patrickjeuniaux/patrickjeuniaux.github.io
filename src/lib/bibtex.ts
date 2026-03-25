export type Publication = {
  key: string;
  entryType: string;
  pubType: string;
  title: string;
  authors: string;
  authorsHtml: string;
  date: string;
  year: string;
  location: string;
  note: string;
  institution: string;
  url: string;
  doi: string;
  pdfUrl: string;
  keywords: string;
  booktitle: string;
  publisher: string;
  language: string;
  abstract: string;
  selected: boolean;
  hasTargetAuthor: boolean;
};

const TARGET_FAMILY_NAME = 'jeuniaux';
const TARGET_GIVEN_NAME = 'patrick';

const normalizeValue = (value = '') =>
  value
    .replace(/\&/g, '&')
    .replace(/[{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const splitTopLevel = (input: string) => {
  const parts: string[] = [];
  let current = '';
  let depth = 0;
  let inQuotes = false;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    const prev = i > 0 ? input[i - 1] : '';

    if (ch === '"' && prev !== '\\') {
      inQuotes = !inQuotes;
      current += ch;
      continue;
    }

    if (!inQuotes) {
      if (ch === '{') depth += 1;
      if (ch === '}') depth = Math.max(0, depth - 1);
      if (ch === ',' && depth === 0) {
        if (current.trim()) parts.push(current.trim());
        current = '';
        continue;
      }
    }

    current += ch;
  }

  if (current.trim()) parts.push(current.trim());
  return parts;
};

const readBalanced = (text: string, start: number, opener: string, closer: string) => {
  let depth = 0;
  let i = start;
  let value = '';
  let inQuotes = false;

  for (; i < text.length; i += 1) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : '';

    if (ch === '"' && prev !== '\\') {
      inQuotes = !inQuotes;
    }

    if (!inQuotes) {
      if (ch === opener) depth += 1;
      if (ch === closer) depth -= 1;
    }

    value += ch;

    if (depth === 0) {
      break;
    }
  }

  return { value, end: i };
};

const parseFields = (rawFields: string) => {
  const result: Record<string, string> = {};
  for (const part of splitTopLevel(rawFields)) {
    const eqIndex = part.indexOf('=');
    if (eqIndex < 0) continue;
    const rawName = part.slice(0, eqIndex).trim().toLowerCase();
    let rawValue = part.slice(eqIndex + 1).trim();

    if (rawValue.startsWith('{') && rawValue.endsWith('}')) {
      rawValue = rawValue.slice(1, -1);
    } else if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
      rawValue = rawValue.slice(1, -1);
    }

    result[rawName] = normalizeValue(rawValue);
  }
  return result;
};

const extractEntries = (bibtex: string) => {
  const entries: { entryType: string; key: string; fields: Record<string, string> }[] = [];
  let i = 0;

  while (i < bibtex.length) {
    const at = bibtex.indexOf('@', i);
    if (at === -1) break;

    const typeMatch = /^@([A-Za-z]+)\s*\{/.exec(bibtex.slice(at));
    if (!typeMatch) {
      i = at + 1;
      continue;
    }

    const entryType = typeMatch[1].toLowerCase();
    const bodyStart = at + typeMatch[0].length;
    const balanced = readBalanced(bibtex, bodyStart - 1, '{', '}');
    const body = balanced.value.slice(1, -1);
    const commaIndex = body.indexOf(',');

    if (commaIndex !== -1) {
      const key = body.slice(0, commaIndex).trim();
      const rawFields = body.slice(commaIndex + 1).trim();
      entries.push({ entryType, key, fields: parseFields(rawFields) });
    }

    i = balanced.end + 1;
  }

  return entries;
};

const deriveYear = (fields: Record<string, string>) => {
  if (fields.year) return fields.year;
  const source = fields.date || '';
  const match = source.match(/(19|20)\d{2}/);
  return match ? match[0] : '';
};

const derivePdfUrl = (fields: Record<string, string>) => {
  const candidates = [fields.pdf, fields.file, fields.urlpdf, fields.pdfurl];
  for (const candidate of candidates) {
    if (!candidate) continue;
    const match = candidate.match(/https?:\/\/[^\s>]+/);
    if (match) return match[0];
    if (/^https?:\/\//.test(candidate)) return candidate;
  }
  return '';
};

const deriveExternalUrl = (fields: Record<string, string>) => {
  if (fields.url) return fields.url;
  if (fields.doi) return `https://doi.org/${fields.doi}`;
  return '';
};

const titleCase = (value: string) =>
  value
    .split(/\s+/)
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');

const normalizeLanguage = (value: string) => {
  const token = (value || '').trim().toLowerCase();
  if (!token) return '';
  if (['fr', 'fra', 'fre', 'french'].includes(token)) return 'FRA';
  if (['nl', 'nld', 'dut', 'dutch'].includes(token)) return 'NLD';
  if (['en', 'eng', 'english'].includes(token)) return 'ENG';
  if (['de', 'deu', 'ger', 'german'].includes(token)) return 'DEU';
  if (['it', 'ita', 'italian'].includes(token)) return 'ITA';
  if (['es', 'spa', 'spanish'].includes(token)) return 'SPA';
  if (['pt', 'por', 'portuguese'].includes(token)) return 'POR';
  if (['zh', 'zho', 'chi', 'chinese', 'mandarin'].includes(token)) return 'ZHO';
  if (['ru', 'rus', 'russian'].includes(token)) return 'RUS';
  if (['ja', 'jpn', 'japanese'].includes(token)) return 'JPN';
  if (['hi', 'hin', 'hindi'].includes(token)) return 'HIN';
  if (['ar', 'ara', 'arabic'].includes(token)) return 'ARA';
  if (['und', 'unknown', 'unspecified'].includes(token)) return 'UND';
  return token.toUpperCase();
};

const deriveLanguage = (key: string, fields: Record<string, string>) => {
  const explicit = normalizeLanguage(fields.language || fields.langid || fields.lang || '');
  if (explicit) return explicit;
  const suffix = key.match(/_(EN|ENG|FR|FRA|NL|NLD|DE|DEU|IT|ITA|ES|SPA|PT|POR|ZH|ZHO|RU|RUS|JA|JPN|HI|HIN|AR|ARA)$/i)?.[1] || '';
  return normalizeLanguage(suffix) || 'UND';
};

const deriveSelected = (fields: Record<string, string>, authors: string) => {
  const explicit = (fields.selected || '').trim().toLowerCase();
  if (['true', 'yes', '1', 'selected'].includes(explicit)) return true;
  const keywords = `${fields.keywords || ''};${fields.keyword || ''}`.toLowerCase();
  if (['selected', 'featured', 'highlight'].some((token) => keywords.includes(token))) return true;
  const parts = splitAuthors(authors);
  return parts.length > 0 && isTargetAuthor(parts[0]);
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const splitAuthors = (authors: string) =>
  authors
    .split(/\s+and\s+/i)
    .map((part) => normalizeValue(part))
    .filter(Boolean);

const parseAuthorName = (author: string) => {
  if (author.includes(',')) {
    const [family, given] = author.split(',').map((part) => part.trim());
    return { family: family || '', given: given || '', display: `${given || ''} ${family || ''}`.trim() };
  }
  const tokens = author.trim().split(/\s+/);
  const family = tokens.at(-1) || '';
  const given = tokens.slice(0, -1).join(' ');
  return { family, given, display: author.trim() };
};

const isTargetAuthor = (author: string) => {
  const parsed = parseAuthorName(author);
  const family = parsed.family.toLowerCase();
  const given = parsed.given.toLowerCase();
  return family.includes(TARGET_FAMILY_NAME) && (given.includes(TARGET_GIVEN_NAME) || given.startsWith('p') || given === '');
};

const emphasizeAuthors = (authors: string) => {
  const parts = splitAuthors(authors);
  return parts
    .map((author) => {
      const parsed = parseAuthorName(author);
      const safe = escapeHtml(parsed.display);
      return isTargetAuthor(author) ? `<strong>${safe}</strong>` : safe;
    })
    .join(', ');
};

export const parseBibtexPublications = (bibtex: string): Publication[] => {
  return extractEntries(bibtex)
    .map(({ key, entryType, fields }) => {
      const authors = fields.author || '';
      const hasTargetAuthor = splitAuthors(authors).some(isTargetAuthor);
      return {
        key,
        entryType,
        pubType: fields.type || titleCase(entryType),
        title: fields.title || key,
        authors,
        authorsHtml: emphasizeAuthors(authors),
        date: fields.date || '',
        year: deriveYear(fields),
        location: fields.location || fields.address || '',
        note: fields.note || fields.addendum || '',
        institution: fields.institution || fields.school || '',
        url: deriveExternalUrl(fields),
        doi: fields.doi || '',
        pdfUrl: derivePdfUrl(fields),
        keywords: fields.keywords || fields.keyword || '',
        booktitle: fields.booktitle || '',
        publisher: fields.publisher || '',
        language: deriveLanguage(key, fields),
        abstract: fields.abstract || fields.summary || '',
        selected: deriveSelected(fields, authors),
        hasTargetAuthor,
      };
    })
    .filter((item) => item.hasTargetAuthor)
    .sort((a, b) => {
      const ay = Number(a.year || 0);
      const by = Number(b.year || 0);
      if (ay !== by) return by - ay;
      return a.title.localeCompare(b.title);
    });
};
