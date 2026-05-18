# Quoin Harvest Method — Three Extraction Methods

**Applies to:** any token-pack harvest (color, geometric, typographic, motion, composite).

## The Three Methods

### Method A — Static Fetch + Parse

For systems with canonical static token files.

**Process:**
1. Identify canonical source URL (prefer official docs over GitHub source when they conflict).
2. Fetch source file (CSS, SCSS, TS, JSON, YAML, DTCG JSON).
3. Parse with appropriate parser (extend `03_harvest/fidelity/parsers.js` if format unsupported).
4. Map source values onto Quoin canonical namespace.
5. Convert color values to OKLCH via culori.
6. Write extracted values to `03_harvest/sources/<pack-name>.json`.
7. Rebuild pack: `node 03_harvest/build.js`.
8. Document mapping decisions in `quoin.pack.json` `harvestNotes` field.

**Existing framework:** `03_harvest/fidelity/extract.js` handles this flow. Spec format: `03_harvest/fidelity/specs/<name>.js`.

**Use when:** source ships static token files (Material 3 typography tokens, Carbon's @carbon/colors, Polaris DTCG JSON, Tailwind v4 CSS, Open Props, USWDS SCSS, Bootstrap SCSS).

### Method B — Algorithm Execution

For systems whose canonical form is a generation algorithm (not static values).

**Process:**
1. Identify the source system's published generation library (npm package).
2. `npm install` the library as a dev dependency of `03_harvest/fidelity/` (NOT of the published pack).
3. Call the library's generation function with documented default inputs (seed colors, base palettes, scale ratios).
4. Capture the output values.
5. Convert to canonical formats (OKLCH for color, rem for dimensions).
6. Write to `03_harvest/sources/<pack-name>.json`.
7. Document in `harvestNotes`: "Values computed by running `<library>@<version>` with documented default inputs `<inputs>`. To regenerate with different inputs, install `<library>` and re-run extraction."

**Critical:** the published pack ships STATIC values only. The generation library is NOT a runtime dependency of the pack.

**Examples:**
- **material3**: `npm install @material/material-color-utilities`. Call `themeFromSourceColor(argbFromHex('#6750A4'))`. Extract tonal palette tones [0, 10, 20, ..., 100] for primary/secondary/tertiary/neutral/neutralVariant/error.
- **ant**: `npm install @ant-design/colors`. Call `generate('#1677ff')`. Extract 10-step ramp.
- **mui**: install `@mui/material`, programmatically read `colors/*.js` exports.

**Use when:** source publishes a generation library or seed-based algorithm rather than static values.

### Method C — Per-File Structured Extraction

For systems whose values are static but split across multiple files in patterns that defeat concatenated parsing.

**Process:**
1. List all source files individually (don't try to concatenate).
2. Write a parser that processes each file individually with name-scoping.
3. Fetch each file, parse it, namespace results by source filename.
4. Merge per-file results into the pack source JSON.
5. Document the file-by-file extraction in `harvestNotes`.

**Examples:**
- **carbon**: `npm install @carbon/colors`, read its per-family exports (gray, blue, red, etc.). Or fetch each `<color>.scss` file individually.
- **mui**: per-color files at `packages/mui-material/src/colors/{indigo,red,green,...}.js`. Fetch each individually with the JS-export parser. Namespace by filename. Do NOT concatenate.
- **primer**: bespoke JSON5 parser for `$value.hex` nested shape.

**Use when:** source publishes static values but in a structure that needs per-file logic (Carbon, MUI, Primer).

## Decision Tree

```
Does the source publish a single static token file?
├── YES → Method A (static fetch + parse)
└── NO → Does it publish a generation library?
        ├── YES → Method B (algorithm execution)
        └── NO → Are values split across multiple structured files?
                ├── YES → Method C (per-file extraction)
                └── NO → Is reasonable URL search exhausted?
                        ├── NO → Continue searching
                        └── YES → Tier C (designed approximation with documented gap)
```

## Tier Classification

| Tier | Criterion |
|---|---|
| **A** | Byte-faithful from a single static source file with no mapping decisions required. |
| **B** | Byte-faithful from canonical source with documented mapping decisions (which source value maps to which canonical name). |
| **C** | Genuinely unresolvable: no public static file, no published generation library, reasonable URL search exhausted. Designed approximation shipped with documented reason. |

**Target:** 0–3 Tier C packs at v1.0.

## Mapping Decisions

When a source system's vocabulary doesn't align 1:1 with Quoin's canonical namespace:

- **Source has more granular tokens than canonical:** pick which source values map best to which canonical scale points. Document the choice.
- **Source has fewer tokens than canonical:** interpolate or extrapolate using documented source ratios. Document the derivation.
- **Source has overlapping tokens with no canonical equivalent:** ship as per-pack extension token (not part of canonical), document in pack README.

## Source Preference

When conflicts exist between official docs and GitHub source code:

**Prefer canonical documentation sites** — the doc is the design intent; code is the implementation, which may have drifted, includes legacy values, or carries internal-only tokens.

Exceptions:
- If docs are clearly outdated (last update >1 year, references deprecated versions), trust code.
- If docs are ambiguous and code is precise, trust code.
- For algorithmic systems (Method B), trust the algorithm's output, not the docs' example values.

## Re-extraction Triggers

A pack's harvest needs re-running when:
- Source publishes a new major version.
- Source publishes a redesign that changes token values.
- Source migrates token format (e.g., legacy → DTCG).
- Source moves repository (URL stale).
- Source changes license (relevant for redistribution).

Document `harvestedAt` and `sourceCommit` in `quoin.pack.json` to track drift.

## License Compatibility

Before redistributing extracted values, confirm license:

| License | Redistribution stance |
|---|---|
| MIT | OK |
| Apache-2.0 | OK |
| BSD-3-Clause | OK |
| OFL 1.1 (fonts only) | OK with attribution |
| CC0 / Public Domain | OK |
| ISC | OK |
| **Custom license based on MIT** (Shopify Polaris) | CONFIRM language before shipping |
| **Dual ELv2 / SSPL** (Elastic UI) | DO NOT redistribute; reference values via documentation links only |
| **Proprietary** | DO NOT extract or redistribute. Tier C with documented gap. |

## When to Halt

Halt and report if:

- Mapping decisions become subjective (no defensible single answer).
- Source license becomes incompatible.
- More than 3 packs trend toward Tier C in a given fidelity phase.
- Algorithm execution produces unexpected output.
- A source's published values fundamentally conflict with the canonical namespace's structure.

See `quoin-pack-author.md` for downstream pack quality bar.
