#!/usr/bin/env node
/**
 * build-registry.js — generate shadcn-registry-compatible distribution at
 * /registry/index.json + /registry/items/<name>.json from the canonical USML
 * pack manifests at /patterns/, /aesthetics/, /templates/, and
 * /02_reference-packs/{patterns,primitives}/.
 *
 * The canonical USML pack manifest format is the source of truth. The
 * shadcn registry items are derivative distribution serializations. This
 * script regenerates them deterministically; the GitHub Action at
 * .github/workflows/registry-build.yml runs this on every pack change.
 *
 * Schema references:
 *   - https://ui.shadcn.com/schema/registry.json
 *   - https://ui.shadcn.com/schema/registry-item.json
 *
 * Phase 24.1.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const REGISTRY_DIR = join(ROOT, 'registry');
const ITEMS_DIR = join(REGISTRY_DIR, 'items');

const REGISTRY_ROOT_URL = 'https://harrowhaus.github.io/quoin';

// ──────────────────────────────────────────────────────────────────────
// Source directories scanned for canonical manifests.
// ──────────────────────────────────────────────────────────────────────
const SOURCES = [
  { dir: 'patterns', manifestFile: 'quoin.pack.json', shadcnType: 'registry:component', primitivePrefix: 'prim-' },
  { dir: 'aesthetics', manifestFile: 'quoin.pack.json', shadcnType: 'registry:style' },
  { dir: 'templates', manifestFile: 'quoin.template.json', shadcnType: 'registry:block' },
  { dir: '02_reference-packs/patterns', manifestFile: 'quoin.pack.json', shadcnType: 'registry:component' },
  { dir: '02_reference-packs/primitives', manifestFile: 'quoin.pack.json', shadcnType: 'registry:component', primitivePrefix: 'prim-' },
];

// ──────────────────────────────────────────────────────────────────────
// Helpers.
// ──────────────────────────────────────────────────────────────────────

/** Strip the @quoin/(pattern|prim|aesthetic|template)- prefix to get the shadcn item name. */
function deriveItemName(packName) {
  return packName.replace(/^@quoin\//, '').replace(/^(pattern|prim|aesthetic|template)-/, '');
}

/** Map a Quoin peerPack name to its shadcn registry item name (sibling). */
function peerToShadcnDependency(peerName) {
  // tokens-baseline isn't an item in the shadcn registry — it's implicit infrastructure.
  if (peerName === '@quoin/tokens-baseline') return null;
  // vocab packs aren't shipped through the shadcn registry in this phase.
  if (peerName.startsWith('@quoin/vocab-')) return null;
  return deriveItemName(peerName);
}

function readJSON(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function exists(path) {
  try { statSync(path); return true; } catch { return false; }
}

function ensureDir(d) {
  if (!existsSync(d)) mkdirSync(d, { recursive: true });
}

// ──────────────────────────────────────────────────────────────────────
// File collection per item.
// ──────────────────────────────────────────────────────────────────────

/**
 * For each source pack, collect the files that ship through shadcn.
 * Returns an array of { path, type, contentRef } entries per shadcn's
 * registry-item.json schema.
 */
function collectFiles(packDir, packType) {
  const files = [];
  const manifestPath = join(packDir, packType === 'template' ? 'quoin.template.json' : 'quoin.pack.json');
  if (exists(manifestPath)) {
    files.push({
      path: relative(ROOT, manifestPath).replace(/\\/g, '/'),
      type: 'registry:file',
      target: `quoin/${basename(packDir)}/manifest.json`,
    });
  }

  // Patterns ship: primitives/index.json + examples/*.html + (sometimes) tokens.css
  const primitivesIdx = join(packDir, 'primitives', 'index.json');
  if (exists(primitivesIdx)) {
    files.push({
      path: relative(ROOT, primitivesIdx).replace(/\\/g, '/'),
      type: 'registry:file',
      target: `quoin/${basename(packDir)}/primitives.json`,
    });
  }

  const examplesDir = join(packDir, 'examples');
  if (exists(examplesDir)) {
    for (const f of readdirSync(examplesDir)) {
      if (f.endsWith('.html')) {
        files.push({
          path: relative(ROOT, join(examplesDir, f)).replace(/\\/g, '/'),
          type: 'registry:file',
          target: `quoin/${basename(packDir)}/examples/${f}`,
        });
      }
    }
  }

  // Aesthetic packs ship: tokens.css + overrides/light.json + overrides/dark.json
  const tokensCss = join(packDir, 'tokens.css');
  if (exists(tokensCss)) {
    files.push({
      path: relative(ROOT, tokensCss).replace(/\\/g, '/'),
      type: 'registry:file',
      target: `quoin/${basename(packDir)}/tokens.css`,
    });
  }

  const overridesDir = join(packDir, 'overrides');
  if (exists(overridesDir)) {
    for (const f of readdirSync(overridesDir)) {
      if (f.endsWith('.json')) {
        files.push({
          path: relative(ROOT, join(overridesDir, f)).replace(/\\/g, '/'),
          type: 'registry:file',
          target: `quoin/${basename(packDir)}/overrides/${f}`,
        });
      }
    }
  }

  // Templates: ship index.html at the top of the pack dir
  const tmplIndex = join(packDir, 'index.html');
  if (exists(tmplIndex)) {
    files.push({
      path: relative(ROOT, tmplIndex).replace(/\\/g, '/'),
      type: 'registry:file',
      target: `quoin/${basename(packDir)}/index.html`,
    });
  }

  return files;
}

// ──────────────────────────────────────────────────────────────────────
// Aesthetic-pack token extraction (DTCG → shadcn cssVars mapping).
// ──────────────────────────────────────────────────────────────────────

/**
 * Convert DTCG-shaped aesthetic-pack overrides into shadcn cssVars shape.
 * shadcn expects { theme: {...}, light: {...}, dark: {...} } where each
 * value is a CSS variable name → value pair.
 *
 * The DTCG override format is { "$schema": ..., "tokenName": { "$type": ..., "$value": ... } }.
 * Quoin's aesthetic-pack overrides match this. We flatten by stripping
 * "$value" wrappers.
 */
function dtcgToCssVars(overrides) {
  const flat = {};
  for (const [k, v] of Object.entries(overrides || {})) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) {
      // Convert token name to CSS variable form: hyphenated, no $ prefix.
      flat[`--${k}`] = v.$value;
    }
  }
  return flat;
}

function buildAestheticCssVars(packDir) {
  const lightPath = join(packDir, 'overrides', 'light.json');
  const darkPath = join(packDir, 'overrides', 'dark.json');
  const cssVars = {};
  if (exists(lightPath)) {
    cssVars.light = dtcgToCssVars(readJSON(lightPath));
  }
  if (exists(darkPath)) {
    cssVars.dark = dtcgToCssVars(readJSON(darkPath));
  }
  return Object.keys(cssVars).length ? cssVars : undefined;
}

// ──────────────────────────────────────────────────────────────────────
// Per-item registry entry build.
// ──────────────────────────────────────────────────────────────────────

function buildRegistryItem(packDir, manifest, shadcnType, manifestFile) {
  const itemName = deriveItemName(manifest.name);
  const item = {
    $schema: 'https://ui.shadcn.com/schema/registry-item.json',
    name: itemName,
    type: shadcnType,
    title: titleFromManifest(manifest),
    description: manifest.description || '',
    files: collectFiles(packDir, manifestFile === 'quoin.template.json' ? 'template' : 'pack'),
    meta: {
      quoinPackName: manifest.name,
      quoinPackVersion: manifest.version,
      usmlVersion: manifest.quoinVersion || '^0.1.0',
      packType: manifest.type || 'pattern',
      conformanceLevel: shadcnType === 'registry:style' ? 'Full' : 'Level 3',
    },
  };

  // Source attribution for translated patterns
  if (manifest.metadata && manifest.metadata.source) {
    item.meta.source = manifest.metadata.source;
  }

  // Composition: peerPacks → registryDependencies
  const deps = [];
  for (const peer of Object.keys(manifest.peerPacks || {})) {
    const dep = peerToShadcnDependency(peer);
    if (dep) deps.push(dep);
  }
  if (deps.length) item.registryDependencies = deps;

  // Optional peers documented under meta (not registryDependencies — shadcn
  // resolves registryDependencies eagerly; optionalPeerPacks must not auto-install).
  const optDeps = [];
  for (const peer of Object.keys(manifest.optionalPeerPacks || {})) {
    const dep = peerToShadcnDependency(peer);
    if (dep) optDeps.push(dep);
  }
  if (optDeps.length) item.meta.optionalDependencies = optDeps;

  // Aesthetic-pack cssVars
  if (shadcnType === 'registry:style') {
    const cssVars = buildAestheticCssVars(packDir);
    if (cssVars) item.cssVars = cssVars;
  }

  return item;
}

function titleFromManifest(manifest) {
  const baseName = deriveItemName(manifest.name);
  // Title-case the hyphenated name: "table-of-contents" → "Table Of Contents"
  return baseName
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ──────────────────────────────────────────────────────────────────────
// Main build.
// ──────────────────────────────────────────────────────────────────────

function main() {
  ensureDir(REGISTRY_DIR);
  ensureDir(ITEMS_DIR);

  const items = [];
  let written = 0;

  for (const source of SOURCES) {
    const sourceDir = join(ROOT, source.dir);
    if (!exists(sourceDir)) continue;

    for (const entry of readdirSync(sourceDir)) {
      const packDir = join(sourceDir, entry);
      if (!statSync(packDir).isDirectory()) continue;

      const manifestPath = join(packDir, source.manifestFile);
      if (!exists(manifestPath)) continue;

      const manifest = readJSON(manifestPath);
      const item = buildRegistryItem(packDir, manifest, source.shadcnType, source.manifestFile);

      const itemPath = join(ITEMS_DIR, `${item.name}.json`);
      writeFileSync(itemPath, JSON.stringify(item, null, 2) + '\n', 'utf8');
      written++;

      items.push({
        name: item.name,
        type: item.type,
        title: item.title,
        description: item.description,
        registryDependencies: item.registryDependencies,
        url: `${REGISTRY_ROOT_URL}/registry/items/${item.name}.json`,
        meta: item.meta,
      });
    }
  }

  // Sort items: by type first (component, style, block), then alphabetically.
  const typeOrder = { 'registry:component': 0, 'registry:style': 1, 'registry:block': 2 };
  items.sort((a, b) => {
    const t = (typeOrder[a.type] ?? 99) - (typeOrder[b.type] ?? 99);
    if (t !== 0) return t;
    return a.name.localeCompare(b.name);
  });

  // Build registry root manifest.
  const registry = {
    $schema: 'https://ui.shadcn.com/schema/registry.json',
    name: 'quoin',
    homepage: 'https://harrowhaus.github.io/quoin/',
    description: 'USML 2026.05 reference implementation. Semantic UI patterns with aesthetic-pack and backend-emission interfaces. ' + items.length + ' items.',
    items,
  };

  writeFileSync(join(REGISTRY_DIR, 'index.json'), JSON.stringify(registry, null, 2) + '\n', 'utf8');

  // Markdown view for LLM consumers (content-negotiation alternative since
  // GitHub Pages doesn't support Accept-header negotiation natively).
  const mdLines = [
    '# Quoin Registry — shadcn-compatible distribution',
    '',
    `Catalog of ${items.length} items derived from canonical USML pack manifests.`,
    '',
    '**Consumption:**',
    '',
    '```',
    'npx shadcn@latest add --registry=https://harrowhaus.github.io/quoin/registry/index.json <item-name>',
    '```',
    '',
    '## Items',
    '',
  ];
  for (const it of items) {
    mdLines.push(`### ${it.name} (\`${it.type}\`)`);
    mdLines.push('');
    mdLines.push(`**${it.title}** — ${it.description.slice(0, 280)}`);
    if (it.registryDependencies && it.registryDependencies.length) {
      mdLines.push('');
      mdLines.push(`Depends on: ${it.registryDependencies.join(', ')}`);
    }
    mdLines.push('');
    mdLines.push(`URL: ${it.url}`);
    mdLines.push('');
  }
  writeFileSync(join(REGISTRY_DIR, 'index.md'), mdLines.join('\n'), 'utf8');

  console.log(`Built registry: ${items.length} items in ${written} files.`);
  console.log(`  Components: ${items.filter(i => i.type === 'registry:component').length}`);
  console.log(`  Styles (aesthetics): ${items.filter(i => i.type === 'registry:style').length}`);
  console.log(`  Blocks (templates): ${items.filter(i => i.type === 'registry:block').length}`);
}

main();
