# @quoin/tokens-shadcn

shadcn/ui default theme (zinc, OKLCH) translated onto the Quoin canonical semantic-token namespace.

## Attribution

- **Source system:** shadcn/ui
- **Source organisation:** shadcn
- **Source URL:** https://ui.shadcn.com/
- **Source license:** MIT
- **Harvested:** 2026-05-16
- **Notes:** Default 'zinc' theme variables from the shadcn/ui themes registry. shadcn/ui ships CSS custom properties named --background, --foreground, --muted, etc.; these are renamed onto the Quoin canonical namespace.

Phase 3.5 fidelity status: Tier C. The shipped OKLCH values are designed approximations informed by the source system's published palette structure and contrast pattern, not byte-faithful extraction. Canonical source extraction is deferred to a Phase 3.5b follow-up. See 03_harvest/fidelity/specs/ for the extraction framework; the upstream URL declared above is the verification target.

## Mapping

shadcn names map: --background -> surface, --foreground -> text-emphasis, --muted -> surface-recessed, --muted-foreground -> text-recede, --primary -> accent, --primary-foreground -> text-on-accent, --destructive -> critical, --border -> border. shadcn has no native warning/success/info; supplied from Tailwind's amber/emerald/sky 500.

## License

This pack is published under **MIT**, compatible with the source license. See [LICENSE](./LICENSE).

Source assets, source code, and proprietary typefaces are not redistributed. Where the source system specifies a proprietary typeface, this pack references it by family name only.

## Cross-references

- Spec: [`00_spec/tokens.md`](../../../00_spec/tokens.md) — canonical namespace.
- Pack format: [`00_spec/pack-format.md`](../../../00_spec/pack-format.md) — manifest schema.
- Harvest report: [`03_harvest/REPORT.md`](../../REPORT.md) — per-system decisions.
