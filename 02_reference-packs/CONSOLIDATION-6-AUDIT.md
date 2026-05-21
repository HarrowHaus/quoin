# Consolidation 6 Audit — Sequence primitive

**Phase 22 / Unification Audit · Consolidation 6**
**Status: Audit phase complete; mechanical translation per Cons. 5 template.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**

---

## 1. Scope

Promote inlined `breadcrumb / numbered-list / sidebar-list` contracts to a single `@quoin/prim-sequence` primitive.

## 2. Audit findings

| Consumer pattern | Inlined data-pattern / class | Use case |
|---|---|---|
| `pattern-nav/examples/app-chrome.html` | `data-pattern="nav-breadcrumb"` | App-shell breadcrumb (Home / Project / Subsection) |
| `pattern-nav/examples/docs.html` | `data-pattern="nav-sidebar-section"` | Collapsible docs sidebar sections with item lists |

**No standalone packs exist** for breadcrumb / numbered-list / sidebar-list. Both implementations are inlined in nav. No `class="numbered-list"` anywhere in the catalog.

## 3. Hard-halt check

| Condition | Status |
|---|---|
| Novel architectural question beyond Cons. 5 template | ✓ No — identical primitive-promotion shape |
| Peer pack composition needs new variants | ✓ No |
| Visual regression risk | ✓ Manageable — dual-class approach per Cons. 5 |

## 4. Proposed `@quoin/prim-sequence`

- **Variants** (`data-role`): `breadcrumb` / `ordered-list` / `unordered-list` / `sidebar-vertical`
- **Anatomy**: `sequence` (container, `<ol>` or `<ul>` or `<nav>`) + `sequence-item` + (conditional) `sequence-separator` + (conditional) `sequence-position-indicator`
- **Position-semantic attributes**: `aria-current="page" | "step" | "location"` per variant
- **Separator tokens**: configurable per variant (chevron / slash / dot / pipe / number)

## 5. Migration approach — dual-class (per Cons. 5)

- Add `class="sequence"` as canonical secondary class alongside existing `nav-breadcrumb` / `nav-sidebar-section`
- Existing CSS stays; new `.sequence` class is the v3.G.17 marker
- Consumer manifest: nav declares `@quoin/prim-sequence` as `optionalPeerPacks` (only app-chrome + docs variants use it)

## 6. Stop condition

Audit complete. Implementation proceeds.
