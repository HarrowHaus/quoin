/**
 * Per-primitive compilation test. Every v1 primitive (36) must compile
 * cleanly against the baseline token pack and produce the reference
 * Tailwind output documented in 00_spec/primitives.md.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { compile } from "../src/compiler.js";
import { loadAll } from "./helpers/load-fixtures.js";
import type {
  ImplementationPack,
  TokenPack,
  VocabularyPack
} from "../src/types.js";

let tokenPack: TokenPack;
let vocabularyPacks: VocabularyPack[];
let implementationPack: ImplementationPack;

beforeAll(async () => {
  ({ tokenPack, vocabularyPacks, implementationPack } = await loadAll());
});

interface PrimitiveCase {
  tag: string;
  /** Substring(s) every compiled output must contain. */
  containsClass: string[];
  /** Substring(s) compiled HTML must contain (outside class). */
  containsHtml?: string[];
  /** Extra attributes / children to render. */
  inner?: string;
  attrs?: string;
  expectTag?: string;
}

/** Reference outputs from 00_spec/primitives.md, in v1 order. */
const PRIMITIVES: PrimitiveCase[] = [
  // editorial 8
  {
    tag: "authority-mark",
    expectTag: "h1",
    containsClass: ["text-7xl", "font-serif", "tracking-tight", "text-stone-900"]
  },
  { tag: "recede-block", expectTag: "div", containsClass: ["text-base", "text-stone-500"] },
  {
    tag: "emphasis-card",
    expectTag: "section",
    containsClass: ["bg-white", "border-stone-200", "rounded-lg", "p-6"]
  },
  {
    tag: "reading-flow",
    expectTag: "div",
    containsClass: ["text-base", "text-stone-700", "leading-relaxed", "max-w-prose"]
  },
  {
    tag: "aside-note",
    expectTag: "aside",
    containsClass: ["bg-stone-50", "text-stone-600", "border-stone-300"]
  },
  {
    tag: "lead-graf",
    expectTag: "p",
    containsClass: ["text-xl", "text-stone-900", "leading-relaxed"]
  },
  {
    tag: "colophon",
    expectTag: "footer",
    containsClass: ["text-sm", "font-mono", "text-stone-500", "tracking-wide"]
  },
  {
    tag: "pull-quote",
    expectTag: "blockquote",
    containsClass: ["text-3xl", "font-serif", "italic", "border-stone-900"]
  },

  // layout 7
  { tag: "stack", expectTag: "div", containsClass: ["flex", "flex-col", "gap-4"] },
  { tag: "cluster", expectTag: "div", containsClass: ["flex", "flex-wrap"] },
  { tag: "frame", expectTag: "div", containsClass: ["border", "rounded", "p-4"] },
  {
    tag: "density-grid",
    expectTag: "div",
    containsClass: ["grid", "grid-cols-[repeat(auto-fill,minmax("]
  },
  { tag: "panel", expectTag: "section", containsClass: ["bg-white", "p-6"] },
  {
    tag: "rail",
    expectTag: "aside",
    containsClass: ["shrink-0", "border-r", "border-stone-200", "p-4"]
  },
  { tag: "canvas-block", expectTag: "main", containsClass: ["flex-1", "min-w-0", "p-6"] },

  // navigation 5
  {
    tag: "wayfinder",
    expectTag: "nav",
    containsClass: ["flex", "items-center", "border-b", "border-stone-200"]
  },
  {
    tag: "breadcrumb-trail",
    expectTag: "nav",
    containsClass: ["flex", "items-center", "text-sm", "text-stone-500"],
    containsHtml: ['aria-label="breadcrumb"']
  },
  {
    tag: "segment-control",
    expectTag: "div",
    containsClass: ["inline-flex", "bg-stone-100", "rounded-md"],
    containsHtml: ['role="tablist"']
  },
  {
    tag: "jump-list",
    expectTag: "nav",
    containsClass: ["sticky", "flex-col", "text-sm"]
  },
  {
    tag: "paginator",
    expectTag: "nav",
    containsClass: ["flex", "items-center", "justify-between"]
  },

  // state 5
  {
    tag: "active-zone",
    expectTag: "div",
    containsClass: ["bg-white", "ring-2", "ring-stone-900"]
  },
  {
    tag: "pending-block",
    expectTag: "div",
    containsClass: ["bg-stone-100", "animate-pulse"],
    containsHtml: ['role="status"']
  },
  {
    tag: "resolved-mark",
    expectTag: "div",
    containsClass: ["text-emerald-700", "font-medium"]
  },
  {
    tag: "alert-band",
    expectTag: "div",
    containsClass: ["border-l-4"],
    containsHtml: ['role="alert"']
  },
  {
    tag: "empty-state",
    expectTag: "div",
    containsClass: ["flex-col", "items-center", "justify-center", "text-stone-500"]
  },

  // content 6
  { tag: "media-frame", expectTag: "figure", containsClass: ["overflow-hidden", "rounded"] },
  { tag: "figure-cite", expectTag: "figure", containsClass: ["flex", "flex-col", "gap-2"] },
  { tag: "data-table", expectTag: "div", containsClass: ["overflow-x-auto"] },
  {
    tag: "key-value-list",
    expectTag: "dl",
    containsClass: ["grid", "grid-cols-[auto_1fr]", "text-sm"]
  },
  {
    tag: "timeline-stack",
    expectTag: "ol",
    containsClass: ["flex-col", "border-l-2", "border-stone-200", "pl-6"]
  },
  {
    tag: "code-block",
    expectTag: "pre",
    containsClass: ["bg-stone-100", "rounded", "font-mono", "text-sm"]
  },

  // interactive 5
  {
    tag: "primary-action",
    expectTag: "button",
    containsClass: ["bg-stone-900", "text-white", "rounded-md"],
    containsHtml: ['type="button"'],
    inner: "Save"
  },
  {
    tag: "secondary-action",
    expectTag: "button",
    containsClass: ["border-stone-300", "text-stone-900", "rounded-md"],
    inner: "Cancel"
  },
  {
    tag: "destructive-action",
    expectTag: "button",
    containsClass: ["bg-red-700", "text-white", "rounded-md"],
    inner: "Delete"
  },
  {
    tag: "input-cell",
    expectTag: "input",
    containsClass: ["px-3", "py-2", "border-stone-300", "rounded-md", "w-full"],
    attrs: 'type="email" name="email" placeholder="you@example.com"'
  },
  {
    tag: "disclosure",
    expectTag: "details",
    containsClass: ["border-stone-200", "rounded"],
    attrs: 'summary="Show more"',
    inner: "<p>Hidden body.</p>"
  }
];

describe("v1 primitives — compiled output", () => {
  it("covers all 36 v1 primitives", () => {
    expect(PRIMITIVES.length).toBe(36);
  });

  it.each(PRIMITIVES.map((p) => [p.tag, p]))(
    "compiles <%s>",
    (_label, kase: PrimitiveCase) => {
      const attrs = kase.attrs ? ` ${kase.attrs}` : "";
      const body = kase.inner ?? "Content";
      const source = `<${kase.tag}${attrs}>${body}</${kase.tag}>`;
      const result = compile({
        source,
        tokenPack,
        vocabularyPacks,
        implementationPack
      });
      const expectedTag = kase.expectTag ?? kase.tag;
      expect(result.html).toContain(`<${expectedTag}`);
      for (const cls of kase.containsClass) {
        expect(result.html, `class fragment "${cls}"`).toContain(cls);
      }
      for (const frag of kase.containsHtml ?? []) {
        expect(result.html, `html fragment "${frag}"`).toContain(frag);
      }
      // Every Quoin source tag must be gone from the output.
      expect(result.html).not.toContain(`<${kase.tag}`);
    }
  );
});
