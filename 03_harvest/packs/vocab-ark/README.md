# @quoin/vocab-ark

Ark UI-flavoured primitives — number input, color picker, segment bar, toggle group.

## Primitives

| Primitive | Role |
|-----------|------|
| `<number-input>` | Numeric input with optional step controls. |
| `<color-picker>` | Colour swatch / picker. |
| `<segment-bar>` | Larger version of segment-control with icons + labels. |
| `<toggle-group>` | Group of toggle buttons (single or multi-select). |

## Attribution

- **Source:** Ark UI
- **Organisation:** Chakra Systems
- **URL:** https://ark-ui.com/
- **License:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Ark UI publishes state-machine-driven primitives via @zag-js. This pack extracts the semantic shape (the element + ARIA story) of distinctive Ark widgets and renders them as Quoin primitives. Behaviour is delegated to host JS at runtime.

## Cross-references

- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) §5.
- Canonical primitives: [`00_spec/primitives.md`](../../../00_spec/primitives.md).
