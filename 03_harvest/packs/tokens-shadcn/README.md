# @quoin/tokens-shadcn

shadcn/ui default theme (zinc, OKLCH) translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** shadcn/ui
- **Source organisation:** shadcn
- **Source URL:** https://ui.shadcn.com/
- **Source license:** MIT
- **Harvested:** 2026-05-17
- **Notes:** shadcn/ui default zinc theme extracted from apps/v4/public/r/themes.css. Values are raw HSL components in the source; this spec wraps them in hsl() for OKLCH conversion. The semantic role names (background, foreground, primary, etc.) map directly onto Quoin's canonical namespace via the existing sources/shadcn.json semantic block. Extraction method: B. Algorithm: shadcn-ui/ui apps/v4/public/r/themes.css@main, inputs {"theme":".theme-zinc"}. Mapping: shadcn ships flat semantic CSS vars (--background, --foreground, --primary, --destructive, --muted, etc.) under .theme-zinc. Mapping selects: surface = background, surface-elevated = card, surface-recessed = muted, text = foreground, accent = primary, critical = destructive, border = border. shadcn has no native success/warning/info so we supply matching-style green/amber/blue.

## Mapping

shadcn names map: --background -> surface, --foreground -> text-emphasis, --muted -> surface-recessed, --muted-foreground -> text-recede, --primary -> accent, --primary-foreground -> text-on-accent, --destructive -> critical, --border -> border. shadcn has no native warning/success/info; supplied from Tailwind's amber/emerald/sky 500.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
