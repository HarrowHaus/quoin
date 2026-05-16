/**
 * @quoin/impl-tailwind — emit function.
 *
 * Per-primitive emitters that produce Tailwind v4 class strings matching
 * the reference outputs in 00_spec/primitives.md. The function dispatches
 * by primitive name and constructs an HTMLElement node (the compiler's
 * internal node model) that downstream serialization renders to HTML.
 *
 * @param {import("@quoin/compiler").EmitInput} input
 * @returns {import("@quoin/compiler").EmitOutput}
 */
export function emit(input) {
  const { primitive, attributes, children } = input;
  const emitter = EMITTERS[primitive.name];
  if (!emitter) {
    throw new Error(`No emitter for primitive: ${primitive.name}`);
  }
  return emitter(input);
}

export default emit;

/* ────────────────────────── helpers ────────────────────────── */

function el(tag, attributes = {}, children = [], voidElement = false) {
  return { type: "element", tag, attributes, children, voidElement };
}

function joinClasses(...parts) {
  return parts.flat().filter(Boolean).join(" ");
}

function mergeAttrs(base, extra) {
  return { ...base, ...extra };
}

function structureAttrs(primitive) {
  return primitive.structure.attributes ?? {};
}

/** Emit by wrapping the impl's element name + class string + children + attrs. */
function basic(tag, classes, input, extraAttrs = {}, opts = {}) {
  return {
    html: el(
      tag,
      mergeAttrs(extraAttrs, { class: classes }),
      input.children,
      opts.voidElement === true
    )
  };
}

/* ────────────────────────── editorial ────────────────────────── */

const EMITTERS = {
  "authority-mark": (input) =>
    basic(
      "h1",
      "text-7xl font-serif font-medium tracking-tight text-stone-900",
      input,
      structureAttrs(input.primitive)
    ),

  "recede-block": (input) =>
    basic("div", "text-base text-stone-500", input, structureAttrs(input.primitive)),

  "emphasis-card": (input) =>
    basic(
      "section",
      "bg-white border border-stone-200 rounded-lg p-6",
      input,
      structureAttrs(input.primitive)
    ),

  "reading-flow": (input) =>
    basic(
      "div",
      "text-base text-stone-700 leading-relaxed max-w-prose",
      input,
      structureAttrs(input.primitive)
    ),

  "aside-note": (input) =>
    basic(
      "aside",
      "bg-stone-50 text-stone-600 border-l-2 border-stone-300 pl-4 py-2",
      input,
      structureAttrs(input.primitive)
    ),

  "lead-graf": (input) =>
    basic(
      "p",
      "text-xl text-stone-900 leading-relaxed",
      input,
      structureAttrs(input.primitive)
    ),

  colophon: (input) =>
    basic(
      "footer",
      "text-sm font-mono text-stone-500 tracking-wide",
      input,
      structureAttrs(input.primitive)
    ),

  "pull-quote": (input) =>
    basic(
      "blockquote",
      "text-3xl font-serif text-stone-900 italic border-l-4 border-stone-900 pl-6 my-8",
      input,
      structureAttrs(input.primitive)
    ),

  /* ─────────────────── layout ─────────────────── */

  stack: (input) => {
    const gap =
      input.attributes.specific.gap === "compact"
        ? "gap-2"
        : input.attributes.specific.gap === "loose"
        ? "gap-8"
        : "gap-4";
    return basic("div", `flex flex-col ${gap}`, input);
  },

  cluster: (input) => {
    const density = input.attributes.canonical.density;
    const gap = density === "dense" ? "gap-1" : density === "sparse" ? "gap-4" : "gap-2";
    return basic("div", `flex flex-wrap ${gap}`, input);
  },

  frame: (input) =>
    basic("div", "border border-stone-200 rounded p-4", input),

  "density-grid": (input) => {
    const min = input.attributes.specific["min-cell-width"] || "200px";
    const cls = `grid grid-cols-[repeat(auto-fill,minmax(${min},1fr))] gap-2`;
    return basic("div", cls, input);
  },

  panel: (input) => basic("section", "bg-white p-6", input),

  rail: (input) => {
    const width =
      input.attributes.specific.width === "compact" ? "w-48" : "w-64";
    return basic(
      "aside",
      `${width} shrink-0 border-r border-stone-200 p-4`,
      input
    );
  },

  "canvas-block": (input) => basic("main", "flex-1 min-w-0 p-6", input),

  /* ─────────────────── navigation ─────────────────── */

  wayfinder: (input) =>
    basic(
      "nav",
      "flex items-center gap-6 px-6 py-4 border-b border-stone-200",
      input
    ),

  "breadcrumb-trail": (input) =>
    basic(
      "nav",
      "flex items-center gap-2 text-sm text-stone-500",
      input,
      { "aria-label": "breadcrumb" }
    ),

  "segment-control": (input) =>
    basic(
      "div",
      "inline-flex p-1 bg-stone-100 rounded-md",
      input,
      { role: "tablist" }
    ),

  "jump-list": (input) =>
    basic("nav", "sticky top-4 flex flex-col gap-2 text-sm", input),

  paginator: (input) =>
    basic("nav", "flex items-center justify-between gap-4 mt-8", input),

  /* ─────────────────── state ─────────────────── */

  "active-zone": (input) =>
    basic("div", "bg-white ring-2 ring-stone-900 ring-offset-2", input),

  "pending-block": (input) =>
    basic("div", "bg-stone-100 animate-pulse", input, { role: "status" }),

  "resolved-mark": (input) =>
    basic("div", "text-emerald-700 font-medium", input),

  "alert-band": (input) => {
    const intent = input.attributes.canonical.intent ?? "info";
    const tone = {
      info: "bg-sky-50 border-sky-700 text-sky-900",
      success: "bg-emerald-50 border-emerald-700 text-emerald-900",
      warning: "bg-amber-50 border-amber-700 text-amber-900",
      critical: "bg-red-50 border-red-700 text-red-900"
    }[intent] ?? "bg-stone-100 border-stone-900 text-stone-900";
    return basic(
      "div",
      `px-4 py-3 border-l-4 ${tone}`,
      input,
      { role: "alert" }
    );
  },

  "empty-state": (input) =>
    basic(
      "div",
      "flex flex-col items-center justify-center py-16 text-stone-500",
      input
    ),

  /* ─────────────────── content ─────────────────── */

  "media-frame": (input) => basic("figure", "overflow-hidden rounded", input),

  "figure-cite": (input) => basic("figure", "flex flex-col gap-2", input),

  "data-table": (input) =>
    basic("div", "overflow-x-auto", input),

  "key-value-list": (input) =>
    basic(
      "dl",
      "grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm",
      input
    ),

  "timeline-stack": (input) =>
    basic(
      "ol",
      "flex flex-col gap-4 border-l-2 border-stone-200 pl-6",
      input
    ),

  "code-block": (input) =>
    basic(
      "pre",
      "bg-stone-100 p-4 rounded font-mono text-sm overflow-x-auto",
      input
    ),

  /* ─────────────────── interactive ─────────────────── */

  "primary-action": (input) =>
    basic(
      "button",
      "px-4 py-2 bg-stone-900 text-white rounded-md font-medium",
      input,
      { type: "button" }
    ),

  "secondary-action": (input) =>
    basic(
      "button",
      "px-4 py-2 border border-stone-300 text-stone-900 rounded-md",
      input,
      { type: "button" }
    ),

  "destructive-action": (input) =>
    basic(
      "button",
      "px-4 py-2 bg-red-700 text-white rounded-md font-medium",
      input,
      { type: "button" }
    ),

  "input-cell": (input) => {
    const { type = "text", name = "", placeholder = "" } = input.attributes.specific;
    return {
      html: el(
        "input",
        {
          class: "px-3 py-2 border border-stone-300 rounded-md w-full",
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
        { class: "border border-stone-200 rounded" },
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
