/**
 * @quoin/impl-raw-css — raw CSS emitter.
 *
 * Emits HTML elements with inline `style` attributes referencing the
 * canonical semantic-token CSS custom properties. Zero framework
 * dependency: the only runtime cost is whatever stylesheet the token
 * pack ships to define the variables (e.g. @quoin/tokens-baseline's
 * tokens.css).
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
 * Generic fallback for any primitive without a dedicated emit fn.
 * Emits the declared structure.element with an inline style attribute
 * built from the primitive's token map. Makes impl-raw-css future-proof
 * for any new vocab pack that declares primitives with the standard
 * token shape.
 */
function genericFallback(input) {
  const { primitive, attributes, children } = input;
  const cssFor = {
    background: "background",
    color: "color",
    borderColor: "border-color",
    borderRadius: "border-radius",
    fontSize: "font-size",
    fontFamily: "font-family",
    letterSpacing: "letter-spacing",
    lineHeight: "line-height",
    maxWidth: "max-width",
    padding: "padding",
    gap: "gap",
    ringColor: "box-shadow"
  };
  const decls = {};
  if (primitive.tokens.borderColor) {
    decls.border = `1px solid var(${normaliseRef(primitive.tokens.borderColor)})`;
  }
  for (const [property, ref] of Object.entries(primitive.tokens)) {
    if (property === "borderColor") continue; // handled above
    const cssProp = cssFor[property];
    if (!cssProp) continue;
    const v = `var(${normaliseRef(ref)})`;
    decls[cssProp] = property === "ringColor" ? `0 0 0 2px ${v}` : v;
  }
  const passthroughAttrs = {};
  for (const [k, v] of Object.entries(attributes.specific)) {
    if (k === "gap" || k === "width" || k === "min-cell-width" || k === "summary") continue;
    passthroughAttrs[k] = v;
  }
  return {
    html: el(
      primitive.structure.element,
      { ...(primitive.structure.attributes ?? {}), ...passthroughAttrs, style: style(decls) },
      children,
      primitive.children === "none"
    )
  };
}

function normaliseRef(ref) {
  return ref.startsWith("--") ? ref : `--${ref}`;
}

export default emit;

/* ────────────────────────── helpers ────────────────────────── */

function el(tag, attributes = {}, children = [], voidElement = false) {
  return { type: "element", tag, attributes, children, voidElement };
}

function style(decls) {
  return Object.entries(decls)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
    .join("; ");
}

function camelToKebab(s) {
  return s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

function v(token) {
  return `var(${token})`;
}

function structureAttrs(primitive) {
  return primitive.structure.attributes ?? {};
}

function emitElement(tag, declarations, input, extraAttrs = {}, voidElement = false) {
  return {
    html: el(
      tag,
      { ...extraAttrs, style: style(declarations) },
      input.children,
      voidElement
    )
  };
}

/* ─────────────────── per-primitive emitters ─────────────────── */

const EMITTERS = {
  /* editorial */

  "authority-mark": (input) =>
    emitElement(
      "h1",
      {
        fontSize: v("--type-size-display"),
        fontFamily: v("--font-display"),
        color: v("--text-emphasis"),
        letterSpacing: v("--tracking-tight"),
        lineHeight: v("--leading-tight"),
        margin: "0",
        fontWeight: "500"
      },
      input,
      structureAttrs(input.primitive)
    ),

  "recede-block": (input) =>
    emitElement(
      "div",
      { fontSize: v("--type-size-base"), color: v("--text-recede") },
      input,
      structureAttrs(input.primitive)
    ),

  "emphasis-card": (input) =>
    emitElement(
      "section",
      {
        background: v("--surface-elevated"),
        border: `1px solid ${v("--border")}`,
        padding: v("--space-card"),
        borderRadius: v("--radius-card"),
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)"
      },
      input,
      structureAttrs(input.primitive)
    ),

  "reading-flow": (input) =>
    emitElement(
      "div",
      {
        fontSize: v("--type-size-base"),
        color: v("--text"),
        lineHeight: v("--leading-prose"),
        maxWidth: v("--measure-prose")
      },
      input,
      structureAttrs(input.primitive)
    ),

  "aside-note": (input) =>
    emitElement(
      "aside",
      {
        background: v("--surface-recessed"),
        color: v("--text-recede"),
        borderLeft: `2px solid ${v("--border")}`,
        paddingLeft: v("--space-4"),
        paddingTop: v("--space-2"),
        paddingBottom: v("--space-2")
      },
      input,
      structureAttrs(input.primitive)
    ),

  "lead-graf": (input) =>
    emitElement(
      "p",
      {
        fontSize: v("--type-size-xl"),
        color: v("--text-emphasis"),
        lineHeight: v("--leading-prose"),
        margin: "0"
      },
      input,
      structureAttrs(input.primitive)
    ),

  colophon: (input) =>
    emitElement(
      "footer",
      {
        fontSize: v("--type-size-sm"),
        fontFamily: v("--font-mono"),
        color: v("--text-recede"),
        letterSpacing: v("--tracking-wide")
      },
      input,
      structureAttrs(input.primitive)
    ),

  "pull-quote": (input) =>
    emitElement(
      "blockquote",
      {
        fontSize: v("--type-size-3xl"),
        fontFamily: v("--font-display"),
        color: v("--text-emphasis"),
        fontStyle: "italic",
        borderLeft: `4px solid ${v("--border-emphasis")}`,
        paddingLeft: v("--space-6"),
        marginTop: v("--space-8"),
        marginBottom: v("--space-8")
      },
      input,
      structureAttrs(input.primitive)
    ),

  /* layout */

  stack: (input) => {
    const gap = {
      compact: v("--space-stack-compact"),
      comfortable: v("--space-stack-normal"),
      loose: v("--space-stack-loose")
    }[input.attributes.specific.gap ?? "comfortable"];
    return emitElement(
      "div",
      { display: "flex", flexDirection: "column", gap },
      input
    );
  },

  cluster: (input) => {
    const density = input.attributes.canonical.density;
    const gap =
      density === "dense"
        ? v("--space-inline-tight")
        : density === "sparse"
        ? v("--space-stack-normal")
        : v("--space-inline-normal");
    return emitElement(
      "div",
      { display: "flex", flexWrap: "wrap", gap },
      input
    );
  },

  frame: (input) =>
    emitElement(
      "div",
      {
        border: `1px solid ${v("--border")}`,
        padding: v("--space-frame"),
        borderRadius: v("--radius-frame")
      },
      input
    ),

  "density-grid": (input) => {
    const min = input.attributes.specific["min-cell-width"] || "200px";
    return emitElement(
      "div",
      {
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))`,
        gap: v("--space-inline-tight")
      },
      input
    );
  },

  panel: (input) =>
    emitElement(
      "section",
      {
        background: v("--surface-elevated"),
        padding: v("--space-panel"),
        boxShadow: "0 1px 1px 0 rgb(0 0 0 / 0.04)"
      },
      input
    ),

  rail: (input) => {
    const width = input.attributes.specific.width === "compact" ? "12rem" : "16rem";
    return emitElement(
      "aside",
      {
        width,
        flexShrink: "0",
        borderRight: `1px solid ${v("--border")}`,
        padding: v("--space-panel")
      },
      input
    );
  },

  "canvas-block": (input) =>
    emitElement(
      "main",
      { flex: "1 1 0%", minWidth: "0", padding: v("--space-panel") },
      input
    ),

  /* navigation */

  wayfinder: (input) =>
    emitElement(
      "nav",
      {
        display: "flex",
        alignItems: "center",
        gap: v("--space-6"),
        paddingLeft: v("--space-6"),
        paddingRight: v("--space-6"),
        paddingTop: v("--space-4"),
        paddingBottom: v("--space-4"),
        borderBottom: `1px solid ${v("--border")}`,
        background: v("--surface"),
        color: v("--text")
      },
      input
    ),

  "breadcrumb-trail": (input) =>
    emitElement(
      "nav",
      {
        display: "flex",
        alignItems: "center",
        gap: v("--space-2"),
        fontSize: v("--type-size-sm"),
        color: v("--text-recede")
      },
      input,
      { "aria-label": "breadcrumb" }
    ),

  "segment-control": (input) =>
    emitElement(
      "div",
      {
        display: "inline-flex",
        padding: v("--space-1"),
        background: v("--surface-recessed"),
        borderRadius: v("--radius-md")
      },
      input,
      { role: "tablist" }
    ),

  "jump-list": (input) =>
    emitElement(
      "nav",
      {
        position: "sticky",
        top: v("--space-4"),
        display: "flex",
        flexDirection: "column",
        gap: v("--space-stack-compact"),
        fontSize: v("--type-size-sm"),
        color: v("--text-recede")
      },
      input
    ),

  paginator: (input) =>
    emitElement(
      "nav",
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: v("--space-4"),
        marginTop: v("--space-8"),
        color: v("--text")
      },
      input
    ),

  /* state */

  "active-zone": (input) =>
    emitElement(
      "div",
      {
        background: v("--surface-elevated"),
        boxShadow: `0 0 0 2px ${v("--accent")}`,
        outline: `2px solid transparent`,
        outlineOffset: "2px"
      },
      input
    ),

  "pending-block": (input) =>
    emitElement(
      "div",
      { background: v("--surface-recessed"), color: v("--text-recede") },
      input,
      { role: "status" }
    ),

  "resolved-mark": (input) =>
    emitElement("div", { color: v("--success"), fontWeight: "500" }, input),

  "alert-band": (input) => {
    const intent = input.attributes.canonical.intent ?? "info";
    return emitElement(
      "div",
      {
        paddingLeft: v("--space-4"),
        paddingRight: v("--space-4"),
        paddingTop: v("--space-3"),
        paddingBottom: v("--space-3"),
        borderLeft: `4px solid ${v("--border-emphasis")}`,
        background: v(`--${intent}`),
        color: v(`--text-on-${intent}`)
      },
      input,
      { role: "alert" }
    );
  },

  "empty-state": (input) =>
    emitElement(
      "div",
      {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: v("--space-16"),
        paddingBottom: v("--space-16"),
        color: v("--text-recede")
      },
      input
    ),

  /* content */

  "media-frame": (input) =>
    emitElement(
      "figure",
      { overflow: "hidden", borderRadius: v("--radius-media") },
      input
    ),

  "figure-cite": (input) =>
    emitElement(
      "figure",
      {
        display: "flex",
        flexDirection: "column",
        gap: v("--space-stack-compact"),
        color: v("--text-recede")
      },
      input
    ),

  "data-table": (input) =>
    emitElement(
      "div",
      { overflowX: "auto", fontSize: v("--type-size-sm"), color: v("--text") },
      input
    ),

  "key-value-list": (input) =>
    emitElement(
      "dl",
      {
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: v("--space-4"),
        rowGap: v("--space-2"),
        fontSize: v("--type-size-sm"),
        color: v("--text")
      },
      input
    ),

  "timeline-stack": (input) =>
    emitElement(
      "ol",
      {
        display: "flex",
        flexDirection: "column",
        gap: v("--space-stack-normal"),
        borderLeft: `2px solid ${v("--border")}`,
        paddingLeft: v("--space-6"),
        color: v("--text")
      },
      input
    ),

  "code-block": (input) =>
    emitElement(
      "pre",
      {
        padding: v("--space-4"),
        overflowX: "auto",
        background: v("--surface-recessed"),
        borderRadius: v("--radius-md"),
        fontFamily: v("--font-mono"),
        fontSize: v("--type-size-sm")
      },
      input
    ),

  /* interactive */

  "primary-action": (input) =>
    emitElement(
      "button",
      {
        paddingLeft: v("--space-4"),
        paddingRight: v("--space-4"),
        paddingTop: v("--space-2"),
        paddingBottom: v("--space-2"),
        fontWeight: "500",
        background: v("--accent"),
        color: v("--text-on-accent"),
        borderRadius: v("--radius-md"),
        border: "none",
        cursor: "pointer"
      },
      input,
      { type: "button" }
    ),

  "secondary-action": (input) =>
    emitElement(
      "button",
      {
        paddingLeft: v("--space-4"),
        paddingRight: v("--space-4"),
        paddingTop: v("--space-2"),
        paddingBottom: v("--space-2"),
        border: `1px solid ${v("--border")}`,
        color: v("--text"),
        borderRadius: v("--radius-md"),
        background: "transparent",
        cursor: "pointer"
      },
      input,
      { type: "button" }
    ),

  "destructive-action": (input) =>
    emitElement(
      "button",
      {
        paddingLeft: v("--space-4"),
        paddingRight: v("--space-4"),
        paddingTop: v("--space-2"),
        paddingBottom: v("--space-2"),
        fontWeight: "500",
        background: v("--critical"),
        color: v("--text-on-critical"),
        borderRadius: v("--radius-md"),
        border: "none",
        cursor: "pointer"
      },
      input,
      { type: "button" }
    ),

  "input-cell": (input) => {
    const { type = "text", name = "", placeholder = "" } = input.attributes.specific;
    return {
      html: el(
        "input",
        {
          style: style({
            paddingLeft: v("--space-3"),
            paddingRight: v("--space-3"),
            paddingTop: v("--space-2"),
            paddingBottom: v("--space-2"),
            border: `1px solid ${v("--border")}`,
            color: v("--text"),
            borderRadius: v("--radius-md"),
            background: v("--surface"),
            width: "100%"
          }),
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
          style: style({
            border: `1px solid ${v("--border")}`,
            borderRadius: v("--radius-md"),
            color: v("--text")
          })
        },
        [
          el(
            "summary",
            {
              style: style({
                paddingLeft: v("--space-4"),
                paddingRight: v("--space-4"),
                paddingTop: v("--space-2"),
                paddingBottom: v("--space-2"),
                cursor: "pointer"
              })
            },
            [{ type: "text", value: summary }]
          ),
          ...input.children
        ]
      )
    };
  }
};
