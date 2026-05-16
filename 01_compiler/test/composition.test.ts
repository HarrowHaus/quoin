/**
 * Pack composition tests (spec.md §4).
 */

import { describe, it, expect, beforeAll } from "vitest";
import { compile, createCompiler } from "../src/compiler.js";
import {
  loadAll,
  loadBaselineTokens,
  loadDashboardVocab,
  loadEditorialVocab,
  loadTailwindImpl
} from "./helpers/load-fixtures.js";
import type {
  ImplementationPack,
  PrimitiveDefinition,
  TokenPack,
  VocabularyPack
} from "../src/types.js";

let tokenPack: TokenPack;
let editorial: VocabularyPack;
let dashboard: VocabularyPack;
let implementationPack: ImplementationPack;

beforeAll(async () => {
  ({ tokenPack, implementationPack } = await loadAll());
  editorial = await loadEditorialVocab();
  dashboard = await loadDashboardVocab();
});

describe("vocabulary composition", () => {
  it("loading both editorial + dashboard packs registers all 36 primitives", () => {
    const total =
      Object.keys(editorial.primitives).length +
      Object.keys(dashboard.primitives).length;
    expect(total).toBe(36);
  });

  it("a source mixing primitives from both packs compiles", () => {
    const r = compile({
      source: `
        <panel>
          <authority-mark>Title</authority-mark>
          <primary-action>Save</primary-action>
        </panel>
      `,
      tokenPack,
      vocabularyPacks: [editorial, dashboard],
      implementationPack
    });
    expect(r.html).toContain("<section");
    expect(r.html).toContain("<h1");
    expect(r.html).toContain("<button");
  });

  it("collisions are resolved last-loaded-wins with a warning", () => {
    const stub: PrimitiveDefinition = {
      name: "primary-action",
      category: "interactive",
      role: "Override stub.",
      attributes: {},
      tokens: { background: "--accent", color: "--text-on-accent" },
      structure: { element: "a" },
      children: "phrasing-content",
      scope: "inline"
    };
    const overridePack: VocabularyPack = {
      manifest: {
        name: "@quoin/vocab-override",
        version: "0.0.1",
        type: "vocabulary",
        quoinVersion: "^0.1.0",
        description: "override stub",
        exports: { primitives: "./x.json" }
      },
      primitives: { "primary-action": stub }
    };
    const r = compile({
      source: `<primary-action>Click</primary-action>`,
      tokenPack,
      vocabularyPacks: [dashboard, overridePack],
      implementationPack
    });
    const collision = r.warnings.find((w) =>
      w.message.includes("Primitive name collision")
    );
    expect(collision).toBeDefined();
    expect(collision?.message).toContain("@quoin/vocab-override");
  });
});

describe("createCompiler: hot pack-swap with no state leakage", () => {
  it("recompiles after swapping vocabulary packs", async () => {
    const a = createCompiler({
      tokenPack,
      vocabularyPacks: [editorial],
      implementationPack
    });
    expect(
      a.compile(`<authority-mark>x</authority-mark>`).html
    ).toContain("<h1");

    // editorial does not declare <primary-action> -> must be left as-is
    // (passes through as an unknown element, not registered as Quoin).
    const ar = a.compile(`<primary-action>x</primary-action>`);
    expect(ar.html).toContain("<primary-action");

    const b = createCompiler({
      tokenPack,
      vocabularyPacks: [editorial, dashboard],
      implementationPack
    });
    const br = b.compile(`<primary-action>x</primary-action>`);
    expect(br.html).not.toContain("<primary-action");
    expect(br.html).toContain("<button");
  });

  it("each compile() call begins with fresh diagnostic state", async () => {
    const fresh = await loadBaselineTokens();
    const ed = await loadEditorialVocab();
    const impl = await loadTailwindImpl();
    const compiler = createCompiler({
      tokenPack: fresh,
      vocabularyPacks: [ed],
      implementationPack: impl
    });
    const a = compiler.compile(`<authority-mark>One</authority-mark>`);
    const b = compiler.compile(`<authority-mark>Two</authority-mark>`);
    expect(a.html).toContain("One");
    expect(b.html).toContain("Two");
    expect(a.html).not.toContain("Two");
    expect(b.html).not.toContain("One");
  });
});
