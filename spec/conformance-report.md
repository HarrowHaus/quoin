# Quoin reference implementation — USML 2026.05 conformance claim

This report documents Quoin's conformance to the USML (UI Semantics Markup
Language) specification, version 2026.05.

**Implementation under test:** Quoin reference implementation, https://github.com/HarrowHaus/quoin
**Specification version:** USML 2026.05 (Editor's Draft)
**Report date:** 2026-05-21
**Reporter:** Donald Pilger, Harrow Haus

The USML specification defines three conformance classes (Anatomy Validator,
Aesthetic-Pack Provider, Backend Emitter). Quoin claims conformance per the
table below.

---

## Summary

| Conformance class | Claimed level | Notes |
|-------------------|---------------|-------|
| USML Anatomy Validator | Partial | The reference implementation validates its own pack manifests against `spec/usml-schema.json` and uses the result to gate pack admission. External-pack validation as a CLI tool is not yet exposed. |
| USML Aesthetic-Pack Provider | Full | Three v1.0 aesthetic packs (`@quoin/aesthetic-default`, `@quoin/aesthetic-boeing-watch`, `@quoin/aesthetic-harrow-haus`) satisfy all requirements in USML §4.3. |
| USML Backend Emitter | Level 3 (plain-CSS + HTML backend) | All 22 production patterns, 4 content primitives, and 6 layout primitives emit Level 3 conformant output via the reference implementation's plain-CSS backend. |
| USML Source Adapter | Full (Phase 23.2) | The translation skill at `/skills/quoin-pattern-translator.md` is the reference adapter. Source registry at `/docs/sources/SOURCES.md` documents license-cleared sources. Three translated patterns (disclosure, combobox, tabs) emitted with full `metadata.source` attribution per §7.4. |

---

## Detailed claims

### USML Anatomy Validator — Partial conformance

**Claim:** The reference implementation accepts USML-conformant inputs and
rejects non-conformant inputs, with sufficient violation reporting to locate
issues in pack manifests.

**Evidence:**

- `spec/usml-schema.json` is the formal JSON Schema. All 29 existing pack
    manifests in the reference implementation validate against this schema
    (verified via the validator script in `spec/tests/`).
- The Anatomy Validator scaffold at `spec/tests/anatomy/` exercises one valid
    and one invalid fixture; both produce the expected outcome.

**Gap from full conformance:**

- External-pack validation as a publicly-exposed CLI tool is not yet shipped.
    A reference validator program (`bin/usml-validate`) is anticipated in
    Phase 23.2.
- The validator does not yet check the additional accessibility-contract
    structural requirements from USML §5.5 (it currently accepts any
    accessibility block; future versions will validate ARIA role conformance
    against [[!ARIA]] property/state vocabulary).

**Path to full conformance:** Phase 23.2 (Ingest interface specification)
ships the external-pack validator CLI. The full Level claim becomes achievable
in Phase 23.5.

### USML Aesthetic-Pack Provider — Full conformance

**Claim:** Three v1.0 aesthetic packs satisfy all requirements in USML §4.3.

**Evidence:**

- All three aesthetic pack manifests declare `type: "aesthetic"`.
- All three supply token values via the DTCG 2025.10 format module
    [[!DTCG-2025.10]]: each pack ships an `overrides/light.json` and
    `overrides/dark.json` token document conformant to DTCG's
    `$value`/`$type`/`$description` schema.
- Aesthetic pack manifests declare no anatomy, no variants, no composition
    rules, no accessibility behavior — they declare only token overrides per
    USML §4.3.
- The composition mechanism is exercised in the live aesthetic-swap demo at
    `demos/aesthetic-swap/index.html` (shipped Phase 22.5.A).

**No identified gap.**

### USML Backend Emitter — Level 3 conformance (plain-CSS backend)

**Claim:** The reference implementation's plain-CSS + HTML backend emits
USML-conformant output at Level 3 for all 32 directly-usable artifacts
(22 patterns + 4 content primitives + 6 layout primitives).

**Evidence per Level requirement:**

| Level requirement | Evidence |
|-------------------|----------|
| Anatomy preservation | Every pack ships `primitives/index.json` (the data-model) AND `examples/index.html` (the emission); the emission's structural elements match the primitives declarations. |
| Variant handling | Every multi-variant pack (hero, nav, footer-mega, etc.) ships variant-specific examples demonstrating the same anatomy with different variant-axis values, all sourced from the same primitives declaration. |
| Aesthetic-pack token resolution | All patterns reference baseline tokens via `var(--token-name)`; the three v1.0 aesthetic packs supply overrides; the swap demo demonstrates resolution. |
| ARIA contracts | Every pattern's primitives JSON declares an `ariaPatterns` block in slot `meta` documentation; specimens emit the declared ARIA roles + properties + states. |
| Microstate CSS | Every pattern's specimens emit hover / active / focus / focus-visible / disabled state CSS using token references. |
| Performance budget | Decoration-overlay primitive documents the 5% LCP impact maximum per v3.G.14; emission does not regress LCP beyond this budget (operator-reported; no formal automated measurement yet). |

**Gap from "all backends" full conformance:**

- This claim covers the plain-CSS + HTML backend only. Additional backends
    (Material Web Components, Carbon Web Components, React + Tailwind, etc.)
    are planned for Phase 23.3 and subsequent.
- No formal per-pattern conformance audit has been run against an external
    USML Backend Emitter (none exist yet).

**Path to expansion:** Phase 23.3 ships the emission interface specification.
Phase 23.5 closes with the first additional reference backend. Phase 24
expands to framework-targeted backends.

### USML Source Adapter — Full conformance (Phase 23.2)

**Claim:** The Quoin reference adapter satisfies all MUST and SHOULD
statements of the USML Source Adapter conformance class as formalized in
[USML §7 Ingest interface](../USML-Specification.bs).

**Evidence per requirement:**

| §7 requirement | Evidence |
|----------------|----------|
| MUST satisfy Anatomy Validator conformance class for output | All translated Patterns (`disclosure`, `combobox`, `tabs`) validate against `spec/usml-schema.json`. Reference: ingest scaffold at `spec/tests/ingest/`. |
| MUST emit translation attribution metadata per §7.4 | All three translated Patterns carry `metadata.source` with `system`, `url`, and `license` fields populated. Reference: `patterns/disclosure/quoin.pack.json`, `patterns/combobox/quoin.pack.json`, `patterns/tabs/quoin.pack.json`. |
| MUST perform license clearance per §7.5 | Source registry at `/docs/sources/SOURCES.md` documents license-cleared sources. ARIA APG (W3C-Document-License) is on the approved list. The three translated patterns each declare `metadata.source.license: "W3C-Document-License"`. |
| MUST preserve source ARIA contract | Each translated Pattern's `primitives/index.json` documents ARIA roles, properties, and keyboard handling matching the ARIA APG reference. |
| MUST NOT inline contracts from peer patterns | Each translated Pattern declares `peerPacks: { "@quoin/tokens-baseline": "^2026.05" }` (and `optionalPeerPacks` where applicable) rather than re-implementing peer-pack content. |
| SHOULD declare supported source formats | Reference adapter documents supported formats at `/docs/translation/anatomy-extraction-rules.md`. Six format classes covered: HTML+CSS, web component, JSX/TSX, design spec, wireframe image, USML native IR. |
| SHOULD report yield rate per source | Source registry tracks yield (3 successful translations from ARIA APG; no rejections). |
| SHOULD surface rejected translations with rationale | Source registry includes a "rejected" section; current count is zero in 2026.05. |

**Translated-Pattern roster (Phase 22.7 + Phase 23.2):**

- `@quoin/pattern-disclosure` — translated 2026-05-21 from
    https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- `@quoin/pattern-combobox` — translated 2026-05-21 from
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- `@quoin/pattern-tabs` — translated 2026-05-21 from
    https://www.w3.org/WAI/ARIA/apg/patterns/tabs/

**Conformance scaffold:** `spec/tests/ingest/` ships three fixtures + a
runner (Phase 23.2). The scaffold passes for all three: valid full
attribution, invalid missing attribution, invalid license incompatibility.

**No identified gap.** The reference adapter satisfies the full Source
Adapter conformance class.

---

## Gate cross-reference

The USML specification encodes architectural gates v3.G.15 through v3.G.21
(documented in `PHASE_GATES.md`) as normative requirements. The reference
implementation enforces these gates programmatically:

| Gate | USML section | Reference implementation enforcement |
|------|--------------|--------------------------------------|
| v3.G.15 (data-pattern short form) | §5.1.1 (data-pattern naming) | `02_reference-packs/validate.js` rejects long-form `pattern-` prefixes |
| v3.G.16 (data-alignment universal, data-register deprecated) | §5.3.1 (universal axes) | `02_reference-packs/validate.js` rejects `data-register=` on consolidated patterns |
| v3.G.17 (composition reality) | §5.4.1 (peerPacks) | `02_reference-packs/bootstrap-integrity.js` check #8 |
| v3.G.18 (anatomy documentation) | §5.2 (Slots) + spec-wide table conventions | README anatomy-table convention enforced in PR review |
| v3.G.19 (pack code lives once) | §5.1.2 (pack uniqueness) | The pack-manifest schema rejects parallel packs at the same name |
| v3.G.20 (variants in pattern packs; values in aesthetic packs) | §4.3, §6.2 (aesthetic-pack scope) | aesthetic-pack validator rejects manifests declaring anatomy |
| v3.G.21 (optionalPeerPacks) | §5.4.2 | Manifest schema recognizes the field; bootstrap-integrity.js reads from peerPacks only |

---

## Reporting cadence

This conformance report is updated whenever:

- A new pattern or primitive is added to the catalog.
- A USML specification version transition occurs.
- The reference implementation gains a new backend or conformance level.

Next anticipated update: at Phase 23.2 closure (anatomy-validator CLI
ships); next major update at Phase 23.5 closure (specification publication
plus emission interface formalization).

---

## License

MIT.
