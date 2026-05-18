# Quoin v1.0 Locked Decisions

These decisions were made during the planning phase by operator Bug. They are locked. Do not re-litigate. Surface only if a downstream constraint forces revisiting.

## Identity & Branding

| Decision | Value | Reasoning |
|---|---|---|
| Project name | Quoin | Letterpress quoin = wedge that locks type into chase. Also architectural cornerstone. |
| GitHub repo | github.com/HarrowHaus/quoin | Locked. |
| npm scope | @quoin/* | Locked. |
| Launch domain | quoin.harrow.haus | Subdomain at launch; graduate to dedicated domain (quoin.dev or similar) post-launch with 301 redirect. |
| Operator | Bug / Donald Pilger / Harrow Haus | Holds name vetoes, taste vetoes, phase advancement decisions. |

## Identity Typography

| Role | Face | License | Source |
|---|---|---|---|
| Display + headline | Junicode 2 (variable) | OFL 1.1 | github.com/psb1558/Junicode-font |
| Body | Ranade (variable) | OFL via ITF Fontshare | fontshare.com/fonts/ranade |
| UI mono / labels (primary) | Monaspace Neon | OFL 1.1 | github.com/githubnext/monaspace |
| UI mono / inline code (warmer) | Monaspace Argon | OFL 1.1 | same |
| UI mono / kbd-style | Monaspace Xenon | OFL 1.1 | same |
| Annotation / handwritten | Monaspace Radon | OFL 1.1 | same |
| AI suggestion / mechanical | Monaspace Krypton | OFL 1.1 | same |
| Caption / retro / terminal | Departure Mono | OFL 1.1 | departuremono.com |

**Pairing rationale:** Junicode's medieval-scholarly density + Ranade's tall x-height geometric-sans + Monaspace's five-texture metric-compatible family + Departure Mono's pixel-period accent = a four-axis identity that no peer ecosystem ships. Old-and-deep + new-and-precise + mechanical-harmonized + retro-period.

**OpenType activation defaults:** see `research/02_design_trends_templates_typography.md` Section 3B.

## Identity Icons

| Role | Pack | License |
|---|---|---|
| Marketing / identity / showcase (24px+) | Solar Bold Duotone | CC-BY-4.0 |
| Docs / technical UI (16–18px) | Mynaui Icons | ISC |

**Reasoning:** Solar at 24px+ shows the duotone payoff. Below 24px the duotone reads muddy, so docs and dense UI use Mynaui's 1.25px-stroke precision. The split is two faces of one identity, not a fragmentation.

**Full icon roster (17–18 packs):** Solar + Mynaui (identity) + Lucide + Heroicons (outline + solid) + Tabler + Phosphor + Radix + Material Symbols + Carbon Icons + Bootstrap Icons + Feather + Iconoir + Akar + Basil + Carbon Pictograms + Healthicons.

## Pack Categories at Launch

| Category | v1.0 count | Notes |
|---|---|---|
| Token packs | 30 (27 source-faithful + 3 Tier C) | Established prior to this plan. |
| Vocabulary packs | 22 | Existing 10 + 12 new (commerce, settings, dataviz, auth, nav, content, notifications, states, search, calendar, kanban, comments). |
| Theme packs | ~10 | Trend-forecast tier per research. Identity themes added as Bug authors. |
| Template packs | ~10 at launch (expandable to 25–30) | Real production sites, not boilerplate. |
| Pattern packs | ~80–150 patterns | Derived from templates. P0 priorities first. |
| Icon packs | 17–18 | See above. |

## Forme

Specialty template/pattern line for type-foundry and typography-focused sites. **Not** a parallel system. **Not** variants of every other pack. Just one deliberately deep specialty line. 18 primitives specified. 3 template pack candidates.

## Showcase Strategy

| Tier | Content | Count at launch |
|---|---|---|
| Tier 1: real sites Bug built in Quoin | harrow.haus rebuilt and expanded | 1 site (5–6 pages) |
| Tier 2: high-effort mock-ups | "Template" or "Reference build" labeled | 10–15 |
| Tier 3: community submissions | Real users adopting Quoin | Empty at launch, grows over time |

## harrow.haus Rebuild Scope

Current state: single landing page selling prompt packs (going away in rebuild).

Replacement structure (5–6 pages):

- `/` — Home, rebuilt 1:1 visually but with new copy positioning Quoin as flagship + Bug's project constellation.
- `/projects` — Creative devlog format. Active work surfaced honestly about stage:
  - **Quoin** (shipping — flagship entry, thickest treatment)
  - **TSQ** (public release pending, harrowlab.dev)
  - **seek-tar** (v0.1.0 shipped)
  - **CRYPSOID / CRYPSARA** (research-stage)
  - **SIEVE** (validated against 2007–08 financial crisis, deferred pending TSQ)
  - **CRYPSONG / CONDUCTOR** (active development, audio-domain CRYPSCRIPT instances)
  - **ADIDEM** (94% mechanism validity, cross-AI audit)
  - **CRYPSCRIPT** (future build target)
- `/radio` — HARROW.FM. Atmospheric statement in Harrow Haus voice. Signup field (activatable later by Bug). No mention of Suno tracks.
- `/writing` — Curated piece list. Substack-linked. No pressure to backfill volume.
- `/boeingwatch` — BoeingWatch page. Independent accountability tracker for Boeing incidents post-whistleblower-deaths. Repo at github.com/bigbugnowadaze/boeing-watch.
- `/contact` — Email, social, GitHub.

**Approach:** No fake brands. No "coming soon" pages for things that aren't coming. Honest staging. Quoin reads as the flagship; the rest are the surrounding constellation.

**Creative-use-of-Quoin opportunity on /projects:** treat as visual map showing intellectual connections — CRYPSOID → CRYPSCRIPT → CRYPSONG/CONDUCTOR/CRYPSARA derive from the same surprisal-curve thesis; seek-tar and TSQ both circle invariance-under-transformation. Read as artifact of how Bug thinks, not a portfolio post-mortem.

## CLI Scope

| Surface | v1.0 | v0.2+ |
|---|---|---|
| `npx @quoin/create <template-name>` | YES — thin, just git clone + install | — |
| `npx @quoin/add <pattern-name>` | NO | YES |
| Theme switching CLI | NO | YES |
| Pack registry CLI | NO | YES (when registry exists) |

**Reasoning:** templates need a scaffold tool from day one; the rest can wait until usage data informs design.

## Spec Conformance

| Requirement | Status |
|---|---|
| W3C DTCG 2025.10 conformance | Required |
| 11 DTCG types used | color, dimension, number, fontFamily, fontWeight, duration, cubicBezier, shadow, border, typography, transition, strokeStyle |
| Gradient type | Deferred to v0.2 |
| Number arrays | Not used at v1.0 |
| Canonical namespace freeze | At v1.0 release; semver after |

## Quality Bar

**Universal pack quality bar:** Tailwind UI / DaisyUI / Astro Themes / shadcn Blocks / Mantine production parity. No boilerplate. No minimum viable spec. Every pack ships at this level or it does not ship.

If a phase produces results below this bar, halt and report. Do not ship. See `skills/quoin-pack-author.md`.

## Operator Vetoes

The operator (Bug) retains veto over:

- Names (theme names, pattern names, template names, pack names)
- Aesthetic decisions (theme color choices, type pairings, default settings)
- Phase advancement (no phase advances without explicit operator approval)
- External credentials (npm publish, domain DNS, etc.)

Surface decisions to operator. Do not make them.
