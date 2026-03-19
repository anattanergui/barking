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
  // If the file has no frontmatter at all, matter() is fine — data will be {}
  // If frontmatter is unclosed (only one ---), matter() throws or returns garbage.
  // We detect that and fall back to treating the whole file as content.
  try {
    const result = matter(raw);
    // gray-matter can "succeed" on unclosed frontmatter by consuming the whole
    // file as data. If content is empty but the raw file clearly has lines after
    // the opening ---, that's a sign the block was never closed.
    const hasFrontmatter = raw.trimStart().startsWith('---');
    const closingDashes = (raw.match(/^---/gm) || []).length;
    if (hasFrontmatter && closingDashes < 2) {
      // Unclosed frontmatter — treat entire file as plain content, no metadata
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

      // Title: frontmatter → filename (strip extension)
      const title = (data.title && String(data.title).trim()) || file.replace(/\.md$/, '');
      const slug  = slugify(title);

      if (!slug) {
        console.warn(`[poems] Skipping "${file}": could not derive a slug from title "${title}"`);
        return [];
      }

      // Content: prefer parsed content block; fall back to full raw text
      const body = (content || raw).trim();

      return [{
        slug,
        title,
        mood:      toArray(data.mood),
        form:      toArray(data.form),
        style:     toArray(data.style),
        energy:    toArray(data.energy),
        wordCount: parseInt(data['word-count'] || data.wordCount || 0),
        themes:    toArray(data.themes),
        tags:      toArray(data.tags),
        related:   toArray(data.related),
        content:   body,
        preview:   body.split('\n').find(l => l.trim() && !l.startsWith('#')) || '',
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
// Use this when you only need the browse grid / search index — avoids
// carrying large content strings into client-side JSON bundles.
export function getAllPoemsMeta() {
  return getAllPoems().map(({ content: _content, ...meta }) => meta);
}

// ── Single poem lookup ───────────────────────────────────────────────────────
export function getPoemBySlug(slug) {
  // Reuses the memoized cache — no extra disk reads.
  return getAllPoems().find(p => p.slug === slug);
}

// ── Filter option aggregation ────────────────────────────────────────────────
export function getFilterOptions(poems) {
  const themes   = new Map();
  const moods    = new Map();
  const forms    = new Map();
  const tags     = new Map();
  const styles   = new Map();
  const energies = new Map();

  poems.forEach(p => {
    p.themes.forEach(t => themes.set(t,    (themes.get(t)    || 0) + 1));
    p.tags.forEach(t   => tags.set(t,      (tags.get(t)      || 0) + 1));
    p.mood.forEach(m   => moods.set(m,     (moods.get(m)     || 0) + 1));
    p.form.forEach(f   => forms.set(f,     (forms.get(f)     || 0) + 1));
    p.style.forEach(s  => styles.set(s,    (styles.get(s)    || 0) + 1));
    p.energy.forEach(e => energies.set(e,  (energies.get(e)  || 0) + 1));
  });

  const sort = m => [...m.entries()].sort((a, b) => b[1] - a[1]);
  return {
    themes:   sort(themes),
    moods:    sort(moods),
    forms:    sort(forms),
    tags:     sort(tags),
    styles:   sort(styles),
    energies: sort(energies),
  };
}

// ── Cache invalidation (useful in dev / watch mode) ──────────────────────────
export function invalidateCache() {
  _cache = null;
}
