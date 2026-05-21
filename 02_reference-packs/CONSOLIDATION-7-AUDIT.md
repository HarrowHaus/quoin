# Consolidation 7 Audit — Decoration overlay primitive

**Phase 22 / Unification Audit · Consolidation 7**
**Status: Audit phase complete; no existing inlined contracts found. Primitive shipped as forward-looking infrastructure.**
**Author: Claude Code (Opus 4.7) · 2026-05-20**

---

## Scope

Per the dossier §2.1 #5 + Session 4 brief Block B: promote anticipated `paper-grain-overlay / surface-decoration` contracts to a single `@quoin/prim-decoration-overlay` primitive.

## Audit findings

**No standalone packs and no inlined `paper-grain-overlay` / `surface-decoration` contracts exist in the catalog.** Grep confirms zero hits for these class/data-pattern names across `02_reference-packs/`.

The closest analog is hero-gradient-mesh's optional SVG noise overlay (rendered via `data-texture="grained"`), but it's variant-specific CSS rather than a separately-named primitive contract.

## Hard-halt check

| Condition | Status |
|---|---|
| Novel architectural question beyond Cons. 5 template | ✓ No — same primitive-promotion shape |
| Peer pack composition needs new variants | ✓ No |
| Visual regression risk | ✓ Zero (no consumers to migrate) |

## Proposed `@quoin/prim-decoration-overlay`

- **Variants** (`data-role`): `grain` / `texture` / `pattern` / `gradient`
- **Anatomy**: `decoration-overlay` (positioned absolute over a container)
- **Performance budget**: overlay primitives never exceed 5% LCP impact; documented in pack README per v3.G.14

## Migration

**No consumers to migrate.** The primitive ships as forward-looking infrastructure for future Boeing Watch aesthetic pack + future decorative overlay consumers (paper-grain hero variant, textured surfaces, brand-specific patterns).

Future patterns that need decorative overlays compose this primitive directly via `class="decoration-overlay" data-role="grain"`.

## Stop condition

Audit complete. Implementation: ship the primitive pack; no consumer migration in this Cons.
