# Quoin shadcn-compatible registry

This directory holds the **derivative distribution serialization** of Quoin's
catalog in shadcn-registry format. The **canonical USML pack manifests** live
at `/patterns/`, `/aesthetics/`, `/templates/`, and
`/02_reference-packs/{patterns,primitives}/`. This registry is generated
deterministically from those canonical sources by `scripts/build-registry.js`,
which runs on every pack change via `.github/workflows/registry-build.yml`.

**Do not hand-edit files in this directory.** Edits will be overwritten by
the next registry build. To change a registry item, edit the canonical pack
manifest and re-run `node scripts/build-registry.js`.

## Format

- `index.json` — shadcn registry root manifest, conforming to
  [`https://ui.shadcn.com/schema/registry.json`](https://ui.shadcn.com/schema/registry.json).
  Lists all items with name, type, title, description, registry
  dependencies, and external URL.
- `index.md` — Markdown projection of the registry for LLM consumers
  (content-negotiation alternative since GitHub Pages does not natively
  support `Accept`-header negotiation).
- `items/<name>.json` — one shadcn registry item per Quoin pattern,
  aesthetic pack, or template. Each conforms to
  [`https://ui.shadcn.com/schema/registry-item.json`](https://ui.shadcn.com/schema/registry-item.json).

## Item naming

Quoin pack names like `@quoin/pattern-hero` and `@quoin/aesthetic-default`
are mapped to shadcn item names by stripping the namespace and type prefix:

- `@quoin/pattern-hero` → `hero`
- `@quoin/aesthetic-default` → `default`
- `@quoin/prim-stack` → `stack`
- `@quoin/template-landing-saas` → `landing-saas`

This matches shadcn's convention of short item names without scope prefixes.

## Item types

| Quoin construct | shadcn type | Rationale |
|----|----|----|
| Pattern (`@quoin/pattern-*`) | `registry:component` | Patterns are user-facing UI components from shadcn's perspective. |
| Primitive (`@quoin/prim-*`) | `registry:component` | Primitives compose into patterns; from shadcn's perspective they are also components. |
| Aesthetic pack (`@quoin/aesthetic-*`) | `registry:style` | Aesthetic packs supply token values; shadcn's `registry:style` is the equivalent role. |
| Template (`@quoin/template-*`) | `registry:block` | Templates compose multiple patterns into deployable pages; shadcn's `registry:block` is the equivalent. |

## Peer-pack composition → `registryDependencies`

When a Quoin pack declares `peerPacks` (required composition per
[v3.G.17](https://github.com/HarrowHaus/quoin/blob/main/PHASE_GATES.md)),
the corresponding shadcn registry item declares those peers under
`registryDependencies`. This makes `npx shadcn add hero` automatically pull
in `button-system` because the hero pack declares
`peerPacks: { '@quoin/pattern-button-system': ... }`.

`optionalPeerPacks` (variant-conditional composition per
[v3.G.21](https://github.com/HarrowHaus/quoin/blob/main/PHASE_GATES.md))
are NOT registered as `registryDependencies` — shadcn resolves
registryDependencies eagerly, which would force-install peers a consumer
might not need. Optional peers are recorded under `meta.optionalDependencies`
for documentation; consumers install them explicitly when needed.

Token reference packs (`@quoin/tokens-baseline`) and vocab packs
(`@quoin/vocab-*`) are NOT shipped through the shadcn registry in
this phase — they are implicit infrastructure consumed at the
catalog-resolution level, not user-facing components.

## Aesthetic-pack token mapping (DTCG → shadcn `cssVars`)

Aesthetic packs ship `overrides/light.json` and `overrides/dark.json` in
DTCG 2025.10 format. The build script flattens these into shadcn's
`cssVars: { light: { '--name': 'value' }, dark: { ... } }` shape by
unwrapping each token's `$value` and prefixing the name with `--`.

## Consumption

```bash
# Add a single component (with dependencies auto-installed):
npx shadcn@latest add \\
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \\
  hero

# Add multiple components in one command:
npx shadcn@latest add \\
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \\
  hero pricing-tiers footer-mega

# Add an aesthetic pack (registers CSS variables):
npx shadcn@latest add \\
  --registry=https://harrowhaus.github.io/quoin/registry/index.json \\
  boeing-watch
```

See [`/DISTRIBUTION.md`](../DISTRIBUTION.md) for the full distribution
documentation across all surfaces (npm, shadcn registry, MCP).

## License

MIT. Source attribution for translated patterns (`disclosure`, `combobox`,
`tabs`) recorded in each item's `meta.source` block.
