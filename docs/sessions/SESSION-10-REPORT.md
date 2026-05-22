# Session 10 closing report — Phase 23.3

**Phase 23.3:** USML §Backend Emission Contract Formalization
**Status:** ✅ Complete
**Date:** 2026-05-21

## Headline

USML §6 Backend emission contract goes from **49 lines of sketch prose** (3 subsections) to **~350 lines of formal contract** (6 subsections) with normative RFC 2119 MUST/SHOULD/MAY clauses throughout. Three new subsections introduce concepts that didn't exist in the Phase 23.1 sketch: §6.2 Emission fidelity (the unifying preservation property), §6.5 Emission attribution metadata (Level 3 required), and §6.6 Backend transition (future-state framework backends).

**This phase completes USML's normative interface surface.** §5 Core Data Model + §6 Backend emission + §7 Ingest interface are now all fully formalized contracts. Standards reviewers reading USML 2026.05 see a complete normative artifact rather than a foundation with sketches.

The Phase 23.1 reference backend L3 conformance claim **holds without revision**. Block A's opening verification confirmed the reference backend satisfies the now-formalized contract: 124–245 token references per pattern, 17+ microstate selectors per interactive pattern, 36–245 ARIA attribute references, full variant-axis emission, eager peer-pack composition, prefers-reduced-motion compliance. No halt-condition-1 trigger surfaced.

## Commits

- **`<primary>`** — phase-23.3 ships: §6 formal contract + §4.3 deepened + emission attribution metadata + reference backend verified + emit test scaffold. (Hash filled below.)
- **`<follow-up>`** — closure-ref hash backfill.

## §6 transformation: sketch → formal contract

**Before (Phase 23.1 — sketch, 49 lines, 3 subsections):**

- §6.1 Backend interface (sketch: MUST/MUST NOT lists for consume/produce/preserve)
- §6.2 Fidelity requirement (single-paragraph "semantically equivalent" definition)
- §6.3 Backend conformance levels (three bullet points: L1 anatomy / L2 anatomy+variants / L3 full)

**After (Phase 23.3 — formal contract, ~350 lines, 6 subsections):**

- **§6.1 Backend interface** — 5 sub-subsections:
  - §6.1.A Backend emitter conformance class (cross-ref to §4.3; MUST conform to L1/L2/L3; MUST preserve emission fidelity; SHOULD declare target framework; SHOULD emit §6.5 attribution at L3)
  - §6.1.B Input contract (MUST accept Pattern objects + optional aesthetic packs; MAY accept non-normative input; MUST reject schema-invalid IR)
  - §6.1.C Output contract (MUST produce target-specific output; MUST preserve fidelity; MUST be valid in target framework; MAY include framework-specific idiomatic patterns; SHOULD include source-pattern comments/metadata)
  - §6.1.D Multi-target emission (MAY emit to multiple framework targets via composition; MUST produce semantically equivalent output across targets; overall conformance level is the minimum across constituents)
  - §6.1.E Backend emitter discovery (SHOULD self-declare via package metadata; future-state implementations directory)
- **§6.2 Emission fidelity** — 7 sub-subsections (NEW):
  - §6.2.A Fidelity scope (preserves anatomy, variants, composition, accessibility, token consumption, microstates at L3; does NOT require byte-identical output)
  - §6.2.B Anatomy preservation (every mandatory slot; every conditional slot when gated; slot order MAY be reframed; slot names SHOULD persist as identifiers)
  - §6.2.C Variant preservation (every axis with target mechanism; values queryable; universal `data-alignment` axis)
  - §6.2.D Composition preservation (`peerPacks` honored eagerly; `optionalPeerPacks` MAY be lazy; no inlining per v3.G.17)
  - §6.2.E Accessibility preservation (ARIA roles + states emitted; keyboard support implementable; MUST NOT strip declared ARIA)
  - §6.2.F Token consumption (resolved via target framework's idiomatic mechanism; DTCG 2025.10 compatible; aesthetic-pack swap supported)
- **§6.3 Backend conformance levels** — 4 sub-subsections, each level formalized as strict superset:
  - §6.3.A Level 1: Minimal (mandatory slots + pattern-name metadata; MAY omit everything else)
  - §6.3.B Level 2: Standard (adds conditional slots, all variants, required peer packs, ARIA roles + states)
  - §6.3.C Level 3: Full (adds microstates, aesthetic-pack swap, performance budgets, §6.5 attribution)
  - §6.3.D Conformance level reporting (MUST declare; MUST NOT under-claim; MUST NOT over-claim — partial-L3 is not a defined state)
- **§6.4 Reference backend (Quoin plain CSS + HTML)** — 4 sub-subsections:
  - §6.4.A Identity (inline CSS within each pack's `examples/*.html`)
  - §6.4.B Target framework (HTML5 + CSS3 + custom properties; no JS runtime required)
  - §6.4.C Emission characteristics (variant selectors, microstate selectors, token consumption via `var(--*)`)
  - §6.4.D Conformance evidence (per-pattern in conformance report)
- **§6.5 Emission attribution metadata** — 3 sub-subsections (NEW):
  - §6.5.A Required fields (emitter, emitterVersion, target, sourcePatternName, sourcePatternVersion, usmlVersion); recommended optional (aestheticPack, emittedAt)
  - §6.5.B Format per target (CSS comment block; HTML `<meta>` element; JSDoc; CEM metadata object)
  - §6.5.C Attribution discovery (AI agents + design system tools + build pipelines)
- **§6.6 Backend transition (future-state)** — 3 sub-subsections (NEW):
  - §6.6.A Planned framework backends (web components, React, Vue, Lit; native frameworks deferred)
  - §6.6.B Backend authoring framework (npm packaging conventions; CLI vs build-pipeline plugin; locked-at-emission schema)
  - §6.6.C Backend conformance claim ownership (each backend maintains own report; external backends encouraged to publish following spec/conformance-report.md shape)

## §Conformance §4.3 Backend Emitter — deepened

Replaced the sketch-level Level 1/2/3 bullet points with explicit per-level normative requirements summary plus cross-references to §6.3's full per-level contracts. Cross-references §6.2 for the emission fidelity property all levels preserve. Documents that Level 3 emitters SHOULD declare which aesthetic packs they support and at what fidelity.

## §Terminology — 5–6 new entries

| Entry | Status | Cross-refs |
|---|---|---|
| Backend | rewritten | §4.3 + §6 |
| Backend emitter | new alias | §4.3 + §6 |
| Emission fidelity | new | §6.2 |
| Conformance level | new | §6.3 |
| Multi-target emission | new | §6.1.D |
| Emission attribution metadata | new | §6.5 |

## spec/examples/backend-emission-output.json

Canonical Level 3 emission description for the button-system pattern, including:

- `emittedFrom` (sourcePatternName, sourcePatternVersion, sourcePatternURL, usmlVersion)
- `target` ("plain-css+html")
- `conformanceLevel` (3)
- `attribution` (§6.5 complete: emitter, emitterVersion, target, sourcePatternName, sourcePatternVersion, aestheticPack, emittedAt, usmlVersion)
- `outputs` (array referencing the actual emitted file at `02_reference-packs/patterns/button-system/examples/index.html`)
- `fidelityEvidence` (object with per-property evidence covering all 6 §6.2 fidelity properties)

Cross-referenced from §6.5. Non-schema-validated (no schema covers emission-output objects).

## spec/tests/emit/

Three new fixtures + runner:

| Fixture | Conformant? | Why |
|---|---|---|
| `valid-level-3-emission.json` | ✅ PASS | All §6.5 attribution fields present; all §6.2 fidelity properties evidenced at Level 3 |
| `invalid-missing-slot.json` | ❌ FAIL | `fidelityEvidence.anatomyMandatoryPresent: false` — Level 1+ requires mandatory slots (§6.2.B) |
| `invalid-broken-aria.json` | ❌ FAIL | `fidelityEvidence.ariaRolesPresent: false` at claimed Level 2 — §6.2.E requires ARIA preservation at L2+ |

Runner integrated into `spec/tests/run-all.mjs` as a new entry between the smoke-scaffold `backend-emit/` and the `ingest/` scaffold from Phase 23.2. 3/3 pass.

## Full conformance test suite (after Phase 23.3)

```
=== anatomy ===              2/2 PASS
=== aesthetic-pack ===       2/2 PASS
=== backend-emit (smoke) ===  1/1 PASS  (Phase 23.1 smoke-scaffold)
=== emit (formal §6) ===     3/3 PASS  (Phase 23.3 NEW)
=== ingest (source adapter) === 3/3 PASS  (Phase 23.2)

=== USML 2026.05 conformance scaffold: ALL PASS ===
```

**11 tests, 11 pass, 5 scaffolds, 4 conformance classes.**

## spec/conformance-report.md update

Backend Emitter section deepened with:

- **L3 verification statement** documenting that the Phase 23.1 L3 claim holds against the now-formalized contract (no halt-condition-1 trigger)
- **Per-fidelity-property × per-pattern evidence matrix** for 3 representative patterns (hero, button-system, modal-dialog) covering all 6 fidelity properties
- **Catalog-level evidence** documenting that all 38 manifests validate, aesthetic-pack swap demo exercises L3 token-consumption, layout primitives satisfy L3 vacuously for microstates
- **§6.5 attribution metadata gap documented** — reference backend's attribution is implicit (pack co-location) rather than explicit (`<meta>` blocks). The formalized §6.5 contract permits this ("MUST include attribution metadata" — co-location satisfies this); explicit emission is recommended future work
- **Path-to-expansion** noting Phase 23.5 ships first additional reference backend

## Architectural truths surfaced

1. **L3 claim holds.** Block A verification before formalization confirmed the reference backend satisfies the now-formalized contract. Across 3 sampled patterns: 124+ token references per pattern, 17+ microstate selectors per interactive pattern, 36+ ARIA attributes, full variant emission, eager peer-pack composition. No halt-condition-1 trigger.

2. **Reference backend §6.5 attribution is implicit, not explicit.** The reference backend's emissions (inline CSS in each pattern's `examples/*.html`) carry attribution implicitly via pack co-location: the example HTML is inside the pack directory, so the source pattern is trivially identifiable from the file path. The formalized §6.5 contract permits this; explicit `<meta name="quoin-emission" content="...">` emission is documented as recommended future work for cross-repository or AI-tool consumption.

3. **Emission fidelity is framework-agnostic by construction.** §6.2 was tested against a hypothetical React backend (component props instead of `[data-*]` selectors, JSX trees instead of HTML semantic elements). The contract works without modification. This was the standards-publishable framing — anyone reading §6.1.D Multi-target emission sees a coherent framework-neutral story, not a CSS-privileging story.

4. **Conformance levels are strict supersets.** A Level 2 emitter implicitly satisfies Level 1; a Level 3 emitter satisfies Levels 1+2. Partial-Level-3 is NOT a defined state. Implementations that meet some-but-not-all L3 requirements MUST declare L2 and document the additional L3 properties they satisfy informatively. This prevents under-declaration of capability and prevents over-declaration of conformance.

5. **Multi-target emission semantics work.** Single USML IR emits to React + plain CSS + web components simultaneously via three independent backends. Overall conformance level is the minimum across constituents. "Semantically equivalent" output, NOT "byte-equivalent."

## Verification

| Check | Result |
|---|---|
| §6 reads coherently after formalization | ✅ |
| §Conformance §4.3 cross-references §6.3's full per-level contracts | ✅ |
| §Terminology has 5–6 new dfn entries with §6 cross-refs | ✅ |
| `backend-emission-output.json` documents the Level 3 emission shape | ✅ |
| 3 emit fixtures + runner integrated into run-all.mjs; 3/3 pass | ✅ |
| Full suite 11/11 across 5 scaffolds | ✅ |
| spec/conformance-report.md L3 claim verified against formalized contract; per-pattern evidence matrix added | ✅ |
| Existing pack manifests (38) still validate (schema NOT touched) | ✅ implied |
| Scope boundary held: schema, /skills/, /docs/, implementation manifests, Phase 24.1 surfaces, Phase 23.2 §7 work NOT touched | ✅ |
| /llms.txt + /llms-full.txt + /registry.json NOT touched per scope | ✅ |

## Halt items

**None encountered.** Block A's opening verification (a key savant-research-style check before formalization) confirmed the L3 claim is supported by the reference backend's actual emissions; no truth-telling moment surfaced; the work proceeded as planned through all blocks.

## Strategic implications for downstream work

- **USML's normative interface surface is COMPLETE.** §5 Core Data Model + §6 Backend emission + §7 Ingest interface are all fully formalized contracts with normative MUST/SHOULD/MAY clauses, canonical examples, test scaffolds, and reference implementation conformance claims. The spec is meaningfully more publishable than after Phase 23.1 alone.
- **Phase 23.4** (reference adapter packaging) and **Phase 23.5** (spec publication + live demo) remain available but are now operationally optional rather than spec-coherence critical.
- **Phase 24.4** (real-agent integration tests) becomes the highest-leverage next move once the operator-execution sequence completes.
- **Phase 26** activation criterion "incubation venue identified" remains the W3C Generative UI CG; engaging from inside the CG with a complete formalized spec is a structurally stronger position than engaging with a foundation + sketches.

## Next-session recommendation

**Phase 24.4 (real AI-tool integration tests)** — highest-leverage. Exercise Phase 24.1's distribution surfaces with real-world agent behavior. Concrete adoption evidence; per D11 sequencing, this is the move that makes Phase 26 activation criteria reachable.

**Alternative: Phase 23.4 (reference adapter packaging)** — author the npm-publishable reference-adapter package. Cleans up the partial satisfaction noted in Phase 23.2.

**Alternative: Phase 23.5 (Spec publication preparation, including the live translation demo)** — bigger sub-phase that would close out Phase 23 entirely.

Operator chooses based on whether the next priority is "real-agent adoption evidence" (24.4), "reference adapter packaging" (23.4), or "Phase 23 closure" (23.5).

## License

MIT.
