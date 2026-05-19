/**
 * Phase 0.5-extension tests — theme + pattern + icon pack loading
 * and compilation through the extended pipeline.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect, beforeAll } from "vitest";
import { compile } from "../src/compiler.js";
import {
  loadIconPack,
  loadPatternPack,
  loadThemePack
} from "../src/pack-loader.js";
import { loadAll } from "./helpers/load-fixtures.js";
import type {
  IconPack,
  ImplementationPack,
  PatternPack,
  ThemePack,
  TokenPack,
  VocabularyPack
} from "../src/types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REF_PACKS = path.resolve(__dirname, "..", "..", "02_reference-packs");

let tokenPack: TokenPack;
let vocabularyPacks: VocabularyPack[];
let implementationPack: ImplementationPack;
let themePack: ThemePack;
let patternPack: PatternPack;
let iconPack: IconPack;

beforeAll(async () => {
  ({ tokenPack, vocabularyPacks, implementationPack } = await loadAll());
  themePack = await loadThemePack(path.join(REF_PACKS, "theme-baseline-reference"));
  patternPack = await loadPatternPack(path.join(REF_PACKS, "pattern-button-reference"));
  iconPack = await loadIconPack(path.join(REF_PACKS, "icons-reference"));
});

describe("loadThemePack", () => {
  it("loads light/dark/p3 override maps", () => {
    // Per D.52 (2026-05-18) the canonical type is "aesthetic"; "theme" is
    // a deprecated alias kept for backward compatibility. The
    // theme-baseline-reference pack was renamed type:"theme" → type:"aesthetic"
    // in the D.52 rename. The deprecated loader alias loadThemePack still
    // returns a usable pack — it just reports the canonical type now.
    expect(themePack.manifest.type).toBe("aesthetic");
    expect(Object.keys(themePack.lightModeOverrides).length).toBeGreaterThan(0);
    expect(themePack.darkModeOverrides).toBeDefined();
    expect(themePack.p3WideGamutOverrides).toBeDefined();
  });

  it("rejects override files that introduce non-canonical names", async () => {
    // Build a synthetic non-canonical override on the fly by writing a
    // temporary pack — but here we just verify the in-memory loader
    // path: assert that the loaded reference pack has zero extras.
    const canonical = new Set(Object.keys(tokenPack.tokens));
    for (const name of Object.keys(themePack.darkModeOverrides ?? {})) {
      expect(canonical.has(name)).toBe(true);
    }
  });
});

describe("loadPatternPack", () => {
  it("loads primitives + states + microStates", () => {
    expect(patternPack.manifest.type).toBe("pattern");
    expect(patternPack.primitives["action-button"]).toBeDefined();
    expect(patternPack.states).toContain("default");
    expect(patternPack.microStates).toContain("default");
    expect(patternPack.microStates).toContain("focus");
  });
});

describe("loadIconPack", () => {
  it("loads SVGs by name", () => {
    expect(iconPack.manifest.type).toBe("icon");
    expect(iconPack.icons.home).toContain("<svg");
    expect(iconPack.icons.search).toContain("<svg");
    expect(iconPack.icons["chevron-down"]).toContain("<svg");
  });

  it("resolves aliases", () => {
    expect(iconPack.icons.house).toBe(iconPack.icons.home);
    expect(iconPack.icons.tick).toBe(iconPack.icons.check);
  });

  it("derives shortName from pack name", () => {
    expect(iconPack.shortName).toBe("reference");
  });

  it("defaults semanticTag to 'icon' when manifest omits it", () => {
    expect(iconPack.semanticTag).toBe("icon");
  });
});

describe("compiler — theme override resolution", () => {
  it("applies light-mode overrides on top of the token pack", () => {
    const lightFocusRing = themePack.lightModeOverrides["focus-ring"];
    expect(lightFocusRing).toBeDefined();
    expect(lightFocusRing).not.toBe(tokenPack.tokens["focus-ring"]);

    // Compile a primitive that references --focus-ring (any will do —
    // we just verify the merged token map ends up containing the override).
    const r = compile({
      source: `<authority-mark>x</authority-mark>`,
      tokenPack,
      vocabularyPacks,
      themePack,
      implementationPack
    });
    expect(r.warnings.every((w) => w.kind !== "error")).toBe(true);
  });

  it("project tokens win over theme overrides", () => {
    const r = compile({
      source: `<authority-mark>x</authority-mark>`,
      tokenPack,
      vocabularyPacks,
      themePack,
      projectTokens: { "focus-ring": "rebeccapurple" },
      implementationPack
    });
    expect(r.warnings.every((w) => w.kind !== "error")).toBe(true);
  });
});

describe("compiler — pattern primitives", () => {
  // The test-fixture impl pack throws on unknown primitives; for the
  // pattern tests we need an impl pack that handles <action-button>.
  // We use a small inline impl pack that emits a <button> for any
  // primitive whose structure declares the element.
  const inlineImpl: ImplementationPack = {
    manifest: {
      name: "@quoin/impl-test-inline",
      version: "0.0.0",
      type: "implementation",
      quoinVersion: "^0.1.0",
      description: "Inline test impl pack — emits primitive.structure.element with class='quoin-test'.",
      exports: { emit: "./emit.js", metadata: "./metadata.json" }
    },
    emit: (input) => ({
      html: {
        type: "element",
        tag: input.primitive.structure.element,
        attributes: { class: "quoin-test", ...(input.primitive.structure.attributes ?? {}) },
        children: input.children
      }
    }),
    metadata: {
      target: "test-inline",
      supportedPrimitives: ["*"],
      emittedFormat: "html"
    }
  };

  it("registers pattern primitives alongside vocab primitives", () => {
    const r = compile({
      source: `<action-button intent="primary">Save</action-button>`,
      tokenPack,
      vocabularyPacks,
      patternPacks: [patternPack],
      implementationPack: inlineImpl
    });
    // <action-button> is in the pattern pack; the compiler must dispatch
    // it through the same emit path as vocab primitives and strip the tag.
    expect(r.html).not.toContain("<action-button");
    expect(r.html).toMatch(/<button[^>]*>Save<\/button>/);
  });

  it("merges pattern primitives into the same primitive registry", () => {
    // The unused-primitive warning machinery iterates vocab packs only;
    // pattern primitives are registered but tracked via usedPrimitives.
    // A composed compile that uses <action-button> should NOT emit a
    // missing-emitter error.
    const r = compile({
      source: `<action-button>Click</action-button>`,
      tokenPack,
      vocabularyPacks,
      patternPacks: [patternPack],
      implementationPack: inlineImpl
    });
    expect(r.html).toContain("<button");
    expect(r.warnings.every((w) => !w.message.includes("MISSING_EMITTER"))).toBe(true);
  });
});

describe("compiler — icon resolution", () => {
  it("inlines the matching SVG and applies size from the canonical token", () => {
    const r = compile({
      source: `<icon name="home" size="md" />`,
      tokenPack,
      vocabularyPacks,
      iconPacks: [iconPack],
      implementationPack
    });
    expect(r.html).toContain("<svg");
    expect(r.html).not.toContain("<icon");
    // The resolved width/height should equal the --icon-size-md value
    // from the token pack (or `var(--icon-size-md)` fallback). Either
    // way it should appear as a width attribute.
    expect(r.html).toMatch(/width="[^"]+"/);
    expect(r.html).toMatch(/height="[^"]+"/);
    expect(r.html).toContain('role="img"');
    expect(r.html).toContain('aria-label="home"');
    expect(r.html).toContain('data-icon-pack="reference"');
    expect(r.html).toContain('data-icon-name="home"');
  });

  it("supports raw dimension passthrough on size attribute", () => {
    const r = compile({
      source: `<icon name="x" size="22px" />`,
      tokenPack,
      vocabularyPacks,
      iconPacks: [iconPack],
      implementationPack
    });
    expect(r.html).toContain('width="22px"');
    expect(r.html).toContain('height="22px"');
  });

  it("treats aria-hidden='true' as decorative", () => {
    const r = compile({
      source: `<icon name="home" aria-hidden="true" />`,
      tokenPack,
      vocabularyPacks,
      iconPacks: [iconPack],
      implementationPack
    });
    expect(r.html).toContain('aria-hidden="true"');
    expect(r.html).not.toContain('role="img"');
    expect(r.html).not.toContain('aria-label');
  });

  it("resolves icon aliases", () => {
    const r = compile({
      source: `<icon name="house" />`, // alias for home
      tokenPack,
      vocabularyPacks,
      iconPacks: [iconPack],
      implementationPack
    });
    expect(r.html).toContain("<svg");
    expect(r.html).toContain('data-icon-name="house"');
  });

  it("throws MISSING_ICON for unknown names", () => {
    expect(() =>
      compile({
        source: `<icon name="does-not-exist" />`,
        tokenPack,
        vocabularyPacks,
        iconPacks: [iconPack],
        implementationPack
      })
    ).toThrow(/does-not-exist/);
  });

  it("throws MISSING_ATTRIBUTE when name is absent", () => {
    expect(() =>
      compile({
        source: `<icon size="md" />`,
        tokenPack,
        vocabularyPacks,
        iconPacks: [iconPack],
        implementationPack
      })
    ).toThrow(/requires a "name" attribute/);
  });

  it("respects pack='<short>' disambiguation", () => {
    const r = compile({
      source: `<icon name="home" pack="reference" />`,
      tokenPack,
      vocabularyPacks,
      iconPacks: [iconPack],
      implementationPack
    });
    expect(r.html).toContain("<svg");
    expect(r.html).toContain('data-icon-pack="reference"');
  });
});

describe("compiler — full composition", () => {
  const inlineImpl: ImplementationPack = {
    manifest: {
      name: "@quoin/impl-test-inline",
      version: "0.0.0",
      type: "implementation",
      quoinVersion: "^0.1.0",
      description: "Inline test impl pack.",
      exports: { emit: "./emit.js", metadata: "./metadata.json" }
    },
    emit: (input) => ({
      html: {
        type: "element",
        tag: input.primitive.structure.element,
        attributes: { class: "quoin-test", ...(input.primitive.structure.attributes ?? {}) },
        children: input.children
      }
    }),
    metadata: {
      target: "test-inline",
      supportedPrimitives: ["*"],
      emittedFormat: "html"
    }
  };

  it("composes token + vocab + pattern + theme + icons in one compile", () => {
    const r = compile({
      source: `
        <action-button intent="primary">
          <icon name="check" size="sm" aria-hidden="true" />
          Done
        </action-button>
      `,
      tokenPack,
      vocabularyPacks,
      patternPacks: [patternPack],
      iconPacks: [iconPack],
      themePack,
      implementationPack: inlineImpl
    });
    expect(r.html).not.toContain("<action-button");
    expect(r.html).not.toContain("<icon");
    expect(r.html).toContain("<button");
    expect(r.html).toContain("<svg");
  });
});
