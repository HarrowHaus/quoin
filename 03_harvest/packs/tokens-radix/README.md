# @quoin/tokens-radix

Radix Colors translated to Quoin. Slate neutral plus Blue accent (canonical Radix UI combination).

## Attribution

- **Source system:** Radix Colors
- **Source organisation:** WorkOS
- **Source URL:** https://raw.githubusercontent.com/radix-ui/colors/main/src/light.ts
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** Radix Colors light theme: slate + blue + red + green + amber, extracted from the canonical sRGB hex declarations in radix-ui/colors. Each ramp has 12 perceptual steps; we keep steps 1-12 verbatim.

Extraction notes: Radix's 12-step scale (gray, slate, blue, red, green, amber, sky) extracted byte-faithful from src/light.ts. Flattened onto Quoin's 4-surface model: step-1 → surface-elevated, step-2 → surface, step-3 → surface-recessed, step-12 → surface-inverse. Accent = slate.12.

## Mapping

Radix's 12-step model maps onto Quoin's 4-surface model as: step 1 -> surface-elevated, step 2 -> surface, step 3 -> surface-recessed, step 12 -> surface-inverse. text uses step 11 (body), text-emphasis uses step 12, text-recede uses step 9. Border uses step 6 / 8 (recede / emphasis).

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
