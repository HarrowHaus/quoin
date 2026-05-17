# @quoin/tokens-elastic

Elastic EUI (light theme) palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Elastic UI Framework (EUI)
- **Source organisation:** Elastic
- **Source URL:** https://eui.elastic.co/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** EUI 'Amsterdam' light theme. Elastic ships @elastic/eui with the design tokens exposed as SASS / CSS vars. Inter typeface is open-source.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

EUI's text/background/border tokens map directly. euiColorPrimary -> accent (Elastic blue), euiColorEmptyShade -> surface, euiColorLightestShade -> surface-recessed, euiColorDarkestShade -> surface-inverse. Status: danger/success/warning/primary -> critical/success/warning/info.

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
