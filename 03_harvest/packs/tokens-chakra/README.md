# @quoin/tokens-chakra

Chakra UI default palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Chakra UI
- **Source organisation:** Chakra UI community
- **Source URL:** https://raw.githubusercontent.com/chakra-ui/chakra-ui/main/packages/react/src/theme/tokens/colors.ts
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Chakra UI v3 colour tokens extracted from packages/react/src/theme/tokens/colors.ts. Chakra wraps every value in `{ value: '#hex' }` per the Panda-CSS / @chakra-ui/styled-system convention. The value-wrapped-ts parser handles this shape. Extraction method: A. Mapping: Chakra v3 50-950 ramps for gray/red/orange/yellow/green/teal/blue/cyan/purple/pink. Default accent = teal.500 per Chakra convention. whiteAlpha/blackAlpha (semi-transparent overlays) are not modelled in the base palette — Quoin's primitives handle overlay tints via the impl pack.

## Mapping

Chakra gray-50..900 maps to Quoin surface/text. chakra-teal-500 -> accent. Status colours: red-500 (critical), green-500 (success), orange-500 (warning), blue-500 (info).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
