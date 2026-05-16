# Phase 3 — Harvest

This phase builds the production-grade Quoin pack library, not a demo.
Reference packs (Phase 2) prove the language works. Harvested packs
prove the language can absorb the existing landscape of public design
systems.

## Floor and stretch

- **Floor:** 40 packs total — 30 token packs + 10 vocabulary packs.
- **Stretch:** 60+.
- **Quality non-negotiable.** 35 strong packs beat 50 weak ones. If the
  bar pushes the total below the floor, report and request operator
  guidance rather than padding.

## Target systems

### Token packs — priority one

| Pack | Source | License |
|------|--------|---------|
| `@quoin/tokens-material3` | Material Design 3 (Google) | Apache-2.0 |
| `@quoin/tokens-carbon` | Carbon (IBM) | Apache-2.0 |
| `@quoin/tokens-polaris` | Polaris (Shopify) | MIT |
| `@quoin/tokens-fluent` | Fluent 2 (Microsoft) | MIT |
| `@quoin/tokens-primer` | Primer (GitHub) | MIT |
| `@quoin/tokens-atlassian` | Atlassian Design System | Apache-2.0 |
| `@quoin/tokens-lightning` | Lightning (Salesforce) | BSD-3-Clause |
| `@quoin/tokens-spectrum` | Spectrum (Adobe) | Apache-2.0 |
| `@quoin/tokens-open-props` | Open Props (Adam Argyle) | MIT |
| `@quoin/tokens-radix` | Radix Colors (WorkOS) | MIT |
| `@quoin/tokens-uswds` | US Web Design System | CC0-1.0 / public domain |
| `@quoin/tokens-govuk` | GOV.UK Design System | MIT |
| `@quoin/tokens-gestalt` | Pinterest Gestalt | Apache-2.0 |
| `@quoin/tokens-paste` | Twilio Paste | MIT |
| `@quoin/tokens-workday` | Workday Canvas Kit | Apache-2.0 |
| `@quoin/tokens-geist` | Geist (Vercel) | MIT |
| `@quoin/tokens-shadcn` | shadcn/ui defaults | MIT |
| `@quoin/tokens-tailwind` | Tailwind v4 defaults | MIT |

### Token packs — priority two

Sourced from [Adele by UXPin](https://adele.uxpin.com/) and active
[Style Dictionary](https://github.com/amzn/style-dictionary) consumer
repos:

- `@quoin/tokens-mailchimp` — Mailchimp Refactor UI
- `@quoin/tokens-uber-base` — Uber Base Web
- `@quoin/tokens-elastic-eui` — Elastic EUI
- `@quoin/tokens-orbit` — Kiwi.com Orbit
- `@quoin/tokens-elevate` — Pluralsight Elevate
- `@quoin/tokens-clarity` — VMware Clarity
- `@quoin/tokens-evergreen` — Segment Evergreen
- `@quoin/tokens-ant` — Ant Design
- `@quoin/tokens-mantine` — Mantine
- `@quoin/tokens-chakra` — Chakra UI
- `@quoin/tokens-pluralsight-design` — Pluralsight Design System
- `@quoin/tokens-helio` — Helio
- Plus ~8 more from Open Props community themes, shadcn/ui theme
  registry, and W3C DTCG examples.

### Vocabulary packs — priority order

| Pack | Source | License |
|------|--------|---------|
| `@quoin/vocab-shadcn` | shadcn/ui patterns | MIT |
| `@quoin/vocab-radix` | Radix UI primitives | MIT |
| `@quoin/vocab-headless` | Headless UI patterns | MIT |
| `@quoin/vocab-ark` | Ark UI primitives | MIT |
| `@quoin/vocab-catalyst` | Catalyst (Tailwind UI, public-API patterns only) | MIT for non-proprietary semantics |
| `@quoin/vocab-daisy` | DaisyUI semantic classes | MIT |
| `@quoin/vocab-marketing` | Extracted marketing-page primitives | MIT (Quoin original) |
| `@quoin/vocab-docs` | Extracted documentation primitives | MIT (Quoin original) |
| `@quoin/vocab-forms` | Extracted form primitives | MIT (Quoin original) |
| `@quoin/vocab-dashboard-extended` | Extracted data-dense primitives | MIT (Quoin original) |

Catalyst is a paid Tailwind UI product. Only the patterns visible in
the public demo / documentation may be harvested as semantic
abstractions; no source code, components, or compiled CSS are copied.
When in doubt, omit.

## Source registries

- **[Adele by UXPin](https://adele.uxpin.com/)** — curated index of
  public design systems with attribution and license metadata.
- **[Style Dictionary user repos](https://github.com/amzn/style-dictionary)**
  — search GitHub for repos that publish Style Dictionary output;
  those token files are typically in standard format.
- **[W3C DTCG examples](https://design-tokens.github.io/community-group/format/)**
  — canonical DTCG sample files maintained by the spec authors.
- **[Tailwind preset registry](https://tailwindcss.com/blog/tailwindcss-v4)**
  — official Tailwind v4 default values and community presets.
- **[Open Props themes](https://open-props.style/)** — community
  variants and the canonical Open Props release.
- **[shadcn/ui theme library](https://ui.shadcn.com/themes)** — the
  registered theme browser for shadcn/ui includes well-defined CSS
  variable sets per theme.

## Quality bar

Every harvested pack MUST:

1. **Source clarity.** A clearly-identified, currently-maintained,
   publicly-licensed source. No NDA-protected material, no scraped
   private repos.
2. **License compatibility.** The harvested pack's license is
   compatible with the source license. MIT-sourced → publishes MIT;
   Apache-sourced → publishes Apache-2.0; mixed → explicit in LICENSE.
3. **Attribution.** Manifest `attribution` block names the source
   system, organisation, source URL, source license, and harvest date.
4. **Token coverage.** Every name in the canonical semantic-token
   namespace from `00_spec/tokens.md` §2 is supplied. Missing entries
   are derived from the base palette with the derivation logic
   documented in `REPORT.md`.
5. **Defensible mapping.** Any non-trivial mapping decision (more
   granular palette than Quoin, different semantic-name convention,
   missing or extra tokens) is documented per-pack in `REPORT.md`.
6. **Clean compile.** Validates against `@quoin/validate-pack` and
   compiles end-to-end via the Phase 1 compiler against a sample page
   using the same primitives the canonical reference packs ship.
7. **Recognisable visual smoke test.** When rendered against the
   canonical Phase-1 sample, the page is recognisable as the source
   aesthetic to someone familiar with that design system. (This is the
   subjective gate — when the operator runs the dogfooding test, the
   results should look correct.)

A pack that fails any of these moves to `03_harvest/holding/` with a
note on what would need to change before it ships under `@quoin/*`.

## Slop avoidance

Do not harvest from:

- **AI-generated theme generators** without provenance (e.g. random
  "ColorAI" outputs). The source must be a real, maintained design
  system.
- **Single-page "design system" landing sites** with no token export.
  No tokens, no harvest.
- **Trend-of-the-month aesthetic packs** (glassmorphism mood boards,
  neon-cyberpunk Figma kits) that ship visuals without semantic intent.
  Token packs encode functional decisions, not vibes.
- **Forks-of-forks with unclear provenance.** Trace to the canonical
  upstream or skip.
- **Stale repos.** No commits in 18+ months and no active issue
  triage. Aesthetic preserved by the dead don't ship.
- **Personal mood-board CSS-vars dumps** without documented intent.
- **Unlicensed snippets** posted on CodePen / dribbble / gist without
  clear license.

When in doubt, omit the pack and document the omission in `REPORT.md`.

## Methodology — per pack

1. **Read.** Access the system's public documentation and open-source
   codebase. Confirm currently maintained.
2. **Verify license.** Read the license file. Note SPDX identifier.
3. **Extract tokens.** Pull colour palette, type scale, spacing scale,
   radius scale, motion, optional elevation.
4. **Map onto canonical namespace.** Translate the source's semantic
   layer onto Quoin's. Where the source has finer granularity, choose
   a representative subset. Where it lacks a Quoin-required name,
   derive from the base palette and document the derivation.
5. **Emit pack.** Generate manifest, DTCG `tokens/index.json`,
   `tokens.css`, `README.md` describing the mapping, `LICENSE`.
6. **Validate.** Run `validate.js`.
7. **Compile-test.** Compile the canonical Phase-1 sample using the
   new pack + a vocabulary pack + an impl pack. Confirm zero Quoin
   tags survive and the canonical-namespace check passes.
8. **Visual smoke test.** Render the compiled HTML in a browser. Verify
   the result is recognisable as the source aesthetic. Operator
   confirms during the Phase 3 dogfooding test.

## Mapping decisions — common cases

- **More granular palette.** Source has 12 surface levels, Quoin has
  4. Choose representative subset, document mapping.
- **Different semantic name.** Source uses `elevated-surface`, Quoin
  uses `surface-elevated`. Direct rename.
- **Missing token.** Source lacks a Quoin-required semantic. Derive
  from the base palette with documented logic (e.g. `--accent-recede`
  = source's tint-50 if available, else `colour-mix(in oklch, accent 8%, transparent)`).
- **Extra tokens.** Source has tokens with no Quoin equivalent.
  Preserve as component tokens or omit with note.

## License and attribution constraints

- License compatibility (above).
- **No verbatim copying.** Harvested packs translate semantic intent
  into Quoin's canonical structure. They do not redistribute source
  assets, source code, or proprietary typefaces.
- **Typeface references.** Where a source uses a proprietary typeface
  (SF Pro, Segoe UI, Inter Display, etc.), the harvested pack
  references it by family name as a token value only. No font files
  are embedded.

## Deliverables

- `03_harvest/packs/` — harvested packs that pass the quality bar.
- `03_harvest/holding/` — packs that failed the bar with a note.
- `03_harvest/REPORT.md` — per-pack mapping decisions, ambiguous
  translations, gaps, omissions, and operator-verification asks.
- `03_harvest/validate.js` — validator that asserts the attribution
  block is present and license-coherent on every pack and runs a
  compile-test through the Phase 1 compiler.

## Operator review aids

Three runnable artefacts that compress the operator's manual review
from hours into ~15 minutes:

1. **Smoke gallery** — `node 03_harvest/smoke-gallery.js`. Renders the
   canonical Phase-2 showcase page against every harvested token pack
   and emits a single index page that links each rendering for
   side-by-side visual review. Output:
   `03_harvest/smoke-gallery/dist/index.html`.

2. **Tier-B verification** — `node 03_harvest/verify-tier-b.js`.
   Fetches each Tier-B pack's canonical upstream token source, saves
   the raw payload, and writes a side-by-side colour-value comparison
   at `03_harvest/verify-tier-b/REPORT.md`. Some sources have moved /
   restructured; those are reported as `fetch failed` and the pack
   remains a manual ask.

3. **Dogfooding test** — see
   [`dogfood/harrowhaus/REPORT.md`](dogfood/harrowhaus/REPORT.md). A
   complete Harrow Haus marketing page built using only harvested
   packs + a project-local `quoin.tokens.json`. Zero hand-written CSS.
   Exercises the Phase 3 acceptance gate from
   [`PHASE_GATES.md`](../PHASE_GATES.md).

## Exit criteria

See [`../PHASE_GATES.md`](../PHASE_GATES.md) (Phase 3 section).
