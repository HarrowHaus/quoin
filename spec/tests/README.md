# USML 2026.05 — conformance test scaffold

This directory contains a minimal test suite scaffold for USML's three
conformance classes. The scaffold demonstrates test infrastructure exists;
it is not exhaustive. Future versions will expand coverage substantially.

## Conformance classes

| Class | Tests directory | Purpose |
|-------|-----------------|---------|
| USML Anatomy Validator | `anatomy/` | Validates that an implementation correctly accepts conformant inputs and rejects non-conformant inputs |
| USML Aesthetic-Pack Provider | `aesthetic-pack/` | Validates that an aesthetic pack conforms to DTCG 2025.10 and declares no anatomy |
| USML Backend Emitter | `backend-emit/` | Validates that emitted output preserves anatomy + variants + composition + accessibility |

## Test fixture structure

Each conformance class directory contains:

```
<class>/
  fixtures/         # input fixtures (.json or .html)
  expected/         # expected outcomes (validate-pass / validate-fail / output-shape)
  run.mjs           # test runner (Node ESM script)
```

## Running the suite

```bash
cd spec/tests
node run-all.mjs
```

Implementations report results by running the suite and publishing a
conformance report (see [`../conformance-report.md`](../conformance-report.md)
for the Quoin reference implementation's report).

## Authoring new tests

Each fixture is a self-contained file. Each expected outcome is a separate
file in the `expected/` directory with the same basename:

- `fixtures/valid-disclosure.json` ↔ `expected/valid-disclosure.json` (validation outcome)
- `fixtures/invalid-pattern-missing-name.json` ↔ `expected/invalid-pattern-missing-name.json`

Future contributors can add fixtures freely; the test runner discovers them
by directory scan.

## Scope of this scaffold

The 2026.05 scaffold ships one passing test + one failing test per
conformance class — enough to demonstrate the test infrastructure
exists and the test runner correctly catches violations. Future versions
will add comprehensive coverage.
