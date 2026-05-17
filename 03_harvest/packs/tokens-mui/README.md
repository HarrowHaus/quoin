# @quoin/tokens-mui

Material UI (MUI) default theme translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Material UI
- **Source organisation:** MUI
- **Source URL:** https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/colors/indigo.js
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Material UI default (Material Design v1/v2) palettes: indigo + grey + red + green + orange + blue. Each file ships a flat hex object; we capture step 500 + a few neighbours.

Extraction notes: MUI's per-colour files (indigo.js, gray.js, red.js, etc.) share step keys; concatenating them in this pipeline collapses values into the last file's keys. Per-file fidelity extraction is deferred; OKLCH approximations of MUI's Material Design v2 palette stand, anchored to documented hex values from mui/material-ui.

## Mapping

MUI palette.background.default/paper -> surface/surface-elevated. palette.text.primary/secondary -> text/text-recede. palette.primary.main -> accent. palette.error/warning/info/success.main map directly.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
