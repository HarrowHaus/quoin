# @quoin/vocab-daisy

DaisyUI-flavoured primitives — alert tile, badge tag, bordered card, divider, indicator dot, modal shell.

## Primitives

| Primitive | Role |
|-----------|------|
| `<alert-tile>` | Inline alert block (info/success/warning/error). DaisyUI's <div class="alert">. |
| `<badge-tag>` | Small badge/tag — count, status, category. |
| `<card-bordered>` | DaisyUI's <div class="card card-bordered"> — bordered content card. |
| `<divider-line>` | Horizontal divider with optional centred text. |
| `<indicator-dot>` | Notification dot/badge anchored to a host element. |
| `<modal-shell>` | Modal dialog wrapper using a native dialog element. |

## Attribution

- **Source:** DaisyUI
- **Organisation:** Pouya Saadeghi
- **URL:** https://daisyui.com/
- **License:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Extracts DaisyUI's semantic-class style (alert, badge, card, divider, indicator, modal) into Quoin primitives. DaisyUI itself is the prior art that validated semantic compression on top of Tailwind; Quoin extends the same compression one layer higher.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) §5.
- Canonical primitives: [`00_spec/primitives.md`](../../../00_spec/primitives.md).
