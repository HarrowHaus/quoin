/**
 * Internal-tree -> HTML string serializer.
 *
 * Emits indented, deterministic output. Block-level tags get their own line;
 * inline tags fold inline.
 */

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

const INLINE_TAGS = new Set([
  "a",
  "abbr",
  "b",
  "bdi",
  "bdo",
  "cite",
  "code",
  "data",
  "dfn",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
  "wbr"
]);

export interface SerializeOptions {
  indent?: string;
  /** Whether to pretty-print at all. */
  pretty?: boolean;
}

export function serialize(
  nodes: HTMLNode[],
  options: SerializeOptions = {}
): string {
  const indent = options.indent ?? "  ";
  const pretty = options.pretty ?? true;
  const out: string[] = [];
  for (const n of nodes) {
    out.push(renderNode(n, 0, indent, pretty));
  }
  return out.join(pretty ? "\n" : "");
}

function renderNode(
  node: HTMLNode,
  depth: number,
  indent: string,
  pretty: boolean
): string {
  if (node.type === "text") return renderText(node);
  return renderElement(node, depth, indent, pretty);
}

function renderText(node: HTMLText): string {
  return node.value;
}

function renderElement(
  el: HTMLElement,
  depth: number,
  indent: string,
  pretty: boolean
): string {
  const pad = pretty ? indent.repeat(depth) : "";
  const attrs = renderAttributes(el.attributes);
  const open = `<${el.tag}${attrs ? " " + attrs : ""}`;

  if (el.voidElement || VOID_ELEMENTS.has(el.tag)) {
    return `${pad}${open}>`;
  }

  if (el.children.length === 0) {
    return `${pad}${open}></${el.tag}>`;
  }

  const inline = !pretty || isInlineContent(el);
  if (inline) {
    const inner = el.children.map((c) => renderInline(c)).join("");
    return `${pad}${open}>${inner}</${el.tag}>`;
  }

  const inner = el.children
    .map((c) => renderNode(c, depth + 1, indent, pretty))
    .join("\n");
  return `${pad}${open}>\n${inner}\n${pad}</${el.tag}>`;
}

function renderInline(node: HTMLNode): string {
  if (node.type === "text") return node.value;
  const el = node;
  const attrs = renderAttributes(el.attributes);
  const open = `<${el.tag}${attrs ? " " + attrs : ""}`;
  if (el.voidElement || VOID_ELEMENTS.has(el.tag)) return `${open}>`;
  const inner = el.children.map(renderInline).join("");
  return `${open}>${inner}</${el.tag}>`;
}

function isInlineContent(el: HTMLElement): boolean {
  // If the element is an inline tag itself, render inline.
  if (INLINE_TAGS.has(el.tag)) return true;
  // If every child is text or an inline element AND there's no nested block,
  // render inline.
  return el.children.every(
    (c) =>
      c.type === "text" ||
      (c.type === "element" &&
        (INLINE_TAGS.has(c.tag) || c.voidElement === true))
  );
}

function renderAttributes(attrs: Record<string, string>): string {
  const keys = Object.keys(attrs).sort();
  return keys
    .map((k) => {
      const v = attrs[k];
      if (v === "") return k;
      return `${k}="${escapeAttr(v)}"`;
    })
    .join(" ");
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}
