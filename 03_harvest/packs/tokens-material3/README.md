# @quoin/tokens-material3

Material Design 3 (M3) baseline palette translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** Material Design 3
- **Source organisation:** Google
- **Source URL:** https://m3.material.io/
- **Source license:** Apache-2.0
- **Harvested:** 2026-05-17
- **Notes:** Values computed by running @material/material-color-utilities with M3's documented baseline seed (#6750A4). 13 tones × 6 role palettes (primary, secondary, tertiary, neutral, neutral variant, error). To regenerate with a different seed: install the library, change SEED in fidelity/specs/material3.js, and re-run. Extraction method: B. Algorithm: @material/material-color-utilities@0.2.7, inputs {"seed":"#6750A4","status":{"success":"#43A047","warning":"#FFA000","info":"#1976D2"},"tones":[0,10,20,30,40,50,60,70,80,90,95,99,100]}. Mapping: M3 13-tone scale per role palette. Light-theme mapping: surface = neutral.98, surface-elevated = neutral.99, surface-recessed = neutral.95, surface-inverse = neutral.20, text = neutral.20, text-emphasis = neutral.10, accent = primary.40, accent-recede = primary.90, critical = error.40.

## Mapping

M3 semantic names (surface, on-surface, primary, on-primary, error, on-error) map almost directly. M3's 'tonal palette' steps (0, 10, 20, ... 100) translated to OKLCH approximations. text -> on-surface, text-emphasis -> on-surface (M3 uses opacity rather than a separate token; mapped to a darker neutral here).

## License

This pack is published under **Apache-2.0**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
