# @quoin/tokens-primer

GitHub Primer (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Primer
- **Source organisation:** GitHub
- **Source URL:** https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/color/light/light.json5
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Primer base/color/light/light.json5 extracted byte-faithfully. The json5 source nests hex inside `$value.hex`; the primer-json5 parser walks the indented tree and emits `base.color.{family}.{step}: '#hex'`. Extraction method: A. Mapping: Primer 10-step scales for gray/blue/green/red/orange/yellow/purple/pink/coral. Functional mapping: surface = white, text = gray.9, accent = blue.5 (Primer's --color-accent-emphasis), critical = red.5, success = green.5, warning = yellow.5, info = blue.5.

## Mapping

Primer's --color-canvas-default -> surface, --color-canvas-subtle -> surface-recessed, --color-fg-default -> text, --color-fg-emphasis -> text-emphasis, --color-fg-muted -> text-recede, --color-border-default -> border, --color-accent-emphasis -> accent. Danger/success/attention/done map to critical/success/warning/info.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
