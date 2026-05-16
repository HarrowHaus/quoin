/**
 * Error-model tests. Covers spec.md §5.3.
 */

import { describe, it, expect, beforeAll } from "vitest";
import { compile } from "../src/compiler.js";
import { CompilerError, PackValidationError } from "../src/errors.js";
import { loadTokenPack, loadVocabularyPack } from "../src/pack-loader.js";
import { loadAll } from "./helpers/load-fixtures.js";
import type {
  ImplementationPack,
  TokenPack,
  VocabularyPack
} from "../src/types.js";
import { validateManifest } from "../src/pack-validator.js";

let tokenPack: TokenPack;
let vocabularyPacks: VocabularyPack[];
let implementationPack: ImplementationPack;

beforeAll(async () => {
  ({ tokenPack, vocabularyPacks, implementationPack } = await loadAll());
});

describe("invalid attribute values", () => {
  it("throws CompilerError(INVALID_ATTRIBUTE_VALUE) with a diagnostic message", () => {
    try {
      compile({
        source: `<density-grid density="extreme">x</density-grid>`,
        tokenPack,
        vocabularyPacks,
        implementationPack,
        filename: "test.html"
      });
      expect.fail("should have thrown");
    } catch (err) {
      expect(err).toBeInstanceOf(CompilerError);
      const ce = err as CompilerError;
      expect(ce.code).toBe("INVALID_ATTRIBUTE_VALUE");
      expect(ce.message).toContain('density="extreme"');
      expect(ce.location.primitive).toBe("density-grid");
      expect(ce.toDiagnostic()).toContain("INVALID_ATTRIBUTE_VALUE");
    }
  });
});

describe("missing tokens", () => {
  it("MISSING_TOKEN raised when a primitive references an undefined token", async () => {
    const stubVocab: VocabularyPack = {
      manifest: {
        name: "@quoin/vocab-test",
        version: "0.0.1",
        type: "vocabulary",
        quoinVersion: "^0.1.0",
        description: "test",
        exports: { primitives: "./x.json" }
      },
      primitives: {
        "thing-thing": {
          name: "thing-thing",
          category: "content",
          role: "x",
          attributes: {},
          tokens: { background: "--nope-undefined" },
          structure: { element: "div" },
          children: "flow-content",
          scope: "block"
        }
      }
    };
    try {
      compile({
        source: `<thing-thing>x</thing-thing>`,
        tokenPack,
        vocabularyPacks: [stubVocab],
        implementationPack
      });
      expect.fail("should have thrown");
    } catch (err) {
      const ce = err as CompilerError;
      expect(ce.code).toBe("MISSING_TOKEN");
      expect(ce.message).toContain("--nope-undefined");
    }
  });

  it("token packs missing required canonical tokens fail validation", async () => {
    const partial: TokenPack = {
      manifest: {
        name: "@quoin/tokens-partial",
        version: "0.0.1",
        type: "token",
        quoinVersion: "^0.1.0",
        description: "partial",
        exports: { tokens: "./x.json" }
      },
      tokens: { surface: "#fff" },
      capabilities: new Set()
    };
    expect(() => {
      compile({
        source: `<authority-mark>x</authority-mark>`,
        tokenPack: partial,
        vocabularyPacks,
        implementationPack
      });
    }).toThrow(PackValidationError);
  });
});

describe("invalid pack manifests", () => {
  it("validateManifest rejects bad package names", () => {
    expect(() =>
      validateManifest({
        name: "no-scope",
        version: "1.0.0",
        type: "token",
        quoinVersion: "^0.1.0",
        description: "x",
        exports: { tokens: "./t.json" }
      })
    ).toThrow(PackValidationError);
  });

  it("validateManifest enforces type-specific exports", () => {
    expect(() =>
      validateManifest({
        name: "@quoin/tokens-broken",
        version: "1.0.0",
        type: "token",
        quoinVersion: "^0.1.0",
        description: "no tokens export",
        exports: { wrong: "./x.json" }
      })
    ).toThrow(PackValidationError);
  });
});

describe("circular token references", () => {
  it("CIRCULAR_TOKEN_REFERENCE raised by the resolver", async () => {
    const cyclic = {
      a: { $value: "{b}", $type: "color" },
      b: { $value: "{a}", $type: "color" }
    };
    const { resolveReferences, flattenDtcg } = await import(
      "../src/token-resolver.js"
    );
    expect(() => resolveReferences(flattenDtcg(cyclic))).toThrow(/Circular/);
  });
});

describe("loader rejects on-disk packs with wrong type", () => {
  it("loadTokenPack rejects a vocabulary directory", async () => {
    await expect(
      loadTokenPack("./test-fixtures/vocab-editorial")
    ).rejects.toThrow(PackValidationError);
  });

  it("loadVocabularyPack rejects a token directory", async () => {
    await expect(
      loadVocabularyPack("./test-fixtures/tokens-baseline")
    ).rejects.toThrow(PackValidationError);
  });
});
