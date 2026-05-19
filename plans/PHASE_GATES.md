# Quoin v1.0 Phase Gates

Exit criteria for every phase. No phase advances without operator approval.

## Universal Gate (every phase)

Before any phase advances:

- [ ] All deliverables in the phase prompt's "Deliverables" section produced.
- [ ] All validation steps in the phase prompt pass.
- [ ] No new test failures in `01_compiler/`.
- [ ] All documentation updates listed in the phase prompt applied (README, PHASE_GATES, PHASE_PROMPTS, HANDOFF, CHANGELOG as relevant).
- [ ] Git commits pushed to origin/main, with sensible per-area commit grain.
- [ ] Operator report produced summarizing what shipped + open questions + commit SHAs.
- [ ] Operator explicit approval received before advancing.

## Phase 0.5 — Canonical Namespace Expansion

- [ ] `00_spec/tokens.md` rewritten to ~160 tokens across 11 DTCG types.
- [ ] All 30 token packs validate (with "pending-3.5c-fill" status for new tokens).
- [ ] `tokens-baseline` fully populated (every canonical token has a $value).
- [ ] Vocabulary pack primitive definitions updated to reference new composite tokens.
- [ ] Validator updated to enforce expanded namespace.
- [ ] Compiler tests still pass (77+/77+).

## Phase 3.5c — Composite Token Fidelity

- [ ] 27 of 30 packs source-faithful at composite layer (Tier A or B).
- [ ] 3 permanent Tier C packs documented with reason.
- [ ] Side-by-side render check: same composition across packs visibly differs in radius, spacing, shadow, type personality.
- [ ] All packs validate.
- [ ] Showcase page render across 4–6 packs reads as distinctly different aesthetics.

## Phase 0.5-extension — New Pack Types

- [ ] Spec amendments for theme, template, pattern, icon pack types in `00_spec/`.
- [ ] Manifest schemas for each new type.
- [ ] Validator support for each new type.
- [ ] Compiler hooks for templates (scaffold-and-install vs build-time compile distinction).
- [ ] At least 1 reference pack per new type ships in `02_reference-packs/`.

## Phase Aesthetic Packs (was "Theme Packs", renamed per D.52)

**D.52 rename (operator-locked 2026-05-18):** the canonical pack type is `"aesthetic"`. `"theme"` remains a valid manifest type for backward compatibility but emits a one-line deprecation warning at load time. All audit language below uses the canonical name.

- [ ] 10 aesthetic packs shipped: vellum, graphite, aurora, letterpress, terminal, broadsheet, bloom, arcade, prism (opt-in), vapor (only if gradient generator is novel).
- [ ] Every shipped manifest declares `"type": "aesthetic"` (the canonical name; not the deprecated `"theme"` alias).
- [ ] Each pack cites the trend lineage from research doc.
- [ ] Each pack cites the reference site whose aesthetic it approximates.
- [ ] Each pack has light + dark mode.
- [ ] All aesthetic packs meet cross-trend baseline (OKLCH, variable fonts, dark default, reduced-motion respect, tabular numerics, APCA contrast).
- [ ] Side-by-side rendering of showcase composition across all 10 packs reads as 10 visibly distinct aesthetics.

## Phase Template Packs

**Prerequisite:** Pattern Packs phase complete and operator-approved. Templates compose Patterns the same way a SaaS app composes a component library. Phase reorder note 2026-05-17: this phase was halted mid-execution when the dependency error in the original graph (Templates marked parallel with Patterns) surfaced. Patterns ordered first; Templates resumes after Patterns ships at full quality bar.

- [ ] **Pattern Packs phase complete and operator-approved before starting.**
- [ ] 10 template packs shipped covering: longform editorial, library docs, SaaS landing (developer-tooling), pricing-only, issue tracker, marketing landing, designer portfolio, developer portfolio, dashboard app, type foundry (Forme).
- [ ] Every template has production-quality copy (no Lorem ipsum, no placeholder names).
- [ ] Every template handles longest realistic content AND shortest realistic content equally well.
- [ ] All states designed: empty, sparse, dense, error, loading, success.
- [ ] Templates are deep-linkable: filters, tabs, pagination, expanded panels all in URL.
- [ ] Templates respect 44×44 minimum hit targets.
- [ ] Lighthouse score ≥ 90 on performance, accessibility, best practices, SEO.

## Phase Pattern Packs

**Must complete before Template Packs phase begins.** Templates depend on Pattern Packs being shipped — without them, Templates either author primitives inline (violating Quoin's composition architecture per `skills/quoin-pack-author.md`) or fall to scaffold-quality (violating the universal pack quality bar).

- [ ] P0 patterns shipped: hero (5+ variants), footer-mega, header/top-nav (4+ variants), button system, form field (full set), feature grid, pricing tiers, testimonial.
- [ ] P1 patterns shipped: logo strip, code block, command palette, sidebar nav, FAQ accordion, article body, CTA banner, auth form, dashboard shell, data table.
- [ ] P2 patterns shipped: Forme primitives F.01–F.18 per `skills/quoin-forme-author.md` (specimen block, glyph grid, OpenType toggles, axis rail, comparison pane, sample-text input, license matrix, specimen-CTA, credit panel, in-use gallery, character-cycling hover, mono nav, kbd HUD, foundry essay, foundry about).
- [ ] Each pattern composes from canonical tokens + vocabulary primitives (no hardcoded values).
- [ ] Each pattern has all 6 states designed (empty, sparse, dense, error, loading, success).
- [ ] Each pattern has all 8 microstates designed (default, hover, active, focus, focus-visible, disabled, loading, read-only/selected where applicable).
- [ ] Each pattern ships with a renderable example page demonstrating states + microstates.
- [ ] Each pattern documented with semantic source + compiled output + usage notes.
- [ ] Operator reviews after each priority tier (P0, P1, P2) before advancing to the next.
- [ ] Final report includes per-tier pattern count + Forme F.01–F.18 individual status + vocab pack extensions made + visual regression screenshot grid.

## Phase Icon Packs

- [ ] Identity packs shipped first: Solar Bold Duotone (marketing/identity), Mynaui (technical/UI).
- [ ] Full coverage packs: Lucide, Heroicons (outline + solid), Tabler, Phosphor, Radix, Material Symbols, Carbon Icons, Bootstrap Icons, Feather, Iconoir, Akar, Basil.
- [ ] Specialty: Carbon Pictograms, Healthicons.
- [ ] All packs license-verified.
- [ ] All packs expose icons as `<icon name="X" size="md">` referencing canonical icon-size scale.
- [ ] Each pack ships with a browsable specimen showing every icon at md size.

## Phase 6 — Marketing Site

- [ ] quoin.harrow.haus marketing site built (separate route structure from docs).
- [ ] Hero passes 30-second comprehension test (someone unfamiliar lands, scrolls once, can explain Quoin to a peer).
- [ ] Live showcase strip showing same source across 4–6 themes.
- [ ] Install command with copy button.
- [ ] Footer + nav using identity typography stack (Junicode + Ranade + Monaspace).
- [ ] Built in Quoin (dogfood at scale).
- [ ] Lighthouse ≥ 90 on all metrics.

## Phase 6.5 — harrow.haus Rebuild

- [ ] All 5–6 pages built and live: /, /projects, /radio, /writing, /boeingwatch, /contact.
- [ ] /projects renders as creative devlog (not card grid), visually mapping intellectual connections between projects.
- [ ] No fake brands or "coming soon" pages.
- [ ] /radio in Harrow Haus voice; signup field present but not active.
- [ ] /boeingwatch correctly frames the project (independent accountability tracker; post-whistleblower-deaths).
- [ ] Built entirely in Quoin (proves language can replicate real production design).
- [ ] Any Quoin gaps discovered during rebuild logged and fixed before launch.

## Phase 7 — Examples Gallery

- [ ] Browsable catalog of templates + patterns with live previews.
- [ ] Filter by category, by theme, by complexity.
- [ ] Each entry has: thumbnail, name, description, "Try in playground" button, install command, source-on-GitHub link.
- [ ] At least 10 templates + 80 patterns visible at launch.
- [ ] Built in Quoin.

## Phase 8 — Docs Refresh

- [ ] Information architecture: Getting Started, Concepts, API, Recipes sections clearly separated.
- [ ] Working search (`cmd-k.js` stub replaced with real implementation).
- [ ] Migration guides actually written (not structural placeholders).
- [ ] Concept pages have inline working examples (not just code snippets).
- [ ] All canonical tokens documented with examples.
- [ ] All vocabulary primitives documented.
- [ ] Lighthouse ≥ 90.

## Phase 9 — Blog + Changelog

- [ ] At least 3 launch posts: launch announcement, "why Quoin" thesis, "how the harvest works" technical.
- [ ] CHANGELOG.md surfaced as web pages with permalinks.
- [ ] RSS feed.
- [ ] Tagged categories (releases, decisions, tutorials, case studies).

## Phase 10 — Showcase Wall

- [ ] Tier 1: harrow.haus rebuilt entries visible.
- [ ] Tier 2: 10–15 mock-up sites visible, clearly labeled as "Template" or "Reference build."
- [ ] Tier 3: empty "Community" section ready to accept submissions.
- [ ] Each entry: live link, screenshot, brief description, credits, theme/pack info.

## Phase 5e — CLI + Launch

- [ ] `npx @quoin/create <template-name>` works end-to-end.
- [ ] All 30+ token packs publish to npm under `@quoin/tokens-*`.
- [ ] All 22+ vocabulary packs publish.
- [ ] All theme packs publish.
- [ ] All template packs publish.
- [ ] All pattern packs publish.
- [ ] All icon packs publish.
- [ ] Compiler publishes as `@quoin/compiler`.
- [ ] Vite plugin publishes as `@quoin/vite-plugin`.
- [ ] Documentation surfaces all packages.
- [ ] Operator sends launch announcement (Twitter/X, Hacker News, dev.to, relevant Substack publications).
- [ ] Operator monitors first 48 hours for adoption signal + bug reports.

---

**Operator authority:** every gate requires explicit operator approval. Do not advance unilaterally.
