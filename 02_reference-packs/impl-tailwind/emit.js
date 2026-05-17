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

/**
 * Per-primitive emitters compute a class string but lose any user-set
 * attributes (id, data-*, aria-*, title, lang, dir). This filter rescues
 * those before basic() builds the final attribute map. Anything not on
 * the allowlist is treated as vocabulary-defined and stays in the
 * primitive's `specific` map, where the per-primitive emitter decides
 * what to do with it.
 */
function passthroughAttrs(input) {
  const out = {};
  const spec = input.attributes?.specific ?? {};
  for (const [k, v] of Object.entries(spec)) {
    if (
      k === "id" ||
      k === "title" ||
      k === "lang" ||
      k === "dir" ||
      k === "role" ||
      k === "tabindex" ||
      k.startsWith("data-") ||
      k.startsWith("aria-")
    ) {
      out[k] = v;
    }
  }
  return out;
}

function basic(tag, cls, input, extraAttrs = {}, opts = {}) {
  return {
    html: el(
      tag,
      {
        ...passthroughAttrs(input),
        ...extraAttrs,
        class: cls
      },
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

  "emphasis-card": (input) => {
    const variant = input.attributes.specific.variant ?? "default";
    if (variant === "featured") {
      // Featured: accent strip at top + larger panel-class padding +
      // softer surface. Reads as 'this is the one to look at.'
      return basic(
        "section",
        classes(
          "relative border-t-4 shadow-sm",
          v("bg", "--surface-elevated"),
          v("border-t", "--accent"),
          v("p", "--space-panel"),
          v("rounded", "--radius-card")
        ),
        input,
        structureAttrs(input.primitive)
      );
    }
    if (variant === "quiet") {
      // Quiet: no border, just a recessed surface fill. Reads as
      // 'related supporting content' rather than 'attention please.'
      return basic(
        "section",
        classes(
          v("bg", "--surface-recessed"),
          v("p", "--space-card"),
          v("rounded", "--radius-card")
        ),
        input,
        structureAttrs(input.primitive)
      );
    }
    return basic(
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
    );
  },

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
    const variant = input.attributes.specific.variant ?? "default";
    const bgVar = {
      info: "--info",
      success: "--success",
      warning: "--warning",
      critical: "--critical"
    }[intent];
    const textVar = `--text-on-${intent}`;
    if (variant === "compact") {
      // Compact: pill-shaped, inline, single-line. Reads as a status
      // tag rather than a full-band callout. Good for inline app
      // status indicators above content rather than below a header.
      return basic(
        "div",
        classes(
          "inline-flex items-center gap-2 px-3 py-1 text-sm",
          v("bg", bgVar),
          v("text", textVar),
          v("rounded", "--radius-pill")
        ),
        input,
        { role: "status" }
      );
    }
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
  },

  /* ─────────────── vocab-essentials ─────────────── */

  "tab-panels": (input) =>
    basic(
      "div",
      classes(
        "border rounded-lg overflow-hidden",
        v("border", "--border"),
        v("bg", "--surface-elevated"),
        v("text", "--text")
      ),
      input
    ),

  "pin-entry": (input) => {
    const length = parseInt(input.attributes.specific.length ?? "6", 10);
    const name = input.attributes.specific.name ?? "code";
    const cells = [];
    for (let i = 0; i < length; i++) {
      cells.push(
        el(
          "input",
          {
            type: "text",
            inputmode: "numeric",
            maxlength: "1",
            name: `${name}-${i + 1}`,
            "aria-label": `Digit ${i + 1}`,
            class: classes(
              "w-12 h-14 text-center text-2xl font-mono border",
              v("border", "--border"),
              v("text", "--text-emphasis"),
              v("bg", "--surface"),
              v("rounded", "--radius-md")
            )
          },
          [],
          true
        )
      );
    }
    return {
      html: el(
        "div",
        { class: "flex items-center gap-2", role: "group", "aria-label": "Verification code" },
        cells
      )
    };
  },

  "stat-display": (input) => {
    const intent = input.attributes.canonical.intent ?? "primary";
    const tone = intent === "success" || intent === "warning" || intent === "critical"
      ? v("text", `--${intent}`)
      : v("text", "--text-emphasis");
    return basic(
      "div",
      classes(
        "flex flex-col gap-1",
        tone,
        v("font", "--font-display")
      ),
      input
    );
  },

  "split-shell": (input) => {
    const sidebar = input.attributes.specific.sidebar ?? "comfortable";
    const widths = { compact: "240px", comfortable: "320px", wide: "400px" };
    const w = widths[sidebar] ?? widths.comfortable;
    return basic(
      "div",
      classes(
        `grid grid-cols-[${w}_1fr] min-h-screen`,
        v("border", "--border"),
        v("bg", "--surface")
      ),
      input
    );
  },

  columns: (input) => {
    const ratio = input.attributes.specific.ratio ?? "1:1";
    const cols = {
      "1:1": "grid-cols-1 md:grid-cols-2",
      "1:2": "grid-cols-1 md:grid-cols-[1fr_2fr]",
      "2:1": "grid-cols-1 md:grid-cols-[2fr_1fr]",
      "1:1:1": "grid-cols-1 md:grid-cols-3",
      "1:1:1:1": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      "1:3": "grid-cols-1 md:grid-cols-[1fr_3fr]",
      "3:1": "grid-cols-1 md:grid-cols-[3fr_1fr]"
    }[ratio] ?? "grid-cols-1 md:grid-cols-2";
    return basic(
      "div",
      classes("grid gap-6", cols),
      input
    );
  },

  "comparison-table": (input) =>
    basic(
      "table",
      classes(
        "w-full border-collapse",
        v("text", "--text"),
        v("bg", "--surface-elevated")
      ),
      input
    ),

  "browser-frame": (input) => {
    const url = input.attributes.specific.url ?? "harrow.haus/quoin";
    const dots = el(
      "div",
      { class: "flex items-center gap-1.5", "aria-hidden": "true" },
      [
        el("span", { class: "w-3 h-3 rounded-full bg-[var(--surface-recessed)]" }, []),
        el("span", { class: "w-3 h-3 rounded-full bg-[var(--surface-recessed)]" }, []),
        el("span", { class: "w-3 h-3 rounded-full bg-[var(--surface-recessed)]" }, [])
      ]
    );
    const urlPill = el(
      "div",
      {
        class: classes(
          "flex-1 px-3 py-1 text-xs font-mono",
          v("bg", "--surface"),
          v("text", "--text-recede"),
          v("rounded", "--radius-pill")
        )
      },
      [{ type: "text", value: url }]
    );
    const header = el(
      "header",
      {
        class: classes(
          "flex items-center gap-3 px-3 py-2 border-b",
          v("bg", "--surface-recessed"),
          v("border", "--border")
        )
      },
      [dots, urlPill]
    );
    return {
      html: el(
        "figure",
        {
          class: classes(
            "overflow-hidden border",
            v("border", "--border"),
            v("bg", "--surface-elevated"),
            v("rounded", "--radius-md"),
            "shadow-md"
          )
        },
        [header, el("div", { class: "p-0" }, input.children)]
      )
    };
  },

  "terminal-frame": (input) => {
    const title = input.attributes.specific.title ?? "Terminal";
    const dots = el(
      "div",
      { class: "flex items-center gap-1.5", "aria-hidden": "true" },
      [
        el("span", { class: "w-3 h-3 rounded-full bg-red-500/80" }, []),
        el("span", { class: "w-3 h-3 rounded-full bg-amber-500/80" }, []),
        el("span", { class: "w-3 h-3 rounded-full bg-emerald-500/80" }, [])
      ]
    );
    const titleEl = el(
      "span",
      {
        class: classes("flex-1 text-center text-xs font-mono", v("text", "--text-recede"))
      },
      [{ type: "text", value: title }]
    );
    const header = el(
      "header",
      {
        class: classes(
          "flex items-center gap-3 px-3 py-2 border-b border-white/10",
          v("bg", "--surface-inverse")
        )
      },
      [dots, titleEl]
    );
    return {
      html: el(
        "figure",
        {
          class: classes(
            "overflow-hidden",
            v("bg", "--surface-inverse"),
            v("text", "--text-on-accent"),
            v("rounded", "--radius-md"),
            v("font", "--font-mono"),
            "shadow-md"
          )
        },
        [header, el("div", { class: "p-4 text-sm" }, input.children)]
      )
    };
  },

  "step-flow": (input) =>
    basic(
      "ol",
      classes(
        "flex flex-col md:flex-row gap-4 list-none p-0",
        v("text", "--text")
      ),
      input
    ),

  "logo-strip": (input) =>
    basic(
      "div",
      classes(
        "flex flex-wrap items-center justify-center gap-8 py-6 opacity-60 grayscale",
        v("text", "--text-recede")
      ),
      input
    ),

  /* ─────────────── vocab-marketing variant-aware ─────────────── *
   *
   * These four primitives live in vocab-marketing (harvest pack) but
   * get bespoke impl-tailwind emitters here so their variants render
   * as designed layouts instead of generic-fallback boxes.
   */

  "hero-banner": (input) => {
    const variant = input.attributes.specific.variant ?? "default";
    if (variant === "split") {
      // Two-column hero: content left, illustration/screenshot slot
      // right. Collapses to single column on mobile.
      return basic(
        "section",
        classes(
          "grid gap-8 items-center",
          "[grid-template-columns:1fr]",
          "md:[grid-template-columns:1fr_1fr]",
          v("bg", "--surface"),
          v("text", "--text-emphasis"),
          v("p", "--space-32")
        ),
        input
      );
    }
    if (variant === "centered") {
      // Centered hero with narrower max-width. Content is centered
      // horizontally for a more editorial feel.
      return basic(
        "section",
        classes(
          "flex flex-col items-center text-center mx-auto max-w-3xl",
          v("bg", "--surface"),
          v("text", "--text-emphasis"),
          v("p", "--space-32")
        ),
        input
      );
    }
    return basic(
      "section",
      classes(v("bg", "--surface"), v("text", "--text-emphasis"), v("p", "--space-32")),
      input
    );
  },

  "feature-grid": (input) => {
    const variant = input.attributes.specific.variant ?? "default";
    const min = input.attributes.specific["min-cell-width"] || "280px";
    if (variant === "bento") {
      // Bento: first cell spans 2x2, rest fill normally. Inline grid
      // declaration since template-areas can't be expressed purely
      // through fluid auto-fill.
      return basic(
        "div",
        classes("grid gap-6"),
        input,
        {
          style: `grid-template-columns: repeat(auto-fit, minmax(${min}, 1fr)); grid-auto-flow: dense`
        }
      );
    }
    return basic(
      "div",
      classes(`grid grid-cols-[repeat(auto-fill,minmax(${min},1fr))] gap-6`),
      input
    );
  },

  "pricing-tier": (input) => {
    const variant = input.attributes.specific.variant ?? "default";
    if (variant === "featured") {
      // Featured tier: accent ring + slight scale + "popular" feel.
      // Anchors the eye to the recommended option in a 3-tier row.
      return basic(
        "article",
        classes(
          "relative ring-2 ring-offset-2 scale-[1.02]",
          v("bg", "--surface-elevated"),
          v("ring", "--accent"),
          v("text", "--text"),
          v("p", "--space-panel"),
          v("rounded", "--radius-card"),
          "shadow-md"
        ),
        input
      );
    }
    return basic(
      "article",
      classes(
        "border",
        v("bg", "--surface-elevated"),
        v("text", "--text"),
        v("border", "--border"),
        v("p", "--space-panel"),
        v("rounded", "--radius-card")
      ),
      input
    );
  },

  "cta-band": (input) => {
    const intent = input.attributes.canonical.intent ?? "primary";
    const variant = input.attributes.specific.variant ?? "default";
    const bg = intent === "critical" ? "--critical" : "--accent";
    const fg = intent === "critical" ? "--text-on-critical" : "--text-on-accent";
    if (variant === "split") {
      // Split CTA: headline on the left, actions on the right.
      // Collapses to stack on mobile.
      return basic(
        "section",
        classes(
          "flex flex-col md:flex-row md:items-center md:justify-between gap-6",
          v("bg", bg),
          v("text", fg),
          v("p", "--space-16")
        ),
        input
      );
    }
    return basic(
      "section",
      classes(v("bg", bg), v("text", fg), v("p", "--space-16")),
      input
    );
  },

  /* ─────────────── vocab-app-shell ─────────────── *
   *
   * Layout positioning goes inline via `style` so the docs lab shim
   * doesn't need per-config CSS rules. A production Tailwind v4 build
   * would generate equivalent CSS from arbitrary-value classes; either
   * approach renders identically in the browser.
   */

  "app-shell": (input) => {
    const navPosition = input.attributes.specific["nav-position"] ?? "left";
    const hasCommandBar = input.attributes.specific["command-bar"] !== "false";
    const areas =
      navPosition === "none"
        ? hasCommandBar
          ? `"cmd" "main"`
          : `"main"`
        : navPosition === "right"
        ? hasCommandBar
          ? `"cmd cmd" "main side"`
          : `"main side"`
        : hasCommandBar
        ? `"cmd cmd" "side main"`
        : `"side main"`;
    const columns =
      navPosition === "none"
        ? "1fr"
        : navPosition === "right"
        ? "1fr auto"
        : "auto 1fr";
    const rows = hasCommandBar ? "auto 1fr" : "1fr";
    return basic(
      "div",
      classes(
        "grid min-h-screen",
        v("bg", "--surface"),
        v("text", "--text")
      ),
      input,
      {
        style: `grid-template-areas: ${areas}; grid-template-columns: ${columns}; grid-template-rows: ${rows}`
      }
    );
  },

  "command-bar": (input) =>
    basic(
      "header",
      classes(
        "flex items-center gap-4 px-6 py-3 border-b",
        v("bg", "--surface-elevated"),
        v("border", "--border"),
        v("text", "--text")
      ),
      input,
      { style: "grid-area: cmd" }
    ),

  "sidebar-nav": (input) => {
    const width = input.attributes.specific.width ?? "comfortable";
    const w = { compact: "14rem", comfortable: "16rem", wide: "18rem" }[width] ?? "16rem";
    return basic(
      "nav",
      classes(
        "shrink-0 border-r overflow-y-auto py-4 px-3 flex flex-col gap-6",
        v("bg", "--surface"),
        v("border", "--border"),
        v("text", "--text-recede")
      ),
      input,
      { style: `grid-area: side; width: ${w}` }
    );
  },

  "content-region": (input) => {
    const aside = input.attributes.specific.aside ?? "none";
    const gridCols =
      aside === "right"
        ? "1fr auto"
        : aside === "left"
        ? "auto 1fr"
        : null;
    const inlineStyle =
      "grid-area: main" +
      (gridCols ? `; display: grid; grid-template-columns: ${gridCols}; gap: 1.5rem` : "");
    return basic(
      "main",
      classes(
        aside === "none" ? "flex flex-col gap-6" : "",
        "overflow-y-auto",
        v("p", "--space-panel"),
        v("bg", "--surface"),
        v("text", "--text")
      ),
      input,
      { style: inlineStyle }
    );
  },

  "page-header": (input) =>
    basic(
      "header",
      classes(
        "flex flex-col gap-2 pb-6 border-b mb-6",
        v("border", "--border"),
        v("text", "--text")
      ),
      input
    )
};
