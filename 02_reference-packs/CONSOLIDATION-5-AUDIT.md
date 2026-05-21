# Consolidation 5 Audit — Label primitive

**Phase 22 / Unification Audit · Consolidation 5**
**Status: Audit phase complete; no novel architectural questions surfaced. Mechanically translated to proposal per Session 3 extended-run authorization.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**

---

## 1. Scope

Per the unification dossier §2.1 #3 + Session 3 brief Block B: promote inlined `badge / tag / status-pill / chip` contracts to a single `@quoin/prim-label` primitive.

## 2. Audit findings

**No standalone packs exist** for badge / tag / status-pill / chip — they are all inlined contracts within consumer patterns.

| Consumer pattern | Inlined class | Use cases |
|---|---|---|
| `pattern-hero/examples/type-only.html` | `.badge` | Trust badges in hero-meta (SOC 2, GDPR, ISO 27001, E2E encrypted) |
| `pattern-pricing-tiers/examples/index.html` | `.badge` | "Most popular" / "Best for teams" featured-tier badges |
| `pattern-nav/examples/docs.html` | `.badge[data-tone]` | NEW / BETA labels in sidebar |
| `pattern-nav/examples/app-chrome.html` | `.badge` | Notification count badge (e.g., "3") |
| `pattern-page-header/examples/index.html` | `.badge[data-tone]` + `.status-pill[data-tone]` | Status pills (Live), project tags (Project, Active, Renews soon) |

**No `.tag` or `.chip` classes exist in the catalog.** These are anticipated in the dossier but not yet inlined.

## 3. Hard-halt check

| Condition | Status |
|---|---|
| Novel architectural question beyond Cons. 3 Q1-Q8 | ✓ No — same Q1-Q8 cascade applies to primitives |
| Peer pack composition requires new variants | ✓ No — prim-label is foundational; consumes only tokens-baseline |
| Visual regression risk | ✓ Manageable — `.badge` rules in consumers can be renamed to `.label[data-role="badge"]` with the same computed CSS |

## 4. Proposed unified primitive

`@quoin/prim-label` with:

- **Single slot**: `label` (the primitive itself)
- **Variant attribute**: `data-role="badge | status | tag | chip | dismissible"` (default `badge`)
- **Tone attribute**: `data-tone="neutral | accent | success | warning | critical | info | new | beta"` (default `neutral`)
- **Element**: `<span>` (when standalone) or `<button>` (when dismissible)
- **Composition**: dismissible variant composes button-system's `.action-button` for the dismiss trigger; other variants consume only tokens-baseline

## 5. Consumer migration mechanics

For each affected file, the mechanical translation:

| Before | After |
|---|---|
| `class="badge"` | `class="label" data-role="badge"` |
| `class="badge" data-tone="X"` | `class="label" data-role="badge" data-tone="X"` |
| `class="status-pill"` | `class="label" data-role="status"` |
| `class="status-pill" data-tone="X"` | `class="label" data-role="status" data-tone="X"` |
| `.badge { ... }` CSS | `.label[data-role="badge"] { ... }` |
| `.status-pill { ... }` CSS | `.label[data-role="status"] { ... }` |

Each consumer manifest declares `@quoin/prim-label` as peerPack.

## 6. Stop condition

Audit complete. Mechanical proposal follows.
