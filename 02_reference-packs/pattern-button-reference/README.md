# @quoin/pattern-button-reference

Reference pattern pack for Quoin. Ships a single `<action-button>`
primitive demonstrating the full pattern-pack contract — category +
variant + states + microStates declared in the manifest, full attribute
matrix in the primitive definition.

## What a pattern pack does

Pattern packs share the vocabulary-pack resolution pipeline. The
compiler merges pattern primitives into the same primitive registry,
so `<action-button>` is dispatched identically to a vocabulary-pack
primitive. The difference is purely declarative: pattern packs declare
their category + variant + states up front, which lets composing
templates and impl packs introspect the pattern set.

## Composition

```ts
import {
  compile,
  loadTokenPack,
  loadVocabularyPack,
  loadPatternPack,
  loadImplementationPack
} from "@quoin/compiler";

const tokenPack = await loadTokenPack("./node_modules/@quoin/tokens-baseline");
const vocabPack = await loadVocabularyPack("./node_modules/@quoin/vocab-essentials");
const patternPack = await loadPatternPack("./node_modules/@quoin/pattern-button-reference");
const implPack = await loadImplementationPack("./node_modules/@quoin/impl-tailwind");

compile({
  source: '<action-button intent="primary">Save</action-button>',
  tokenPack,
  vocabularyPacks: [vocabPack],
  patternPacks: [patternPack],
  implementationPack: implPack
});
```

## States and microStates

- **states** — `default`, `hover`, `active`, `disabled`, `loading`.
- **microStates** — `default`, `focus`, `focus-visible`.

The impl pack reads these from the manifest to wire CSS pseudo-class
selectors at emission time. Patterns MUST include `default` in `states`
and both `default` and `focus` in `microStates`.

## License

MIT.
