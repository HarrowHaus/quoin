# Quoin

A semantic design language that sits one layer above utility-first CSS frameworks. You write intent-bearing semantic elements (`<authority-mark>`, `<recede-block>`, `<density-grid>`). The compiler renders them to standard HTML and CSS at build time, using a pluggable token pack to determine the aesthetic. The browser sees normal output — no runtime, no proprietary engine, no AI inference at render time.

## Thesis

Existing CSS frameworks encode implementation. A typical Tailwind element looks like this:

```html
<div class="px-4 py-2 bg-stone-900 text-stone-50 rounded-lg font-medium tracking-tight hover:bg-stone-800">
  Submit
</div>
```

Quoin encodes intent:

```html
<primary-action>Submit</primary-action>
```

The aesthetic is supplied by a separate token pack — Swiss, brutalist, soft, corporate, anything — so the same semantic element renders correctly across any visual register. AI tools emit one semantic tag instead of a multi-class string, cutting token cost by roughly 10x while producing more legible, more reviewable, and more accessible output.

## Architecture

Four layers, three of which already exist as standards or shipped products:

1. **Authoring layer** *(new — Quoin)* — semantic Web Component tags
2. **Token layer** *(existing — W3C DTCG + Tailwind v4)* — three-tier tokens, pluggable aesthetic
3. **Compilation layer** *(new — Quoin compiler)* — build-time, emits Tailwind classes or raw CSS
4. **Rendering layer** *(existing — browser)* — standard HTML + CSS

## Pack types

Three composable pack categories distributed via npm under the `@quoin/*` scope:

- **Token packs** — aesthetic-bearing (colors, type, spacing, motion, radius). Reference: `@quoin/tokens-baseline`. Harvested: 30 production packs from Material 3, Carbon, Polaris, Fluent, Primer, Geist, Tailwind defaults, and more (see `03_harvest/`).
- **Vocabulary packs** — semantic element definitions for a domain. Reference: `@quoin/vocab-editorial` (21 primitives), `@quoin/vocab-dashboard` (15), `@quoin/vocab-essentials` (10), `@quoin/vocab-app-shell` (5). Harvested: 10 more covering shadcn, Radix, Headless, forms, docs, marketing.
- **Implementation packs** — compilation targets. Reference: `@quoin/impl-tailwind` (Tailwind v4 arbitrary-value classes, ships `companion.css` for hover/focus/motion polish + `companion.js` for tab / disclosure / modal / Cmd-K behaviors), `@quoin/impl-raw-css` (zero-dependency inline-style emitter).

A user composes their build by installing one of each.

## Intellectual lineage

- **Christopher Alexander, *A Pattern Language* (1977)** — design as generative grammar with syntax and vocabulary. Patterns as the basis for design systems.
- **Swiss / International Typographic Style** (Müller-Brockmann, Vignelli, Ruder, Aicher) — grid, hierarchy, restraint as foundational structural principles. The dominant design philosophy of the 20th century and the direct ancestor of modern UI.
- **Brutalist editorial design** — function over decoration, raw structural clarity, asymmetric composition.
- **DaisyUI** (19M npm installs, 350K weekly) — proves the appetite for semantic compression on top of Tailwind. Quoin extends the same compression one layer higher, from class names to semantic elements.
- **Tailwind v4** — three-layer token architecture as native infrastructure.
- **W3C Design Tokens Community Group (DTCG)** — token format standardization.

## Phase map

| Phase | Folder | Output | Status |
|-------|--------|--------|--------|
| 0 | `00_spec/` | Specification document (spec, pack-format, primitives, tokens) | shipped |
| 0.5 | `00_spec/tokens.md` | Canonical Namespace Expansion — token namespace expanded from ~30 to 164 tokens across 11 DTCG 2025.10 types. Frozen at v1.0. | complete |
| 3.5c | `03_harvest/build.js` | Geometric & typographic fidelity — all 30 harvested packs filled with `$value` for every v1.0 canonical token; strict validation passes catalog-wide. | complete |
| 1 | `01_compiler/` | Reference compiler (TypeScript, ESM, Vite plugin, browser entry) | shipped |
| 2 | `02_reference-packs/` | 7 reference packs: 1 token, 4 vocabulary, 2 implementation | shipped |
| 3 | `03_harvest/` | 40 harvested packs (30 token + 10 vocabulary) | shipped |
| 3.5 | `03_harvest/fidelity/` | Token Fidelity Pass — byte-faithful extraction framework + per-pack `fidelityTier` annotation (A/B/C) | partial (1 A, 5 B, 24 C; stop condition triggered → Phase 3.5b) |
| 3.5b | `03_harvest/fidelity/` | Comprehensive Fidelity Pass — three extraction methods (static parse, algorithm exec, per-file). 27 packs upgraded to extraction; 3 documented Tier C. | complete (1 A, 26 B, 3 C) |
| 4.5 | `04_docs/showcase/`, `04_docs/src/playground/` | Docs site refresh — new showcase page, three-pane playground REPL with all 30 token packs, shareable URLs, token-efficiency badge, fidelity-tier filters on pack browser, theme toggle. | complete |
| 4 | `04_docs/` | Documentation site, live playground, pack browser, migration guides | shipped |
| 5a | `02_reference-packs/impl-tailwind/companion.css` | Visual-maturity polish layer — hover, focus, motion, microinteractions | shipped |
| 5b | (per-primitive) | Specific-attribute variants on key primitives (`emphasis-card variant="featured"`, `alert-band variant="compact"`, etc.) | shipped |
| 5c | `02_reference-packs/impl-tailwind/companion.js` | Interactive behaviors — tab-panels keyboard nav, disclosure animation, modal trigger, Cmd-K command menu | shipped |
| 5d | `02_reference-packs/vocab-essentials/`, `vocab-app-shell/` | Two additional vocabulary packs covering the v1 gaps (10 essentials + 5 app-shell primitives) | shipped |
| 5e | `05_launch/` | npm publication, landing page, launch essay, demo video, HN/X drafts, release tag | pending |

## Status

Phases 0–4, 4.5, 5a–5d, 0.5, and 3.5c are complete. The canonical
namespace is at its v1.0 surface area — 164 tokens across 11 DTCG
2025.10 types — and frozen. Every token pack (reference + 30
harvested) supplies a `$value` for every canonical name; strict
validation passes catalogue-wide. A future optional 3.5d sweep
would refine per-pack shadow recipes / border widths / typography
composites to source-faithful values — incremental polish.

Phase 3.5 + 3.5b (Token Fidelity Pass + Comprehensive Fidelity Pass)
are complete: 27 of 30 token packs extract byte-faithfully from
canonical upstream sources (1 Tier A + 26 Tier B), with 3 documented
Tier C packs (clarity, geist, workday). See
[`03_harvest/REPORT.md`](03_harvest/REPORT.md). Phase 4.5 brought the
docs site to a modern-REPL standard. Phase 5e (launch) is staged but
not executed — see [`05_launch/README.md`](05_launch/README.md) for
the deliverables list, [`CHANGELOG.md`](CHANGELOG.md) for the running
change log, and [`PHASE_PROMPTS.md`](PHASE_PROMPTS.md) for the
per-phase Claude Code prompts.

## Canonical locations

- **Repo:** `github.com/harrowhaus/quoin`
- **Home page:** `harrow.haus/quoin`
- **npm scope:** `@quoin/*`

## License

MIT (planned). All harvested packs preserve their source attribution and license per the methodology in `03_harvest/README.md`.
