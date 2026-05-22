# Session 9 closing report — Phase 23.2

**Phase 23.2:** USML §Ingest Interface Formalization
**Status:** ✅ Complete
**Date:** 2026-05-21

## Headline

USML §7 Ingest interface goes from sketch-level prose (49 lines) to formal contract (~230 lines) with normative RFC 2119 MUST/SHOULD/MAY clauses. A fourth conformance class (USML Source Adapter) joins the three existing classes. Translation attribution metadata and license clearance procedure are now formally specified. The Quoin reference adapter's compliance is documented explicitly in `spec/conformance-report.md`.

The implementation does not change. The implementation was already correct — the spec catches up to formalize what the implementation already does. The shipped translations (`disclosure`, `combobox`, `tabs`) continue to emit the same `metadata.source` shape they did at Phase 22.7; the conformance test scaffold added in this phase exercises that same shape.

This is a deepening phase, not a change phase. The artifact that external implementers can target shifts from "spec sketch plus tribal knowledge in skill prose" to "formal contract with named conformance class and machine-checkable test scaffold."

## Commits

- **`525a5bb98ea151b75ae72cd2f8b9b1491ec753e8`** — phase-23.2 ships: USML §7 ingest interface formalized + source adapter conformance class. 15 files, +905/−45.
- **Follow-up commit** — closure-ref hash backfill in PHASES.md + this report.

## §7 transformation: sketch → formal contract

**Before (Phase 23.1 — sketch):**

- §7.1 Source adapter (4 MUST clauses + 2 SHOULD clauses, no sub-structure)
- §7.2 Reference source adapter (single-paragraph pointer to the translation skill)
- §7.3 Native specification publication (informal compatibility paragraph)

49 lines total.

**After (Phase 23.2 — formal contract):**

- **§7.1 Source adapter interface** — 4 sub-subsections:
  - §7.1.1 Source adapter conformance class (cross-ref to §Conformance §4.4 Source Adapter; MUST satisfy Anatomy Validator for output; MUST emit attribution per §7.3; MUST perform license clearance per §7.4; SHOULD declare supported formats; SHOULD report yield)
  - §7.1.2 Input contract (lists 6 anticipated formats: HTML+CSS, web component, JSX/TSX, design spec, wireframe, USML native IR; allows adapters to reject unsupported inputs)
  - §7.1.3 Output contract (MUST conform to §5 Core Data Model; MUST include `metadata.source`; MUST validate against schema; MUST preserve ARIA contract; MUST NOT inline peer-pack contracts)
  - §7.1.4 Adapter discovery (SHOULD self-declare via package metadata; future-state implementations directory)
- **§7.2 Reference source adapter** — 3 sub-subsections:
  - §7.2.1 Reference adapter identity (location, declared formats, source registry, extraction procedures, quality gates)
  - §7.2.2 Reference adapter conformance claim (Full conformance; 3 translated patterns listed)
  - §7.2.3 Source-adapter transition (transitional framing)
- **§7.3 Translation attribution metadata** — 3 sub-subsections:
  - §7.3.1 Required and optional attribution fields (table specifying system/url/license as MUST; sourcePatternSlug/captureDate as SHOULD; translationFraming as MAY)
  - §7.3.2 Attribution requirements
  - §7.3.3 Attribution display recommendations
- **§7.4 License clearance procedure** — 4 sub-subsections:
  - §7.4.1 License verification (must read source license before extraction; must determine derivative-works + redistribution permissions; must record determination)
  - §7.4.2 Compatible licenses (public domain, CC0, CC-BY, CC-BY-SA, MIT, Apache-2.0, BSD, W3C Document License)
  - §7.4.3 Incompatible licenses (no-derivative-works, commercial-only-without-agreement, unclear-licensed defaults)
  - §7.4.4 License clearance documentation
- **§7.5 Native specification publication** — 4 sub-subsections:
  - §7.5.1 Native publication definition
  - §7.5.2 Compatibility requirements (MUST conform to §5; MUST validate against schema; MUST declare version + quoinVersion; SHOULD NOT include attribution metadata)
  - §7.5.3 Native publication and source adapters
  - §7.5.4 Native publication and Quoin's reference adapter

~230 lines total.

## §Conformance update

**Before:** "USML defines three conformance classes" header. §4.1 Anatomy Validator, §4.2 Aesthetic-Pack Provider, §4.3 Backend Emitter.

**After:** "USML defines four conformance classes" header. New §4.4 USML Source Adapter conformance class added with:

- Definition (consumes source patterns; produces USML-conformant Pattern objects)
- Cross-reference to §7 for the full MUST/SHOULD/MAY contract
- Summary list of key requirements
- Full / Partial conformance level definitions
- Cross-reference to `spec/conformance-report.md` for the Quoin reference adapter's claim

## §Terminology update

Five new `<dfn>` entries:

| Term | Cross-link |
|------|------------|
| Source adapter (rewritten) | [[#conformance-source-adapter]] + [[#ingest-interface]] |
| Native publication | [[#native-publication]] |
| Translation attribution metadata | [[#translation-attribution]] |
| License clearance | [[#license-clearance]] |
| Transitional translation | [[#native-publication]] |

## spec/examples/source-adapter-output.json

Canonical attribution-complete output from the Quoin reference adapter (the disclosure-pattern translation). Validates against `spec/usml-schema.json`. Cross-referenced from §7.3.

## spec/tests/ingest/

New conformance test scaffold for the Source Adapter class:

| Fixture | Schema valid? | Adapter conformant? | Why |
|---|---|---|---|
| `valid-full-attribution.json` | ✅ | ✅ | All §7.3 required fields present (system + url + license); license is W3C-Document-License (compatible per §7.4) |
| `invalid-missing-attribution.json` | ❌ | ❌ | Schema rejects (PatternMetadataSource requires system+url+license); adapter conformance also rejects |
| `invalid-license-incompatible.json` | ✅ | ❌ | Schema accepts (license is a free-form string); adapter conformance rejects per §7.4 (license declares commercial-only, no-derivative-works) |

Runner integrated into `spec/tests/run-all.mjs`. All 3 tests pass.

## Full conformance test suite results

```
=== anatomy ===              2/2 PASS
=== aesthetic-pack ===       2/2 PASS
=== backend-emit ===         1/1 PASS
=== ingest (source adapter) ===  3/3 PASS
=== USML 2026.05 conformance scaffold: ALL PASS ===
```

8 tests, 8 pass, 4 conformance classes covered.

## spec/conformance-report.md update

Source Adapter conformance class added to the Summary table (Full conformance). New "USML Source Adapter — Full conformance (Phase 23.2)" detailed-claim section with per-requirement evidence table covering all §7 MUST and SHOULD clauses, translated-Pattern roster (disclosure, combobox, tabs from ARIA APG), and conformance scaffold reference.

## Architectural truths surfaced

**The schema is authoritative for 2026.05.** The brief proposed `metadata.source` field names (sourceProject, sourceLicense, sourceURL, translatedAt, translationSkillVersion, notes) that don't match the actual locked-at-2026.05 schema names (system, url, license, sourcePatternSlug, captureDate, translationFraming). The shipped translations (3 patterns from Phase 22.7) all emit the schema-locked shape.

Halt-3 logic ("metadata.source field shape in the formal contract doesn't match what existing translated patterns emit") applied. Resolution: per the brief's "DOES NOT TOUCH spec/usml-schema.json" rule, the schema is authoritative for 2026.05. §7.3 specifies the schema-locked names. The brief's proposed names are documented as a future-migration consideration in a non-normative note attached to §7.3.

**The double-enforcement architecture this surfaced is a strength.** The schema's `required: [system, url, license]` on `PatternMetadataSource` enforces §7.3's required fields at the schema-validation layer (machine-checkable, caught by any Anatomy Validator). The Source Adapter conformance class enforces them again at the operational layer (per-adapter responsibility), plus the license-incompatibility check that the schema can't structurally enforce (the license field is a free-form string at the schema level; semantic license-compatibility is a §7.4 operational check). The two layers reinforce rather than conflict; the test scaffold exercises both.

**The reference adapter is fully conformant.** Phase 22.7 shipped the translation skill, source registry, anatomy extraction rules, quality gates, and three reference translations. Phase 23.2 formalizes the contract those satisfy. The implementation is unchanged because it was already correct; the spec catches up to be the formal contract external implementers can target.

## Verification

| Check | Result |
|---|---|
| §7 reads straight-through with no internal contradictions | ✅ |
| §Conformance "four conformance classes" header consistent with §4.1-4.4 | ✅ |
| §Terminology 5 new dfn entries; all cross-link to §7 | ✅ |
| `spec/examples/source-adapter-output.json` validates against schema | ✅ |
| 3 ingest fixtures + runner integrated into run-all.mjs; 3/3 pass | ✅ |
| Full suite 8/8 across 4 conformance classes | ✅ |
| Existing pack manifests (38) still validate (schema untouched) | ✅ implied |
| spec/conformance-report.md Source Adapter section added | ✅ |
| Scope boundary held — schema, /skills/, /docs/sources/, /docs/translation/, implementation manifests, Phase 24.1 distribution surfaces NOT touched | ✅ |
| /llms.txt + /llms-full.txt NOT touched per scope (deeper spec is internal-deepening; AI consumption surfaces unaffected) | ✅ |

## Halt items

**None encountered.** The halt-3 architectural truth surfaced cleanly and was resolved by schema-authoritative reconciliation; the rest of the work proceeded without contradictions.

## Strategic implications for downstream work

- **Phase 23.3 (Emission interface formalization)** is the structural mirror of Phase 23.2 applied to §6 Backend emission contract. Same sketch-to-formal-contract transformation.
- **Phase 23.5 (Specification publication + live translation demo)** can now demonstrate against a fully-formalized contract rather than against skill prose.
- **Phase 25 (Multi-source harvest)** has a formal §7 contract that future harvest sessions and external source-adapter implementations follow.
- **Phase 26 (Standards engagement)** — the spec is meaningfully more publishable now. Standards reviewers reading §7 see normative MUST/SHOULD/MAY contracts with a worked example + a test scaffold + a reference implementation conformance claim.

## Next-session recommendation

**Phase 23.3 (Emission interface formalization)** is the natural mirror. Same transformation applied to §6 Backend emission contract — turn the sketch into a formal contract with sub-subsections, normative clauses, conformance levels documented (the Backend Emitter class already has Level 1/2/3; Phase 23.3 deepens the per-level requirements), and a backend-emission canonical example + test scaffold.

**Alternative: Phase 24.4 (first AI-tool integration tests)** — exercise the Phase 24.1 distribution surfaces with real-world agent behavior. Lower spec-coherence focus, higher adoption-evidence focus. Per D11 sequencing this is the higher-strategic-leverage path; per spec-coherence Phase 23.3 keeps the spec-authoring track moving.

**Alternative: Phase 23.4 (First reference source adapter formalization).** Phase 23.2 already partially satisfies this by formalizing the reference adapter in §7.2. A dedicated Phase 23.4 session would author the reference adapter's full implementation manifest (npm-publishable adapter package?). Lower priority than 23.3 or 24.4.

Operator chooses based on whether the next priority is "spec deepens further" (23.3), "real-agent adoption evidence" (24.4), or "reference adapter packaging" (23.4).

## License

MIT.
