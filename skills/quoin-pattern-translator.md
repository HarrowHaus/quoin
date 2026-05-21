# Quoin Pattern Translator — Skill

**Purpose of this skill — and its eventual obsolescence.**

The pattern translation skill is **transitional infrastructure**. It exists to bridge the period before major design systems publish their anatomy in Quoin IR format natively. As the specification gains adoption and external systems implement publishable Quoin IR output, the translation skill becomes obsolete — by design. The skill should be invoked confidently for current harvest work; its eventual obsolescence is success, not failure.

Quoin is harvesting in 2026 because no design system publishes Quoin IR yet. The harvest is short-term tactical work in service of the strategic move (specification standardization). Every translation done now is preparation for a future where the source itself publishes the canonical anatomy; the translation skill retires the moment that future arrives for a given source.

This skill is governed by the architecture committed in [THESIS.md](../THESIS.md), the registry curated in [docs/sources/SOURCES.md](../docs/sources/SOURCES.md), the per-format extraction procedures in [docs/translation/anatomy-extraction-rules.md](../docs/translation/anatomy-extraction-rules.md), and the acceptance criteria in [docs/translation/quality-gates.md](../docs/translation/quality-gates.md).

---

## §1 — When to invoke this skill

- **Harvest sessions** targeting an external design system to add specification-conformant translations of its patterns into Quoin's catalog. This is the current primary use through Phase 25.
- **Initial draft authoring** when an external pattern (a Radix primitive, an ARIA APG reference, a Material Web Component) inspires a Quoin equivalent. The skill formalizes "what would this look like as a Quoin pattern" rather than asking the operator to invent the anatomy from scratch.
- **Documentation work** showing Quoin's relationship to an external system — comparison tables, migration guides, "how to move from X to Quoin" cookbooks. The skill provides the anatomy-extraction lens those documents need.

## §2 — When NOT to invoke this skill

- **Native Quoin pattern authoring.** When the pattern is being designed inside Quoin without an external source, invoke [`quoin-pattern-extension-author.md`](quoin-pattern-extension-author.md) instead. Translation is a degenerate case of authoring — but the authoring skill includes the green-field thinking the translator skill assumes is already done.
- **Aesthetic-pack authoring.** Aesthetic packs are token-value bundles, not anatomy. They go through [`quoin-pack-author.md`](quoin-pack-author.md) (aesthetic-pack subtype).
- **Patterns where the source's anatomy is irreducibly framework-specific.** If the source pattern's contract is "this is a React hook" or "this is a Vue composition function," there is no anatomy to extract — only behavior bound to a framework. Either decline the translation or translate only the rendering surface, never the framework binding.
- **Patterns the operator already rejected.** If a previous harvest session declined to translate a pattern (documented in the source-registry pruning notes), do not re-attempt without operator approval.

## §3 — Inputs the skill accepts

The translator accepts five input formats. The order below is from most-fidelity to least; the further down the list, the lower the operator's confidence in the resulting Quoin pattern should be.

1. **HTML + CSS reference** — a self-contained HTML file that demonstrates the source pattern with its complete styling. Highest fidelity; the anatomy is directly readable. ARIA APG reference patterns are the canonical example.
2. **Web component source** — a Custom Element definition (template + observed attributes + lifecycle). High fidelity for anatomy; the slot and attribute declarations map almost directly to Quoin's primitive and variant axes.
3. **JSX / TSX component source** — a React/Vue/Solid component implementation. Medium fidelity; the JSX tree carries anatomy but composition is often inlined and must be teased apart.
4. **Design spec** — a published anatomy specification (Material Design guidelines, Polaris documentation pages, Carbon design specs). Medium fidelity for anatomy, low for behavior. Cross-reference against the system's component implementation when possible.
5. **Wireframe image** — a screenshot or rendered image of the source pattern. Low fidelity; the translator must infer slot structure from visual layout. Always flag with `confidence: visual-only` in the README; mark each derived attribute with `(inferred)`.

For multi-input cases (e.g., HTML + design spec), combine them and document the input set in the README's translation notes.

## §4 — Outputs the skill produces

For each translated pattern, the skill produces:

1. **A complete Quoin pack** at `patterns/<pattern-name>/` containing:
   - `quoin.pack.json` — manifest with name, version, type, peerPacks, optionalPeerPacks, metadata.tags, and a `metadata.source` block recording the source attribution (system name, source URL, source license, source-pattern slug).
   - `primitives/index.json` — slot definitions per v3.G.18 anatomy contract.
   - `examples/index.html` — at minimum one specimen demonstrating the pattern's most representative variant.
   - `README.md` — anatomy tables per v3.G.18 + a Source attribution paragraph at the top + a Translation notes section if anatomy required judgment.
   - `LICENSE` — Quoin pack's own MIT LICENSE (the source's license governs the upstream; Quoin's pack license governs Quoin's expression of the anatomy).
   - `package.json` — npm-publishable boilerplate.
2. **Reverse-lineage updates** in every peer pack consumed by the new pattern, per D.82. If the new pattern composes `prim-label`, then `patterns/prim-label/README.md`'s "Consumed by" list grows by one entry referencing the new pattern.
3. **Source-registry update** in `docs/sources/SOURCES.md` — increment the source's "translated patterns" count and add the new pattern's name to the source's entry.

## §5 — Per-format anatomy extraction procedures

The full per-format procedures live in [docs/translation/anatomy-extraction-rules.md](../docs/translation/anatomy-extraction-rules.md). The summary by input format:

- HTML + CSS → walk the DOM tree, identify the mandatory structural elements, identify variant-bearing attributes (`data-*`, `aria-*`), translate to Quoin slot + variant declarations.
- Web component → read the `static get observedAttributes()` for variants; read the shadow template for slots; map attributes to `data-*` per v3.G.15.
- JSX/TSX → identify prop types for variant axes; identify children/slot props for slots; ignore framework binding.
- Design spec → read the anatomy section of the spec (typically named "Anatomy" or "Structure"); cross-reference against implementations.
- Wireframe image → infer with explicit `(inferred)` markers and `confidence: visual-only` flag.

After extraction, every format flows through the same normalization step (D.7 in the extraction-rules doc).

## §6 — Naming convention application

Apply v3.G.15 and v3.G.16 unconditionally to translated patterns:

- `data-pattern` always short form: `<pattern-name>-<slot>`. Never `pattern-<name>-<slot>`. Never `<pattern>--<slot>` (double-dash). The source's naming convention does not propagate into Quoin's namespace.
- `data-alignment` always means universal content alignment (`centered | left | right | split-anchor`). The source's `data-align`, `data-position`, `data-text-align`, etc. all collapse to `data-alignment` if they're expressing the same concern.
- Variant-specific axes use their own typed attribute names (`data-layout`, `data-palette`, `data-motion-mode`, etc.).
- The deprecated `data-register` attribute is rejected by the gate (v3.G.16). If the source uses `register` semantics, rename to `data-alignment` or a variant-specific axis as appropriate.
- **Pattern names derive from anatomy, not source naming.** If the source calls it `MdcDropdownMenu` and the anatomy is a disclosure with a popover, the Quoin pattern name is `pattern-disclosure` (or `pattern-popover` depending on dominant anatomy), not `pattern-dropdown-menu`. Source-name borrowings risk locking Quoin into the source's organizing assumptions.
- **Naming conflicts with existing Quoin patterns surface for reconciliation.** If translating a source pattern produces a name collision with an existing Quoin pattern, halt and surface — either merge anatomies, rename one, or reject the translation.

## §7 — Composition rule extraction

- Identify all peer packs the source pattern consumes. A combobox composes a listbox; a tabbed-pane composes a panel-list; a docs-page composes a nav and a TOC.
- Translate source-specific composition into Quoin peer-pack composition. The combobox's listbox slot in Quoin composes `@quoin/prim-searchable-list` (or whatever Quoin primitive corresponds). The composition is **declared in the manifest** (`peerPacks` or `optionalPeerPacks` per v3.G.21) and **realized in markup** (real `<element data-pattern="prim-searchable-list">` references, not inlined contracts).
- Update peer-pack reverse-lineage tables per D.82. For every entry the new pattern adds under `peerPacks`, edit the peer pack's README's "Consumed by" list to include the new pattern.
- No inlined contracts per v3.G.17. If the source pattern has its own internal button styling, the Quoin translation consumes `pattern-button-system`. If it has its own internal popover, the Quoin translation references the appropriate Quoin popover primitive. The source's framework-internal duplication does not become Quoin's pack-level duplication.

## §8 — License clearance procedure

Before translation begins, verify the source's license against [docs/sources/SOURCES.md](../docs/sources/SOURCES.md):

1. Confirm the source is on the registry's approved list (public domain / CC0 / permissive).
2. Confirm the source-pattern's specific files are governed by the listed license. Some monorepos mix licenses; check the file's local LICENSE header.
3. Record the source attribution data the registry requires (source URL, license SPDX identifier, source-pattern slug, capture date).
4. If the source is not on the approved list, halt. Do not translate from incompatible-licensed sources even if the technical translation would be easy.

The Quoin pack's own license is MIT regardless of the source license, because Quoin's pack expresses the *specification-conformant anatomy* derived from the source — which is Quoin's own work — rather than redistributing the source verbatim. The source attribution is what records the lineage.

## §9 — Quality gates (acceptance criteria)

Every translated pattern passes the gates in [docs/translation/quality-gates.md](../docs/translation/quality-gates.md) before merge. The summary:

- Anatomy minimum: at least one mandatory slot. Maximum: no anatomy should require more than ~12 slots before it should be split into multiple patterns or composed via primitives.
- Conditional slots must be gated by a variant axis or a state.
- All variant axes must be typed (token-bound) per v3.G.20.
- Composition must be real per v3.G.17.
- ARIA conformance: pattern must pass ARIA APG-equivalent contract checks where applicable.
- Keyboard navigation must work without JS for static patterns; companion JS is permitted but optional.
- Performance budgets per v3.G.14 (5% LCP impact maximum for decorative layers, etc.).
- License compatibility per §8.
- Naming consistency per §6.
- README completeness per v3.G.18 (four anatomy tables + composition lineage).
- Examples completeness: at least one specimen per primary variant.

A translation that fails any gate is either fixed before merge or rejected (documented in `docs/sources/SOURCES.md` as a per-source rejected-patterns note).

## §10 — Batch workflow

When translating multiple patterns from the same source in one session:

1. Process patterns one at a time, even when batching. Each pattern gets its own author-review-commit cycle.
2. Self-audit between patterns. Before starting pattern N+1, scan pattern N's output against the quality gates one more time.
3. Flag rejected patterns separately from accepted ones. The source-registry tracks both the yield (accepted) and the rejection rate (declined translations) per source.
4. Track yield rate per source for future curation-priority adjustment. A source that yields 9/10 high-quality patterns deserves higher priority than one that yields 3/10.

## §11 — README authoring template for translated patterns

Every translated pattern's `README.md` follows the v3.G.18 anatomy-table structure plus translation-specific additions. The minimum structure:

```markdown
# @quoin/pattern-<name>

[One-sentence description of what the pattern is.]

> **Source attribution.** This pattern's anatomy is sourced from [Source System Name] ([source URL], [license SPDX]). The translation expresses [source]'s anatomy in Quoin's specification format. As [source] adopts or aligns with the Quoin specification — a path Quoin actively pursues — this translation will be retired in favor of the source's native specification publication. The pattern itself — its anatomy, ARIA roles, keyboard behavior — derives from [source]'s authoritative reference.

**Shipped:** Phase 22.7 · [date].

## Anatomy

### Mandatory slots

| Slot | Element | Role | Tokens |
|------|---------|------|--------|
| ... | ... | ... | ... |

### Conditional slots

| Slot | Gated by | Role | Tokens |
|------|----------|------|--------|
| ... | ... | ... | ... |

### Variants

| Variant axis | Values | Conditional slots activated | Local CSS tokens | Notes |
|--------------|--------|------------------------------|-------------------|-------|
| ... | ... | ... | ... | ... |

### Composition lineage

| Consumed primitive | Source pack | Used in | How |
|--------------------|-------------|---------|-----|
| ... | ... | ... | ... |

## Translation notes

[Document any places where the source's anatomy required Quoin-specific judgment. Examples: source had three layout variants we collapsed to one; source's "ghost" intent is mapped to Quoin's data-intent="ghost"; source's framework-binding parts (lifecycle hooks, React props) were dropped as out-of-scope for anatomy.]

## What this pattern is NOT

[Brief clarification of scope. Patterns translated from sources sometimes inherit ambiguous boundaries; the README should clarify what the Quoin pattern explicitly does NOT include from the source.]

## License

MIT. Source attribution above governs the upstream's contribution to this pattern's anatomy.
```

## §12 — Specification framing for translated patterns

The translation skill's framing — that translation is transitional — must show up in every translated pattern's README and in the catalog-level discoverability surfaces:

- **Each translated pattern's README explicitly references the Quoin specification as the canonical contract.** The source attribution paragraph at the top of the README (template in §11) makes this concrete: "expresses [source]'s anatomy in Quoin's specification format."
- **The source is documented as "the design system that contributed this pattern's anatomy"** — not as the canonical anatomy itself. This framing matters because it prepares the catalog for retirement.
- **The translation is documented as "the specification-conformant expression of that anatomy"** — Quoin's pack is one expression of the anatomy, not the anatomy itself. When the source publishes Quoin IR natively, the source becomes the canonical expression; Quoin's translation retires.
- **The "this translation will be retired" language is not aspirational** — it is the operational plan. Standards-track engagement (Phase 26) is the mechanism. When a source maintainer publishes Quoin IR natively for a pattern, the Quoin pack for that pattern is replaced by a thin re-export of the source's publication.

This framing prepares the catalog for the eventual transition. It also positions Quoin's relationship to standards bodies and source maintainers as complementary rather than competitive — which is the strategic move that makes specification-track engagement (Phase 26) viable.

---

## Skill invocation example

```
Operator: "Translate three patterns from ARIA APG: disclosure, combobox, tabs."

Translator:
  1. License check (ARIA APG → public domain → CLEAR per docs/sources/SOURCES.md)
  2. For each pattern:
     a. Open the ARIA APG reference HTML at https://www.w3.org/WAI/ARIA/apg/patterns/<name>/
     b. Extract anatomy per docs/translation/anatomy-extraction-rules.md §D.1
     c. Apply naming convention per §6
     d. Extract composition per §7
     e. Author the pack per §11 README template
     f. Self-audit against quality gates per §9
     g. Update peer-pack reverse-lineage per §7
  3. Update docs/sources/SOURCES.md ARIA APG entry: translated-patterns count +3
  4. Commit each pattern as its own commit; commit message includes source URL + license
```

---

## License

MIT. The skill itself; translated patterns carry their own pack licenses per §8.
