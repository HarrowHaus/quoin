# Pack Types

**Version:** 1.0
**Status:** v1.0 normative.

Quoin distributes its language as composable npm packages. Every pack ships under the `@quoin/*` scope and conforms to the manifest contract in [`pack-format.md`](pack-format.md). Each pack declares its `type` field; the validator and compiler dispatch on that value.

This document is the authoritative catalogue of pack types and the rules for composition. The per-type manifest schemas live in:

- [`theme-pack.md`](theme-pack.md)
- [`template-pack.md`](template-pack.md)
- [`pattern-pack.md`](pattern-pack.md)
- [`icon-pack.md`](icon-pack.md)

The original three types (`token`, `vocabulary`, `implementation`) are defined in [`pack-format.md`](pack-format.md) §4–§6.

## 1. The seven pack types

| Type | Role | Layer | Composability |
|------|------|-------|---------------|
| `token` | Aesthetic raw values + canonical semantic namespace. | Base + semantic. | 1 per build (the active pack). |
| `vocabulary` | Semantic primitive definitions. | Component (per-pack defaults). | 1+ per build (vocabulary packs union; last-loaded wins on conflict). |
| `implementation` | Compile target (emit function). | Emission. | 1 per build. |
| `theme` | Override selected canonical token values without adding new tokens. | Sits between active token pack and project overrides. | 0 or 1 per build. |
| `pattern` | Pre-composed UI primitive (hero, footer, pricing tiers, etc.) as a Quoin semantic element. | Component layer; behaves like a vocabulary pack for resolution purposes. | 0+ per build. |
| `icon` | Icon set exposed as `<icon name="X" size="md">` semantic elements. | Component layer; consumed by the impl pack at emit time. | 0+ per build (multiple icon packs co-exist; consumer disambiguates via the active-pack list). |
| `template` | Pre-composed full site or full page that scaffolds via the CLI. **Not compiled at build time**; templates are scaffold-and-install artefacts. | Distribution. | N/A — templates produce starter projects, they are not consumed during compilation of an existing project. |

## 2. Composition order at compile time

When the compiler runs on a source file, it resolves the active pack stack in this order:

1. **Token pack** (`type: "token"`) — supplies base palette + semantic namespace.
2. **Theme pack** (`type: "theme"`), if present — overrides selected canonical values from the token pack.
3. **Project overrides** (`quoin.tokens.json`), if present — final override layer.
4. **Vocabulary packs** (`type: "vocabulary"`) — register primitives in declaration order.
5. **Pattern packs** (`type: "pattern"`) — register pattern primitives. Pattern packs share the vocabulary pack resolution path; semantic tag collisions follow the vocabulary rules in [`spec.md` §4.3](spec.md).
6. **Icon packs** (`type: "icon"`) — register icon glyphs by name. Multiple icon packs co-exist; the consumer disambiguates via the active-pack list or per-`<icon>` `pack` attribute.
7. **Implementation pack** (`type: "implementation"`) — receives the resolved token map + the registered primitives + the icon registry and emits final HTML + CSS.

Template packs do not participate in this flow. A template pack's contents become a new project's source on `npx @quoin/create <template-name>`; from that point onward the new project composes against its own active pack stack.

## 3. Type interop

- Existing `token`/`vocabulary`/`implementation` packs continue working unchanged. The new pack types layer on top of the existing protocol.
- A theme pack MUST NOT introduce names outside the canonical semantic namespace in [`tokens.md`](tokens.md) §3. Themes override existing names only.
- A pattern pack MAY register any kebab-case semantic tag that doesn't collide with a v1 vocabulary primitive. Collisions across pattern packs follow the last-loaded-wins rule from [`spec.md` §4.3](spec.md).
- An icon pack's semantic tag is always `<icon>`; multiple icon packs disambiguate via the `pack` attribute (`<icon pack="solar" name="home" />`) or via load order.

## 4. Distribution

Every pack distributes as an npm package under `@quoin/*`:

- Token packs: `@quoin/tokens-{name}`
- Vocabulary packs: `@quoin/vocab-{name}`
- Implementation packs: `@quoin/impl-{name}`
- Theme packs: `@quoin/theme-{name}`
- Pattern packs: `@quoin/pattern-{name}`
- Icon packs: `@quoin/icons-{name}`
- Template packs: `@quoin/template-{name}`

The pack name is the `name` field in `package.json` and `quoin.pack.json`.

## 5. Cross-references

- [`pack-format.md`](pack-format.md) — original three pack types + universal manifest fields.
- [`tokens.md`](tokens.md) — canonical semantic-token namespace that themes override.
- [`primitives.md`](primitives.md) — v1 vocabulary primitives that pattern packs extend.
- [`spec.md`](spec.md) — authoring syntax, cascade rules, compilation model.
