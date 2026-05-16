# Phase 2 — Reference packs

The canonical `@quoin/*` distributables. Five packs covering the three
pack types defined in [`00_spec/pack-format.md`](../00_spec/pack-format.md),
plus a validation script and three composition demos.

## Packs

| Pack | Type | Coverage |
|------|------|----------|
| [`tokens-baseline/`](tokens-baseline) | Token | Full canonical semantic namespace. OKLCH greyscale, system fonts, conservative scales. Ships DTCG JSON + CSS custom-property stylesheet. |
| [`vocab-editorial/`](vocab-editorial) | Vocabulary | 21 primitives: editorial 8 + layout 7 + content 6. |
| [`vocab-dashboard/`](vocab-dashboard) | Vocabulary | 15 primitives: navigation 5 + state 5 + interactive 5. |
| [`impl-tailwind/`](impl-tailwind) | Implementation | Tailwind v4 emitter. Token-bearing classes use arbitrary-value syntax (`bg-[var(--accent)]`) so the pack is token-pack agnostic. |
| [`impl-raw-css/`](impl-raw-css) | Implementation | Raw CSS emitter. Inline `style` attributes referencing CSS custom properties. Zero framework dependency. |

Together the two vocabulary packs supply the complete 36-primitive v1
vocabulary from [`00_spec/primitives.md`](../00_spec/primitives.md). Both
implementation packs handle every primitive in both vocabularies.

## Relationship to Phase 1 fixtures

Phase 1 (`01_compiler/test-fixtures/`) shipped minimum-viable fixture
packs sufficient to exercise the compiler end-to-end. Phase 2's packs
**supersede those fixtures** for any real use:

- Manifests are publication-ready (full metadata, repository fields,
  homepage URLs).
- `tokens-baseline` ships an additional `tokens.css` runtime export and
  a richer palette (status colours have soft variants).
- `impl-tailwind` uses arbitrary-value classes referencing CSS variables
  rather than hardcoded `bg-stone-900` style strings — meaning it works
  with any compliant token pack.
- `impl-raw-css` is new in Phase 2. It proves the architecture is not
  Tailwind-bound: the same Quoin source compiles to vanilla HTML +
  inline styles with no framework dependency at all.

The Phase 1 fixtures stay in place to keep the compiler test suite
self-contained.

## Validation

```bash
# from 02_reference-packs/
node validate.js
```

Loads every pack via the compiler, asserts the 21 + 15 = 36 primitive
counts, then compiles every primitive against both implementation packs
and confirms no Quoin tags leak. **80 checks** in the current run.

## Composition demos

Three runnable demos under [`demos/`](demos), each composing a different
pack stack against the same Phase 1 compiler:

| Demo | Vocabulary | Tokens | Implementation |
|------|------------|--------|----------------|
| [`article-tailwind/`](demos/article-tailwind) | editorial | baseline | tailwind |
| [`dashboard-rawcss/`](demos/dashboard-rawcss) | dashboard | baseline | raw-css |
| [`showcase-tailwind/`](demos/showcase-tailwind) | editorial + dashboard | baseline | tailwind |

Build all three at once:

```bash
# from 02_reference-packs/
node demos/build.js
```

This emits `demos/{name}/dist/index.html` for each demo, plus the token
pack's `tokens.css` copied in alongside, plus (for the Tailwind demos)
a lab-only `impl.css` shim that resolves the arbitrary-value classes
without a Tailwind toolchain installed. Open any `dist/index.html`
directly in a browser.

Prerequisite: the Phase 1 compiler must have been built once
(`cd ../01_compiler && npm run build`).

## Cross-references

- [`00_spec/`](../00_spec) — language reference, pack format, primitives, tokens.
- [`01_compiler/`](../01_compiler) — reference compiler that consumes these packs.
- [`PHASE_GATES.md`](../PHASE_GATES.md) — Phase 2 exit criteria.
