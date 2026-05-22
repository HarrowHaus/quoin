// USML 2026.05 — runs all four conformance class scaffolds and reports
// aggregate pass/fail. Source adapter scaffold added Phase 23.2.
// Backend Emitter formal scaffold (under spec/tests/emit/) added Phase 23.3.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const runners = [
  ['anatomy', join(__dirname, 'anatomy', 'run.mjs')],
  ['aesthetic-pack', join(__dirname, 'aesthetic-pack', 'run.mjs')],
  ['backend-emit (smoke)', join(__dirname, 'backend-emit', 'run.mjs')],
  ['emit (formal §6)', join(__dirname, 'emit', 'run.mjs')],
  ['ingest (source adapter)', join(__dirname, 'ingest', 'run.mjs')],
];

let allPass = true;
for (const [name, script] of runners) {
  console.log(`\n=== ${name} ===`);
  const result = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (result.status !== 0) allPass = false;
}

console.log(`\n=== USML 2026.05 conformance scaffold: ${allPass ? 'ALL PASS' : 'SOME FAILED'} ===`);
process.exit(allPass ? 0 : 1);
