/**
 * HTML -> internal node tree (and back).
 *
 * We use node-html-parser as the wire parser, but expose our own minimal node
 * model (types.ts) so emitters and tests don't depend on the parser internals.
 */

import { parse as parseHtml, HTMLElement as RawElement, TextNode } from "node-html-parser";
import type { HTMLNode, HTMLElement, HTMLText } from "./types.js";

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);

export function parse(source: string): HTMLNode[] {
  const root = parseHtml(source, {
    lowerCaseTagName: false,
    comment: false,
    voidTag: { tags: Array.from(VOID_ELEMENTS), closingSlash: true },
    blockTextElements: {
      script: true,
      noscript: true,
      style: true,
      pre: true
    }
  });
  return root.childNodes.map(convert).filter((n): n is HTMLNode => n !== null);
}

function convert(node: unknown): HTMLNode | null {
  if (node instanceof TextNode) {
    return { type: "text", value: node.rawText } as HTMLText;
  }
  if (node instanceof RawElement) {
    const tag = node.rawTagName.toLowerCase();
    const attributes: Record<string, string> = {};
    for (const [k, v] of Object.entries(node.attributes)) {
      attributes[k] = String(v ?? "");
    }
    const children = node.childNodes
      .map(convert)
      .filter((n): n is HTMLNode => n !== null);
    const element: HTMLElement = {
      type: "element",
      tag,
      attributes,
      children,
      voidElement: VOID_ELEMENTS.has(tag)
    };
    return element;
  }
  return null;
}

/* ──────────────────── helpers used by the compiler ──────────────────── */

export function isElement(n: HTMLNode): n is HTMLElement {
  return n.type === "element";
}

export function isText(n: HTMLNode): n is HTMLText {
  return n.type === "text";
}
