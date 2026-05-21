# Translation quality gates

Acceptance criteria for translated patterns before they land in Quoin's catalog.

> **Quality gates exist because Quoin's specification is publishable.** Every translated pattern in Quoin's catalog is implicitly an example of what specification-conformant anatomy looks like. A translation that doesn't meet the quality gates would misrepresent the specification. Better to reject a translation than to dilute the specification's signal.

**Scope.** These gates apply to translations produced by the [pattern-translator skill](../../skills/quoin-pattern-translator.md). Native Quoin authoring (the [pattern-extension-author skill](../../skills/quoin-pattern-extension-author.md)) shares some gates and adds others; the union of both gate sets is captured in [`PHASE_GATES.md`](../../PHASE_GATES.md) as the v3.G.\* series.

**Failure modes.** A translation that fails a gate is either fixed before merge or rejected. Rejections are documented in [`docs/sources/SOURCES.md`](../sources/SOURCES.md) under the source's per-source rejected-patterns notes, with the rationale for future readers.

---

## Anatomy gates

### G.QA-1 — Anatomy minimum: at least one mandatory slot

A pattern must declare at least one mandatory slot. Translations that produce zero mandatory slots are not patterns — they are styling tokens or behaviors that belong somewhere else (aesthetic packs, companion JS).

**Pass:** `primitives/index.json` includes at least one entry with `"gating": "mandatory"`.

**Fail:** All entries are conditional, or the file is empty.

### G.QA-2 — Anatomy maximum: ~12 slots before splitting

A pattern with more than approximately 12 slots is likely doing too much. Such translations should either (a) split into multiple patterns, or (b) compose primitives instead of inlining their concerns.

**Pass:** ≤12 slots (mandatory + conditional combined).

**Fail:** >12 slots → halt and surface for reconciliation. Operator decides between split or primitive composition.

### G.QA-3 — Conditional slots must be gated

Every conditional slot must declare what variant axis value (or state) gates its presence. "Sometimes there" is not an acceptable anatomy contract.

**Pass:** Every entry with `"gating": "conditional"` documents the gating attribute + value in its `meta` block.

**Fail:** Conditional slot exists with no documented gating.

---

## Variant gates

### G.QA-4 — All variant axes are token-typed

Every variant axis must reference token-bound values per v3.G.20. A variant axis whose values are arbitrary strings without token bindings is an unbounded API surface and breaks the aesthetic-swap guarantee.

**Pass:** Every variant axis in primitives/index.json `attributes` has explicit enum values, and every CSS value differing across values references a token.

**Fail:** Free-form attribute values (e.g., `data-color="any-string"`), or per-value styling that hardcodes literals.

### G.QA-5 — Variant axes follow Quoin naming convention

Per v3.G.15 and v3.G.16. `data-pattern` always short form. `data-alignment` for universal alignment. `data-register` rejected. Variant-specific axes named for their concern (`data-palette`, `data-layout`, `data-motion-mode`, etc.).

**Pass:** All `data-*` attributes follow the convention.

**Fail:** Long-form prefix, deprecated `data-register`, or arbitrary attribute names without semantic basis.

---

## Composition gates

### G.QA-6 — Composition is real (v3.G.17)

If the pattern declares a peer pack in `peerPacks`, the specimen markup must demonstrate the composition via the peer's canonical class or `data-pattern` value. No inlined contracts.

**Pass:** Every peer in `peerPacks` is referenced in the specimen with the peer's canonical naming.

**Fail:** Pattern declares `@quoin/pattern-button-system` as peer but the specimen reimplements buttons under a local class name. Specimen rebuilds prim-label semantics without consuming `@quoin/prim-label`.

### G.QA-7 — Variant-conditional peers use optionalPeerPacks (v3.G.21)

If a peer pack is used in some variants but not all, declare it under `optionalPeerPacks`, not `peerPacks`. v3.G.17 enforcement reads from `peerPacks` only; conditional peers under `peerPacks` create false-positive enforcement on non-consuming variants.

**Pass:** Conditional peers declared under `optionalPeerPacks`. README anatomy tables document per-variant composition.

**Fail:** Conditional peer declared under `peerPacks` (and the gate fails on a non-consuming variant), or composition is conditional but undocumented.

### G.QA-8 — Reverse-lineage updated (D.82)

Every peer pack consumed by the new translation must have its README's "Consumed by" list updated to include the new pattern.

**Pass:** All consumed peer packs' READMEs include the new pattern in their "Consumed by" tables.

**Fail:** Translation merges without updating peer-pack reverse-lineage.

---

## Accessibility gates

### G.QA-9 — ARIA conformance

For patterns where ARIA APG (or another authoritative ARIA reference) documents a canonical contract, the translation must implement that contract correctly.

**Pass:** ARIA roles, properties, states match the authoritative reference. Specimen passes axe-core or equivalent automated audit with no errors.

**Fail:** ARIA mismatches. Roles missing or wrong. Properties absent where they should be present.

### G.QA-10 — Keyboard navigation works without JS for static cases

Static patterns (disclosure with `<details>`, tabs that don't require dynamic content swap, etc.) must be keyboard-operable without JavaScript. Companion JS is permitted for behaviors that genuinely require it (focus traps, ARIA state updates beyond what HTML implies).

**Pass:** Specimen is keyboard-navigable in its primary interaction loop with JS disabled.

**Fail:** Pattern requires JS to be activatable or operable when no inherent JS need exists.

### G.QA-11 — Reduced motion honored (v3.G.10)

Any pattern with motion must include `@media (prefers-reduced-motion: reduce)` rules that collapse motion to ≤1ms or to opacity-only fades.

**Pass:** Specimen's CSS includes the reduced-motion media query with appropriate overrides.

**Fail:** Pattern animates without honoring the user preference.

---

## Performance gates

### G.QA-12 — LCP impact ≤5% for decorative layers (v3.G.14)

Decorative-overlay-style additions to a pattern (`prim-decoration-overlay` use, hero gradient meshes, etc.) must not regress LCP by more than 5% versus the pattern without the decoration.

**Pass:** Operator measures or estimates the LCP delta and documents it in the pack's README under a "Performance budget" note.

**Fail:** No budget documented for a pattern with decorative-overlay usage, or measured delta >5%.

### G.QA-13 — No render-blocking external requests for primary content

Pattern specimens must render their primary content without blocking on external font, image, or script requests beyond what's intrinsic to the pattern (e.g., a hero with a `<picture>` is allowed; a button that requires an external icon font is not).

**Pass:** Primary content renders with system-stack fallbacks when fonts haven't loaded.

**Fail:** Pattern requires external fonts/scripts before being readable.

---

## Licensing gates

### G.QA-14 — License compatibility

The source's license must be in the approved list in [`docs/sources/SOURCES.md`](../sources/SOURCES.md). The pack manifest's `metadata.source.license` field records the source license SPDX identifier.

**Pass:** Source on approved list. License recorded in `metadata.source.license`. Quoin pack's own LICENSE is MIT.

**Fail:** Source not on approved list, or license not recorded, or attempting to translate from explicitly INCOMPATIBLE source.

### G.QA-15 — Attribution recorded in README

The README's source attribution paragraph (per [translation skill §11 template](../../skills/quoin-pattern-translator.md#section-11)) is present, names the source, links to the source URL, names the license SPDX identifier, and includes the "this translation will be retired in favor of native specification publication" framing.

**Pass:** Attribution paragraph present and complete.

**Fail:** Attribution missing, partial, or omitting the transitional-framing language.

---

## Naming gates

### G.QA-16 — Pattern name derives from anatomy, not source

If the source calls the pattern `MdcDropdownMenu` and the anatomy is a disclosure with a popover, the Quoin pack name is `pattern-disclosure` (or `pattern-popover`), not `pattern-dropdown-menu`. Source naming does not lock Quoin into the source's organizing assumptions.

**Pass:** Pack name justified by anatomy. README's Translation notes explain the naming choice if it differs noticeably from the source's name.

**Fail:** Pack name borrowed from source naming without anatomy justification.

### G.QA-17 — Name does not collide with existing Quoin pattern

A translation that produces a name collision with an existing Quoin pattern must reconcile before merge — either merge the anatomies (if the source's pattern is a variant of an existing one), rename one (with operator approval), or reject the translation.

**Pass:** No collision, or collision documented and resolved.

**Fail:** Silent collision (two patterns at the same path) — gate fails the merge.

---

## Documentation gates

### G.QA-18 — README completeness (v3.G.18)

The README contains all four anatomy tables (mandatory slots / conditional slots / variants / composition lineage), per [translation skill §11 template](../../skills/quoin-pattern-translator.md#section-11) and v3.G.18.

**Pass:** All four tables present and populated.

**Fail:** One or more tables missing, empty, or templated-without-content.

### G.QA-19 — Examples completeness

At least one specimen exists in `examples/index.html` demonstrating the pattern's most representative variant. If the pattern has multiple meaningfully-different variants (per v3.G.19), one specimen per variant.

**Pass:** Specimen exists, renders, and exercises the primary variant. Additional specimens exist for additional variants if the pattern is multi-variant.

**Fail:** Specimen missing, or single-variant specimen for multi-variant pattern.

### G.QA-20 — Translation notes present where judgment was required

When extraction required operator judgment (token mapping, naming reconciliation, ARIA fixes, anatomy reshaping), document that judgment in the README's Translation notes section.

**Pass:** Translation notes section present and substantive when the translation made interesting choices.

**Fail:** Non-trivial translation choices made without documentation (future readers can't reproduce or audit the decisions).

---

## Rejection criteria

A translation is rejected (not landed in the catalog) if any of:

- **Multiple gates fail** with no clear path to fix within the harvest session.
- **Anatomy is fundamentally framework-bound** (e.g., the pattern's contract is "behavior X happens via React hook Y"; there is no anatomy to extract).
- **License compatibility** fails (G.QA-14).
- **Operator judgment** says the source's anatomy is not Quoin-shaped (e.g., the source mixes concerns Quoin holds separate; refactoring would change the pattern beyond translation).

Rejected translations are documented in [`docs/sources/SOURCES.md`](../sources/SOURCES.md) under the source's entry with one-sentence rationale. The documentation serves future readers + future harvest sessions deciding whether to re-attempt.

---

## License

MIT.
