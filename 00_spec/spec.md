# Quoin Specification

**Version:** 0.1
**Status:** Phase 0 — canonical language reference.

## 0. Audience and scope

This document is the canonical language reference. The audience is a compiler engineer building from this spec. Companion documents:

- `pack-format.md` — pack manifest schema, directory structure, JSON Schema, versioning.
- `primitives.md` — the v1 semantic vocabulary.
- `tokens.md` — the canonical semantic token namespace and three-layer model.

Quoin is build-time. The browser sees standard HTML and CSS. There is no runtime parser, no shadow-DOM trickery, no proprietary engine.

## 1. Concept

Quoin is a build-time semantic compilation layer for web user interfaces. Authors write HTML containing **semantic elements** — custom tags whose names describe intent, not implementation. A compiler resolves those elements against three layered packs (tokens, vocabulary, implementation) and emits standard HTML and CSS.

```
authoring        compilation         browser
─────────        ───────────         ───────
<primary-action>   ─compiler─►   <button class="...">
  Save                              Save
</primary-action>                  </button>
```

### 1.1 Intellectual lineage

| Source | What Quoin takes from it |
|--------|--------------------------|
| **Christopher Alexander, *A Pattern Language* (1977)** | Design as a generative grammar of named, reusable patterns with explicit rules of composition. Quoin primitives are pattern instances; this specification is the grammar. |
| **Swiss / International Typographic Style** (Müller-Brockmann, Vignelli, Ruder, Aicher) | Hierarchy, restraint, grid as structural principle. Quoin's primitive names (`<authority-mark>`, `<reading-flow>`, `<colophon>`) borrow vocabulary directly from editorial tradition. |
| **Brutalist editorial design** | Function over decoration. Quoin primitives are aesthetic-neutral; visual choices live in token packs. |
| **DaisyUI** | Prior-art validation of semantic compression on top of Tailwind. Quoin extends compression one layer higher — from class names to elements. |
| **Tailwind v4** | The three-tier token model exposed as native CSS custom properties. See `tokens.md`. |
| **W3C DTCG** | Token file format. See `tokens.md` §3 and `pack-format.md` §4.2. |
| **Web Components / W3C Custom Elements** | Tag-name conventions and an optional runtime fallback path (§6). |

## 2. Authoring syntax

### 2.1 Element form

A Quoin element is an HTML element whose tag name matches a primitive declared in a loaded vocabulary pack. Tag names are kebab-case and contain at least one hyphen, per the W3C custom element naming requirement.

```html
<authority-mark>Submit</authority-mark>
<recede-block>Supporting content here.</recede-block>
<density-grid intent="dashboard" density="dense">
  <emphasis-card>...</emphasis-card>
  <emphasis-card>...</emphasis-card>
</density-grid>
```

A Quoin element MAY contain other Quoin elements, standard HTML elements, plain text, or any mixture. Composition rules per primitive are defined in `primitives.md`.

### 2.2 The canonical attribute system

Five canonical attributes are reserved across every primitive. A vocabulary pack MAY define additional primitive-specific attributes; it MUST NOT redefine the canonical five.

| Attribute | Values | Default | Purpose |
|-----------|--------|---------|---------|
| `intent` | `primary` \| `secondary` \| `tertiary` \| `supporting` \| `critical` \| `success` \| `warning` \| `info` | `primary` on actions; `secondary` on content | Functional role |
| `register` | `formal` \| `technical` \| `editorial` \| `casual` \| `dense` | `formal` | Tone / level of formality |
| `density` | `sparse` \| `normal` \| `dense` \| `ultra` | `normal` | Visual information density |
| `weight` | `recede` \| `normal` \| `emphasize` \| `dominate` | `normal` | Visual prominence within siblings |
| `scope` | `block` \| `inline` \| `ambient` | per-primitive | Layout participation mode |

A value outside the declared set is a compile-time error (§5.3).

### 2.3 Primitive-specific attributes

A primitive MAY declare additional attributes in its vocabulary-pack definition. Their value sets and defaults are pack-defined and are validated identically to canonical attributes. See `pack-format.md` §5.2.

```html
<!-- 'gap' is a <stack>-specific attribute defined by @quoin/vocab-editorial -->
<stack gap="loose">
  <authority-mark>Title</authority-mark>
  <reading-flow>...</reading-flow>
</stack>
```

### 2.4 Naming

Primitive names are kebab-case, two or more words, descriptive of editorial or functional role rather than visual form. `<authority-mark>` (role) over `<h1-large>` (implementation). This convention follows Alexander's pattern-naming discipline: a pattern's name names its job.

## 3. Cascade and inheritance

### 3.1 Canonical attribute cascade

A primitive inherits unset canonical attributes from its nearest enclosing Quoin ancestor. Inheritance applies **only** to the five canonical attributes. Primitive-specific attributes never cascade.

```html
<density-grid density="dense">
  <emphasis-card>                          <!-- inherits density="dense" -->
    <primary-action>OK</primary-action>    <!-- inherits density="dense" -->
  </emphasis-card>
  <emphasis-card density="normal">         <!-- own value wins -->
    <primary-action>Cancel</primary-action><!-- inherits density="normal" -->
  </emphasis-card>
</density-grid>
```

### 3.2 Token resolution

Primitives reference **semantic tokens** (see `tokens.md` §2), never base tokens directly. The active token pack supplies the values; the implementation pack maps semantic-token references to its output format.

```
primitive declares:    color: --text-emphasis
token pack supplies:   --text-emphasis: var(--color-stone-900)
impl-tailwind emits:   class="text-stone-900"
impl-raw-css emits:    style="color: var(--text-emphasis)"
```

### 3.3 Override precedence

From highest to lowest:

1. Inline attribute on the element instance.
2. Inherited canonical attribute from a Quoin ancestor.
3. Primitive default from the vocabulary pack.
4. Implementation pack fallback (only legal for canonical attributes).

Token overrides follow a parallel precedence (`tokens.md` §5):

1. Project-local `quoin.tokens.json`.
2. Active token pack.
3. Implementation pack defaults (for tokens not in the canonical namespace).

## 4. Pack composition

A Quoin build requires:

- Exactly one **implementation pack**.
- Exactly one **token pack**.
- One or more **vocabulary packs**.

Pack types and manifest schema are defined in `pack-format.md`.

### 4.1 Vocabulary merging

When multiple vocabulary packs are loaded, primitive-name collisions are resolved by load order — last loaded wins. A build warning is emitted on every collision, naming both packs and the collided primitive.

### 4.2 Token override

A project-local `quoin.tokens.json` takes precedence over the active token pack on a per-token basis. This is the primary branding mechanism: override `--accent` and `--font-display`, ship.

### 4.3 Implementation hooks

The implementation pack supplies one emit function per primitive (see `pack-format.md` §6.2). If a primitive in any loaded vocabulary pack has no corresponding emitter, the build fails with an error listing every missing emitter.

### 4.4 Capability negotiation

A token pack MAY declare optional capabilities (e.g., elevation tokens — `tokens.md` §2.9). An implementation pack MAY declare which capabilities it can render. The compiler resolves the intersection. Missing optional capabilities are not errors; the implementation falls back to declared substitutes.

## 5. Compilation model

### 5.1 Pipeline

1. **Parse.** Source HTML is parsed into a DOM-like tree.
2. **Identify.** Elements whose tag names match registered primitive names are marked for transformation.
3. **Resolve attributes.** Canonical attributes are computed by cascade (§3.1). Primitive-specific attributes are validated.
4. **Resolve tokens.** Semantic-token references on each primitive are resolved against the active token pack (§3.2).
5. **Emit.** The implementation pack's emit function is invoked per Quoin element. It returns a standard HTML node plus any required CSS.
6. **Replace.** The Quoin element is replaced in the source tree with the emitted output.
7. **Serialize.** The transformed tree is serialized to HTML. Emitted CSS is collected into a single stylesheet output (or merged with the existing Tailwind class harvest, per implementation pack).

### 5.2 Output guarantees

- Zero Quoin-specific tags survive compilation.
- Zero Quoin-specific runtime dependencies are required at render time.
- Output is deterministic. Given identical inputs (source + packs + project tokens), the compiler produces byte-identical output.
- Output is human-readable. Emitted HTML is indented consistently; class strings are alphabetized within the impl-tailwind target.

### 5.3 Error model

The compiler **fails the build** on:

- An unknown primitive (tag name not in any loaded vocabulary pack).
- A canonical or primitive-specific attribute outside its declared value set.
- A semantic-token reference the active token pack does not satisfy.
- A primitive whose emitter is missing in the active implementation pack.
- A circular `$value` reference in the token graph.

The compiler **emits warnings** on:

- Primitive-name collisions between loaded vocabulary packs.
- Tokens declared by the token pack but never referenced by any loaded vocabulary.
- Primitives declared by a vocabulary pack but never used in any source file.

Error messages always include: file path, line, column, primitive name (if applicable), pack name (if applicable), and the offending attribute or token reference. Example:

```
ERROR  src/pages/home.html:42:8
  Unknown attribute value: density="extreme" on <density-grid>
  Allowed: sparse | normal | dense | ultra
  Primitive declared in @quoin/vocab-editorial@1.0.0
```

## 6. Web Components fallback

For environments without a build step (CMS preview, static HTML served as-is), an optional runtime registers every primitive in the active vocabulary pack as a custom element via `customElements.define`. The runtime performs the same resolution and emission steps as the build-time compiler, in-browser, on `connectedCallback`.

The fallback is opt-in, ships separately as `@quoin/runtime`, and is **not** intended for production. Production deployments use the build-time compiler.

## 7. Versioning

- The spec itself follows semver. `0.x` releases are explicitly unstable; `1.0` declares the public contract.
- Packs version independently of the spec. Each pack declares a `quoinVersion` semver range in its manifest (`pack-format.md` §3.1).
- Breaking changes to a primitive's attributes or token references are major. Additive changes are minor. Documentation-only changes are patch. See `pack-format.md` §8.

## 8. Compliance

A compliant Quoin compiler:

1. Parses source HTML to a tree.
2. Implements the cascade and override precedence of §3 exactly.
3. Fails the build on every condition in §5.3.
4. Produces output matching the determinism guarantee in §5.2.
5. Validates loaded packs against the schemas in `pack-format.md` §9.

A compliant token pack: see `tokens.md` §6.
A compliant vocabulary pack: see `pack-format.md` §5.
A compliant implementation pack: see `pack-format.md` §6.

## 9. Cross-references

- Pack manifest schema, directory layout, validation: `pack-format.md`
- The v1 semantic vocabulary (36 primitives): `primitives.md`
- The canonical semantic token namespace and DTCG file format: `tokens.md`
