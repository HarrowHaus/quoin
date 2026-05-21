# Anatomy extraction rules

Per-format procedures for extracting specification-conformant anatomy from external sources, used by the [pattern-translator skill](../../skills/quoin-pattern-translator.md).

**Scope.** These rules cover the mechanical extraction step. The strategic decisions (which sources to harvest from, what passes quality gates, how composition rules interact) are governed by [`docs/sources/SOURCES.md`](../sources/SOURCES.md) and [`docs/translation/quality-gates.md`](quality-gates.md) respectively.

**Output target.** Every extraction procedure produces the same downstream representation: a candidate Quoin pack draft (the four files: `quoin.pack.json`, `primitives/index.json`, README structure, examples). The format-specific procedures differ in their inputs and confidence levels, not in their outputs.

---

## D.1 — HTML + CSS extraction

**Input.** A self-contained HTML file with a `<style>` block (or referenced CSS) demonstrating the source pattern. Highest-fidelity input class.

**Procedure.**

1. **Identify the outermost structural element.** This is the root of the pattern. Its tag (`<section>`, `<dialog>`, `<nav>`, etc.) and any landmark `role` go into the anatomy as the pattern's element.
2. **Walk the DOM tree once, depth-first.** For each element, record:
   - The element tag.
   - Class list, but treat class names as *implementation labels*, not as part of the anatomy. The anatomy is the slot graph; class names get rewritten to Quoin's `data-pattern="<pattern>-<slot>"` convention per v3.G.15.
   - ARIA attributes (`role`, `aria-*`). These propagate into Quoin's anatomy. ARIA roles are part of the contract.
   - `data-*` attributes that bear variant or state semantics. Source-system `data-*` names get renamed per v3.G.16 (e.g., source `data-position="top"` → Quoin `data-alignment="top"` if it expresses alignment).
   - Inline `style` attributes — flag for review; the anatomy should reference tokens, not inline literals.
3. **Identify mandatory vs conditional slots.** A slot is mandatory if every variant in the source's documented variant set includes it. A slot is conditional if it's present in some variants only — record the gating variant value.
4. **Identify variant axes.** Look for source attributes that toggle between rendering states (`data-variant`, `data-size`, `data-intent`, `data-disabled`, etc.). For each axis, list the values; collapse synonyms per Quoin naming convention (§D.6).
5. **Extract token bindings.** In the source CSS, every property value that's a `var(--*)` reference is a token binding. Record which slot consumes which token. Hardcoded literal values (`color: #1d1a16;`) are anti-patterns — replace with token references during translation (use the closest tokens-baseline equivalent and document the substitution in Translation Notes).
6. **Extract composition lineage.** If the source pattern references another pattern's class names (e.g., `.action-button`, `.label`), the source pattern composes that peer pattern. Record the composition.
7. **Output the candidate Quoin draft.** Produce the primitives/index.json shape with mandatory slots, conditional slots, variant axes, token references, and composition lineage.

**Worked example.** ARIA APG's disclosure pattern HTML:

```html
<div class="disclosure">
  <button aria-expanded="false" aria-controls="content-1">Toggle</button>
  <div id="content-1" hidden>Hidden content body.</div>
</div>
```

Extraction:
- Root: `<div>` with class `disclosure` → Quoin slot `disclosure-container` (data-pattern).
- Child 1: `<button>` with `aria-expanded`, `aria-controls` → Quoin slot `disclosure-trigger`. The `aria-expanded` is a state attribute (not a variant); it's mandatory ARIA on the trigger.
- Child 2: `<div>` with `id`, `hidden` → Quoin slot `disclosure-content`. The `hidden` attribute is the closed state; `aria-controls` from the trigger references this.
- No variant axes detected (single rendering).
- No peer-pack composition detected.
- ARIA contract: trigger has aria-expanded + aria-controls; content has matching id.

**Confidence.** HIGH. HTML + CSS reference is the most direct fidelity path.

---

## D.2 — Web component extraction

**Input.** A Custom Element class definition (or LitElement / Stencil / similar). May include shadow DOM templates.

**Procedure.**

1. **Read `static get observedAttributes()`.** Each observed attribute is a candidate variant axis. Record the attribute name and the values the implementation handles.
2. **Read the shadow DOM template (or render() function).** Walk the template the same way D.1 walks an HTML tree:
   - `<slot>` elements in the template indicate composable slots. Their `name` attribute is the slot name; an unnamed `<slot>` is the default content slot.
   - Static template elements (non-`<slot>`) are anatomy primitives the pattern owns.
3. **Map attributes to `data-*` per v3.G.15.** A web component's `expanded` attribute becomes `data-expanded`. A `variant` attribute becomes `data-variant`. Boolean attributes (presence = true) become `data-*="true|false"` with explicit values for clarity.
4. **Capture lifecycle behavior as ARIA + microstate, not as JS.** A web component may have `connectedCallback` setting `role` or `aria-*` programmatically. Translate that to the anatomy's static ARIA contract — the role / aria-* attributes are declared in the markup, not set by JS.
5. **Drop framework binding.** LitElement decorators, Stencil prop accessors, Shadow DOM scoping — these are framework concerns that do not translate. Quoin's pattern emits HTML + CSS, not a web component.
6. **Output the candidate Quoin draft.** Same as D.1.

**Worked example.** A `<md-text-button>` web component (Material Web):

```ts
@customElement('md-text-button')
export class MdTextButton extends LitElement {
  @property({type: Boolean}) disabled = false;
  @property({type: String}) trailingIcon = '';
  render() {
    return html`<button ?disabled=${this.disabled}>
      <slot></slot>
      ${this.trailingIcon ? html`<span class="trailing">${this.trailingIcon}</span>` : ''}
    </button>`;
  }
}
```

Extraction:
- Component name → Quoin pattern name (renamed per §D.6 — not `md-text-button` but the closest anatomy name; in this case, `pattern-button-system` already exists with the same anatomy, so this would be a name conflict to reconcile).
- Observed attributes `disabled`, `trailingIcon` → `data-disabled`, `data-trailing-icon`. `disabled` is a state. `trailingIcon` is a conditional slot.
- Slots: default content; conditional trailing-icon slot when `data-trailing-icon` set.

**Confidence.** HIGH. Web component source is structurally close to anatomy.

---

## D.3 — JSX / TSX extraction

**Input.** A React / Vue / Solid / Svelte component source file.

**Procedure.**

1. **Identify prop types.** Type definitions (`interface Props { … }`, prop declarations in component args) reveal the variant axes. Boolean props are typically state attributes; enum-typed string props are variant axes; children prop or render props are slots.
2. **Identify the rendered JSX tree.** Walk the JSX the same way D.1 walks an HTML tree. Note that JSX `{prop}` interpolations introduce conditional slots — wherever a prop is conditionally rendered, that's a slot whose presence depends on a variant.
3. **Identify imported peer components.** If the source pattern imports `Button` from another file, that's a peer-pack composition. Translate it to Quoin's `peerPacks` declaration.
4. **Ignore framework binding.** `useState`, `useEffect`, `forwardRef`, `useContext` — these are framework concerns. Quoin's pattern does not inherit React's binding mechanism. The behavior these hooks implement may translate to companion-JS, but the framework binding does not.
5. **Drop derived JSX.** Components that derive their structure from data (e.g., `items.map(item => …)`) translate to "the pattern has a repeatable slot for items"; the loop structure does not carry over.
6. **Output the candidate Quoin draft.** Same as D.1.

**Worked example.** A shadcn-style Tabs component (simplified):

```tsx
type TabsProps = {
  defaultValue: string;
  orientation?: 'horizontal' | 'vertical';
  children: React.ReactNode;
};
export function Tabs({defaultValue, orientation = 'horizontal', children}: TabsProps) { … }
```

Extraction:
- Props → variant axes: `defaultValue` is state; `orientation` is a variant axis with values `horizontal | vertical`; `children` is the default slot containing TabsList + TabsContent.
- Pattern composes its own TabsList, TabsTrigger, TabsContent sub-patterns → Quoin's tabs pattern declares those as slots, not as separate packs (unless they're independently reusable).

**Confidence.** MEDIUM. JSX composition is often deeply inlined; teasing out anatomy requires care.

---

## D.4 — Design spec extraction

**Input.** A published anatomy specification — Material Design's component guidelines pages, Polaris's documentation pages, Carbon's design specs, etc. Markdown / MDX / HTML pages with prose + diagrams.

**Procedure.**

1. **Find the anatomy section.** Most design specs have a section titled "Anatomy," "Structure," or "Parts." Read it carefully.
2. **Extract slot names from the spec's diagrams or lists.** Material's anatomy diagrams label each slot; translate the labels to Quoin slot names per §D.6.
3. **Cross-reference against an implementation when possible.** Design specs are sometimes aspirational — they describe what the component *should* be, while the implementation has drifted. When both are available, the implementation is the source of truth for what the pattern actually does; the spec is the source of truth for what the component is *intended* to do. Translate the intersection.
4. **Watch for opinion vs anatomy.** Design specs mix aesthetic opinions (color choices, motion specs, padding values) with anatomy (slots, variants). Aesthetic opinions are discarded — Quoin's aesthetic-pack layer handles those. Anatomy is preserved.
5. **Output the candidate Quoin draft.** Same as D.1.

**Confidence.** MEDIUM for anatomy; LOW for behavior (specs often gloss over interaction states).

---

## D.5 — Wireframe image extraction

**Input.** A screenshot or rendered image of the source pattern. No code, no spec — just pixels.

**Procedure.**

1. **Identify visual regions.** Hero block, header strip, content body, action cluster, etc.
2. **Map regions to candidate slots.** Each visually-distinct region with semantic intent becomes a slot.
3. **Mark every attribute as `(inferred)`** in the candidate's primitives/index.json. Wireframe-derived anatomy is informed guesswork.
4. **Set `confidence: visual-only` in the candidate's pack manifest metadata.** This flag persists until either (a) the operator provides a non-image source for cross-reference, or (b) the operator explicitly approves the visual-only translation for catalog inclusion.
5. **In the README's Translation notes section**, list every inference made. Make the confidence level visible to future readers.
6. **Output the candidate Quoin draft.** Same as D.1, with the visual-only flags throughout.

**Confidence.** LOW. Visual-only translations are last-resort; prefer any other input class when available.

**When to use.** Mostly when the source has no public implementation or spec (e.g., translating a competitor's pattern from a marketing screenshot). The output is a starting draft, not a finished translation.

---

## D.6 — Cross-format normalization

After format-specific extraction, every candidate draft flows through the same normalization step before becoming a Quoin pack.

### Naming normalization

- Pattern name follows Quoin's anatomy-based naming convention (`pattern-<anatomy-name>`). Sources don't dictate the name. See [translation skill §6](../../skills/quoin-pattern-translator.md#section-6).
- Slot names use Quoin's `<pattern>-<slot>` short form per v3.G.15. Source slot names are translated, not copied.
- Variant axis names use Quoin's `data-*` convention. Source attribute names are translated:
  - source `data-position` describing alignment → Quoin `data-alignment`
  - source `data-text-align` describing alignment → Quoin `data-alignment`
  - source `data-variant` of any kind → Quoin's `data-variant` (when it expresses the major variant axis) or a more specific axis name (`data-layout`, `data-palette`, etc.)
  - source `data-register` → REJECTED (per v3.G.16); the operator must choose between `data-alignment`, `data-mode`, or another more-specific axis

### Token normalization

- Every CSS value referenced from the anatomy is a token reference (`var(--token-name)`). Source literal values (hex colors, pixel dimensions) are mapped to the closest tokens-baseline equivalent. The substitution is recorded in the README's Translation notes.
- Source-system tokens (e.g., `var(--md-sys-color-primary)`) are mapped to Quoin's baseline tokens (`var(--accent)`). The mapping is the operator's translation decision, documented in the README.

### Composition normalization

- Composition declarations land in `quoin.pack.json` under `peerPacks` (always-composed) or `optionalPeerPacks` (variant-conditionally composed, per v3.G.21).
- Reverse-lineage tables in the peer packs' READMEs are updated per D.82. The translation does not pass quality gates if reverse-lineage is missing.

### ARIA normalization

- ARIA roles, properties, and states from the source are preserved verbatim. ARIA is its own standardization layer; Quoin does not paraphrase it.
- When the source's ARIA is incomplete or incorrect, the translation fixes it according to the current WAI-ARIA specification. The fix is documented in Translation notes.

### Microstate normalization

- Microstate names follow Quoin's set: `default`, `hover`, `active`, `focus`, `focus-visible`, `disabled`, `loading`, `selected`. Source microstate names that don't match (e.g., source's `pressed`) are mapped to the Quoin set (`active` for `pressed`).
- Microstate-bearing tokens (`hover-color`, `focus-ring`) come from tokens-baseline.

---

## D.7 — Quoin IR native ingest (future state)

This section anticipates the state where sources publish Quoin IR directly. In 2026, this is a no-op — no source publishes Quoin IR yet. Documenting the procedure makes the specification framing concrete and prepares the catalog for the eventual transition.

**Input.** A file or feed published by a source maintainer in Quoin IR format. The file conforms to the canonical Quoin IR specification schema (`Quoin-IR-Specification.md`, to be published at Phase 23.5).

**Procedure.**

1. **Validate the IR against the canonical schema.** Use the same validator that ships with Phase 23's IR engine. If validation passes, proceed. If validation fails, surface validation errors to the source maintainer.
2. **Check for conflicts with existing Quoin patterns.** If a source-published IR claims a pattern name that's already in Quoin's catalog (because Quoin previously translated it), reconcile by either:
   - **Retiring Quoin's translation** in favor of the source's native publication (the preferred path). The translation pack becomes a re-export of the source's published IR. The translation's commit history is preserved in the pack's README "Source attribution → migrated to native publication on [date]."
   - **Maintaining both** if Quoin's translation captured a meaningfully different anatomy (rare; should require operator approval and a public rationale).
3. **Register the source as natively-publishing** in [`docs/sources/SOURCES.md`](../sources/SOURCES.md) under the "Future state" section. Track the pattern list and migration date.
4. **No translation work happens.** The IR is accepted directly. The skill's transitional infrastructure is bypassed — by design.

**Confidence.** VERY HIGH (definitionally — the source is publishing the canonical contract).

**Trigger.** No trigger in 2026. The trigger fires when the first source — most likely W3C ARIA APG via the standards-track engagement after Phase 23.5 — publishes Quoin IR for one or more patterns.

---

## License

MIT.
