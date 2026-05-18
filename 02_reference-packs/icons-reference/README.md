# @quoin/icons-reference

Reference icon pack for Quoin. Ships five hand-drawn outline glyphs —
home, search, chevron-down, x, check — enough to validate the
`<icon>` resolver and seed an app shell.

## Authoring syntax

```html
<icon name="home" size="md" />
<icon name="chevron-down" size="sm" aria-hidden="true" />
<icon name="search" size="lg" pack="reference" />
```

`size` maps to the canonical `--icon-size-{xs|sm|md|lg|xl}` tokens. A
raw dimension (`size="22px"`) is also accepted and passes through.

`pack="reference"` disambiguates when multiple icon packs declare the
same glyph name; without it, the first matching pack in load order
wins.

## Composition

```ts
import { compile, loadIconPack } from "@quoin/compiler";

const iconPack = await loadIconPack("./node_modules/@quoin/icons-reference");
compile({ source, iconPacks: [iconPack], ... });
```

## SVG conventions

Every glyph in this pack:

- Single root `<svg>` with `viewBox="0 0 24 24"`.
- Strokes use `currentColor`, so colour comes from the parent's `color`.
- No `width` / `height` attributes — those are injected by the
  compiler from the `--icon-size-*` token resolved at compile time.

## License

MIT. Glyphs are original to this pack.
