# @quoin/tokens-spectrum

Adobe Spectrum (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Spectrum
- **Source organisation:** Adobe
- **Source URL:** https://spectrum.adobe.com/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** Spectrum 'light' theme. Spectrum publishes a global-token + alias-token model in @adobe/spectrum-tokens; this pack translates the alias layer (gray-50..gray-900, blue-500..blue-700, etc.) onto Quoin. Adobe Clean is proprietary; referenced by family name only.

## Mapping

Spectrum gray-50 -> surface (very light), gray-100 -> surface-recessed, gray-900 -> text-emphasis. blue-500 (accent) -> accent. Spectrum has explicit negative/positive/notice/informative; mapped directly to critical/success/warning/info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
