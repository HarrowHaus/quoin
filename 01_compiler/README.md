# @quoin/compiler — Phase 1 reference compiler

TypeScript reference implementation of the Quoin compiler. Reads HTML
containing Quoin semantic elements; resolves them against an active
token / vocabulary / implementation pack stack per the spec in
[`00_spec/`](../00_spec/); emits standard HTML and CSS.

The compiler is build-time. The browser receives no Quoin-specific
runtime, no shadow DOM, no proprietary tag — only standard HTML and CSS.

## Layout

```
01_compiler/
├── src/                    Compiler source (TypeScript, ESM)
│   ├── compiler.ts         Pipeline (parse -> identify -> resolve -> emit)
│   ├── parser.ts           HTML -> internal node tree
│   ├── serializer.ts       Internal tree -> HTML string
│   ├── cascade.ts          Canonical-attribute cascade (spec §3)
│   ├── token-resolver.ts   DTCG flatten + reference resolution
│   ├── pack-loader.ts      Token / vocabulary / implementation pack loaders
│   ├── pack-validator.ts   JSON-Schema manifest validation (Ajv)
│   ├── schema/             pack-manifest.json (mirrors pack-format.md §3.4)
│   ├── types.ts            Shared TypeScript contracts
│   ├── errors.ts           CompilerError + diagnostic codes
│   ├── vite.ts             Vite plugin entry
│   └── index.ts            Public API
├── test/                   Vitest test suite
│   ├── primitives.test.ts  All 36 v1 primitives compile correctly
│   ├── cascade.test.ts     Inheritance + override precedence
│   ├── composition.test.ts Pack composition, swap, last-loaded-wins
│   ├── errors.test.ts      INVALID_ATTRIBUTE_VALUE / MISSING_TOKEN / ...
│   ├── tokens.test.ts      Token-resolver unit tests
│   └── pipeline.test.ts    End-to-end determinism + serializer
├── test-fixtures/          Phase-1 fixture packs (to be replaced in Phase 2)
│   ├── tokens-baseline/
│   ├── vocab-editorial/
│   ├── vocab-dashboard/
│   └── impl-tailwind/
└── sample/                 Sample reference page (real Vite project)
    ├── index.html          Quoin source — 14 primitives, 6 categories
    ├── vite.config.ts      Imports `quoin()` from ../dist/vite.js
    └── public/styles.css   Copied to dist/ by Vite
```

The packs under `test-fixtures/` are **Phase-1 fixtures**, not the
canonical Phase-2 distributables. They exist here so the compiler can
exercise the full pack-loader path against schema-conformant inputs.

## Build / test

```bash
cd 01_compiler
npm install
npm run typecheck          # strict TypeScript
npm test                   # run the full suite
npm run test:coverage      # run with coverage (90% line floor)
npm run build              # emit dist/
npm run sample             # build compiler, then vite build sample/ -> sample/dist/
```

`npm run sample` is a chained script: it runs `npm run build` first (the
sample's `vite.config.ts` imports the plugin from `../dist/vite.js`)
and then `cd sample && vite build` to exercise the Vite plugin
end-to-end against the Quoin source in `sample/index.html`.

## Public API

```ts
import {
  compile,
  createCompiler,
  loadTokenPack,
  loadVocabularyPack,
  loadImplementationPack
} from "@quoin/compiler";

const [tokenPack, vocab, impl] = await Promise.all([
  loadTokenPack("@quoin/tokens-baseline"),
  loadVocabularyPack("@quoin/vocab-editorial"),
  loadImplementationPack("@quoin/impl-tailwind")
]);

const { html, css, warnings } = compile({
  source: "<authority-mark>Hello</authority-mark>",
  tokenPack,
  vocabularyPacks: [vocab],
  implementationPack: impl,
  projectTokens: { accent: "oklch(60% 0.2 250)" }
});
```

### One-shot vs reusable compiler

- `compile(options)` — runs the pipeline once. No state retained.
- `createCompiler(packs).compile(source)` — caches the loaded packs but
  builds fresh diagnostic / token-usage state per call. Use this when
  multiple sources share a configuration.

Every `compile()` call begins with empty state — no diagnostics, no
token-usage trackers, no cached intermediate trees — which means swapping
packs and recompiling produces a clean result with no leakage between
builds.

### Vite plugin

```ts
import { defineConfig } from "vite";
import quoin from "@quoin/compiler/vite";

export default defineConfig({
  plugins: [
    quoin({
      tokenPack: "@quoin/tokens-baseline",
      vocabularyPacks: ["@quoin/vocab-editorial", "@quoin/vocab-dashboard"],
      implementationPack: "@quoin/impl-tailwind",
      projectTokens: {
        accent: "oklch(58% 0.18 250)",
        "font-display": "Inter, system-ui, sans-serif"
      }
    })
  ]
});
```

The plugin transforms `index.html` via `transformIndexHtml` and any other
`.html` files via `transform`. Emitted CSS from impl packs is collected
into a single `quoin.css` asset at bundle time.

## Error model

`CompilerError` carries a structured `code` plus a `toDiagnostic()`
formatter (see `errors.ts`). The compiler fails fast on:

| Code | When |
|------|------|
| `UNKNOWN_PRIMITIVE` | Tag name not in any loaded vocabulary pack. |
| `INVALID_ATTRIBUTE_VALUE` | Canonical or specific value outside the allowed set. |
| `MISSING_TOKEN` | Semantic-token reference not supplied by the active token pack. |
| `MISSING_EMITTER` | Vocabulary primitive has no emitter in the active impl pack. |
| `CIRCULAR_TOKEN_REFERENCE` | `{path}` reference cycle in DTCG input. |
| `INVALID_PACK` | Manifest fails JSON-Schema validation. |
| `DUPLICATE_PRIMITIVE` | Same name declared twice within one pack. |

Non-fatal conditions are surfaced as `result.warnings`:

- Primitive-name collisions across loaded vocabulary packs.
- Tokens declared by the active token pack but never referenced.
- Primitives declared by a vocabulary pack but never used in the source.

## Determinism

`compile()` is pure: identical (source + packs + projectTokens) inputs
produce byte-identical output. Element attributes are alphabetised at
serialisation time; child order is preserved; whitespace is collapsed only
where the parser would have collapsed it natively.

## What this is not

- Not a runtime. There is no `customElements.define` here. The optional
  Web Components fallback referenced in `spec.md` §6 lives in
  `@quoin/runtime` (not part of Phase 1).
- Not a Tailwind preprocessor. The impl pack emits Tailwind class strings
  alongside HTML; building those classes into CSS is delegated to the
  user's existing Tailwind toolchain. The sample ships a hand-written
  shim so the page is viewable without Tailwind installed.
- Not yet the canonical distributable packs. The packs under
  `test-fixtures/` are minimum-viable Phase-1 fixtures; Phase 2 produces
  the proper `@quoin/*` distributables.

## Cross-references

- Spec: [`../00_spec/spec.md`](../00_spec/spec.md) — language reference.
- Pack format: [`../00_spec/pack-format.md`](../00_spec/pack-format.md) — manifest JSON Schema.
- Primitives: [`../00_spec/primitives.md`](../00_spec/primitives.md) — the 36 v1 primitives.
- Tokens: [`../00_spec/tokens.md`](../00_spec/tokens.md) — canonical semantic namespace.
- Exit criteria: [`../PHASE_GATES.md`](../PHASE_GATES.md) — Phase 1 section.
