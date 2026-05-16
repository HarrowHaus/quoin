/**
 * @quoin/impl-tailwind — canonical Tailwind v4 emitter.
 *
 * Design rule: structural utilities (flex, grid, padding, margin) emit
 * plain Tailwind class names. Token-bearing utilities (colour,
 * typography, border-colour, radius, spacing-token references) emit
 * Tailwind v4 arbitrary-value classes that reference CSS custom
 * properties:
 *
 *   token reference        emitted class
 *   --accent           ->  bg-[var(--accent)]
 *   --text-emphasis    ->  text-[var(--text-emphasis)]
 *   --border           ->  border-[var(--border)]
 *   --radius-card      ->  rounded-[var(--radius-card)]
 *
 * The pack is therefore token-pack agnostic — any DTCG pack that
 * supplies the canonical semantic namespace from 00_spec/tokens.md §2
 * produces the right colours, fonts, and dimensions without changes
 * here.
 *
 * @param {import("@quoin/compiler").EmitInput} input
 * @returns {import("@quoin/compiler").EmitOutput}
 */
export function emit(input) {
  const { primitive } = input;
  const emitter = EMITTERS[primitive.name];
  if (!emitter) return genericFallback(input);
  return emitter(input);
}

/**
 * Generic fallback emitter for any primitive without a dedicated emit
 * function. Uses the primitive's declared `structure.element` as the
 * HTML tag and emits Tailwind arbitrary-value classes for every token
 * reference in the primitive's `tokens` map. This makes impl-tailwind
 * future-proof for any new vocabulary pack that declares primitives
 * with the standard token shape.
 *
 * The mapping from token-property name to Tailwind utility is the same
 * one used inside the per-primitive emitters above:
 *   background      -> bg-[var(...)]
 *   color           -> text-[var(...)]
 *   borderColor     -> border-[var(...)]
 *   borderRadius    -> rounded-[var(...)]
 *   fontSize        -> text-[var(...)]
 *   fontFamily      -> font-[var(...)]
 *   letterSpacing   -> tracking-[var(...)]
 *   lineHeight      -> leading-[var(...)]
 *   maxWidth        -> max-w-[var(...)]
 *   padding         -> p-[var(...)]
 *   gap             -> gap-[var(...)]
 *   ringColor       -> ring-[var(...)]
 */
function genericFallback(input) {
  const { primitive, tokens, attributes, children } = input;
  const utilityFor = {
    background: "bg",
    color: "text",
    borderColor: "border",
    borderRadius: "rounded",
    fontSize: "text",
    fontFamily: "font",
    letterSpacing: "tracking",
    lineHeight: "leading",
    maxWidth: "max-w",
    padding: "p",
    gap: "gap",
    ringColor: "ring"
  };
  const cls = [];
  // borderColor implies border line on layout containers.
  if (primitive.tokens.borderColor) cls.push("border");
  for (const [property, tokenRef] of Object.entries(primitive.tokens)) {
    const utility = utilityFor[property];
    if (!utility) continue;
    // tokens[property] is the resolved raw value; primitive.tokens[property]
    // is the original reference (e.g. "--accent"). We emit the arbitrary-
    // value class against the reference, not the resolved value.
    const ref = tokenRef.startsWith("--") ? tokenRef : `--${tokenRef}`;
    cls.push(`${utility}-[var(${ref})]`);
    void tokens;
  }
  // Pass through any primitive-specific attributes the emitter shouldn't
  // strip (id, data-*, aria-*, name, type, etc.).
  const passthroughAttrs = {};
  for (const [k, v] of Object.entries(attributes.specific)) {
    if (k === "gap" || k === "width" || k === "min-cell-width" || k === "summary") continue;
    passthroughAttrs[k] = v;
  }
  return {
    html: el(
      primitive.structure.element,
      mergeAttrs(structureAttrs(primitive), { ...passthroughAttrs, class: cls.join(" ") }),
      children,
      primitive.children === "none"
    )
  };
}

export default emit;

/* ────────────────────────── helpers ────────────────────────── */

function el(tag, attributes = {}, children = [], voidElement = false) {
  return { type: "element", tag, attributes, children, voidElement };
}

function classes(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

function structureAttrs(primitive) {
  return primitive.structure.attributes ?? {};
}

function mergeAttrs(base, extra) {
  return { ...base, ...extra };
}

function basic(tag, cls, input, extraAttrs = {}, opts = {}) {
  return {
    html: el(
      tag,
      mergeAttrs(extraAttrs, { class: cls }),
      input.children,
      opts.voidElement === true
    )
  };
}

/* shorthand for an arbitrary-value class referencing a CSS var */
const v = (utility, token) => `${utility}-[var(${token})]`;

/* ─────────────────── per-primitive emitters ─────────────────── */

const EMITTERS = {
  /* editorial */

  "authority-mark": (input) =>
    basic(
      "h1",
      classes(
        "font-medium",
        v("text", "--type-size-display"),
        v("font", "--font-display"),
        v("text", "--text-emphasis"),
        v("tracking", "--tracking-tight"),
        v("leading", "--leading-tight")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  "recede-block": (input) =>
    basic(
      "div",
      classes(v("text", "--type-size-base"), v("text", "--text-recede")),
      input,
      structureAttrs(input.primitive)
    ),

  "emphasis-card": (input) =>
    basic(
      "section",
      classes(
        "border shadow-sm",
        v("bg", "--surface-elevated"),
        v("border", "--border"),
        v("p", "--space-card"),
        v("rounded", "--radius-card")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  "reading-flow": (input) =>
    basic(
      "div",
      classes(
        v("text", "--type-size-base"),
        v("text", "--text"),
        v("leading", "--leading-prose"),
        v("max-w", "--measure-prose")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  "aside-note": (input) =>
    basic(
      "aside",
      classes(
        "border-l-2 pl-4 py-2",
        v("bg", "--surface-recessed"),
        v("text", "--text-recede"),
        v("border", "--border")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  "lead-graf": (input) =>
    basic(
      "p",
      classes(
        v("text", "--type-size-xl"),
        v("text", "--text-emphasis"),
        v("leading", "--leading-prose")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  colophon: (input) =>
    basic(
      "footer",
      classes(
        v("text", "--type-size-sm"),
        v("font", "--font-mono"),
        v("text", "--text-recede"),
        v("tracking", "--tracking-wide")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  "pull-quote": (input) =>
    basic(
      "blockquote",
      classes(
        "italic border-l-4 pl-6 my-8",
        v("text", "--type-size-3xl"),
        v("font", "--font-display"),
        v("text", "--text-emphasis"),
        v("border", "--border-emphasis")
      ),
      input,
      structureAttrs(input.primitive)
    ),

  /* layout */

  stack: (input) => {
    const gap = {
      compact: "gap-2",
      comfortable: "gap-4",
      loose: "gap-8"
    }[input.attributes.specific.gap ?? "comfortable"];
    return basic("div", classes("flex flex-col", gap), input);
  },

  cluster: (input) => {
    const density = input.attributes.canonical.density;
    const gap =
      density === "dense" ? "gap-1" : density === "sparse" ? "gap-4" : "gap-2";
    return basic("div", classes("flex flex-wrap", gap), input);
  },

  frame: (input) =>
    basic(
      "div",
      classes(
        "border",
        v("border", "--border"),
        v("p", "--space-frame"),
        v("rounded", "--radius-frame")
      ),
      input
    ),

  "density-grid": (input) => {
    const min = input.attributes.specific["min-cell-width"] || "200px";
    return basic(
      "div",
      classes(`grid grid-cols-[repeat(auto-fill,minmax(${min},1fr))] gap-2`),
      input
    );
  },

  panel: (input) =>
    basic(
      "section",
      classes("shadow-xs", v("bg", "--surface-elevated"), v("p", "--space-panel")),
      input
    ),

  rail: (input) => {
    const width =
      input.attributes.specific.width === "compact" ? "w-48" : "w-64";
    return basic(
      "aside",
      classes(width, "shrink-0 border-r", v("border", "--border"), v("p", "--space-panel")),
      input
    );
  },

  "canvas-block": (input) =>
    basic("main", classes("flex-1 min-w-0", v("p", "--space-panel")), input),

  /* navigation */

  wayfinder: (input) =>
    basic(
      "nav",
      classes(
        "flex items-center gap-6 px-6 py-4 border-b",
        v("bg", "--surface"),
        v("text", "--text"),
        v("border", "--border")
      ),
      input
    ),

  "breadcrumb-trail": (input) =>
    basic(
      "nav",
      classes("flex items-center gap-2", v("text", "--type-size-sm"), v("text", "--text-recede")),
      input,
      { "aria-label": "breadcrumb" }
    ),

  "segment-control": (input) =>
    basic(
      "div",
      classes("inline-flex p-1", v("bg", "--surface-recessed"), v("rounded", "--radius-md")),
      input,
      { role: "tablist" }
    ),

  "jump-list": (input) =>
    basic(
      "nav",
      classes(
        "sticky top-4 flex flex-col",
        v("gap", "--space-stack-compact"),
        v("text", "--type-size-sm"),
        v("text", "--text-recede")
      ),
      input
    ),

  paginator: (input) =>
    basic(
      "nav",
      classes(
        "flex items-center justify-between gap-4 mt-8",
        v("text", "--text"),
        v("border", "--border")
      ),
      input
    ),

  /* state */

  "active-zone": (input) =>
    basic(
      "div",
      classes("ring-2 ring-offset-2", v("bg", "--surface-elevated"), v("ring", "--accent")),
      input
    ),

  "pending-block": (input) =>
    basic(
      "div",
      classes("animate-pulse", v("bg", "--surface-recessed"), v("text", "--text-recede")),
      input,
      { role: "status" }
    ),

  "resolved-mark": (input) =>
    basic("div", classes("font-medium", v("text", "--success")), input),

  "alert-band": (input) => {
    const intent = input.attributes.canonical.intent ?? "info";
    const bgVar = {
      info: "--info",
      success: "--success",
      warning: "--warning",
      critical: "--critical"
    }[intent];
    const textVar = `--text-on-${intent}`;
    return basic(
      "div",
      classes("px-4 py-3 border-l-4", v("bg", bgVar), v("text", textVar), v("border", "--border-emphasis")),
      input,
      { role: "alert" }
    );
  },

  "empty-state": (input) =>
    basic(
      "div",
      classes("flex flex-col items-center justify-center py-16", v("text", "--text-recede")),
      input
    ),

  /* content */

  "media-frame": (input) =>
    basic("figure", classes("overflow-hidden", v("rounded", "--radius-media")), input),

  "figure-cite": (input) =>
    basic(
      "figure",
      classes("flex flex-col", v("gap", "--space-stack-compact"), v("text", "--text-recede")),
      input
    ),

  "data-table": (input) =>
    basic(
      "div",
      classes("overflow-x-auto", v("text", "--type-size-sm"), v("text", "--text")),
      input
    ),

  "key-value-list": (input) =>
    basic(
      "dl",
      classes(
        "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2",
        v("text", "--type-size-sm"),
        v("text", "--text")
      ),
      input
    ),

  "timeline-stack": (input) =>
    basic(
      "ol",
      classes("flex flex-col gap-4 border-l-2 pl-6", v("border", "--border"), v("text", "--text")),
      input
    ),

  "code-block": (input) =>
    basic(
      "pre",
      classes(
        "p-4 overflow-x-auto",
        v("bg", "--surface-recessed"),
        v("rounded", "--radius-md"),
        v("font", "--font-mono"),
        v("text", "--type-size-sm")
      ),
      input
    ),

  /* interactive */

  "primary-action": (input) =>
    basic(
      "button",
      classes(
        "px-4 py-2 font-medium",
        v("bg", "--accent"),
        v("text", "--text-on-accent"),
        v("rounded", "--radius-md")
      ),
      input,
      { type: "button" }
    ),

  "secondary-action": (input) =>
    basic(
      "button",
      classes(
        "px-4 py-2 border",
        v("border", "--border"),
        v("text", "--text"),
        v("rounded", "--radius-md")
      ),
      input,
      { type: "button" }
    ),

  "destructive-action": (input) =>
    basic(
      "button",
      classes(
        "px-4 py-2 font-medium",
        v("bg", "--critical"),
        v("text", "--text-on-critical"),
        v("rounded", "--radius-md")
      ),
      input,
      { type: "button" }
    ),

  "input-cell": (input) => {
    const { type = "text", name = "", placeholder = "" } = input.attributes.specific;
    return {
      html: el(
        "input",
        {
          class: classes(
            "px-3 py-2 border w-full",
            v("border", "--border"),
            v("text", "--text"),
            v("rounded", "--radius-md"),
            v("bg", "--surface")
          ),
          type,
          ...(name ? { name } : {}),
          ...(placeholder ? { placeholder } : {})
        },
        [],
        true
      )
    };
  },

  disclosure: (input) => {
    const summary = input.attributes.specific.summary ?? "Details";
    return {
      html: el(
        "details",
        {
          class: classes("border", v("border", "--border"), v("rounded", "--radius-md"))
        },
        [
          el(
            "summary",
            { class: "px-4 py-2 cursor-pointer" },
            [{ type: "text", value: summary }]
          ),
          ...input.children
        ]
      )
    };
  }
};
