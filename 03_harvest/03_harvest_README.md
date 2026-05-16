# Phase 3 — Harvest

Status: pending phase 2 completion.

## Scope

Build the **production-grade Quoin pack library**. This phase is not a demo. After phase 3 completes, anyone reaching for Quoin should find packs covering nearly every serious design system in existence, plus enough vocabulary variants to handle most real production projects — including the operator's own websites.

**Floor: 40 high-quality packs.** Split target: ~30 token packs + ~10 vocabulary packs. **Stretch: 60+.**

This phase is the cascade lever. Reference packs prove the language works; the harvested library proves it can hold the entire existing landscape without losing fidelity.

## Source registries (priority order)

### Curated design system directories

1. **Adele** (adele.uxpin.com) — the gold standard curated registry. ~100+ professionally-edited public design systems. Primary source.
2. **Design Systems Repo** (designsystemsrepo.com) — secondary registry. Broader, noisier; cross-reference against Adele before accepting.
3. **Awesome Design Systems** GitHub list — community list. Filter aggressively against the quality bar below.

### Token-format sources

4. **Style Dictionary user repos** — GitHub search `style-dictionary` returns hundreds of repos with conformant token files. Filter for active maintenance and clean structure.
5. **W3C DTCG examples repo** — reference tokens in canonical format.
6. **Open Props community themes** — community-shared themes already structured for token consumption.

### Framework preset sources

7. **Tailwind preset registry** — every published Tailwind preset is effectively a token pack waiting to be wrapped. Hundreds available; filter for thoughtful palettes and documentation.
8. **shadcn/ui theme library** — community theme registry.

## Target token packs (minimum 30 at launch)

### Major proprietary / institutional systems

1. Material Design 3 (Google) — Apache 2.0
2. Carbon (IBM) — Apache 2.0
3. Polaris (Shopify) — MIT
4. Fluent 2 (Microsoft) — MIT
5. Primer (GitHub) — MIT
6. Atlassian Design System — Apache 2.0
7. Lightning (Salesforce) — BSD
8. Spectrum (Adobe) — Apache 2.0
9. Pinterest Gestalt — Apache 2.0
10. Twilio Paste — MIT
11. Workday Canvas — Apache 2.0
12. Mineral UI — Apache 2.0
13. BBC GEL — Apache 2.0
14. USWDS (US Web Design System) — public domain
15. GOV.UK Design System — MIT
16. Australian Government Design System — MIT

### Foundational token libraries

17. Open Props (Adam Argyle / Chrome team) — MIT
18. Radix Colors (WorkOS) — MIT
19. Tailwind defaults — MIT

### Vercel ecosystem

20. Geist (Vercel) — MIT
21. Vercel design tokens

### Modern public systems

22. Catalyst (Tailwind Labs)
23. shadcn/ui default theme — MIT
24. Tailwind UI default
25. Mailchimp Design System
26. Stripe (where publicly tokenized)
27. Linear (where publicly tokenized)
28. Spotify Encore (where public)

### Plus 10-30 additional packs

Cross-referenced from Adele against active maintenance, license clarity, and the quality bar below. The harvest agent has discretion to select; every shipped pack is operator-reviewable.

## Target vocabulary packs (minimum 10)

1. shadcn/ui patterns → `@quoin/vocab-shadcn` — MIT
2. Radix UI primitive set → `@quoin/vocab-radix` — MIT
3. Headless UI patterns → `@quoin/vocab-headless` — MIT
4. Ark UI patterns → `@quoin/vocab-ark` — MIT
5. Catalyst patterns → `@quoin/vocab-catalyst`
6. DaisyUI semantic classes → `@quoin/vocab-daisy` — MIT
7. Dashboard primitives (extracted from Tremor, shadcn dashboards) → `@quoin/vocab-dashboard-extended`
8. Marketing-site primitives (extracted from common pattern libraries) → `@quoin/vocab-marketing`
9. Documentation primitives (Astro Starlight, Docusaurus, Nextra patterns) → `@quoin/vocab-docs`
10. Form primitives (React Hook Form, Formik example patterns) → `@quoin/vocab-forms`

## Methodology

For each target system:

1. **Read.** Access the system's public documentation and open-source codebase. Refuse private or NDA-protected sources.
2. **Extract.** Pull tokens (color, type, spacing, radius, motion, elevation) and where applicable component semantics.
3. **Map to canonical namespace.** Translate onto Quoin's canonical semantic token namespace from `00_spec/tokens.md`. Document any non-trivial mapping.
4. **Emit pack.** Generate complete Quoin pack with manifest, DTCG token files, and required documentation.
5. **Preserve attribution.** Include source system, organization, URL, license, harvest date per `00_spec/pack-format.md` section 7.
6. **Validate.** Run `@quoin/validate-pack` plus a compile pass against a sample page.
7. **Visual smoke test.** Render a reference page and visually compare against a screenshot of the source system's official sample. Output should be recognizable as the source aesthetic.

## Quality bar

A pack ships at launch only if all of these are true:

- Source system has active maintenance (commits within the last 12 months) **or** is canonically dormant by design (Apple HIG, government systems, retired-but-stable institutional systems).
- License is clear, compatible with MIT or Apache 2.0, and properly attributed.
- Token coverage is complete for the canonical semantic namespace.
- Mapping decisions are documented and defensible.
- Pack validates and compiles cleanly through the phase 1 compiler.
- Visual smoke test produces output recognizable as the source system's aesthetic.

Packs that fail the quality bar move to `03_harvest/holding/` for later review or rejection. They do not ship under `@quoin/*` at launch.

## Slop avoidance

Do not harvest from:

- Random Figma community files without documented design lineage.
- "AI-generated theme" packs from community marketplaces.
- Awesome-list aggregators as primary sources (they are pointers, not source material — follow the pointers, validate at the destination).
- Anything with `vibe`, `cyberpunk-2077`, `synthwave`, or generator-style naming unless the source system is genuinely curated and actively maintained.
- Tutorial-output tokens (LearnDash, Codecademy, beginner tutorial scaffolds).
- Forked-and-renamed copies of other systems (de-duplicate during validation).

The threshold is **"would a serious design team adopt this in production."** If no, the pack does not ship under `@quoin/*`. A separate `@quoin/forge` or `@quoin/community` namespace, planned for v0.2, will accept community packs with explicit unverified-pack labeling, keeping signal and slop in different namespaces.

## Deliverables

- Minimum 40 harvested packs in `03_harvest/packs/` (30 token + 10 vocabulary)
- `03_harvest/REPORT.md` documenting per-system mapping decisions, ambiguous translations, and any features that did not translate cleanly
- `03_harvest/holding/` containing packs that failed the quality bar with notes on what would need to change
- All shipped packs validated, compile-tested, and visually smoke-tested

## Operator success criterion

A working test: at the end of this phase, the operator should be able to instruct Claude Code to *"build harrow.haus in Quoin using the harvested editorial vocab and a custom token pack matching Harrow Haus brand"* and have Claude Code produce production-grade output without writing custom CSS. If that test passes, phase 3 is genuinely complete.

## Exit criteria

See `../PHASE_GATES.md` (Phase 3 section).

## Prompt

See `../PHASE_PROMPTS.md` (Phase 3 section).
