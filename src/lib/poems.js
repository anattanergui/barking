// src/lib/poems.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const VAULT_PATH = path.join(process.cwd(), 'src/content/poems');

// ── Memoization cache ────────────────────────────────────────────────────────
let _cache = null;

// Exported so consumers (e.g. [slug].astro) don't need to duplicate it
export function slugify(str) {
  if (!str) return '';
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function toArray(val) {
  if (!val) return [];
  const clean = v => String(v).trim().replace(/\[\[|\]\]/g, '');
  if (Array.isArray(val)) return val.map(clean);
  if (typeof val === 'string') return val.split(',').map(clean).filter(Boolean);
  return [clean(val)];
}

// ── Safely parse a file that may have missing or unclosed frontmatter ────────
function safeParse(raw) {
  try {
    const result = matter(raw);
    const hasFrontmatter = raw.trimStart().startsWith('---');
    const closingDashes = (raw.match(/^---/gm) || []).length;
    if (hasFrontmatter && closingDashes < 2) {
      return { data: {}, content: raw };
    }
    return result;
  } catch {
    return { data: {}, content: raw };
  }
}

// ── Full loader (metadata + content) ────────────────────────────────────────
export function getAllPoems() {
  if (_cache) return _cache;

  let files;
  try {
    files = fs.readdirSync(VAULT_PATH).filter(f => f.endsWith('.md'));
  } catch (err) {
    console.error(`[poems] Could not read vault at ${VAULT_PATH}:`, err.message);
    return [];
  }

  const poems = files.flatMap(file => {
    try {
      const raw = fs.readFileSync(path.join(VAULT_PATH, file), 'utf-8');
      const sanitized = raw.replace(/\[\[([^\]]*)\]\]/g, '$1');
      const { data, content } = safeParse(sanitized);

      const title = (data.title && String(data.title).trim()) || file.replace(/\.md$/, '');
      const slug  = slugify(title);

      if (!slug) {
        console.warn(`[poems] Skipping "${file}": could not derive a slug from title "${title}"`);
        return [];
      }

      const body = (content || raw).trim();

      return [{
        slug,
        title,
        atmosphere: toArray(data.atmosphere || data.mood),
        crux:       toArray(data.crux || data.form),
        ground:     toArray(data.ground || data.energy),
        wordCount:  parseInt(data['word-count'] || data.wordCount || 0),
        domains:    toArray(data.domains || data.domain || data.themes || data.theme),
        tags:       toArray(data.tags),
        related:    toArray(data.related),
        content:    body,
        preview:    body.split('\n').filter(l => l.trim() && !l.startsWith('#')).slice(0, 4).join('\n') || '',
      }];
    } catch (err) {
      console.warn(`[poems] Skipping "${file}": ${err.message}`);
      return [];
    }
  });

  _cache = poems.sort((a, b) => a.title.localeCompare(b.title));
  return _cache;
}

// ── Lightweight metadata-only loader (no content) ────────────────────────────
export function getAllPoemsMeta() {
  return getAllPoems().map(({ content: _content, ...meta }) => meta);
}

// ── Single poem lookup ───────────────────────────────────────────────────────
export function getPoemBySlug(slug) {
  return getAllPoems().find(p => p.slug === slug);
}

// ── Filter option aggregation ────────────────────────────────────────────────
export function getFilterOptions(poems) {
  const domains     = new Map();
  const atmospheres = new Map();
  const cruxes      = new Map();
  const tags        = new Map();
  const grounds     = new Map();

  poems.forEach(p => {
    p.domains.forEach(t    => domains.set(t,     (domains.get(t)     || 0) + 1));
    p.tags.forEach(t       => tags.set(t,         (tags.get(t)         || 0) + 1));
    p.atmosphere.forEach(m => atmospheres.set(m,  (atmospheres.get(m)  || 0) + 1));
    p.crux.forEach(f       => cruxes.set(f,       (cruxes.get(f)       || 0) + 1));
    p.ground.forEach(e     => grounds.set(e,      (grounds.get(e)      || 0) + 1));
  });

  const sort = m => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return {
    domains:     sort(domains),
    atmospheres: sort(atmospheres),
    cruxes:      sort(cruxes),
    tags:        sort(tags),
    grounds:     sort(grounds),
  };
}

// ── Cache invalidation (useful in dev / watch mode) ──────────────────────────
export function invalidateCache() {
  _cache = null;
}
