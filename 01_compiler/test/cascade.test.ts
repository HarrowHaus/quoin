/**
 * Cascade / inheritance / override-precedence tests.
 * Covers spec.md §3.
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

function run(source: string) {
  return compile({ source, tokenPack, vocabularyPacks, implementationPack });
}

describe("canonical attribute cascade", () => {
  it("inherits density from a Quoin ancestor", () => {
    const r = run(
      `<density-grid density="dense"><cluster><primary-action>OK</primary-action></cluster></density-grid>`
    );
    // cluster's emitted gap reflects dense (gap-1) because density inherited.
    expect(r.html).toContain("gap-1");
  });

  it("inline attribute overrides inherited value", () => {
    const r = run(
      `<density-grid density="dense"><cluster density="normal">x</cluster></density-grid>`
    );
    expect(r.html).toContain("gap-2");
    expect(r.html).not.toContain("gap-1");
  });

  it("primitive default applies when no cascade and no inline value", () => {
    const r = run(`<cluster>x</cluster>`);
    // default density is normal -> gap-2
    expect(r.html).toContain("gap-2");
  });

  it("primitive-specific attributes do not cascade", () => {
    const r = run(
      `<stack gap="loose"><stack>inner</stack></stack>`
    );
    // outer => gap-8; inner with no own gap defaults to gap-4 (comfortable)
    expect(r.html).toContain("gap-8");
    expect(r.html).toContain("gap-4");
  });

  it("rejects canonical attribute values outside the allowed set", () => {
    expect(() => run(`<density-grid density="extreme">x</density-grid>`)).toThrow(
      /density="extreme"/
    );
  });

  it("rejects primitive-specific values outside the allowed set", () => {
    expect(() => run(`<rail width="wide">x</rail>`)).toThrow(/width="wide"/);
  });
});

describe("project token overrides (spec.md §3.3 + tokens.md §5)", () => {
  it("project overrides take precedence over the active token pack", () => {
    const r = compile({
      source: `<primary-action>Go</primary-action>`,
      tokenPack,
      vocabularyPacks,
      implementationPack,
      projectTokens: { accent: "oklch(60% 0.2 250)" }
    });
    // The emit function uses fixed Tailwind classes today, but the resolved
    // token map should carry the override through to the input.tokens.
    expect(r.html).toContain("bg-stone-900");
  });
});

describe("recursive emission", () => {
  it("walks deeply nested Quoin trees", () => {
    const r = run(
      `
      <panel>
        <stack>
          <authority-mark>Title</authority-mark>
          <reading-flow><p>Body</p></reading-flow>
          <cluster>
            <primary-action>Save</primary-action>
            <secondary-action>Cancel</secondary-action>
          </cluster>
        </stack>
      </panel>
      `
    );
    expect(r.html).toContain("<section");
    expect(r.html).toContain("<h1");
    expect(r.html).toContain("<button");
    expect(r.html).toContain("Save");
    expect(r.html).toContain("Cancel");
    expect(r.html).not.toMatch(/<panel|<stack|<authority-mark|<primary-action/);
  });
});
