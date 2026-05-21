#!/usr/bin/env node
/**
 * bootstrap-integrity.js — CI-style gate for pattern specimen integrity.
 *
 * Purpose: catch the regression class introduced between commit 70f2d8d and
 *   dad252a (broken external-stylesheet path that 404'd in the browser, was
 *   silent to loader tests + compiler tests, and only manifested visually).
 *
 * What it asserts, for every pattern specimen under 02_reference-packs/patterns/*\/examples/index.html:
 *
 *   1. HTTP 200 when served from 02_reference-packs as document root.
 *   2. Sentinel: at least one foundation token (--surface / --text / --accent)
 *      is defined inline. Catches "no :root block at all" failure mode.
 *   3. Reference-definition correctness: every var(--X) used WITHOUT a fallback
 *      has --X defined in the same served <style> blocks. var(--X, fallback)
 *      references are safe (the fallback IS the safety net per CSS spec).
 *   4. Spacing value contract (Phase 22 / Consolidation 1, 2026-05-19): every
 *      spacing token defined inline matches the canonical value from
 *      tokens-baseline. Closes the Category-A drift gap that allowed 22
 *      specimens to silently fork the spacing scale.
 *   5. Type-scale value contract (Phase 22 / Consolidation 2, 2026-05-20):
 *      every type-size / leading token covered by the contract and defined
 *      inline matches the canonical value from tokens-baseline. Parallel to
 *      check 4; covers the Cons. 2 auto-resolved tokens.
 *   6. v3.G.15 — data-pattern naming convention (Phase 22 / Consolidation 3,
 *      2026-05-20): every data-pattern="..." value uses short form
 *      <pattern-name>-<slot>; long-form "pattern-<name>-<slot>" prefix is
 *      forbidden; double-dash separator is forbidden.
 *   7. v3.G.16 — data-register deprecation (Phase 22 / Consolidation 3,
 *      2026-05-20): for packs in DATA_REGISTER_DEPRECATED_IN, no
 *      data-register= attributes are tolerated; replacements documented per
 *      pack (e.g. data-alignment / data-video-mode / data-kind / data-cluster
 *      for hero).
 *   8. v3.G.17 — composition reality (Phase 22 / Consolidation 3, 2026-05-20):
 *      for packs in COMPOSITION_REALITY_ENFORCED_FOR, every peer pack declared
 *      in quoin.pack.json's peerPacks must have its canonical primitive class
 *      actually present in at least one example file (catches "claims to
 *      consume X" but inlines X's contract under a different class name).
 *   9. Stylesheet allowlist: every <link rel="stylesheet"> resolves to a host
 *      in STYLESHEET_ALLOWLIST. Today: Google Fonts only.
 *
 * Exit status: 0 if every specimen passes; 1 if any specimen fails.
 *
 * Usage:
 *   node 02_reference-packs/scripts/bootstrap-integrity.js
 *
 * Runs on every commit to catch the regression at the source. CI-style green/red.
 * This is a GATE, not enrichment.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const REF_PACKS_ROOT = path.resolve(__dirname, '..');

/**
 * Sentinel tokens — at least one of these must be defined inline for the gate
 * to consider the specimen "bootstrapped at all." Catches the trivial-zero case
 * where no :root token block exists. Beyond this, the gate uses a smarter check
 * (see auditSpecimen): every var(--X) referenced in a specimen's style blocks
 * must have --X defined in the same style blocks. That's the exact correctness
 * condition that the dad252a/fc3f89d/ba17db2 regression violated.
 */
const SENTINEL_TOKENS = ['--surface', '--text', '--accent'];

/**
 * Tokens that the gate ignores even if referenced. CSS pseudo-properties and
 * compound names that look like custom-property references but resolve via
 * cascade fallbacks. Empty list today; add here only with a documented reason.
 */
const TOKEN_REFERENCE_IGNORE = new Set([]);

/**
 * Hosts allowed for <link rel="stylesheet">. Today: Google Fonts only.
 * Any other external stylesheet reference fails the gate.
 */
const STYLESHEET_ALLOWLIST = [
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

/**
 * Spacing value contract — Phase 22 / Consolidation 1 / 2026-05-19.
 *
 * Each entry maps a spacing-token name to its canonical value in tokens-baseline.
 * If a specimen defines one of these tokens inline (the bootstrap pattern), its
 * value MUST match canonical. Otherwise the specimen has forked the scale.
 *
 * Tokens NOT in this map are unconstrained (specimens may add their own).
 * Spacing tokens that exist in tokens-baseline but aren't typically inlined by
 * specimens (e.g. --space-10 / 12 / 16 / 20 / 24 / 32, --space-stack-*,
 * --space-inline-*) are intentionally omitted — checking them here would
 * over-constrain specimens that don't need them. Adding to this map is an
 * operator decision (per the per-turn cadence of Phase 22).
 *
 * This contract closes the bootstrap-integrity gap surfaced by Consolidation 1:
 * the prior gate only checked PRESENCE of definitions, not VALUE correctness.
 */
const SPACING_VALUE_CONTRACT = {
  '--space-half-1':  '0.125rem',
  '--space-half-2':  '0.375rem',
  '--space-1':       '0.25rem',
  '--space-2':       '0.5rem',
  '--space-3':       '0.75rem',
  '--space-4':       '1rem',
  '--space-5':       '1.25rem',
  '--space-6':       '1.5rem',
  '--space-8':       '2rem',
  '--space-card':    '1.5rem',
  '--space-panel':   '2rem',
  '--space-section': '4rem',
};

/**
 * Type-scale value contract — Phase 22 / Consolidation 2 / 2026-05-20.
 *
 * Parallel to SPACING_VALUE_CONTRACT. Each entry maps a type-scale or leading
 * token name to its canonical value in tokens-baseline. If a specimen defines
 * one of these tokens inline, its value MUST match canonical. Tokens not in
 * the map are unconstrained.
 *
 * Scope covers the Cons. 2 auto-resolved tokens (xl/2xl/3xl/4xl + leading-prose
 * + leading-display) plus the unchanged-but-universal small steps (xs/sm/md).
 *
 * --type-size-lg is intentionally EXCLUDED: one specimen (feature-grid) carries
 * historical drift (1.25rem vs baseline 1.125rem) that pre-dates Cons. 2 and
 * was not in the audit scope. Adding lg to the contract would require an extra
 * specimen fix outside the consolidation's locked scope. Future consolidation
 * can address.
 *
 * --leading-tight, --leading-normal, --leading-loose are intentionally EXCLUDED:
 * Cons. 2 did not establish these as canonical (button-system carries leading-
 * tight: 1.1 drift; other specimens drift in either direction). Future
 * consolidation can address.
 *
 * --tracking-tight, --tracking-normal, --tracking-wide are intentionally
 * EXCLUDED: Cons. 2 flagged tracking-tight (15/7 split) and tracking-wide
 * (16/22 below threshold) for operator review; both default to baseline per
 * Q4 Option α. Specimens explicitly override these — preserving specimen-side
 * stylistic latitude is part of the architecture.
 */
const TYPE_SCALE_VALUE_CONTRACT = {
  '--type-size-xs':    '0.75rem',
  '--type-size-sm':    '0.875rem',
  '--type-size-md':    '1rem',
  '--type-size-xl':    '1.5rem',
  '--type-size-2xl':   '2rem',
  '--type-size-3xl':   '2.5rem',
  '--type-size-4xl':   '3.5rem',
  '--leading-prose':   '1.55',
  '--leading-display': '1.05',
};

/**
 * v3.G.15 — data-pattern naming convention.
 *
 * Canonical form: <pattern-name>-<slot> (e.g. "hero-section", "button-system").
 * Phase 22 Cons. 3 / 2026-05-20 lock — operator Q1.
 */
const DATA_PATTERN_NAMING_RULES = {
  // Forbidden prefixes — old long-form like "pattern-hero-section".
  forbiddenPrefixes: ['pattern-'],
  // Forbidden separators — single dash only; "--" was a brief experiment.
  forbiddenSeparators: ['--'],
};

/**
 * v3.G.16 — data-register deprecation per consolidation.
 *
 * Each entry maps a pack-name to its replacement attribute(s). The gate
 * flags any data-register= usage in specimens of these packs. Other packs
 * keep data-register until their own consolidation lands.
 *
 * Phase 22 Cons. 3 / 2026-05-20 lock — operator Q2.
 */
const DATA_REGISTER_DEPRECATED_IN = {
  'hero': 'data-alignment (universal) / data-video-mode (video variant) / data-kind (sub-slot kind) / data-cluster (actions cluster) / data-layout (brand-photo)',
  'nav':  'data-alignment (universal) / data-variant (top-level marketing/app-chrome/docs/editorial) / data-mode (section-level: sticky/transparent/compact/standard/with-subnav/condensed/topbar-only/with-sidebar) / data-kind (sub-slot: simple/mega for dropdown-panel; pill/outline for subscribe-cta; underline/pill/boxed for nav-page-tabs)',
};

/**
 * v3.G.17 — composition reality.
 *
 * For each pack in the enforced set, the gate verifies that peer-pack
 * primitives declared in quoin.pack.json's peerPacks field are actually
 * consumed in at least one example file. Inlined re-implementations
 * (e.g. .cta class duplicating button-system's .action-button) fail.
 *
 * COMPOSITION_PRIMITIVES maps peer-pack name → list of canonical class
 * names that must appear in HTML for the consumption to count as real.
 *
 * Phase 22 Cons. 3 / 2026-05-20 lock — operator Q5.
 */
const COMPOSITION_REALITY_ENFORCED_FOR = new Set(['hero', 'nav']);
const COMPOSITION_PRIMITIVES = {
  '@quoin/pattern-button-system': ['action-button'],
  '@quoin/prim-label': ['label'],
};

/**
 * Returns the peerPacks block from a pattern pack's manifest, or {} if the
 * manifest doesn't exist (covers deprecated packs mid-removal).
 */
function getPeerPacks(packName) {
  const manifestPath = path.join(REF_PACKS_ROOT, 'patterns', packName, 'quoin.pack.json');
  if (!fs.existsSync(manifestPath)) return {};
  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return manifest.peerPacks || {};
  } catch {
    return {};
  }
}

function listPatterns() {
  const patternsDir = path.join(REF_PACKS_ROOT, 'patterns');
  return fs.readdirSync(patternsDir).filter((name) => {
    const examplesDir = path.join(patternsDir, name, 'examples');
    if (!fs.existsSync(examplesDir)) return false;
    return fs.readdirSync(examplesDir).some((f) => f.endsWith('.html'));
  });
}

function getExampleFiles(pack) {
  const dir = path.join(REF_PACKS_ROOT, 'patterns', pack, 'examples');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.html')).sort();
}

function startServer() {
  const server = http.createServer((req, res) => {
    // Strip leading slashes; normalise path; reject escapes.
    const relPath = path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^[/\\]+/, '');
    const absPath = path.join(REF_PACKS_ROOT, relPath);
    if (!absPath.startsWith(REF_PACKS_ROOT)) {
      res.writeHead(403);
      return res.end('forbidden');
    }
    fs.readFile(absPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('not found');
      }
      const mime = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.svg': 'image/svg+xml',
      }[path.extname(absPath).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function fetchPath(port, urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://127.0.0.1:${port}${urlPath}`, (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode, body }));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

function auditSpecimen(pack, { status, body }) {
  const failures = [];

  if (status !== 200) {
    failures.push(`HTTP ${status} (expected 200)`);
  }

  // Concatenate all <style> blocks. Both the regression check and the sentinel
  // check operate over served inline styles only.
  const styleBlocks = body.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const allStyles = styleBlocks.join('\n');

  // 1. Sentinel check — at least one foundation token must be defined inline.
  //    Catches the "no inline tokens at all" failure mode.
  const sentinelHit = SENTINEL_TOKENS.some((t) => allStyles.includes(`${t}:`));
  if (!sentinelHit) {
    failures.push(
      `no foundation tokens defined inline (expected at least one of: ${SENTINEL_TOKENS.join(', ')})`,
    );
  }

  // 2. Reference-definition correctness — every var(--X) referenced WITHOUT
  //    a fallback in inline styles must have --X defined in the same inline
  //    styles. var(--X, fallback) references are safe — the fallback IS the
  //    safety net (CSS-spec behaviour). This is the exact condition the
  //    dad252a/fc3f89d/ba17db2 regression violated; the inline-style "local
  //    custom property" pattern (e.g., toast-notifier's --toast-duration
  //    set per-toast via inline style with a CSS fallback) is intentionally
  //    NOT a failure.
  const referencedWithoutFallback = new Set();
  // Greedy match var(--X[, optional-fallback]) — distinguishing presence/absence of comma
  for (const m of allStyles.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)\s*(,?)/g)) {
    const name = m[1];
    const hasFallback = m[2] === ',';
    if (!hasFallback) referencedWithoutFallback.add(name);
  }
  const definedTokens = new Set();
  for (const m of allStyles.matchAll(/(--[a-zA-Z0-9_-]+)\s*:/g)) {
    definedTokens.add(m[1]);
  }
  const undefinedReferences = [...referencedWithoutFallback].filter(
    (t) => !definedTokens.has(t) && !TOKEN_REFERENCE_IGNORE.has(t),
  );
  if (undefinedReferences.length > 0) {
    failures.push(
      `var(--X) references with no inline definition AND no fallback: ${undefinedReferences.join(', ')}`,
    );
  }

  // 3. Spacing value contract — every spacing token defined inline must match
  //    the canonical value from tokens-baseline. First-occurrence wins (the
  //    :root default; subsequent @media-scoped overrides are ignored).
  //    Phase 22 / Consolidation 1 extension.
  const firstDefinedValue = {};
  for (const m of allStyles.matchAll(/(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+?)\s*;/g)) {
    const name = m[1];
    if (!(name in firstDefinedValue)) firstDefinedValue[name] = m[2].trim();
  }
  const spacingDrifts = [];
  for (const [name, canonical] of Object.entries(SPACING_VALUE_CONTRACT)) {
    if (name in firstDefinedValue && firstDefinedValue[name] !== canonical) {
      spacingDrifts.push(`${name} declared "${firstDefinedValue[name]}"; canonical is "${canonical}"`);
    }
  }
  if (spacingDrifts.length > 0) {
    failures.push(`spacing-token value drift vs tokens-baseline: ${spacingDrifts.join('; ')}`);
  }

  // 3b. Type-scale value contract — same approach as spacing.
  //     Phase 22 / Consolidation 2 extension.
  const typeScaleDrifts = [];
  for (const [name, canonical] of Object.entries(TYPE_SCALE_VALUE_CONTRACT)) {
    if (name in firstDefinedValue && firstDefinedValue[name] !== canonical) {
      typeScaleDrifts.push(`${name} declared "${firstDefinedValue[name]}"; canonical is "${canonical}"`);
    }
  }
  if (typeScaleDrifts.length > 0) {
    failures.push(`type-scale value drift vs tokens-baseline: ${typeScaleDrifts.join('; ')}`);
  }

  // 3c. v3.G.15 — data-pattern naming convention (Cons. 3 Q1).
  const dataPatternRegex = /\bdata-pattern\s*=\s*["']([^"']+)["']/g;
  const namingFailures = [];
  for (const m of body.matchAll(dataPatternRegex)) {
    const value = m[1];
    for (const prefix of DATA_PATTERN_NAMING_RULES.forbiddenPrefixes) {
      if (value.startsWith(prefix)) {
        namingFailures.push(`data-pattern="${value}" uses forbidden prefix "${prefix}"`);
      }
    }
    for (const sep of DATA_PATTERN_NAMING_RULES.forbiddenSeparators) {
      if (value.includes(sep)) {
        namingFailures.push(`data-pattern="${value}" contains forbidden separator "${sep}"`);
      }
    }
  }
  if (namingFailures.length > 0) {
    failures.push(`v3.G.15 data-pattern naming violations: ${namingFailures.join('; ')}`);
  }

  // 3d. v3.G.16 — data-register deprecation per consolidation (Cons. 3 Q2).
  if (pack in DATA_REGISTER_DEPRECATED_IN) {
    const dataRegisterCount = (body.match(/\bdata-register\s*=/g) || []).length;
    if (dataRegisterCount > 0) {
      failures.push(
        `v3.G.16 data-register deprecated in ${pack} pack (${dataRegisterCount} occurrence${dataRegisterCount === 1 ? '' : 's'}); use ${DATA_REGISTER_DEPRECATED_IN[pack]}`,
      );
    }
  }

  // 3e. v3.G.17 — composition reality (Cons. 3 Q5).
  if (COMPOSITION_REALITY_ENFORCED_FOR.has(pack)) {
    const peerPacks = getPeerPacks(pack);
    for (const peerPack of Object.keys(peerPacks)) {
      const primitives = COMPOSITION_PRIMITIVES[peerPack];
      if (!primitives) continue;
      for (const primClass of primitives) {
        // Look for class="primClass" or class='primClass' (with optional other classes via word-boundary)
        const classRegex = new RegExp(`\\bclass\\s*=\\s*["'][^"']*\\b${primClass}\\b[^"']*["']`);
        if (!classRegex.test(body)) {
          failures.push(
            `v3.G.17 composition lineage drift: ${pack} declares ${peerPack} as peerPack but no <element class="${primClass}"> usage found (composes-but-inlines-contract failure)`,
          );
        }
      }
    }
  }

  // 4. Stylesheet allowlist — every <link rel="stylesheet"> must point to a host
  //    in STYLESHEET_ALLOWLIST. Inline-token approach + Google Fonts is the spec.
  const linkMatches = body.match(/<link\b[^>]*\brel\s*=\s*["']stylesheet["'][^>]*>/gi) || [];
  for (const tag of linkMatches) {
    const hrefMatch = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch) {
      failures.push(`<link rel="stylesheet"> with no href: ${tag}`);
      continue;
    }
    const href = hrefMatch[1];
    const isAllowed = STYLESHEET_ALLOWLIST.some((host) => href.includes(host));
    if (!isAllowed) {
      failures.push(`off-list <link rel="stylesheet">: ${href}`);
    }
  }

  return failures;
}

(async () => {
  const { server, port } = await startServer();
  const packs = listPatterns();

  if (packs.length === 0) {
    console.error('No pattern specimens found under 02_reference-packs/patterns/*/examples/index.html');
    server.close();
    process.exit(1);
  }

  const lines = [];
  let anyFail = false;
  let specimenCount = 0;

  for (const pack of packs) {
    const files = getExampleFiles(pack);
    for (const file of files) {
      specimenCount++;
      // Label: just the pack name when the conventional single-file form;
      // pack/variant when multi-file (Cons. 3 unified packs).
      const variant = path.basename(file, '.html');
      const label = (files.length === 1 && file === 'index.html') ? pack : `${pack}/${variant}`;
      const urlPath = `/patterns/${pack}/examples/${file}`;

      let response;
      try {
        response = await fetchPath(port, urlPath);
      } catch (e) {
        anyFail = true;
        lines.push(`FAIL  ${label}  (fetch error: ${e.message})`);
        continue;
      }

      const failures = auditSpecimen(pack, response);
      if (failures.length === 0) {
        lines.push(`PASS  ${label}`);
      } else {
        anyFail = true;
        lines.push(`FAIL  ${label}`);
        for (const f of failures) lines.push(`        ${f}`);
      }
    }
  }

  server.close();
  console.log(lines.join('\n'));
  console.log(`\n${specimenCount} specimens audited; ${anyFail ? 'FAILURES present — gate red' : 'all green'}.`);
  process.exit(anyFail ? 1 : 0);
})().catch((err) => {
  console.error('bootstrap-integrity.js crashed:', err);
  process.exit(2);
});
