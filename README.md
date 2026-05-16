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

- **Token packs** — aesthetic-bearing (colors, type, spacing, motion, radius). Example: `@quoin/tokens-baseline`, `@quoin/tokens-material`.
- **Vocabulary packs** — semantic element definitions for a domain. Example: `@quoin/vocab-editorial`, `@quoin/vocab-dashboard`.
- **Implementation packs** — compilation targets. Example: `@quoin/impl-tailwind`, `@quoin/impl-raw-css`.

A user composes their build by installing one of each.

## Intellectual lineage

- **Christopher Alexander, *A Pattern Language* (1977)** — design as generative grammar with syntax and vocabulary. Patterns as the basis for design systems.
- **Swiss / International Typographic Style** (Müller-Brockmann, Vignelli, Ruder, Aicher) — grid, hierarchy, restraint as foundational structural principles. The dominant design philosophy of the 20th century and the direct ancestor of modern UI.
- **Brutalist editorial design** — function over decoration, raw structural clarity, asymmetric composition.
- **DaisyUI** (19M npm installs, 350K weekly) — proves the appetite for semantic compression on top of Tailwind. Quoin extends the same compression one layer higher, from class names to semantic elements.
- **Tailwind v4** — three-layer token architecture as native infrastructure.
- **W3C Design Tokens Community Group (DTCG)** — token format standardization.

## Phase map

| Phase | Folder | Output |
|-------|--------|--------|
| 0 | `00_spec/` | Specification document (current) |
| 1 | `01_compiler/` | Reference compiler |
| 2 | `02_reference-packs/` | 3-5 hand-curated reference packs |
| 3 | `03_harvest/` | AI-translated packs from existing design systems |
| 4 | `04_docs/` | Documentation site + playground |
| 5 | `05_launch/` | npm publication, landing page, launch essay |

## Status

Phase 0 in progress. See `HANDOFF.md` for operator instructions and `PHASE_PROMPTS.md` for the per-phase Claude Code prompts.

## Canonical locations

- **Repo:** `github.com/harrowhaus/quoin`
- **Home page:** `harrow.haus/quoin`
- **npm scope:** `@quoin/*`

## License

MIT (planned). All harvested packs preserve their source attribution and license per the methodology in `03_harvest/README.md`.
