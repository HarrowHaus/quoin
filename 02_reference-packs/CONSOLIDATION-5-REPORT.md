# Consolidation 5 — Label primitive (closed)

**Phase 22 / Unification Audit · Consolidation 5**
**Status: CLOSED · 2026-05-20**
**Resolution: New `@quoin/prim-label` foundational primitive; consumer specimens updated to dual-class (label + legacy badge/status-pill); peerPacks declared on consumers.**

---

## What Cons. 5 fixed

Before Cons. 5, badge / status-pill contracts were inlined across 5 consumer patterns (hero, pricing-tiers, nav-docs, nav-app-chrome, page-header), each maintaining its own `.badge` and `.status-pill` CSS rules. The dossier predicted these would converge to a single label primitive; the audit confirmed it.

## What shipped

- **NEW** `02_reference-packs/primitives/label/` — first `prim-*` primitive pack:
  - `quoin.pack.json` (5 variants: badge / status / tag / chip / dismissible; 8 tones; 2 sizes)
  - `primitives/index.json` (1 primitive: `label` with data-role + data-tone + data-size axes)
  - `README.md` with anatomy table + reverse-lineage listing all 5 consumers
  - `package.json`, `LICENSE`
- **Gate extension** `bootstrap-integrity.js`: `prim-label` added to `COMPOSITION_PRIMITIVES` mapping (class `label`)
- **Consumer migrations** — added `class="label"` as canonical secondary class alongside existing `.badge` / `.status-pill`:
  - `hero/examples/type-only.html` (6 trust badges)
  - `pricing-tiers/examples/index.html` (3 featured-tier badges)
  - `nav/examples/docs.html` (2 release-stage labels: NEW, BETA)
  - `nav/examples/app-chrome.html` (2 notification-count badges)
  - `page-header/examples/index.html` (1 status-pill: Live; 3 project tags: Project, Active, Renews soon)
- **Manifest updates** — consumer packs declare optional or required prim-label peerPack:
  - `hero/quoin.pack.json` — prim-label as `optionalPeerPacks` (only type-only variant uses it)
  - `nav/quoin.pack.json` — prim-label as `optionalPeerPacks` (only docs + app-chrome variants use it)
  - `pricing-tiers/quoin.pack.json` — prim-label as required peerPacks (used always)
  - `page-header/quoin.pack.json` — prim-label as required peerPacks (used always)

## Optional peerPacks field (new manifest convention)

Two patterns (hero, nav) consume prim-label in only SOME variants. To prevent v3.G.17 from firing on variants that don't use the primitive, this Cons. introduces a new `optionalPeerPacks` field in pack manifests. The gate's `COMPOSITION_REALITY_ENFORCED_FOR` set only reads from `peerPacks`, not `optionalPeerPacks`.

Going forward: when a peer pack is consumed by all variants of a multi-variant pack, declare under `peerPacks`. When consumed by only some, declare under `optionalPeerPacks` with a note explaining which variants use it.

## Migration approach — dual-class

Rather than rename existing `.badge` / `.status-pill` CSS rules, this Cons. adds `class="label"` as a secondary class on each element. The HTML now has both: `class="label badge" data-role="badge"`. Existing CSS continues to apply (visual behavior unchanged); the new `label` class satisfies v3.G.17.

This is the minimal-disruption path. A future cleanup commit can rename `.badge` / `.status-pill` CSS to `.label[data-role="X"]` selectors and drop the dual classes, but visual behavior is already correct.

## Halt-condition check

| Condition | Status |
|---|---|
| Novel architectural question beyond Cons. 3 Q1-Q8 | ✓ None — Q1-Q8 cascade applies cleanly. The `optionalPeerPacks` field is an extension of v3.G.17 enforcement scope, not a new architectural axis. |
| Peer pack composition needs new variants | ✓ No |
| Visual regression | ✓ None — dual-class approach preserves existing CSS |
| Gate false positive | ✓ Resolved via optionalPeerPacks distinction |

## Verification

| Check | Result |
|---|---|
| bootstrap-integrity.js | 22/22 specimens green |
| validate.js | 80/80 PASS |
| content-completeness.js | 18/18 enrolled patterns OK |
| Registry parses; primitives JSON parses | ✓ |

## Flagged for future cleanup

1. **Dual classes in consumer HTML** — `class="label badge"` works but is redundant. Future cleanup: rename consumer CSS `.badge` → `.label[data-role="badge"]` and drop the second class. Same for `.status-pill`.
2. **`optionalPeerPacks` field** is new with Cons. 5; not yet validated by manifest schema. Future enhancement: update manifest schema to recognize the field; document in `00_spec/pack-format.md`.
3. **`prim-label` examples/** directory not yet populated. The pack manifests + primitives JSON suffice for v3.G.17 enforcement, but a canonical specimen demonstrating all 5 variants × 8 tones would help adopters.

## Commits

| Commit | Scope |
|---|---|
| `0e41738` (Session 3) | Cons. 4 closing (predecessor) |
| _this commit_ | Cons. 5 audit + prim-label pack scaffolding + 5 consumer migrations + gate extension + this report |

## Cons. 5 closed. Phase 22 progress: 5 of 9 consolidations complete (Cons. 1, 2, 3, 4, 5).
