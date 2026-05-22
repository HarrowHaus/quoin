// USML 2026.05 — Aesthetic-Pack Provider test runner.
//
// Validates each fixture against (a) the schema (must validate as a USML
// document), AND (b) the conformance-class-specific rule that type
// MUST equal "aesthetic" per USML §4.3.
//
// Usage: node spec/tests/aesthetic-pack/run.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import Ajv from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = join(__dirname, '..', '..', 'usml-schema.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const fixturesDir = join(__dirname, 'fixtures');
const expectedDir = join(__dirname, 'expected');

const results = [];
for (const file of readdirSync(fixturesDir)) {
  if (!file.endsWith('.json')) continue;
  const fixture = JSON.parse(readFileSync(join(fixturesDir, file), 'utf8'));
  const expected = JSON.parse(readFileSync(join(expectedDir, file), 'utf8'));
  const schemaValid = validate(fixture);
  const isAesthetic = fixture.type === expected.expectType;
  const actuallyValid = schemaValid && isAesthetic;
  results.push({ file, pass: actuallyValid === expected.expectValid, actuallyValid, expectedValid: expected.expectValid });
}

const passed = results.filter(r => r.pass).length;
const total = results.length;
console.log(`USML Aesthetic-Pack Provider scaffold: ${passed}/${total} tests pass`);
for (const r of results) {
  console.log(`  ${r.pass ? 'PASS' : 'FAIL'}  ${r.file}  (got=${r.actuallyValid}, expected=${r.expectedValid})`);
}
process.exit(passed === total ? 0 : 1);
