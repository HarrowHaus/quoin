# @quoin/theme-baseline-reference

Reference theme pack for Quoin. Demonstrates the theme-pack mechanics by
shipping a pass-through light variant, an inverted dark variant, and a
P3 wide-gamut variant — all on top of `@quoin/tokens-baseline`.

## What a theme pack does

A theme pack overlays mode-scoped `$value` overrides onto an active
token pack. The compiler applies the light-mode overrides at primitive
resolution time (before project tokens). Dark and P3 overrides are
carried through to the implementation pack so it can emit mode-scoped
CSS blocks (`[data-theme="dark"]`, `@media (color-gamut: p3)`).

Override files MUST only declare names already in the canonical
namespace from `00_spec/tokens.md` §3. Introducing a new name is a
validation error.

## Compose with

```ts
import { compile, loadTokenPack, loadThemePack } from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const themePack = await loadThemePack("./node_modules/@quoin/theme-baseline-reference");

compile({ source, tokenPack, themePack, vocabularyPacks, implementationPack });
```

## Files

- `overrides/light.json` — applied at compile time on top of the token pack.
- `overrides/dark.json` — full greyscale inversion + retuned accent.
- `overrides/p3.json` — wide-gamut accent + status colours for capable monitors.

## License

MIT.
