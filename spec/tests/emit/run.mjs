// USML 2026.05 — Backend Emitter conformance test runner.
//
// Validates each fixture against:
//   (a) §6.5 Emission attribution metadata — required fields present at Level 3
//   (b) §6.2 Emission fidelity — per-property preservation evidenced for the
//       claimed conformance level
//   (c) §6.3 Conformance level — per-level requirements satisfied
//
// Each fixture has a corresponding expected outcome in expected/<same-name>.json
// indicating expectConformant (true/false), expectLevel, and expectViolation
// (when applicable).
//
// Usage: node spec/tests/emit/run.mjs
//
// Phase 23.3.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');
const expectedDir = join(__dirname, 'expected');

// §6.5 required attribution fields for Level 3 emissions.
const REQUIRED_ATTRIBUTION_FIELDS = [
  'emitter',
  'emitterVersion',
  'target',
  'sourcePatternName',
  'sourcePatternVersion',
  'usmlVersion',
];

// Per-level fidelity property requirements per §6.3.
const LEVEL_REQUIREMENTS = {
  1: {
    anatomyMandatoryPresent: true,
    // L1: everything else MAY be omitted
  },
  2: {
    anatomyMandatoryPresent: true,
    anatomyConditionalGated: true,
    variantsPresent: true,
    compositionResolved: true,
    ariaRolesPresent: true,
    ariaStatesPresent: true,
  },
  3: {
    anatomyMandatoryPresent: true,
    anatomyConditionalGated: true,
    variantsPresent: true,
    compositionResolved: true,
    ariaRolesPresent: true,
    ariaStatesPresent: true,
    tokenConsumptionPresent: true,
    microstatesPresent: true,
  },
};

function checkBackendEmitterConformance(emission) {
  const level = emission.conformanceLevel;
  if (![1, 2, 3].includes(level)) {
    return { conformant: false, violation: `invalid-conformance-level: ${level}` };
  }

  // §6.5 attribution: required at Level 3 only
  if (level === 3) {
    const att = emission.attribution || {};
    for (const field of REQUIRED_ATTRIBUTION_FIELDS) {
      if (!(field in att) || !att[field]) {
        return { conformant: false, violation: `attribution-missing-${field}` };
      }
    }
  }

  // §6.2 fidelity: per-level requirements
  const reqs = LEVEL_REQUIREMENTS[level];
  const evidence = emission.fidelityEvidence || {};
  for (const [prop, required] of Object.entries(reqs)) {
    if (required && !evidence[prop]) {
      // Map prop name to violation tag
      const tag = prop === 'anatomyMandatoryPresent' ? 'anatomy-mandatory-missing'
        : prop === 'anatomyConditionalGated' ? 'anatomy-conditional-ungated'
        : prop === 'variantsPresent' ? 'variants-missing'
        : prop === 'compositionResolved' ? 'composition-unresolved'
        : prop === 'ariaRolesPresent' ? 'aria-roles-missing'
        : prop === 'ariaStatesPresent' ? 'aria-states-missing'
        : prop === 'tokenConsumptionPresent' ? 'token-consumption-missing'
        : prop === 'microstatesPresent' ? 'microstates-missing'
        : prop;
      return { conformant: false, violation: tag };
    }
  }

  return { conformant: true };
}

const results = [];
for (const file of readdirSync(fixturesDir)) {
  if (!file.endsWith('.json')) continue;
  const fixture = JSON.parse(readFileSync(join(fixturesDir, file), 'utf8'));
  const expected = JSON.parse(readFileSync(join(expectedDir, file), 'utf8'));

  const result = checkBackendEmitterConformance(fixture);

  const conformantMatches = result.conformant === expected.expectConformant;
  const violationMatches = !expected.expectViolation || result.violation === expected.expectViolation;
  const pass = conformantMatches && violationMatches;

  results.push({
    file,
    pass,
    actualConformant: result.conformant,
    expectedConformant: expected.expectConformant,
    violation: result.violation,
    expectedViolation: expected.expectViolation,
  });
}

const passed = results.filter(r => r.pass).length;
const total = results.length;
console.log(`USML Backend Emitter scaffold: ${passed}/${total} tests pass`);
for (const r of results) {
  const tag = r.pass ? 'PASS' : 'FAIL';
  const conformantTag = r.actualConformant === r.expectedConformant ? '✓conformant' : '✗conformant';
  const violationTag = !r.expectedViolation ? '' : r.violation === r.expectedViolation ? ' ✓violation' : ` ✗violation (got "${r.violation}", expected "${r.expectedViolation}")`;
  console.log(`  ${tag}  ${r.file}  (${conformantTag}${violationTag})`);
}
process.exit(passed === total ? 0 : 1);
