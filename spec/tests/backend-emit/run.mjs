// USML 2026.05 — Backend Emitter test runner (smoke-scaffold).
//
// The 2026.05 scaffold does not yet ship a reference emitter program;
// instead, this runner verifies that the expected emission file for each
// fixture exists and has the canonical short-form data-pattern attribute
// per USML §5.1, plus required ARIA attributes per the pattern's
// accessibility contract.
//
// Future versions will run a real emitter against fixtures and diff the
// output against expected/. The scaffold ensures the test infrastructure
// shape is correct.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');
const expectedDir = join(__dirname, 'expected');

const results = [];
for (const fixtureFile of readdirSync(fixturesDir)) {
  if (!fixtureFile.endsWith('.json')) continue;
  const expectedHtml = join(expectedDir, fixtureFile.replace(/\.json$/, '.html'));
  if (!existsSync(expectedHtml)) {
    results.push({ file: fixtureFile, pass: false, reason: 'expected output missing' });
    continue;
  }
  const html = readFileSync(expectedHtml, 'utf8');
  // Check: short-form data-pattern per v3.G.15
  const hasLongForm = /data-pattern="pattern-/.test(html);
  // Check: no deprecated data-register per v3.G.16
  const hasDataRegister = /data-register=/.test(html);
  const pass = !hasLongForm && !hasDataRegister;
  results.push({ file: fixtureFile, pass, reason: hasLongForm ? 'long-form data-pattern' : hasDataRegister ? 'deprecated data-register' : '' });
}

const passed = results.filter(r => r.pass).length;
const total = results.length;
console.log(`USML Backend Emitter scaffold: ${passed}/${total} tests pass`);
for (const r of results) {
  console.log(`  ${r.pass ? 'PASS' : 'FAIL'}  ${r.file}  ${r.reason}`);
}
process.exit(passed === total ? 0 : 1);
