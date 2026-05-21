# Consolidation 7 — Decoration overlay primitive (closed)

**Phase 22 / Unification Audit · Consolidation 7**
**Status: CLOSED · 2026-05-20**
**Resolution: New `@quoin/prim-decoration-overlay` primitive shipped as forward-looking infrastructure. No existing consumers to migrate.**

---

## Shipped

- `02_reference-packs/primitives/decoration-overlay/` — `@quoin/prim-decoration-overlay` (4 variants: grain / texture / pattern / gradient; intensity + blend axes)
- `CONSOLIDATION-7-{AUDIT,REPORT}.md`
- Documented 5% LCP impact maximum performance budget per v3.G.14
- Anticipated consumers documented in primitive README (Boeing Watch + manuscript-future aesthetic packs; future hero variants)

## No gate extension

`prim-decoration-overlay` is not added to `COMPOSITION_PRIMITIVES` yet — no patterns currently declare it as peerPack. When the first consumer ships (likely Boeing Watch aesthetic pack), add `'@quoin/prim-decoration-overlay': ['decoration-overlay']` then.

## Verification

- bootstrap-integrity: 22/22 specimens green (unchanged — no consumer migrations)
- Primitive manifest JSON parses cleanly

## Consolidation 7 closed. Phase 22 progress: 7 of 9 complete.
