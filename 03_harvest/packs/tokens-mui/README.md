# @quoin/tokens-mui

Material UI (MUI) default theme translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Material UI
- **Source organisation:** MUI
- **Source URL:** https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/grey.js
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Per-file extraction from mui/material-ui packages/mui-material/src/colors/. Each colour family (grey, indigo, red, green, amber, blue) parsed independently and namespaced by family. Extraction method: C. Mapping: MUI ships Material Design v1/v2-style 50-900 + A100-A700 ramps per colour. Default light theme: surface = grey.50, text = grey.900, accent = indigo.500, critical = red.500, success = green.500, warning = amber.500, info = blue.500.

## Mapping

MUI palette.background.default/paper -> surface/surface-elevated. palette.text.primary/secondary -> text/text-recede. palette.primary.main -> accent. palette.error/warning/info/success.main map directly.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
