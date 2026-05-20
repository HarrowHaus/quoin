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
 *   5. Stylesheet allowlist: every <link rel="stylesheet"> resolves to a host
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

function listPatterns() {
  const patternsDir = path.join(REF_PACKS_ROOT, 'patterns');
  return fs.readdirSync(patternsDir).filter((name) => {
    const examplePath = path.join(patternsDir, name, 'examples', 'index.html');
    return fs.existsSync(examplePath);
  });
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

  for (const pack of packs) {
    let response;
    try {
      response = await fetchPath(port, `/patterns/${pack}/examples/index.html`);
    } catch (e) {
      anyFail = true;
      lines.push(`FAIL  ${pack}  (fetch error: ${e.message})`);
      continue;
    }

    const failures = auditSpecimen(pack, response);
    if (failures.length === 0) {
      lines.push(`PASS  ${pack}`);
    } else {
      anyFail = true;
      lines.push(`FAIL  ${pack}`);
      for (const f of failures) lines.push(`        ${f}`);
    }
  }

  server.close();
  console.log(lines.join('\n'));
  console.log(`\n${packs.length} specimens audited; ${anyFail ? 'FAILURES present — gate red' : 'all green'}.`);
  process.exit(anyFail ? 1 : 0);
})().catch((err) => {
  console.error('bootstrap-integrity.js crashed:', err);
  process.exit(2);
});
