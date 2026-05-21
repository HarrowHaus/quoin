#!/usr/bin/env node
/**
 * content-completeness.js — enrichment layer for pattern specimen content drift.
 *
 * Purpose: detect content-level regressions on specimens that ARE expected to
 *   carry specific markers — GALLEY-themed copy, composition-lineage tables,
 *   sibling-pack references. NOT a CI gate: this is informational.
 *
 * Scope: patterns are explicitly enrolled in ENROLLMENT below. Patterns not
 *   enrolled are SKIPPED entirely (they do not appear in output). This keeps
 *   pre-GALLEY P0 patterns (button-system, testimonial, feature-grid,
 *   form-fields — all shipped before GALLEY copy was locked) from generating
 *   false-positive failures that muddy operator review.
 *
 * Exit status: always 0. This is an enrichment layer; it surfaces drift but
 *   does not block.
 *
 * Usage:
 *   node 02_reference-packs/scripts/content-completeness.js
 *
 * When adding a new pattern that carries GALLEY copy or composes siblings,
 * add an entry to ENROLLMENT below.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const REF_PACKS_ROOT = path.resolve(__dirname, '..');

/**
 * Per-pack enrollment. Each entry declares what the specimen should contain.
 *
 *   requireGalley:      true if the specimen should weave GALLEY/Galley copy somewhere
 *   requireLineage:     true if the specimen should ship a "Composition lineage" or
 *                       "What this pattern consumes" section (only for patterns that
 *                       compose siblings)
 *   composesSiblings:   array of expected @quoin/pattern-<name> references in body
 *   markers:            additional case-sensitive strings that must appear in body
 */
const ENROLLMENT = {
  'pricing-tiers': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'pattern-form-fields', 'pattern-feature-grid'],
    markers: ['GALLEY'],
  },
  'footer-mega': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'pattern-form-fields'],
    markers: ['GALLEY', 'Newsletter'],
  },
  // Phase 22 Cons. 4 (2026-05-20): 4 nav packs consolidated to @quoin/pattern-nav
  // with variant example files. Enrollment keys updated to reflect unified
  // structure; `path` field overrides default examples/index.html lookup.
  'nav/marketing': {
    path: 'nav/examples/marketing.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['GALLEY'],
  },
  'nav/app-chrome': {
    path: 'nav/examples/app-chrome.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'Cmd+K'],
  },
  'data-table': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'pattern-form-fields'],
    markers: ['Galley Dues', 'aria-sort', 'aria-selected'],
  },
  'form-validation': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'pattern-form-fields'],
    markers: ['Galley', 'WCAG', 'aria-invalid', 'role="alert"'],
  },
  'modal-dialog': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'pattern-form-fields'],
    markers: ['Galley', 'aria-modal', 'role="alertdialog"', 'Cmd+K'],
  },
  'toast-notifier': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'aria-live', 'WCAG 2.2.1'],
  },
  'empty-state': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley Dues', 'role="alert"', 'aria-live'],
  },
  'stat-card': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley Dues', 'tabular-nums', 'role="img"'],
  },
  'page-header': {
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system', 'vocab-app-shell', 'pattern-nav-app-chrome'],
    markers: ['Galley', 'aria-current', 'avatar-stack'],
  },
  // Phase 22 Cons. 3 (2026-05-20): the 5 hero packs consolidated to a single
  // @quoin/pattern-hero with variant example files. Enrollment keys updated
  // to reflect the unified structure; `path` field overrides the default
  // examples/index.html lookup.
  'hero/type-only': {
    path: 'hero/examples/type-only.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'Five tools', 'aria-labelledby', 'text-wrap: balance'],
  },
  'hero/animated': {
    path: 'hero/examples/animated.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'prefers-reduced-motion', 'WCAG 2.3.3', 'aria-hidden'],
  },
  'hero/gradient-mesh': {
    path: 'hero/examples/gradient-mesh.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'oklch(', 'WCAG 1.4.3', '@supports'],
  },
  'hero/brand-photo': {
    path: 'hero/examples/brand-photo.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'fetchpriority', 'WCAG 1.1.1', 'PLACEHOLDER FIXTURE'],
  },
  'hero/video': {
    path: 'hero/examples/video.html',
    requireGalley: true,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Galley', 'WCAG 2.2.2', 'playsinline', 'PLACEHOLDER FIXTURE'],
  },
  'nav/docs': {
    path: 'nav/examples/docs.html',
    requireGalley: false,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Quoin', 'WCAG 2.4.1', 'aria-current', 'Cmd+K'],
  },
  'nav/editorial': {
    path: 'nav/examples/editorial.html',
    requireGalley: false,
    requireLineage: true,
    composesSiblings: ['pattern-button-system'],
    markers: ['Broadsheet', 'aria-current', 'role="banner"', 'role="search"'],
  },
  // Pre-GALLEY P0 patterns (button-system, testimonial, feature-grid, form-fields)
  // intentionally not enrolled. They predate the GALLEY narrative.
  // nav-docs and nav-editorial intentionally NOT requireGalley — they're standalone
  // surfaces, not Galley product surfaces. nav-editorial markers reference the
  // fictional "The Broadsheet" publication used in the specimen.
};

function startServer() {
  const server = http.createServer((req, res) => {
    const relPath = path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^[/\\]+/, '');
    const absPath = path.join(REF_PACKS_ROOT, relPath);
    if (!absPath.startsWith(REF_PACKS_ROOT)) {
      res.writeHead(403);
      return res.end();
    }
    fs.readFile(absPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end();
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function fetchPath(port, urlPath) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}${urlPath}`, (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

function auditSpecimen(pack, { body }, spec) {
  const issues = [];
  const lcBody = body.toLowerCase();

  if (spec.requireGalley) {
    if (!lcBody.includes('galley')) {
      issues.push('expected GALLEY/Galley copy in specimen — none found');
    }
  }

  if (spec.requireLineage) {
    const hasLineage =
      lcBody.includes('composition lineage') ||
      lcBody.includes('what this pattern consumes') ||
      lcBody.includes('what footer-mega consumes') ||
      lcBody.includes('what the nav (marketing variant) consumes') ||
      lcBody.includes('what the nav (app-chrome variant) consumes') ||
      lcBody.includes('what the nav (docs variant) consumes') ||
      lcBody.includes('what the nav (editorial variant) consumes') ||
      lcBody.includes('what nav-marketing consumes') ||
      lcBody.includes('what nav-app-chrome consumes');
    if (!hasLineage) {
      issues.push('expected composition-lineage section — none found');
    }
  }

  if (spec.composesSiblings && spec.composesSiblings.length > 0) {
    for (const sibling of spec.composesSiblings) {
      const ref = `@quoin/${sibling}`;
      if (!body.includes(ref)) {
        issues.push(`expected reference to ${ref} — none found`);
      }
    }
  }

  if (spec.markers && spec.markers.length > 0) {
    for (const marker of spec.markers) {
      if (!body.includes(marker)) {
        issues.push(`expected marker "${marker}" — none found`);
      }
    }
  }

  return issues;
}

(async () => {
  const { server, port } = await startServer();
  const lines = [];
  let anyDrift = false;

  const enrolledPacks = Object.keys(ENROLLMENT);
  for (const pack of enrolledPacks) {
    const spec = ENROLLMENT[pack];
    let response;
    // Path can be overridden per enrollment entry (used for Cons. 3 unified
    // packs where multiple variant example files share one pack directory).
    const urlPath = spec.path
      ? `/patterns/${spec.path}`
      : `/patterns/${pack}/examples/index.html`;
    try {
      response = await fetchPath(port, urlPath);
    } catch (e) {
      lines.push(`SKIP  ${pack}  (fetch error: ${e.message})`);
      continue;
    }

    const issues = auditSpecimen(pack, response, spec);
    if (issues.length === 0) {
      lines.push(`OK    ${pack}`);
    } else {
      anyDrift = true;
      lines.push(`DRIFT ${pack}`);
      for (const i of issues) lines.push(`        ${i}`);
    }
  }

  server.close();
  console.log(lines.join('\n'));
  console.log(`\n${enrolledPacks.length} enrolled patterns audited; ${anyDrift ? 'drift surfaced — informational, does NOT block CI' : 'no drift'}.`);
  // Always exit 0 — content-completeness is enrichment, not a gate.
  process.exit(0);
})().catch((err) => {
  console.error('content-completeness.js crashed:', err);
  process.exit(2);
});
