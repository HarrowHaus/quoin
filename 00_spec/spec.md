# Quoin Specification

**Version:** 0.1 (draft)
**Status:** Phase 0 working draft. Subject to refinement before phase 0 exit.

## 1. Concept

Quoin is a build-time semantic compilation layer for web user interfaces. Authors write HTML containing **semantic elements** — custom tags whose names describe intent, not implementation. A compiler resolves those elements against three layered packs (tokens, vocabulary, implementation) and emits standard HTML and CSS. The browser receives no Quoin-specific runtime.

### 1.1 Conceptual antecedents

- **Christopher Alexander, *A Pattern Language* (1977)** — design grammars composed of named, reusable patterns with explicit rules of composition. Quoin primitives are pattern instances; the spec is the grammar.
- **Web Components (W3C)** — custom elements registered against the browser. Quoin can use customElements registration as a fallback rendering path for environments without build-time compilation.
- **DaisyUI** — established the appetite for semantic compression on top of utility-first CSS. Quoin extends one level higher (elements rather than class names).
- **Tailwind v4** — three-tier token architecture exposed as native CSS custom properties. Quoin's token model conforms to this convention.
- **W3C DTCG** — token file format. Quoin token packs are DTCG-compliant JSON.

## 2. Authoring syntax

### 2.1 Element form

A Quoin element is an HTML element whose tag name matches a primitive defined in an active vocabulary pack. Element names use kebab-case and contain at least one hyphen (per the W3C custom element naming requirement).

```html
<authority-mark>Submit</authority-mark>
<recede-block>Supporting content here.</recede-block>
<density-grid intent="dashboard" density="dense">
  <emphasis-card>...</emphasis-card>
  <emphasis-card>...</emphasis-card>
</density-grid>
```

### 2.2 Attribute system

Five canonical attributes are reserved across all primitives. Vocabulary packs MAY define additional primitive-specific attributes but MUST NOT redefine the canonical five.

| Attribute | Values | Default | Purpose |
|-----------|--------|---------|---------|
| `intent` | `primary`, `secondary`, `tertiary`, `supporting`, `critical`, `success`, `warning`, `info` | `primary` (on actions), `secondary` (on content) | Functional role |
| `register` | `formal`, `technical`, `editorial`, `casual`, `dense` | `formal` | Tone / level of formality |
| `density` | `sparse`, `normal`, `dense`, `ultra` | `normal` | Visual information density |
| `weight` | `recede`, `normal`, `emphasize`, `dominate` | `normal` | Visual prominence within siblings |
| `scope` | `block`, `inline`, `ambient` | per-primitive | Layout participation mode |

### 2.3 Composition

Quoin elements may contain other Quoin elements, standard HTML elements, or text. Composition rules (which primitives can contain which) are defined per-primitive in `primitives.md`.

## 3. Cascade and inheritance

### 3.1 Attribute cascade

A primitive instance inherits unset canonical attributes from its nearest enclosing Quoin ancestor. Inheritance applies only to canonical attributes; primitive-specific attributes do not cascade.

```html
<density-grid density="dense">
  <emphasis-card>          <!-- inherits density="dense" -->
    <primary-action>OK</primary-action>   <!-- inherits density="dense" -->
  </emphasis-card>
</density-grid>
```

### 3.2 Token resolution

Primitives reference semantic tokens (from `tokens.md`), never base tokens directly. The active token pack supplies values for the semantic token namespace. The implementation pack maps semantic token references to the output format (Tailwind class names, raw CSS custom properties, etc.).

```
primitive references:  --text-emphasis
token pack provides:   --text-emphasis: var(--color-stone-900)
impl pack emits:       class="text-stone-900"   (Tailwind impl)
                       or
                       style="color: var(--text-emphasis)"   (raw CSS impl)
```

### 3.3 Override precedence

From highest to lowest:
1. Inline attribute on the element instance.
2. Inherited canonical attribute from a Quoin ancestor.
3. Primitive default from the vocabulary pack.
4. Implementation pack fallback.

## 4. Pack composition

A Quoin build requires exactly one **implementation pack**, exactly one **token pack**, and one or more **vocabulary packs**. Pack types are described in detail in `pack-format.md`.

### 4.1 Vocabulary merging

When multiple vocabulary packs are loaded, primitive name collisions are resolved by load order (last loaded wins). A build warning is emitted on every collision.

### 4.2 Token override

A project MAY supply a project-local token override file that takes precedence over the active token pack on a per-token basis. This is the primary mechanism for branding a Quoin build with project-specific tokens without forking a token pack.

### 4.3 Implementation hooks

The active implementation pack supplies one emit function per primitive. If a primitive in the vocabulary pack has no corresponding emitter in the implementation pack, the build fails with an explicit error listing the missing emitter(s).

## 5. Compilation model

### 5.1 Pipeline

1. **Parse.** Source HTML is parsed into a DOM-like tree.
2. **Identify.** Elements whose tag names match registered primitive names are marked for transformation.
3. **Resolve attributes.** Canonical attributes are computed by cascade. Primitive-specific attributes are validated.
4. **Resolve tokens.** Semantic token references in the primitive definition are resolved against the active token pack.
5. **Emit.** The implementation pack's emit function is invoked for each Quoin element. It receives the resolved element node and returns a standard HTML node plus any required CSS.
6. **Replace.** The Quoin element in the source tree is replaced with the emitted output.
7. **Serialize.** The transformed tree is serialized to HTML. Any emitted CSS is collected into a single stylesheet output.

### 5.2 Output guarantees

- The compiled output contains zero Quoin-specific tags. All Quoin elements are replaced with standard HTML.
- The compiled output requires zero runtime dependencies. The browser sees only HTML + CSS.
- The compiled output is deterministic. Given identical inputs (source + packs + project tokens), the compiler produces identical output.

### 5.3 Error model

The compiler fails the build on:
- An unknown primitive (tag name not in any loaded vocabulary pack).
- A token reference that the active token pack does not satisfy.
- A primitive whose emitter is missing in the active implementation pack.
- A primitive-specific attribute outside its declared value set.

The compiler emits warnings (but does not fail) on:
- Primitive name collisions between loaded vocabulary packs.
- Unused tokens in the active token pack.
- Primitives in the loaded vocabulary that are not used in any source file.

## 6. Web Components fallback

For environments where build-time compilation is impractical (CMS preview pages, static HTML served without a build step), an optional Quoin runtime registers every primitive in the active vocabulary pack as a custom element via `customElements.define`. The runtime performs the same resolution and emission steps as the compiler, in-browser, on connect.

The fallback is opt-in and ships as a separate package (`@quoin/runtime`). Production deployments are expected to use the build-time compiler.

## 7. Versioning

Quoin follows semantic versioning at the spec level. Pack versioning is defined in `pack-format.md` and is independent of the spec version, with a declared compatibility range in each pack's manifest.

## 8. Cross-references

- Pack manifest format and file structure: `pack-format.md`
- Initial v1 semantic primitives: `primitives.md`
- Token architecture and canonical namespace: `tokens.md`
