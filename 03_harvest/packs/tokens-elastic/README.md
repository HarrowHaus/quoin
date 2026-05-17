# @quoin/tokens-elastic

Elastic EUI (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Elastic UI Framework (EUI)
- **Source organisation:** Elastic
- **Source URL:** https://raw.githubusercontent.com/elastic/eui/main/packages/eui-theme-borealis/src/variables/colors/_semantic_colors.scss
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-17
- **Notes:** Elastic EUI Borealis light theme extracted from packages/eui-theme-borealis/src/variables/colors/_colors_light.scss. Extraction method: A. Mapping: EUI's $euiColor* family flattened onto base.eui.{name}. Semantic mapping reads euiColorEmptyShade → surface, euiColorFullShade → surface-inverse, euiColorPrimary → accent, euiColorDanger → critical, euiColorSuccess → success, euiColorWarning → warning, euiColorAccent → info.

## Mapping

EUI's text/background/border tokens map directly. euiColorPrimary -> accent (Elastic blue), euiColorEmptyShade -> surface, euiColorLightestShade -> surface-recessed, euiColorDarkestShade -> surface-inverse. Status: danger/success/warning/primary -> critical/success/warning/info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
