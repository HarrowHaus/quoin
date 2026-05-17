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
| 1 | `01_compiler/` | Reference compiler (TypeScript, ESM, Vite plugin, browser entry) | shipped |
| 2 | `02_reference-packs/` | 7 reference packs: 1 token, 4 vocabulary, 2 implementation | shipped |
| 3 | `03_harvest/` | 40 harvested packs (30 token + 10 vocabulary) | shipped |
| 3.5 | `03_harvest/fidelity/` | Token Fidelity Pass — byte-faithful extraction framework + per-pack `fidelityTier` annotation (A/B/C) | partial (1 A, 5 B, 24 C; stop condition triggered) |
| 4 | `04_docs/` | Documentation site, live playground, pack browser, migration guides | shipped |
| 5a | `02_reference-packs/impl-tailwind/companion.css` | Visual-maturity polish layer — hover, focus, motion, microinteractions | shipped |
| 5b | (per-primitive) | Specific-attribute variants on key primitives (`emphasis-card variant="featured"`, `alert-band variant="compact"`, etc.) | shipped |
| 5c | `02_reference-packs/impl-tailwind/companion.js` | Interactive behaviors — tab-panels keyboard nav, disclosure animation, modal trigger, Cmd-K command menu | shipped |
| 5d | `02_reference-packs/vocab-essentials/`, `vocab-app-shell/` | Two additional vocabulary packs covering the v1 gaps (10 essentials + 5 app-shell primitives) | shipped |
| 5e | `05_launch/` | npm publication, landing page, launch essay, demo video, HN/X drafts, release tag | pending |

## Status

Phases 0–4 plus 5a–5d are complete. Phase 3.5 (Token Fidelity Pass)
ran partial — the extraction framework shipped and 6 packs were
upgraded (1 Tier A + 5 Tier B), but 24 packs hit the >5-Tier-C stop
condition and await operator decision (see
[`03_harvest/REPORT.md`](03_harvest/REPORT.md)). Phase 5e (launch) is
staged but not executed — see [`05_launch/README.md`](05_launch/README.md)
for the deliverables list, and [`PHASE_PROMPTS.md`](PHASE_PROMPTS.md)
for the per-phase Claude Code prompts.

## Canonical locations

- **Repo:** `github.com/harrowhaus/quoin`
- **Home page:** `harrow.haus/quoin`
- **npm scope:** `@quoin/*`

## License

MIT (planned). All harvested packs preserve their source attribution and license per the methodology in `03_harvest/README.md`.
