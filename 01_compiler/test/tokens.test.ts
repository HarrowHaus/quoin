/**
 * Token-resolver unit tests.
 */

import { describe, it, expect } from "vitest";
import {
  findMissingSemanticTokens,
  flattenDtcg,
  lookupToken,
  resolveReferences,
  REQUIRED_SEMANTIC_TOKENS
} from "../src/token-resolver.js";

describe("flattenDtcg", () => {
  it("flattens nested DTCG into dot-path keys", () => {
    const out = flattenDtcg({
      color: {
        stone: {
          "500": { $value: "oklch(50% 0 0)", $type: "color" }
        }
      },
      surface: { $value: "{color.stone.500}", $type: "color" }
    });
    expect(out["color.stone.500"]).toBe("oklch(50% 0 0)");
    expect(out["surface"]).toBe("{color.stone.500}");
  });

  it("ignores $-prefixed metadata at non-value levels", () => {
    const out = flattenDtcg({
      $description: "top-level note",
      x: { $value: "1", $type: "dimension" }
    });
    expect(out["x"]).toBe("1");
    expect(Object.keys(out)).not.toContain("$description");
  });
});

describe("resolveReferences", () => {
  it("substitutes {path} references", () => {
    const r = resolveReferences({
      "color.stone.500": "oklch(50% 0 0)",
      surface: "{color.stone.500}"
    });
    expect(r["surface"]).toBe("oklch(50% 0 0)");
  });

  it("supports nested chains", () => {
    const r = resolveReferences({
      a: "{b}",
      b: "{c}",
      c: "tan"
    });
    expect(r["a"]).toBe("tan");
  });

  it("throws on missing references", () => {
    expect(() => resolveReferences({ a: "{nope}" })).toThrow(/Unresolved/);
  });
});

describe("findMissingSemanticTokens", () => {
  it("returns the full set for an empty pack", () => {
    expect(findMissingSemanticTokens({})).toEqual([...REQUIRED_SEMANTIC_TOKENS]);
  });

  it("returns [] when every name is present", () => {
    const full: Record<string, string> = {};
    for (const k of REQUIRED_SEMANTIC_TOKENS) full[k] = "x";
    expect(findMissingSemanticTokens(full)).toEqual([]);
  });
});

describe("lookupToken", () => {
  const flat = { "text-emphasis": "oklch(15% 0 0)" };
  it("accepts the leading -- form", () => {
    expect(lookupToken(flat, "--text-emphasis")).toBe("oklch(15% 0 0)");
  });
  it("accepts the bare form", () => {
    expect(lookupToken(flat, "text-emphasis")).toBe("oklch(15% 0 0)");
  });
  it("accepts the {brace} form", () => {
    expect(lookupToken(flat, "{text-emphasis}")).toBe("oklch(15% 0 0)");
  });
  it("returns undefined for missing tokens", () => {
    expect(lookupToken(flat, "nope")).toBeUndefined();
  });
});
