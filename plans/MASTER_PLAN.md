# Quoin v1.0 Master Plan

## What Quoin Is

A semantic CSS-replacement design language. Users write intent-bearing semantic Web Components (`<authority-mark>`, `<emphasis-card>`, `<primary-action>`, `<density-grid>`). A build-time compiler resolves them against pluggable token packs + vocabulary packs + implementation packs, emitting standard HTML + CSS. Browser sees no runtime, no proprietary engine.

**Architecture:** Four layers — authoring (Quoin's contribution), token (DTCG 2025.10), compilation (Quoin's), rendering (browsers). Three already exist as standards; Quoin contributes the authoring layer and compilation toolchain.

**Thesis:** AI-first, semantic-first, swap-aesthetic-without-rewrite. Cuts AI token cost ~10× vs Tailwind utility soup. Lets the same semantic source produce multiple aesthetic outputs by swapping the active token pack.

**Competitive frame:** competes with Tailwind, DaisyUI, Astro Themes, shadcn/ui, Mantine. Output bar is "indistinguishable from those in production quality, distinguishable in architectural thesis."

## What Ships at v1.0

### Token namespace (canonical)
- ~160 tokens across 11 DTCG 2025.10 types: color, dimension, number, fontFamily, fontWeight, duration, cubicBezier, shadow, border, typography, transition, strokeStyle. (Gradient deferred to v0.2; strokeStyle composite supported.)
- Composite tokens for shadow, border, typography, transition, strokeStyle.
- Documented in `00_spec/tokens.md`.

### Token packs (30 total)
- 27 source-faithful at color AND composite layer (Tier A or Tier B per pack).
- 3 permanent Tier C: Stripe, Linear, Spotify Encore (no public token spec).
- Plus Mailchimp marked Tier C with documented "pattern library removed 2025" reason.

### Vocabulary packs (22 total)
- Existing 10: editorial, dashboard, shadcn, radix, headless, ark, daisy, dashboard-extended, marketing, docs (plus 5d additions: essentials, app-shell, forms).
- New 12: commerce, settings, dataviz, auth, nav, content, notifications, states, search, calendar, kanban, comments.
- Plus 2 framework-mirror vocab packs: material-vocab, fluent-vocab.

### Theme packs (~10 — trend-forecast tier)
Per the 2026 design trend forecast research:
- `@quoin/theme-vellum` (Calm Ivory Editorial)
- `@quoin/theme-graphite` (Cold Liquid Linear / Geist)
- `@quoin/theme-aurora` (Warm Liquid Linear)
- `@quoin/theme-letterpress` (Tactile Warmth)
- `@quoin/theme-terminal` (Honest Brutalism / Mono)
- `@quoin/theme-broadsheet` (Big Editorial Headline)
- `@quoin/theme-bloom` (Organic Anti-Grid)
- `@quoin/theme-arcade` (Dopamine Saturation)
- `@quoin/theme-prism` (Liquid Glass — opt-in)
- `@quoin/theme-vapor` (Stripe Atmospheric — only if gradient generator is novel)

Plus identity themes (Post-Core Paradigm, others Bug authors) and accessibility-first themes ship as scope allows.

### Template packs (~10 site types at launch)
Per template research (25–30 site types in full catalog; pick top 10 for v1.0 launch):
- Personal blog / longform editorial
- Library docs (multi-version)
- SaaS landing (developer-tooling subgenre)
- Pricing-only page
- Issue tracker (Linear-style)
- Marketing landing (generic)
- Portfolio (designer/developer)
- Dashboard app shell
- Type foundry / font specimen (Forme line)
- Changelog / status page

### Pattern packs (~80–150 patterns derived from templates)
Per pattern primitive census in research. P0 patterns first (hero, footer, header, button, form-field, feature-grid, pricing-tiers, testimonial), then P1, then P2 (Forme primitives).

### Icon packs (17–18 total)
- Identity: Solar Bold Duotone (default for marketing/identity at 24px+) + Mynaui (technical/docs at 16–18px).
- Full coverage: Lucide, Heroicons (outline + solid), Tabler, Phosphor, Radix Icons, Material Symbols, Carbon Icons, Bootstrap Icons, Feather, Iconoir, Akar, Basil.
- Specialty: Carbon Pictograms, Healthicons.

### Forme (specialty template/pattern line)
Type-foundry-site, font-marketing-microsite, typography-focused editorial. 18 primitives specified. 3 template pack candidates: `@quoin/template-forme-foundry`, `@quoin/template-forme-microsite`, `@quoin/template-forme-playground`. See `skills/quoin-forme-author.md`.

### Identity typography (Quoin's own design language)
- **Display + headline:** Junicode 2 (OFL, medieval-scholarly density)
- **Body:** Ranade (OFL via ITF Fontshare, tall x-height neo-grotesque)
- **UI mono + labels:** Monaspace Neon (UI), Argon (warm marketing), Xenon (kbd/serif slabs), Radon (annotations), Krypton (AI suggestions)
- **Caption/retro mono:** Departure Mono (OFL, 80s-pixel terminal)
- **Identity icons:** Solar Bold Duotone (CC-BY-4.0) at marketing/identity scale
- **Technical icons:** Mynaui Icons (ISC) at docs/UI scale

### Sites built in Quoin (showcase Tier 1)
- harrow.haus rebuilt and expanded (~5–6 pages): /, /projects, /radio, /writing, /boeingwatch, /contact
- Strategic placement of Bug's actual work: TSQ, seek-tar, CRYPSOID, CRYPSARA, SIEVE, CRYPSONG, CONDUCTOR, ADIDEM, HARROW.FM, BoeingWatch (github.com/bigbugnowadaze/boeing-watch — independent accountability tracker for Boeing post-whistleblower-deaths).

### Showcase Tier 2 (mock-up sites)
- 10–15 high-effort mock-ups labeled "Template" or "Reference build."

### Marketing surface
- `quoin.harrow.haus` (subdomain at launch; graduate to dedicated domain post-launch)
- Marketing home, docs, playground, packs, showcase, examples, blog/changelog, showcase wall

### Distribution
- npm scope `@quoin/*`
- Thin CLI: `npx @quoin/create <template-name>` — git clone + install
- Rich CLI features (`@quoin/add <pattern>`, theme switching) deferred to v0.2

## Architectural Decisions Recap

These are locked. Do not re-litigate.

1. **DTCG 2025.10 conformance.** Canonical namespace uses DTCG type names exactly. Composite tokens follow DTCG composite syntax verbatim.
2. **Three-layer architecture preserved:** base → semantic (canonical, fixed at v1.0) → component (per-vocab-pack).
3. **Canonical namespace fixed at v1.0.** Further changes follow semver.
4. **OKLCH color authoring** with sRGB fallback. P3 wide-gamut opt-in.
5. **Variable fonts where source supports them.** Static fallback only for system stacks.
6. **`prefers-reduced-motion` always respected** — motion tokens have a reduced-motion fallback.
7. **APCA primary, WCAG 2.2 AA fallback** for contrast.
8. **Universal pack quality bar** — Tailwind UI / DaisyUI / Astro Themes / shadcn Blocks / Mantine level. No boilerplate.
9. **No placeholder copy in templates.** Every template ships with production-quality writing.
10. **EUI dual ELv2/SSPL license** — reference values, don't redistribute extracted tokens.

## Dependency Graph

```
Phase 0.5 (Canonical Namespace Expansion)
   ├── needs: existing spec, existing harvest, existing validator
   └── unblocks: everything else

Phase 3.5c (Composite Token Fidelity, all 30 packs)
   ├── needs: 0.5 complete
   └── unblocks: theme packs, all visual surfaces

Phase 0.5-extension (New Pack Types: theme, template, pattern, icon)
   ├── needs: 0.5 complete
   └── unblocks: theme/template/pattern/icon pack builds

(After all three above):
   ├── Theme Packs (parallel) ─┐
   ├── Pattern Packs ──────────┤ Parallel — independent of each other
   ├── Icon Packs ─────────────┤
   ├── Phase 8 (Docs Refresh) ─┤
   └── Phase 6 (Marketing) ────┘
            ↓
   Template Packs               [SERIAL — depends on Pattern Packs phase
                                 complete + operator-approved. Templates
                                 compose Patterns the same way a SaaS app
                                 composes a component library. If Patterns
                                 don't ship first, Templates either author
                                 primitives inline (violating Quoin's
                                 composition architecture) or fall to
                                 scaffold-quality (violating the universal
                                 pack quality bar in
                                 `skills/quoin-pack-author.md`).]

   **Phase reorder note (2026-05-17):** the initial dependency graph
   marked Templates parallel with Patterns. That was a mistake — the
   composition architecture flows Patterns → Templates the way a UI
   library flows components → app. Templates was halted mid-execution
   and Patterns ordered first. Documented in `plans/PHASE_GATES.md`.

(After content shipped):
   ├── Phase 6.5 (harrow.haus rebuild) ─┐
   ├── Phase 7 (Examples Gallery) ──────┤ All parallel
   └── Phase 9 (Blog/Changelog) ────────┘

Phase 10 (Showcase Wall)
   └── needs: 6.5 + 7 done, mock-up sites assembled

Phase 5e (CLI + npm publish + launch)
   └── needs: everything above complete + operator approval
```

## Quality Gates

Every phase has exit criteria in `plans/PHASE_GATES.md`. Operator review at every gate. Do not advance to next phase without explicit approval.

A phase is NOT complete just because the prompt's "deliverables" list is satisfied. It's complete when the work is at production quality AND operator approves AND no boilerplate slipped through.

## What This Plan Is Not

- **Not a hobby project.** Competes with established design language ecosystems.
- **Not "minimum viable."** Every pack ships at polish parity with peer ecosystems or it doesn't ship.
- **Not vibe-coded.** Every decision is scoped, every prompt is specific, every research input is grounded.
- **Not operator-managed at execution.** Bug holds vetoes and direction; Claude Code executes; Claude (planning instance) writes the prompts and reviews phase outputs.
