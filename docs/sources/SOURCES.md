# Quoin source registry

The curated list of design systems whose patterns can be expressed in Quoin's specification through translation.

**Framing.** This registry is not "design systems we plan to harvest from." It is "design systems whose patterns can be expressed in Quoin's specification through translation, under licenses that permit it." The distinction matters for licensing, for marketing, and for standards-body engagement. Sources on this list are potential adopters of the Quoin specification — the translation work happens because they haven't yet adopted natively. When a source publishes Quoin IR natively, the translation retires.

**Maintained by:** core team. New entries added via PR with operator approval. Pruning entries (moving a source from approved to retired) requires a closing report documenting the rationale.

**Governance:** every translation that lands in `patterns/` references this registry as the canonical license-clearance source. The [translation skill](../../skills/quoin-pattern-translator.md) §8 procedure is the operational interface to this file.

---

## Approved sources — public domain / CC0

Patterns under these licenses can be translated without attribution constraint beyond the standard Quoin pack `metadata.source` record (system name, source URL, license SPDX identifier, source-pattern slug, capture date).

### W3C ARIA Authoring Practices Guide

- **URL:** https://www.w3.org/WAI/ARIA/apg/patterns/
- **License:** [W3C Document License](https://www.w3.org/Consortium/Legal/2015/doc-license) (close enough to public domain for our purposes; treated as CLEAR).
- **License compatibility:** CLEAR. W3C document license permits derivative works with attribution.
- **Source format:** HTML + CSS reference. High fidelity (§3 input class 1).
- **Quality assessment:** Authoritative reference for accessible UI patterns. ARIA APG is the reference standard the broader industry implements against.
- **Estimated yield:** 25-30 patterns translatable. Each one is high-confidence because ARIA APG's anatomy is already specification-shaped.
- **Pattern count estimate:** ~30 reference patterns in APG; ~25 likely translatable. Excludes: patterns that are degenerate cases of Quoin patterns already shipped (e.g., button), patterns requiring non-Web-standard tooling.
- **Harvest priority:** HIGH. **First source for reference translations in Phase 22.7** (`disclosure`, `combobox`, `tabs`).
- **Translated patterns (Phase 22.7):** `disclosure`, `combobox`, `tabs`.
- **Rejected patterns:** (none yet)
- **Notes:** ARIA APG is the most strategically-aligned source because W3C is also Quoin's standards-track target. Translating from ARIA APG is rehearsal for what Quoin IR publication looks like in W3C-compatible form.

### W3C Open UI Community Group proposals

- **URL:** https://open-ui.org/
- **License:** [W3C Document License](https://www.w3.org/Consortium/Legal/2015/doc-license).
- **License compatibility:** CLEAR.
- **Source format:** Design spec (§3 input class 4) + reference implementations (HTML + CSS).
- **Quality assessment:** Forward-looking proposals for native HTML control patterns. Each Open UI proposal is documented anatomy + use cases — exactly the shape Quoin specifications take.
- **Estimated yield:** 5-10 patterns. Subset is what's reached "Proposal" or later phase.
- **Pattern count estimate:** ~15 active proposals; ~8 translatable today.
- **Harvest priority:** MEDIUM (active proposals); HIGH (after Quoin IR publishes — Open UI is the most likely community-group home for Quoin's specification).
- **Translated patterns:** (none yet)
- **Notes:** Open UI is the highest-probability community-group target for Quoin's eventual specification publication (Phase 26). Cross-engagement here builds the relationship.

### US Web Design System (USWDS)

- **URL:** https://designsystem.digital.gov/
- **License:** Public domain (US Government work).
- **License compatibility:** CLEAR.
- **Source format:** HTML + CSS reference (§3 input class 1).
- **Quality assessment:** Production-grade civic-information design system. Strong accessibility lineage. The visual register is bureaucratic-cool by design.
- **Estimated yield:** 20-30 patterns. Some duplicate ARIA APG; the unique value is civic-content-shaped patterns (alert banners, identifier strips, search summary, etc.).
- **Pattern count estimate:** ~40 components in USWDS catalog; ~25 with anatomy that doesn't duplicate already-shipped Quoin patterns.
- **Harvest priority:** MEDIUM-HIGH.
- **Translated patterns:** (none yet)
- **Notes:** USWDS as a government-source-of-truth is interesting for civic-information consumers who must demonstrate accessibility. Translating their patterns into Quoin's specification gives those consumers a path to multi-aesthetic, multi-backend reuse.

### UK Design System (GOV.UK)

- **URL:** https://design-system.service.gov.uk/
- **License:** Open Government Licence v3.0 (close enough to CC-BY for our purposes; treated as CLEAR with attribution).
- **License compatibility:** CLEAR-WITH-ATTRIBUTION.
- **Source format:** HTML + CSS reference + design spec.
- **Quality assessment:** Similar civic-information register to USWDS. Strong typography and form-pattern lineage.
- **Estimated yield:** 15-25 patterns.
- **Pattern count estimate:** ~30 components; ~20 translatable beyond what USWDS already provides.
- **Harvest priority:** MEDIUM-HIGH.
- **Translated patterns:** (none yet)

### Australian Government Design System

- **URL:** https://design-system.id.gov.au/
- **License:** MIT (with the AGDS pieces); CC-BY 4.0 (for the documentation).
- **License compatibility:** CLEAR.
- **Source format:** HTML + CSS reference + design spec.
- **Quality assessment:** Smaller catalog than USWDS/GOV.UK but well-maintained.
- **Estimated yield:** 10-15 patterns.
- **Harvest priority:** MEDIUM.
- **Translated patterns:** (none yet)

---

## Approved sources — permissive (MIT / Apache 2.0)

Patterns under these licenses can be translated with the source attribution recorded in the pack's `metadata.source` block. No reverse-licensing constraints on Quoin's expression of the anatomy.

### Material Web Components

- **URL:** https://github.com/material-components/material-web
- **License:** Apache-2.0.
- **License compatibility:** CLEAR.
- **Source format:** Web component source (§3 input class 2).
- **Quality assessment:** Google's reference implementation of Material Design. The anatomy is documented; the framework binding (LitElement) is dropped in translation.
- **Estimated yield:** 30-40 patterns.
- **Pattern count estimate:** ~50 components in Material Web; ~35 with anatomy that doesn't duplicate already-shipped Quoin patterns.
- **Harvest priority:** HIGH.
- **Translated patterns:** (none yet)
- **Notes:** Translating Material Web is also the rehearsal for what Material's eventual native publication of Quoin IR could look like. The translation is what argues for the source maintainer to publish natively.

### Carbon Web Components

- **URL:** https://github.com/carbon-design-system/carbon-web-components
- **License:** Apache-2.0.
- **License compatibility:** CLEAR.
- **Source format:** Web component source.
- **Quality assessment:** IBM's reference implementation. Strong data-application-shaped patterns; accessibility well-documented.
- **Estimated yield:** 25-35 patterns.
- **Harvest priority:** HIGH.
- **Translated patterns:** (none yet)

### Polaris Web Components

- **URL:** https://github.com/Shopify/polaris-web-components (note: Shopify's Polaris is primarily distributed as React; the web-components subpackage is the harvestable source).
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** Web component source + design spec.
- **Quality assessment:** Strong commerce-shaped patterns. Polaris is mature; its anatomy is well-articulated in the design spec docs.
- **Estimated yield:** 20-30 patterns.
- **Harvest priority:** HIGH.
- **Translated patterns:** (none yet)

### shadcn/ui

- **URL:** https://github.com/shadcn-ui/ui
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** JSX/TSX component source (§3 input class 3) + Radix primitives underneath.
- **Quality assessment:** Currently the most-AI-generated UI in the ecosystem. Translating shadcn into Quoin is strategic positioning: Quoin's pattern catalog becomes the multi-backend specification underneath what shadcn currently distributes as React-only.
- **Estimated yield:** 30-40 patterns.
- **Pattern count estimate:** ~50 components in shadcn catalog; ~35 translatable.
- **Harvest priority:** HIGH.
- **Translated patterns:** (none yet)
- **Notes:** shadcn's composition model (copy-and-own) is structurally compatible with Quoin's pack-distribution model. Translation here is also implicit standards work — making the AI-default ecosystem aware that there's a specification underneath the patterns it generates.

### Radix UI Primitives

- **URL:** https://github.com/radix-ui/primitives
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** JSX/TSX component source.
- **Quality assessment:** Cleanest behavioral primitives in the React ecosystem. Radix's separation of behavior from styling maps almost directly to Quoin's anatomy-from-aesthetic separation.
- **Estimated yield:** 25-35 patterns.
- **Harvest priority:** **VERY HIGH** — the cleanest source for behavioral-pattern translation.
- **Translated patterns:** (none yet)
- **Notes:** Radix's design philosophy is the closest sibling Quoin has in the ecosystem. The translation is the most natural and the strategic alignment is the strongest.

### Pico CSS

- **URL:** https://github.com/picocss/pico
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** HTML + CSS reference.
- **Quality assessment:** Minimal classless CSS framework. Useful for simple-pattern translations and as a sanity check on Quoin's defaults.
- **Estimated yield:** 5-10 patterns.
- **Harvest priority:** MEDIUM.
- **Translated patterns:** (none yet)

### Every Layout

- **URL:** https://every-layout.dev/
- **License:** MIT (for the code samples; the book itself is paid).
- **License compatibility:** CLEAR (code samples only).
- **Source format:** HTML + CSS reference.
- **Quality assessment:** The progenitor of the layout-primitives-as-published-pattern thinking. Quoin's Phase 22.6 layout primitives (`prim-stack`, `prim-cluster`, etc.) consciously build on Every Layout's vocabulary.
- **Estimated yield:** Already harvested architecturally in Phase 22.6 (no additional translations needed unless new Every Layout primitives publish).
- **Harvest priority:** **VERY HIGH** (architecturally) — direct lineage relationship.
- **Translated patterns:** Architecturally absorbed in `prim-stack`, `prim-cluster`, `prim-center`, `prim-grid`, `prim-sidebar`, `prim-switcher` (Phase 22.6). Source attribution lives in those packs.
- **Notes:** Every Layout is the source of the vocabulary; the translation was the architectural absorption, not pattern-by-pattern translation.

### daisyUI

- **URL:** https://github.com/saadeghi/daisyui
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** HTML + CSS reference (Tailwind-flavored).
- **Quality assessment:** Component-style framework on top of Tailwind. Translation requires stripping the Tailwind utility classes; the underlying anatomy is fine.
- **Estimated yield:** 15-20 patterns.
- **Harvest priority:** MEDIUM.
- **Translated patterns:** (none yet)

### Flowbite

- **URL:** https://flowbite.com/
- **License:** MIT.
- **License compatibility:** CLEAR.
- **Source format:** HTML + CSS reference (Tailwind-flavored).
- **Quality assessment:** Similar to daisyUI; broader catalog but more design-opinionated.
- **Estimated yield:** 15-25 patterns.
- **Harvest priority:** MEDIUM.
- **Translated patterns:** (none yet)

---

## Incompatible sources — do not translate from

Patterns from these sources cannot be translated into Quoin packs under acceptable licensing.

### Tailwind UI

- **URL:** https://tailwindui.com/
- **License:** Commercial. Patterns explicitly cannot be redistributed.
- **License compatibility:** **INCOMPATIBLE.**
- **Notes:** Tailwind UI is paid commercial. The patterns cannot be translated into Quoin packs even if the technical translation would be easy. Operators who use Tailwind UI commercially may consume Quoin patterns alongside — but Quoin's catalog does not republish Tailwind UI's anatomy.

### Material Design (the language)

- **URL:** https://m3.material.io/
- **License:** Google brand-restricted. The Material Web Components implementation is Apache-2.0 (and is on the approved list). The Material Design language itself — the brand, the typography choices, the specific component visualizations — is Google-controlled and not redistributable.
- **License compatibility:** **INCOMPATIBLE for the language; CLEAR for the Material Web Components implementation.**
- **Notes:** Translate from Material Web Components (the implementation), never claim "this is Material Design." Quoin packs translated from Material Web Components are Quoin's expression of the anatomy, not Quoin's redistribution of Material Design.

### Semantic UI

- **URL:** https://semantic-ui.com/
- **License:** MIT.
- **License compatibility:** Technically CLEAR; practically **DO NOT USE.**
- **Notes:** Semantic UI is abandoned, jQuery-dependent, and the JS framework couples behavior into anatomy in ways that don't translate cleanly. The successor project Fomantic UI inherits the same problems. Skip both unless a specific operator-justified pattern needs the translation.

---

## Future state — sources that may publish Quoin IR natively

This section anticipates the strategic horizon. As the Quoin specification gains standing (Phase 23.5 publication, Phase 26 standards engagement), some sources will publish their anatomy in Quoin IR format alongside their existing distributions. Track which sources have done this; when a source publishes Quoin IR natively, retire the translation in favor of the native publication.

Format for each future entry:

```
- **Source name** — published Quoin IR for: [pattern list]; date: [YYYY-MM-DD]; retired Quoin translations: [pattern list].
```

Current state: no source has published Quoin IR yet. The list is empty in 2026; the section exists so that when entries appear, the structural shape is already established. This is the same strategy the Quoin spec uses for backend emitters and aesthetic packs — the slots exist before the first occupants arrive.

### Tracked candidates (no native publication yet)

- W3C ARIA APG — strong candidate. Quoin's first translation target; Phase 26 engagement would propose ARIA APG publishes Quoin IR as a derivative specification.
- W3C Open UI CG — strong candidate. Open UI's proposal format is structurally similar to Quoin's anatomy contracts.
- Radix UI — strong candidate. Architectural alignment makes native Quoin IR publication a natural fit.
- shadcn/ui — moderate candidate. shadcn's copy-and-own model and Quoin's pack-distribution model are compatible.
- Material Web Components — moderate candidate. Google's standards engagement track exists; needs a relationship moment.
- Carbon Web Components — moderate candidate. IBM's standards engagement track exists.

---

## Yield-rate retrospective table

(Populated as harvest sessions complete. Each row records actual outcome to inform future curation priority.)

| Source | Patterns attempted | Patterns accepted | Patterns rejected | Yield % | Notes |
|--------|---------------------|-------------------|---------------------|---------|-------|
| ARIA APG | 3 | 3 | 0 | 100% | Phase 22.7 reference translations (disclosure, combobox, tabs); ARIA APG is the gold-standard source |

---

## License

This source registry document: MIT. Each source's patterns retain their own license; this document records that licensing for harvest-decision purposes.
