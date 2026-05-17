# Phase Prompts

Verbatim prompts to paste into Claude Code (or any capable agent) at the start of each phase. Each prompt assumes the agent has access to the full `quoin-lab/` directory.

The operator's machine must have GitHub auth configured for the `harrowhaus` account before running the initialization prompt.

---

## Initialization — Repo creation and first push

```
You are setting up the Quoin design language project. The lab directory quoin-lab/ already exists in this workspace with the full specification draft, phase READMEs, and operator handoff materials.

Your tasks, in order:

1. Initialize a git repository in quoin-lab/ if one does not already exist (git init).
2. Create a .gitignore appropriate for a TypeScript / Node monorepo (node_modules, dist, .env, .DS_Store, .cache, etc.).
3. Stage and commit the current lab contents with the message "Initial lab structure: spec, phase READMEs, handoff materials".
4. Create a new public GitHub repository at github.com/harrowhaus/quoin using the gh CLI (gh repo create harrowhaus/quoin --public --source=. --description "Quoin — a semantic design language that compiles to standard CSS. The compiler turns intent-bearing semantic elements into deterministic HTML and CSS at build time.").
5. Push the initial commit to origin/main.
6. Confirm: the GitHub repo exists, the lab is pushed, and the README renders correctly on GitHub.

If the gh CLI is not authenticated for the harrowhaus account, stop and instruct the operator to run `gh auth login` and re-invoke this prompt.

Report the repo URL and the initial commit SHA when complete.
```

---

## Phase 3.5d — Per-pack source-faithful composite refinement

```
You are working on the Quoin design language project. Phase 3.5c populated every harvested token pack with programmatic defaults for the v1.0 namespace. Material 3's shadows look identical to Bootstrap's; Tailwind's border widths match Carbon's. 3.5d refines per-pack composite + atomic values to match each source system's actual published specs.

REQUIRED READING: 00_spec/tokens.md (canonical contract), 03_harvest/build.js (composite defaults), 03_harvest/fidelity/extract.js (framework), 03_harvest/REPORT.md.

GOAL: per-pack source-faithful values for the new composite tokens (shadow, border, typography, transition) and atomic geometric/motion tokens.

FRAMEWORK EXTENSION: extract.js merges optional `semantic`, `composites`, and `fonts` fields from each spec's map() return — not just `base`. The override fields flow into sources/<name>.json and build.js applies them on top of its defaults.

PRIORITY: refine each pack where the upstream publishes the data. High-feasibility candidates with extractable composite specs: tailwind (box-shadow scale), material3 (elevation level 1-5), bootstrap ($box-shadow* variants), open-props (props.shadows.css), mantine (theme.shadows), uswds (tokens/shadow/), polaris (@shopify/polaris-tokens theme), spectrum (@adobe/spectrum-tokens), mui (theme.shadows), atlassian (@atlaskit/tokens shadow). Skip clarity/geist/workday (Tier C from 3.5b).

VALIDATION: validate.js still passes (no warnings), compiler tests 77/77, demos 3/3 build.

PER-PACK FIDELITY: each refined pack documents in harvestNotes which composite values come from the upstream vs from build.js defaults.

Commit per pack. Push to origin/main.
```

After Phase 3.5d: framework + at least 3 packs refined. Remaining packs satisfy the canonical contract via 3.5c programmatic defaults; they can be refined any time without blocking launch.

---

## Phase 3.5c — Geometric & typographic fidelity

```
You are working on the Quoin design language project. Phase 0.5 froze the canonical namespace at v1.0 (164 tokens). Every harvested token pack is flagged "pending-3.5c-fill" with ~100 new canonical tokens missing. Phase 3.5c populates them.

REQUIRED READING: 00_spec/tokens.md (canonical contract), 03_harvest/build.js (pack generator), 03_harvest/REPORT.md.

GOAL: every harvested pack supplies a $value for all 164 canonical names. Remove the pending-3.5c-fill flag. Strict validation passes across the catalog.

METHODOLOGY: extend 03_harvest/build.js with DEFAULT_* tables for the new atomic types (border widths, focus-ring metrics, icon sizes, containers, blur, opacity, z-index, aspect ratios, font weights, new motion durations + easings, stroke solid/dotted) and DEFAULT_COMPOSITES for the new composite types (7 shadow + 3 border + 13 typography + 3 transition + 1 strokeStyle-dashed). buildSemanticTokens applies the new defaults; sources can override via source.semantic / source.composites if they want pack-specific values.

VALIDATION: validate.js 40/40 pass; compiler tests 77/77 still pass; demos 3/3 build; docs site builds clean.

PER-PACK FIDELITY POLISH (optional 3.5d): refine each pack's shadow recipes, border widths, and typography composites to match each source system's actual geometric specs. Programmatic defaults satisfy the canonical contract; per-pack source-faithful values are incremental polish.

Commit per area. Push to origin/main.
```

After Phase 3.5c: all 30 harvested packs satisfy the canonical contract. v1.0 namespace fully populated across the catalogue.

---

## Phase 0.5 — Canonical Namespace Expansion

Pre-1.0 spec change. Expands the canonical token namespace from its v0 sketch to v1.0 surface area. After this phase the namespace is frozen.

```
You are working on the Quoin design language project. Phases 0–4 plus 5a–5d plus 3.5b are complete; phase 3.5c (geometric & typographic fidelity) has not yet run. Before 3.5c, the canonical semantic-token namespace in 00_spec/tokens.md must be expanded from its current v0 sketch (~30 tokens across 4 DTCG types) to its full v1.0 surface area (~160 tokens across 11 DTCG types). This is Phase 0.5.

REQUIRED READING: README.md, 00_spec/spec.md, 00_spec/tokens.md, 00_spec/pack-format.md, 00_spec/primitives.md, the four reference vocabulary packs, 03_harvest/REPORT.md, 03_harvest/validate.js, DTCG 2025.10 at https://www.designtokens.org/tr/drafts/format/.

GOAL: rewrite 00_spec/tokens.md to define the canonical namespace as 164 tokens across 11 DTCG types — color, dimension, number, fontFamily, fontWeight, duration, cubicBezier, shadow, border, typography, transition, strokeStyle. Update vocabulary packs to reference new composite tokens where appropriate. Update the validator to enforce the expanded namespace. Mark all 30 harvested packs as "pending-3.5c-fill" so they emit warnings rather than errors during the transitional window.

HARD CONSTRAINTS: DTCG 2025.10 type names exactly. No ad-hoc types. Three-layer architecture preserved. Composite tokens follow DTCG composite object syntax verbatim. Canonical namespace FIXED at v1.0 after this phase.

THE FULL CANONICAL NAMESPACE: see 00_spec/tokens.md §3 (29 color + 64 dimension + 21 number + 4 fontFamily + 6 fontWeight + 5 duration + 6 cubicBezier + 7 shadow + 3 border + 13 typography + 3 transition + 3 strokeStyle).

VALIDATION: every pack passes validate.js (harvested packs with pending-3.5c-fill warning), compiler tests 77/77, demos build cleanly.

Commit per area. Push to origin/main.
```

After Phase 0.5: namespace is at v1.0 surface area; harvested packs need values for the new tokens (Phase 3.5c).

---

## Phase 0 — Specification

```
You are working on the Quoin design language project. Read these files first for context:
- quoin-lab/README.md
- quoin-lab/HANDOFF.md
- quoin-lab/PHASE_GATES.md (specifically the Phase 0 section)

Your task is to draft the four specification documents in quoin-lab/00_spec/:

1. spec.md — canonical language reference. Define: how semantic elements are authored, the attribute system (intent, register, density, weight, scope), cascade and inheritance rules, how packs compose, how the compiler resolves tags to output, the compilation model end to end. Include concrete examples.

2. pack-format.md — canonical pack manifest schema. Define: pack directory structure, the quoin.pack.json manifest format (with a complete JSON schema), token file format conforming to W3C DTCG, vocabulary definition format, implementation pack hook format, versioning rules, naming conventions for npm publication under the @quoin/* scope.

3. primitives.md — initial v1 semantic vocabulary. Define a minimum of 30 semantic elements across six categories: editorial, layout, navigation, state, content, interactive. For each primitive provide: name, semantic role (1-2 sentences), accepted attributes with allowed values, sample compiled output against a Tailwind v4 target using the baseline token pack, example HTML usage in context. The vocabulary must be aesthetic-neutral throughout — no specific colors, fonts, or visual choices baked into the definitions.

4. tokens.md — token architecture. Define the three-layer model (base → semantic → component) following Tailwind v4 and W3C DTCG conventions. Define the canonical semantic token namespace that every Quoin token pack MUST implement (surface, surface-elevated, surface-recessed, text, text-emphasis, text-recede, border, border-emphasis, accent, accent-recede, critical, success, warning, info, and a complete spacing / type / motion / radius set). This namespace is the contract that makes any token pack interoperable with any vocabulary pack.

Cite intellectual lineage where relevant: Christopher Alexander's A Pattern Language for the generative grammar concept; the Swiss / International Typographic Style and brutalist editorial design tradition for the structural philosophy; DaisyUI for the prior-art validation of semantic compression on top of Tailwind; Tailwind v4 for the token architecture; W3C DTCG for the token file format. Cross-reference between the four documents wherever rules interact.

Write in terse, specification-style prose. Short sentences. Concrete examples. Zero marketing language. The audience is a compiler engineer building from this spec; their patience for fluff is zero.

Commit each document separately with a clear commit message. When complete, push all commits to origin/main (github.com/harrowhaus/quoin) and list all four documents with a one-line summary of each and explicitly request operator review against the Phase 0 exit criteria in PHASE_GATES.md.
```

---

## Phase 1 — Reference compiler

```
You are working on the Quoin design language project. Phase 0 (specification) is complete and approved. Read these files first:
- quoin-lab/README.md
- quoin-lab/HANDOFF.md
- quoin-lab/PHASE_GATES.md (specifically the Phase 1 section)
- All four documents in quoin-lab/00_spec/

Your task is to implement the reference compiler in quoin-lab/01_compiler/.

Architecture: TypeScript implementation. Vite plugin as the primary integration target; expose a programmatic API as well. The compiler reads source HTML containing Quoin semantic elements, resolves them against the active vocabulary pack(s), applies attribute cascade per the spec, resolves token references against the active token pack, and emits compiled output via the active implementation pack.

Inputs at build time:
- Source HTML or template files
- One or more vocabulary packs (must conform to pack-format.md)
- One token pack (must implement the canonical semantic token namespace from tokens.md)
- One implementation pack (Tailwind v4 emitter for v1)

Process:
1. Parse source HTML, identify Quoin elements by tag name registered in the loaded vocabulary packs.
2. For each Quoin element: resolve its definition from the vocabulary pack, apply attribute defaults and overrides per cascade rules, resolve any referenced tokens.
3. Pass the resolved element + token context to the implementation pack's emit function.
4. Replace the source element with the emitted output (typically a standard HTML element with classes, attributes, and child structure).
5. Emit the final HTML and any generated CSS.

Required deliverables:
- Compiler source in TypeScript with full type definitions.
- A Vite plugin entry point.
- A test suite covering: per-primitive compilation (all 30+ v1 primitives), attribute cascade, pack composition (loading multiple vocab packs), error cases (missing tokens, undefined primitives, malformed packs). Target 90%+ line coverage.
- A sample test project at quoin-lab/01_compiler/sample/ that demonstrates the compiler working end to end on a small page that exercises at least 10 primitives.
- A README.md in quoin-lab/01_compiler/ documenting: build setup, how to run tests, the public API, the plugin architecture.

Hard constraints:
- No runtime dependencies in compiled output. The browser must see only standard HTML + CSS.
- No proprietary output formats. The Tailwind impl emits Tailwind class strings; the raw CSS impl (future) emits raw CSS rules.
- The compiler must support replacing one pack with another and recompiling cleanly. No state leaks between builds.

When complete, run the full test suite, run the sample build, commit all work, push to origin/main (github.com/harrowhaus/quoin), and report results. Explicitly request operator review against the Phase 1 exit criteria.
```

---

## Phase 2 — Reference packs

```
You are working on the Quoin design language project. Phases 0 and 1 are complete and approved. Read these files first:
- quoin-lab/README.md
- All documents in quoin-lab/00_spec/
- quoin-lab/01_compiler/README.md
- quoin-lab/PHASE_GATES.md (Phase 2 section)
- quoin-lab/02_reference-packs/README.md

Your task is to build five reference packs in quoin-lab/02_reference-packs/:

1. @quoin/tokens-baseline — a deliberately neutral token pack. System font stack (sans + serif + mono), a 50-step grey palette in OKLCH, a generous spacing scale, conservative type scale, restrained motion durations. The "Helvetica" of token packs: defensible defaults that work for anything.

2. @quoin/vocab-editorial — full editorial primitive bundle covering the editorial category from primitives.md plus relevant layout and content primitives. Optimized for long-form reading, articles, essays, documentation.

3. @quoin/vocab-dashboard — dashboard-oriented primitive bundle covering layout, state, and content primitives sized for data-dense interfaces. Tighter spacing defaults, denser type, more compact components.

4. @quoin/impl-tailwind — the Tailwind v4 implementation pack. Emits Tailwind class strings for every primitive. Already partially built in phase 1; complete and harden here.

5. @quoin/impl-raw-css — raw CSS implementation pack. Emits inline CSS rules using the active token pack's CSS custom properties. Zero framework dependency. Demonstrates that Quoin is not Tailwind-bound.

Each pack must:
- Conform to the pack manifest schema in 00_spec/pack-format.md.
- Build successfully through the phase 1 compiler.
- Have its own README explaining scope, target use cases, and design decisions.
- Pass a pack-validation test.

When complete, build a sample site using each combination (editorial vocab + baseline tokens + Tailwind impl; dashboard vocab + baseline tokens + raw CSS impl; etc.) to demonstrate composition. Commit and push all work to origin/main (github.com/harrowhaus/quoin). Explicitly request operator review against the Phase 2 exit criteria.
```

---

## Phase 3 — Harvest

```
You are working on the Quoin design language project. Phases 0-2 are complete. Read:
- All four documents in quoin-lab/00_spec/
- quoin-lab/03_harvest/README.md (lists target systems, source registries, methodology, and quality bar)
- quoin-lab/PHASE_GATES.md (Phase 3 section)

This phase builds the production-grade Quoin pack library, not a demo. Floor: 40 high-quality packs (30 token packs + 10 vocabulary packs). Stretch: 60+. Every pack must pass the quality bar defined in 03_harvest/README.md.

Workflow:

1. Read 03_harvest/README.md fully. Internalize the source registries (Adele, Style Dictionary user repos, W3C DTCG examples, Tailwind preset registry, Open Props community themes, shadcn/ui theme library) and the slop-avoidance list.

2. Work through the priority-one target list first (Material 3, Carbon, Polaris, Fluent 2, Primer, Atlassian, Lightning, Spectrum, Open Props, Radix Colors, USWDS, GOV.UK, Pinterest Gestalt, Twilio Paste, Workday Canvas, Geist, Catalyst, shadcn/ui defaults, Tailwind defaults). Then move to priority-two systems sourced from Adele and active Style Dictionary repos.

3. For each target system:
   a. Read the system's public documentation and/or open source. Confirm license and active maintenance.
   b. Extract token values (color, typography, spacing, radius, motion, elevation) and where applicable component-level semantics.
   c. Map onto Quoin's canonical semantic token namespace from 00_spec/tokens.md. Document any non-trivial mapping.
   d. Emit a complete Quoin pack: manifest, DTCG token files, README with attribution, LICENSE.
   e. Validate with @quoin/validate-pack.
   f. Compile-test against a sample page.
   g. Visual smoke-test: render a reference page and compare against a screenshot of the source system's official sample. Output should be recognizable as the source aesthetic.

4. Vocabulary packs: harvest shadcn/ui patterns, Radix UI primitives, Headless UI patterns, Ark UI patterns, Catalyst patterns, DaisyUI semantics, plus extracted domain packs (dashboard-extended, marketing, docs, forms).

5. Quality enforcement: any pack that fails the quality bar in 03_harvest/README.md moves to 03_harvest/holding/ with a note on what would need to change. It does not ship under @quoin/* at launch.

6. Maintain 03_harvest/REPORT.md as you work, documenting per-system mapping decisions, ambiguous translations, and any features that did not translate cleanly.

Hard constraints:
- Refuse private or NDA-protected sources.
- Do not include source code or proprietary assets beyond explicit open source.
- Do not falsify attribution or omit license requirements.
- Do not embed copyrighted typefaces — reference them by family name as token values only.
- Do not harvest from the slop sources listed in 03_harvest/README.md ("Slop avoidance" section). When in doubt, omit the pack and document the reason.
- Do not pad the count with low-quality packs to hit the floor. 35 strong packs beat 50 weak ones; if the bar pushes the total below 40, report and request operator guidance.

Final operator dogfooding test before requesting review: confirm that the harvested library, combined with a custom token pack matching a target brand (e.g., Harrow Haus), is sufficient for Claude Code to produce a production-grade marketing page without writing custom CSS. If this test fails, identify the gap (missing primitive, missing token coverage, weak vocabulary pack) and address it before declaring phase 3 complete.

When complete, commit all harvested packs and the harvest report, push to origin/main (github.com/harrowhaus/quoin), report the full list of shipped packs and the contents of 03_harvest/holding/, and explicitly request operator review against the Phase 3 exit criteria.
```

---

## Phase 3.5 — Token Fidelity Pass

Run between Phase 3 and Phase 4 (or as a post-launch follow-up). Upgrades harvested token packs from interpretation to byte-faithful extraction without changing the canonical semantic namespace.

```
Before 5e ships, run Phase 3.5 — Token Fidelity Pass. This phase upgrades every harvested token pack from "interpretation" to "extraction": byte-faithful values harvested directly from each source design system's official token files, mapped onto Quoin's canonical semantic namespace.

Required reading before you start:
- quoin/README.md
- quoin/HANDOFF.md
- quoin/00_spec/spec.md and quoin/00_spec/tokens.md (the canonical namespace contract — do not modify)
- quoin/03_harvest/README.md
- quoin/03_harvest/REPORT.md (current tier classification)
- quoin/03_harvest/verify-tier-b.js and quoin/03_harvest/verify-tier-b/REPORT.md
- quoin/03_harvest/sources/*.json

For every token pack in quoin/03_harvest/packs/tokens-*/, replace eyeballed/training-data values with byte-faithful values extracted from the source system's official token files. The canonical 30-token namespace stays exactly the same; only the values within it change.

Hard constraints:
1. Do NOT extend the canonical semantic namespace.
2. Do NOT modify 00_spec/tokens.md.
3. Optional system-native extension tokens are OUT OF SCOPE.
4. Preserve license attribution. Copy values, not source code.
5. Do not embed copyrighted typefaces.
6. License compatibility check before publication.

Methodology per pack: fetch canonical source → parse with format-specific parser → map onto Quoin canonical → convert to OKLCH via culori → write to tokens.css + tokens/index.json → update manifest attribution (sourceUrl, sourceCommit, harvestedAt, harvestNotes, fidelityTier).

Verification: every pack still passes 03_harvest/validate.js; compiler test suite 77/77 still green; demos still build; visual smoke test against showcase-tailwind.

Tier reclassification after extraction:
- Tier A: byte-faithful extraction.
- Tier B: extracted with mapping notes.
- Tier C: extraction deferred; current values stand.

Stop and request operator input if more than 5 packs would fall to Tier C — a methodology problem worth discussing before continuing.

Commit incrementally (one commit per pack), push to origin/main, then explicitly request operator review against Phase 3.5 exit criteria.
```

The framework that supports this phase lives at `03_harvest/fidelity/`:
- `fidelity/extract.js` — orchestrator
- `fidelity/parsers.js` — SCSS / CSS vars / JS+TS / DTCG / YAML / Style-Dictionary parsers
- `fidelity/oklch.js` — culori wrappers
- `fidelity/specs/*.js` — per-source extraction specs (one file per pack)
- `fidelity/annotate-tier-c.js` — stamps `fidelityTier: "C"` on every source that hasn't been extracted

After the initial Phase 3.5 run, the per-pack `attribution.fidelityTier` records the status. Phase 3.5b (a follow-up batch) promoted Tier C packs to A/B by expanding methodology to three methods.

---

## Phase 3.5b — Comprehensive Fidelity Pass

```
You are working on the Quoin design language project. Phase 3.5 ran and completed with 1 Tier A, 5 Tier B, and 24 Tier C packs — far above the >5 Tier C stop condition. Run Phase 3.5b to bring the catalog to byte-faithful fidelity using an expanded methodology.

Required reading: README.md, HANDOFF.md, 00_spec/spec.md + 00_spec/tokens.md, 03_harvest/README.md, 03_harvest/REPORT.md, 03_harvest/fidelity/extract.js, 03_harvest/fidelity/parsers.js, 03_harvest/fidelity/oklch.js, 03_harvest/fidelity/specs/*.js, 03_harvest/fidelity/extract-report.json.

GOAL: bring every harvested token pack to byte-faithful fidelity. Target: 0-3 Tier C packs.

THREE EXTRACTION METHODS:
- Method A: static fetch + parse (existing 3.5 path; new parsers added for primer-json5 and value-wrapped-ts).
- Method B: algorithm execution at extract time. AUTHORIZED to `npm install` source-system libraries as dev deps. Examples: @material/material-color-utilities, @ant-design/colors, @carbon/colors, @shopify/polaris-tokens, @atlaskit/tokens, @adobe/spectrum-tokens.
- Method C: per-file structured extraction. For sources whose values are static but split across files that defeat concatenated parsing (MUI per-colour modules, Orbit per-family palette JSON).

TIER C CRITERIA — reserved only for packs where ALL of these hold:
- No public static token file exists.
- No published generation library exists (or it's license-incompatible).
- Reasonable URL search has not yielded a canonical source.
- The system has not migrated to a successor that ships public tokens.

VALIDATION: validate.js passes, compiler tests still pass, demos still build, REPORT.md updated with per-pack tier + method.

STOP CONDITIONS: >3 Tier C packs trending. License change. npm install failure. Compiler test regression.

Commit per pack: `fidelity-b: extract <name> via method <A|B|C>`. Final docs commit: `phase 3.5b: complete comprehensive fidelity pass`. Push to origin/main.
```

The framework grows by one file in 3.5b: `fidelity/runner.js` dispatches across Methods A/B/C based on spec shape. The runner is imported by `extract.js`. New parsers were added to `parsers.js`:

- `primer-json5` — handles Primer's `name: { $value: { hex: '#xxx' } }` shape.
- `value-wrapped-ts` — handles Chakra v3 / Style Dictionary `name: { value: '#hex' }` (multi-line and single-line).

After Phase 3.5b: 1 A, 26 B, 3 C (clarity, geist, workday — all with documented unresolvable reasons in REPORT.md).

---

## Phase 4.5 — Docs site refresh + playground REPL

```
You are working on the Quoin design language project. Phase 3.5b is complete. The docs site at 04_docs/ is the largest in-the-wild demonstration of Quoin and currently reflects pre-fidelity state. Phase 4.5 refreshes the docs site and upgrades the playground to the standard of a modern language REPL.

Required reading: README.md, 04_docs/README.md, 04_docs/src/playground/main.ts, 04_docs/src/playground/packs.ts + presets.ts, 04_docs/index.html + components/index.html + packs/index.html, 03_harvest/REPORT.md, migration guides at 04_docs/migrate/.

GOALS:
1. Docs site uses a harvested Tier A or B token pack as active theme.
2. Pack browser surfaces fidelity tiers with filtering.
3. Playground levels up to feel like TypeScript Playground / Vue REPL.
4. New showcase page demonstrates the strongest claim.
5. Migration guides reflect post-3.5b state.

HARD CONSTRAINTS:
1. Docs site continues to build with Quoin (dogfood at scale).
2. No new runtime deps beyond existing Vite + Quoin plugin.
3. Browser support: current Chrome, Firefox, Safari.

PRIORITY (cut from bottom if scope-pressed):
1. Showcase page
2. Three-pane playground
3. Pack composition pickers in playground
4. Docs dogfoods harvested pack
5. Pack browser fidelity badges + filtering
6. Shareable URL state
7. Example gallery (8-10 patterns)
8. Theme toggle in docs header
9. Token efficiency metric
10. Syntax highlighting (lowest)
11. Migration guide refresh

PLAYGROUND UPGRADES:
- Three panes: source / compiled HTML / preview.
- All 30 token packs with tier badges.
- Example gallery: article, hero, pricing, dashboard, app-shell, navigation, form, empty-state, alert, blank.
- Shareable URL state: source + active packs encoded in hash.
- Token efficiency badge: "12 tags → 340 classes · 28× compression".

PACK BROWSER UPGRADES:
- Filter chips: Type / Tier (A/B/C) / License.
- Tier badges on every token pack card.
- "Try in playground" deep-link button.

SHOWCASE PAGE (highest priority):
- One semantic source block at top.
- 4-6 rendered variants below, side-by-side or stacked.
- Each variant labeled with pack name, license, fidelity tier.

VALIDATION: build clean, all pages load, playground compiles across packs, shareable URL round-trips, Lighthouse ≥95 on perf/a11y/best-practices/SEO.

STOP CONDITIONS: Lighthouse drops below 90. Playground slower than 1s per pack switch. Bundle size grows by more than 100kb.

Commit per major area. Push to origin/main.
```

After Phase 4.5: new `/showcase/` page, three-pane playground with all 30 token packs + URL state + efficiency badge + 10 example presets, pack browser with tier badges + filters, theme toggle in wayfinder, migration guides refreshed.

---

## Phase 4 — Documentation

```
You are working on the Quoin design language project. Phases 0-3 are complete. Read:
- All documents in quoin-lab/00_spec/
- quoin-lab/01_compiler/README.md
- quoin-lab/PHASE_GATES.md (Phase 4 section)
- quoin-lab/04_docs/README.md

Your task is to build the Quoin documentation site in quoin-lab/04_docs/.

Use Astro (or equivalent static site generator) for the build. Deploy target: a single static site, no server-side dependencies.

Required sections:
- Spec reference, auto-generated from quoin-lab/00_spec/. The docs site MUST regenerate from spec source rather than duplicating content; if the spec changes, docs update on next build.
- Live playground: a browser-side compiler instance where the user types semantic markup, picks a token pack and impl pack from dropdowns, and sees the compiled HTML + CSS + visual render in real time.
- Pack browser: a searchable list of all packs published under @quoin/* on npm. Pulls from the npm registry API at build time.
- Getting started guide: install the compiler, install one pack of each type, write a first page, build.
- Migration guides: from Tailwind v4, from DaisyUI, from shadcn/ui. Side-by-side comparisons.

Stylistic requirement: the docs site itself must be built in Quoin, using one of the harvested or reference token packs. The docs site is the largest public demonstration of the language.

When complete, build the site, run it locally, screenshot key pages, commit all work, push to origin/main (github.com/harrowhaus/quoin), and explicitly request operator review against the Phase 4 exit criteria.
```

---

## Phase 5 — Launch

```
You are working on the Quoin design language project. All prior phases are complete. Read:
- quoin-lab/README.md
- quoin-lab/PHASE_GATES.md (Phase 5 section)
- quoin-lab/05_launch/README.md

Your task is to assemble and stage the public launch in quoin-lab/05_launch/.

Required deliverables:
- All packs prepared for npm publication under @quoin/* scope. Do not publish yet; stage and document the publication command sequence for the operator to execute.
- Landing page at harrow.haus/quoin (or whichever domain the operator registers): single-page, Quoin-built, communicates the thesis in under 30 seconds of reading.
- Launch essay: 1500-2500 word piece explaining what Quoin is, why it exists, the lineage (Alexander, Swiss/Brutalist, DaisyUI, Tailwind v4), the architecture, and how to start.
- Demo video script and storyboard. Three minutes maximum. Shows: same semantic markup rendering across three different token packs.
- HN submission draft (title + post).
- X / social thread draft (8-12 posts).
- A list of suggested outreach targets (Tailwind Labs, Vercel, Anthropic, key design-tooling accounts).

Hard constraints:
- Do not publish anything publicly. All artifacts staged for operator approval and execution.
- Do not reserve domains, npm scopes, or social handles without explicit operator approval.

When complete, commit all launch deliverables, push to origin/main (github.com/harrowhaus/quoin), list every deliverable with its file path, and explicitly request operator final approval before any public action.
```
