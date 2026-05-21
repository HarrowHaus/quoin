---
name: quoin-pattern-extension-author
description: Use when adding a new pattern to the Quoin catalog. Walks through the audit → proposal → batched implementation cycle that the existing 18 patterns followed. Output is a new pack at 02_reference-packs/patterns/<name>/ with manifest + primitives + README + at least one example specimen, plus the catalog updates (registry.json, llms.txt, llms-full.txt, root README, content-completeness enrollment) so the new pattern is fully discoverable.
---

# Author a new Quoin pattern

This is the template skill for batched catalog extension. The 18 production patterns in `02_reference-packs/patterns/` all followed a version of this cycle. The skill encodes the conventions so a new pattern lands consistent with the rest of the catalog and passes every gate.

## When to use this skill

- The operator asks you to add a new pattern (e.g., "ship a `sidebar-nav` pattern").
- The catalog has a documented gap and the next P-tier batch lists the pattern.
- Phase 22 / catalog-plateau gate is not yet hit (under 50 patterns); after the plateau, community contribution opens and this skill may need revision.

## When NOT to use this skill

- Consolidating existing patterns (use the consolidation-3-style audit → proposal → batches cycle instead — see `02_reference-packs/CONSOLIDATION-3-PROPOSAL.md` for the template).
- Adding an aesthetic pack (those go in `02_reference-packs/themes/` and follow a different convention — see the theme-pack spec).
- Adding a harvested token pack (those go in `03_harvest/` and follow the harvester convention).
- Authoring a new vocabulary primitive (vocab packs are different — see `00_spec/pack-types.md`).

## What the skill produces

A new pattern pack at `02_reference-packs/patterns/<name>/` with:

```
patterns/<name>/
├── quoin.pack.json         # manifest (peerPacks, variants if multi-variant, states, microStates)
├── quoin.toml              # Cargo-style manifest (D.85 — draft format)
├── primitives/index.json   # slot-by-slot anatomy: name, role, attributes, tokens, structure
├── README.md               # 4 structured-markdown anatomy tables (v3.G.18)
├── examples/index.html     # canonical specimen (or examples/<variant>.html for multi-variant)
├── package.json
└── LICENSE
```

Plus updates to the catalog index:

- `registry.json` — new item entry
- `llms.txt` — new bullet in the pattern catalog
- `llms-full.txt` — full anatomy block for the new pattern
- `README.md` (root) — new cell in the pattern catalog grid + bump the Pattern count badge
- `docs/screenshots/README.md` — new line in the screenshot checklist for the operator
- `02_reference-packs/scripts/content-completeness.js` — enrollment for content drift detection
- `CHANGELOG.md` — entry under [Unreleased]

## The cycle (audit → proposal → batches)

### 1. Audit phase (single turn; halt for operator review)

Before writing any code, write `02_reference-packs/PATTERN-<NAME>-AUDIT.md`. Document:

- **Gap.** What's missing from the catalog that this pattern fills? Reference the dossier / operator brief / catalog-completeness gap that justifies the pattern.
- **Prior art.** What do shadcn / Polaris / Material / Carbon / Radix / Mantine / Tailwind UI ship for this? What naming conventions, anatomy, attribute axes are conventional? Don't invent unique anatomy if there's a settled convention.
- **Proposed anatomy.** Mandatory slots + conditional slots (with gating). Element type per slot. Token consumption per slot.
- **Proposed attributes.** Universal axes + variant-specific axes (if multi-variant). Default values. Allowed enums.
- **States / microstates.** Pattern-level states + per-element microstates.
- **Composition.** Which existing patterns does this consume? What canonical class names does it use (`.action-button` for button-system, etc.)?
- **ARIA contract.** Landmark roles, label requirements, live regions, keyboard interactions.
- **Open questions.** Anywhere multiple defensible options exist; surface for operator decision.

Halt for operator review. **Do not start implementation until the operator locks the open questions.**

### 2. Proposal phase (single turn; halt for operator review)

Once the audit's open questions are locked, write `02_reference-packs/PATTERN-<NAME>-PROPOSAL.md`. Translate the locked decisions into a concrete implementation plan:

- **Pack manifest.** Draft the full `quoin.pack.json` + `quoin.toml`.
- **Primitives JSON.** Full schema for every slot (name, role, attributes with values/defaults, tokens, structure, scope, meta).
- **README structure.** The 4 anatomy tables per v3.G.18 (mandatory slots / conditional slots / variants / composition lineage).
- **CSS structure.** Cascade-layer organization (`@layer quoin.patterns`), variant-scoped selectors if multi-variant, conditional-slot gating selectors.
- **Specimen plan.** Single `examples/index.html` for single-variant; `examples/<variant>.html` per variant for multi-variant.
- **Gate considerations.** Will this pattern need new bootstrap-integrity checks? New deprecation entries in `DATA_REGISTER_DEPRECATED_IN`? New composition entries in `COMPOSITION_PRIMITIVES`?
- **Batch plan.** Typically 2-4 batches: (1) pack scaffolding, (2) specimen(s), (3) catalog updates, (4) closing batch with gate updates + report.

Halt for operator review. **Do not start implementation until the operator approves the proposal.**

### 3. Implementation phase (batched; per-turn operator review by default)

Cadence: per-turn (operator reviews each batch). Exception: operator may authorize extended-run if Q&A is locked and the implementation is mechanical.

Typical batch plan for a single-variant pattern:

| Batch | Deliverables | Self-audit |
|---|---|---|
| 1 | Pack scaffolding: quoin.pack.json + quoin.toml + primitives/index.json + README.md + package.json + LICENSE + empty examples/ | bootstrap-integrity green; validate.js green; npm test green; JSON parses |
| 2 | Specimen: examples/index.html (or examples/<variant>.html per variant) | bootstrap-integrity green (new specimen included); content-completeness OK |
| 3 (closing) | Catalog updates: registry.json + llms.txt + llms-full.txt + root README pattern count + screenshot checklist + content-completeness enrollment + CHANGELOG entry | full validator suite green; smoke-test new gate checks if any |

For a multi-variant pattern, add one batch per variant in the middle. Per Cons. 3's pattern: batch 2 (1-2 variants) + batch 3 (1-2 more variants) + batch 4 (final variant if any) + batch 5 (closing).

## Conventions every pattern follows (read these before authoring)

These are the architectural locks documented in `PHASE_GATES.md` (v3.G.\* series). Most are enforced by `02_reference-packs/scripts/bootstrap-integrity.js`; some are documented architectural convention.

### Naming (v3.G.15)

- `data-pattern` value: short form `<pattern-name>-<slot>`. Never `pattern-<name>-<slot>`. Never `<pattern>--<slot>` (double-dash).
- Pattern name: kebab-case, descriptive but short. `nav-app-chrome` (good), `application-navigation-chrome-with-workspace-switcher` (bad).
- Slot names: short, semantic. `section`, `eyebrow`, `headline`, `subhead`, `actions`, `meta`, `media`, `overlay`, `controls`. Don't redundantly include the pattern name in the slot (`hero-section`, not `hero-section-hero`).

### Attributes (v3.G.16)

- Content alignment: `data-alignment="centered | left | right | split-anchor"`.
- Variant identifier (multi-variant patterns): `data-variant="..."`.
- Sub-slot kind (a primitive's flavor): `data-kind="..."`.
- Cluster register: `data-cluster="..."`.
- Layout (orthogonal to alignment): `data-layout="..."`.
- Mode (for media patterns): `data-{media}-mode="..."` (e.g., `data-video-mode`).
- Size scale: `data-size="compact | default | oversized"` or `"sm | md | lg"`.
- Density: `data-density="comfortable | compact | dense"`.
- State: `data-state="..."` (for multi-state primitives).
- **Forbidden**: `data-register`. Use one of the typed alternatives above.

### Composition (v3.G.17)

- If your pattern declares `@quoin/pattern-button-system` as a peer pack, your specimens must use `class="action-button"` for buttons. Never re-inline button styles under a different class name.
- If your pattern declares `@quoin/pattern-form-fields` as a peer pack, your specimens must use the `data-pattern="form-control"` element (not a local input class).
- The bootstrap-integrity gate enforces this for patterns in `COMPOSITION_REALITY_ENFORCED_FOR`. Add your new pattern to that set when you ship a peer-pack consumption.

### Anatomy documentation (v3.G.18)

Pack README has these 4 tables, in this order:

1. **Mandatory slots.** Columns: Slot | Element | Role | Key token references.
2. **Conditional slots.** Columns: Slot | Gated by | Role | Tokens. Use phrase like `data-variant="..."` or `data-mode="..."` in "Gated by".
3. **Variants** (only for multi-variant patterns). Columns: Variant | Conditional slots activated | Variant-specific attributes | Pattern-local CSS tokens | Notes.
4. **Composition lineage.** Columns: Consumed primitive | Source pack | Used in | How. Document **real** composition (what your specimens actually use); do not document aspirational composition.

### Pack code lives once (v3.G.19)

- No parallel packs for stylistic variants. If you find yourself wanting `pattern-card-product` + `pattern-card-stat` + `pattern-card-testimonial`, consolidate to `pattern-card` with `data-variant`.
- Multiple example HTML files in `examples/` is the right shape for demonstrating variants.

### Variants in pattern packs; values in aesthetic packs (v3.G.20)

- Pattern packs declare variant **axes** (e.g., `data-palette` enum of `cool / warm / monochrome / accent / playful`).
- Aesthetic packs supply specific **values** (e.g., a yeezy-donda aesthetic supplies a specific recipe for the `cool` palette).
- Pattern pack's CSS uses generic OKLCH gradients for each palette as a baseline; aesthetic packs override per-palette.

## Authoring checklist (use this before each batch close)

### Pack scaffolding (Batch 1)

- [ ] `quoin.pack.json` declares `type: "pattern"`, `peerPacks` for actual consumed packs, `variants` array if multi-variant
- [ ] `quoin.toml` mirrors the manifest with anatomy / variants sections
- [ ] `primitives/index.json` has one entry per slot (mandatory + conditional, with `gating: "mandatory" | "conditional" | "conditional-mandatory"` field)
- [ ] README has all 4 anatomy tables per v3.G.18
- [ ] LICENSE + package.json (copy from a sibling pack and update the pack name)
- [ ] `npm test` passes; `validate.js` passes; JSON files parse

### Specimens (Batch 2-N)

- [ ] HTML file is self-contained (inline tokens + Google Fonts prelude + per-pattern CSS in `<style>` blocks)
- [ ] Uses canonical `data-pattern` form per v3.G.15
- [ ] Uses `data-alignment` / typed axes, never `data-register` (v3.G.16)
- [ ] Uses `class="action-button"` for buttons (v3.G.17) if button-system is a peer
- [ ] Token-grounded: no hardcoded color / spacing / type-size / motion values past the `:root` seed
- [ ] ARIA contract complete: landmarks labelled, live regions where needed, focus-visible rings
- [ ] Reduced-motion: `@media (prefers-reduced-motion: reduce)` collapses animation
- [ ] Dark mode via `@media (prefers-color-scheme: dark)` overrides
- [ ] Composition lineage section in the specimen's documentation block accurately lists what's consumed
- [ ] bootstrap-integrity passes for the new specimen

### Catalog updates (closing batch)

- [ ] `registry.json` has a new item entry (with categories, registryDependencies if any, files array)
- [ ] `llms.txt` has a new bullet in the catalog (with the canonical raw.githack.com URL)
- [ ] `llms-full.txt` has a full anatomy block (slots / attributes / states / composition / ARIA / minimal markup)
- [ ] Root `README.md` has a new cell in the pattern catalog grid + pattern count badge incremented
- [ ] `docs/screenshots/README.md` has a new row in the screenshot table
- [ ] `02_reference-packs/scripts/content-completeness.js` has an enrollment entry
- [ ] `CHANGELOG.md` has an entry under [Unreleased]
- [ ] If introducing a new deprecation or composition convention: PHASE_GATES.md gets a new v3.G.\* entry

### Verification (always)

- [ ] `node 02_reference-packs/scripts/bootstrap-integrity.js` — green
- [ ] `node 02_reference-packs/validate.js` — green
- [ ] `node 02_reference-packs/validate-extension.js` — green
- [ ] `node 02_reference-packs/scripts/content-completeness.js` — green
- [ ] `cd 01_compiler && npm test` — green
- [ ] Spot-check 2 random unrelated patterns to verify byte-equivalent rendering (extended-run mode)
- [ ] Smoke-test any new gate checks with synthetic bad inputs

### Final commit + push

- [ ] Commit message follows the convention: `pattern: add @quoin/pattern-<name> (<batch number>/<total>)`
- [ ] Final closing batch references the report doc and the operator-facing morning items (if any)
- [ ] Push to `origin/main` after operator approval

## Halt conditions

Stop the session and surface for operator review if any of these surface during implementation:

1. **Peer pack insufficient.** Your pattern needs a button intent / form-field type / token / etc. that doesn't exist in the consumed pack. Don't extend the peer pack from this skill — surface as a separate follow-up consolidation.
2. **Naming conflict.** The pattern name (`<name>`) collides with an existing pattern or a planned future pattern in the catalog. Surface for naming discussion.
3. **Anatomy contradicts a sibling pattern.** Your `data-variant="featured"` means something different from another pattern's `data-variant="featured"`. Reconcile via operator decision; don't silently overload.
4. **Migration of an existing pattern**. If your new pattern obsoletes an existing one (e.g., the new pattern is more general), that's a consolidation, not an addition. Switch to the consolidation cycle (audit → proposal → batches) instead.
5. **WCAG concern.** Your pattern's interaction model would require a violation of WCAG 2.x to ship as described. Surface; consult the WCAG-compliance guidance in `00_spec/`.
6. **Visual regression in unrelated patterns** during self-audit spot-check. Halt; do not commit; investigate.

## Reference

- **Spec:** `00_spec/` — tokens, primitives, pack format, pack types.
- **Architectural locks:** `PHASE_GATES.md` — v3.G.15 through v3.G.20 (and future v3.G.21+).
- **Cons. 3 precedent:** `02_reference-packs/CONSOLIDATION-3-AUDIT.md`, `CONSOLIDATION-3-PROPOSAL.md`, `CONSOLIDATION-3-REPORT.md` — read these as the canonical example of how an audit + proposal + batched implementation reads.
- **Gate source:** `02_reference-packs/scripts/bootstrap-integrity.js` — the actual gate code. If a new pattern needs a new check, extend this file with the new constant + check function.
- **Existing pack as template:** `02_reference-packs/patterns/empty-state/` is a good clean example for a single-variant pattern. `02_reference-packs/patterns/hero/` is the canonical multi-variant example (5 variants, 11 primitives, real composition with button-system).

---

**One sentence summary:** A new pattern follows audit → proposal → batched implementation, lands at `patterns/<name>/`, updates the catalog index (registry.json + llms.txt + llms-full.txt + root README + content-completeness), and passes every gate before the closing commit.
