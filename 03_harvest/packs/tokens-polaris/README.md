# @quoin/tokens-polaris

Shopify Polaris (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Polaris
- **Source organisation:** Shopify
- **Source URL:** https://polaris.shopify.com/
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Polaris default theme colours read from @shopify/polaris-tokens themeDefault.color. The library is Shopify's canonical static export of its programmatic palette. Extraction method: B. Algorithm: @shopify/polaris-tokens@9.4.2, inputs {"theme":"default"}. Mapping: Polaris ships ~226 named colour tokens (color-bg, color-text, color-icon, color-border, etc.). Mapping uses Polaris names directly: surface = color-bg-surface, text = color-text, accent = color-bg-fill-brand, critical = color-bg-fill-critical, success = color-bg-fill-success, warning = color-bg-fill-warning, info = color-bg-fill-info.

## Mapping

Polaris --p-color-bg / bg-surface -> surface, bg-surface-secondary -> surface-recessed, bg-emphasis -> accent. text -> text, text-secondary -> text-recede, text-emphasis -> text-emphasis. critical/success/warning/info map directly from Polaris's status families.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
