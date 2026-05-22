// USML 2026.05 — Anatomy Validator test runner.
//
// Validates each fixture in fixtures/ against spec/usml-schema.json and
// compares the validation outcome to the expected outcome in expected/.
//
// Usage: node spec/tests/anatomy/run.mjs

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename } from 'node:path';
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
  const actualValid = validate(fixture);
  const pass = actualValid === expected.expectValid;
  const errorMatch = expected.expectError
    ? (validate.errors || []).some(e => JSON.stringify(e).includes(expected.expectError))
    : true;
  results.push({ file, pass: pass && errorMatch, actualValid, expectedValid: expected.expectValid });
}

const passed = results.filter(r => r.pass).length;
const total = results.length;
console.log(`USML Anatomy Validator scaffold: ${passed}/${total} tests pass`);
for (const r of results) {
  console.log(`  ${r.pass ? 'PASS' : 'FAIL'}  ${r.file}  (got valid=${r.actualValid}, expected=${r.expectedValid})`);
}
process.exit(passed === total ? 0 : 1);
