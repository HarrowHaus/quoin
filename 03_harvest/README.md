# Phase 3 — Harvest

Status: pending phase 2 completion.

## Scope

Harvest at minimum 10 packs from existing public design systems. Each harvest translates a public design system's tokens and (where applicable) component semantics into Quoin-compatible packs conforming to the spec in `00_spec/`.

This phase is the cascade lever. Reference packs prove the language works; harvested packs prove the language can absorb the entire existing landscape.

## Target systems

### Token packs (priority order)

1. **Material Design 3** (Google) — Apache 2.0
2. **Carbon** (IBM) — Apache 2.0
3. **Polaris** (Shopify) — MIT
4. **Fluent 2** (Microsoft) — MIT
5. **Primer** (GitHub) — MIT
6. **Atlassian Design System** — Apache 2.0
7. **Lightning** (Salesforce) — BSD
8. **Spectrum** (Adobe) — Apache 2.0
9. **Open Props** (Adam Argyle, Chrome team) — MIT
10. **Radix Colors** (WorkOS) — MIT

### Vocabulary packs (priority order)

1. **shadcn/ui** patterns — MIT
2. **DaisyUI** semantic classes — MIT
3. **Radix UI** primitive set — MIT
4. **Headless UI** patterns — MIT

## Methodology

For each target system:

1. **Read.** Access the system's public documentation and open-source codebase.
2. **Extract.** Pull the system's token values (color palette, type scale, spacing scale, radius, motion, elevation) and semantic intent of each element.
3. **Map to canonical namespace.** Translate the source system's semantic tokens onto Quoin's canonical semantic token namespace defined in `00_spec/tokens.md`. Document any non-trivial mappings.
4. **Emit pack.** Generate a complete Quoin pack with manifest, token files (DTCG format), and required documentation.
5. **Preserve attribution.** Include the source system, organization, URL, license, and harvest date in the pack manifest's `attribution` field per `00_spec/pack-format.md` section 7.
6. **Validate.** Run `@quoin/validate-pack` and a compile pass through the phase 1 compiler against a sample page.

## Mapping decisions

Where a source system has tokens that don't map cleanly to the canonical namespace, document the decision in the per-pack harvest log. Common cases:

- **More granular palette** — source has 12 surface levels, Quoin has 4. Choose representative subset, document mapping.
- **Different semantic names** — source uses "elevated-surface", Quoin uses "surface-elevated". Direct translation.
- **Missing token** — source lacks a Quoin-required semantic. Derive from base palette with documented logic.
- **Extra tokens** — source has tokens with no Quoin equivalent. Preserve as component tokens or omit with note.

## License and attribution constraints

- **License compatibility.** A harvested pack's license MUST be compatible with the source license. MIT-sourced packs publish as MIT. Apache-2.0-sourced packs publish as Apache-2.0. Mixed harvests are explicit in their LICENSE notice.
- **No verbatim copying.** Harvested packs translate semantic intent into Quoin's canonical structure. They do not redistribute source assets, source code, or proprietary typefaces.
- **Typeface references.** Where a source system uses a copyrighted typeface (SF Pro, Segoe UI, etc.), the harvested pack references it by family name as a token value only. No font files are embedded.

## Deliverables

- At minimum 10 harvested packs in `03_harvest/packs/`
- `03_harvest/REPORT.md` documenting per-system mapping decisions, ambiguous translations, and any features that did not translate cleanly
- All packs validated and compile-tested

## Exit criteria

See `../PHASE_GATES.md` (Phase 3 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 3 section).
