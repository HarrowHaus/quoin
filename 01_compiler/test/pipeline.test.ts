/**
 * End-to-end pipeline tests + serializer + parser round-trip.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { compile } from "../src/compiler.js";
import { parse } from "../src/parser.js";
import { serialize } from "../src/serializer.js";
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

describe("parser", () => {
  it("preserves text nodes and standard HTML elements", () => {
    const tree = parse(`<div class="x">hi <span>there</span></div>`);
    expect(tree).toHaveLength(1);
    const div = tree[0];
    expect(div.type).toBe("element");
    if (div.type !== "element") return;
    expect(div.tag).toBe("div");
    expect(div.attributes.class).toBe("x");
  });

  it("recognises custom (Quoin) tag names", () => {
    const tree = parse(`<authority-mark>x</authority-mark>`);
    expect(tree).toHaveLength(1);
    const n = tree[0];
    expect(n.type).toBe("element");
    if (n.type !== "element") return;
    expect(n.tag).toBe("authority-mark");
  });
});

describe("serializer", () => {
  it("round-trips parse -> serialize for plain HTML", () => {
    const html = `<div class="x"><p>hi</p></div>`;
    const tree = parse(html);
    const out = serialize(tree, { pretty: false });
    expect(out).toContain("<div");
    expect(out).toContain("<p>hi</p>");
  });

  it("emits void elements without closing tag", () => {
    const tree = parse(`<img src="/a.png" alt="" />`);
    const out = serialize(tree);
    expect(out).toMatch(/<img[^>]+>/);
    expect(out).not.toContain("</img>");
  });

  it("alphabetises attributes for deterministic output", () => {
    const tree = parse(`<a id="x" class="y" href="/h">link</a>`);
    const out = serialize(tree, { pretty: false });
    // class should appear before href and id in alphabetic order.
    const cls = out.indexOf("class=");
    const href = out.indexOf("href=");
    const id = out.indexOf("id=");
    expect(cls).toBeGreaterThan(-1);
    expect(href).toBeGreaterThan(cls);
    expect(id).toBeGreaterThan(href);
  });
});

describe("end-to-end pipeline", () => {
  it("produces deterministic byte-identical output on repeat compiles", () => {
    const source = `
      <panel>
        <authority-mark>Repeatability</authority-mark>
        <cluster>
          <primary-action>Save</primary-action>
          <secondary-action>Cancel</secondary-action>
        </cluster>
      </panel>
    `;
    const a = compile({
      source,
      tokenPack,
      vocabularyPacks,
      implementationPack
    });
    const b = compile({
      source,
      tokenPack,
      vocabularyPacks,
      implementationPack
    });
    expect(a.html).toBe(b.html);
  });

  it("emits warnings for unused tokens and unused primitives", () => {
    const r = compile({
      source: `<authority-mark>Solo</authority-mark>`,
      tokenPack,
      vocabularyPacks,
      implementationPack
    });
    const unusedTokenWarnings = r.warnings.filter((w) =>
      w.message.startsWith("Unused token")
    );
    const unusedPrimitiveWarnings = r.warnings.filter((w) =>
      w.message.startsWith("Unused primitive")
    );
    expect(unusedTokenWarnings.length).toBeGreaterThan(0);
    expect(unusedPrimitiveWarnings.length).toBeGreaterThan(0);
  });

  it("strips every Quoin tag from the emitted HTML", () => {
    const r = compile({
      source: `
        <wayfinder><a href="/">Home</a></wayfinder>
        <canvas-block>
          <stack><authority-mark>x</authority-mark></stack>
        </canvas-block>
      `,
      tokenPack,
      vocabularyPacks,
      implementationPack
    });
    for (const tag of [
      "wayfinder",
      "canvas-block",
      "stack",
      "authority-mark"
    ]) {
      expect(r.html).not.toContain(`<${tag}`);
      expect(r.html).not.toContain(`</${tag}`);
    }
  });
});
