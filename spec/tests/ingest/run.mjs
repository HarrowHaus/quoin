// USML 2026.05 — Source Adapter conformance test runner.
//
// Validates each fixture against:
//   (a) the schema (USML Anatomy Validator class — every emitted Pattern MUST validate)
//   (b) the §7.4 Translation attribution metadata requirements (system + url + license MUST be present)
//   (c) the §7.5 License clearance procedure (the license string MUST NOT declare commercial-only or no-derivative-works restrictions)
//
// Each fixture has a corresponding expected outcome in expected/<same-name>.json
// indicating expectValid (schema-validation expectation) and
// expectSourceAdapterConformant (Source Adapter class expectation).
//
// Usage: node spec/tests/ingest/run.mjs

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

// §7.4 Required attribution fields per the USML 2026.05 schema (PatternMetadataSource type).
const REQUIRED_ATTRIBUTION_FIELDS = ['system', 'url', 'license'];

// §7.5 License clearance — incompatible-license patterns. A source-adapter
// MUST NOT emit a Pattern whose source.license matches any of these.
const INCOMPATIBLE_LICENSE_PATTERNS = [
  /all\s+rights\s+reserved/i,
  /commercial[-\s]?only/i,
  /no\s+derivative\s+works/i,
  /proprietary/i,
];

function isLicenseIncompatible(licenseString) {
  if (typeof licenseString !== 'string') return false;
  return INCOMPATIBLE_LICENSE_PATTERNS.some(r => r.test(licenseString));
}

function checkSourceAdapterConformance(pattern) {
  const source = pattern?.metadata?.source;
  if (!source) {
    return { conformant: false, violation: 'metadata.source missing' };
  }
  for (const field of REQUIRED_ATTRIBUTION_FIELDS) {
    if (!(field in source) || !source[field]) {
      return { conformant: false, violation: `metadata.source missing required field "${field}" per §7.4` };
    }
  }
  if (isLicenseIncompatible(source.license)) {
    return { conformant: false, violation: `metadata.source.license is incompatible per §7.5: "${source.license}"` };
  }
  return { conformant: true };
}

const results = [];
for (const file of readdirSync(fixturesDir)) {
  if (!file.endsWith('.json')) continue;
  const fixture = JSON.parse(readFileSync(join(fixturesDir, file), 'utf8'));
  const expected = JSON.parse(readFileSync(join(expectedDir, file), 'utf8'));

  const schemaValid = validate(fixture);
  const adapter = checkSourceAdapterConformance(fixture);

  const validMatches = schemaValid === expected.expectValid;
  const conformantMatches = adapter.conformant === expected.expectSourceAdapterConformant;
  const pass = validMatches && conformantMatches;

  results.push({
    file,
    pass,
    schemaValid,
    expectValid: expected.expectValid,
    sourceAdapterConformant: adapter.conformant,
    expectSourceAdapterConformant: expected.expectSourceAdapterConformant,
    violation: adapter.violation,
  });
}

const passed = results.filter(r => r.pass).length;
const total = results.length;
console.log(`USML Source Adapter scaffold: ${passed}/${total} tests pass`);
for (const r of results) {
  const tag = r.pass ? 'PASS' : 'FAIL';
  const schemaTag = r.schemaValid === r.expectValid ? '✓schema' : '✗schema';
  const adapterTag = r.sourceAdapterConformant === r.expectSourceAdapterConformant ? '✓adapter' : '✗adapter';
  console.log(`  ${tag}  ${r.file}  (${schemaTag}, ${adapterTag})`);
  if (!r.pass && r.violation) {
    console.log(`        violation: ${r.violation}`);
  }
}
process.exit(passed === total ? 0 : 1);
