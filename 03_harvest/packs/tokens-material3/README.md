# @quoin/tokens-material3

Material Design 3 (M3) baseline palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Material Design 3
- **Source organisation:** Google
- **Source URL:** https://m3.material.io/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-16
- **Notes:** M3 baseline 'reference palette' (neutral + primary purple + error). M3's elevation token set is not modelled here (Quoin's optional elevation capability is intentionally omitted by this pack — see Phase 1 spec §4.4). Use M3's CSS variables in the consumer project if elevation is required.

## Mapping

M3 semantic names (surface, on-surface, primary, on-primary, error, on-error) map almost directly. M3's 'tonal palette' steps (0, 10, 20, ... 100) translated to OKLCH approximations. text -> on-surface, text-emphasis -> on-surface (M3 uses opacity rather than a separate token; mapped to a darker neutral here).

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
