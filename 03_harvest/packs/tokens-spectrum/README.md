# @quoin/tokens-spectrum

Adobe Spectrum (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Spectrum
- **Source organisation:** Adobe
- **Source URL:** https://spectrum.adobe.com/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-17
- **Notes:** Adobe Spectrum tokens extracted from @adobe/spectrum-tokens dist/json/variables.json. Light theme values resolved from `sets.light.value`. Extraction method: B. Algorithm: @adobe/spectrum-tokens@14.7.0, inputs {"mode":"light"}. Mapping: Spectrum's `accent-color-N`, `gray-N`, `red-color-N`, etc. flattened. Mapping: surface = gray-50, text = gray-900, accent = accent-color-900 (Adobe blue), critical = negative-background-color-default, success = positive-background-color-default, warning = notice-background-color-default.

## Mapping

Spectrum gray-50 -> surface (very light), gray-100 -> surface-recessed, gray-900 -> text-emphasis. blue-500 (accent) -> accent. Spectrum has explicit negative/positive/notice/informative; mapped directly to critical/success/warning/info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
