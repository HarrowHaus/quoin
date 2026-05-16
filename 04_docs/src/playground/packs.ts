/**
 * Playground pack registry — in-memory pack objects ready to feed the
 * compiler.
 *
 * Each token pack is pre-flattened and reference-resolved by build-time
 * imports. The impl-pack emit functions are imported directly from
 * 02_reference-packs since they're plain ESM JavaScript modules.
 */

import { flattenDtcg, resolveReferences } from "@quoin/compiler";
import type {
  ImplementationPack,
  PackManifest,
  PrimitiveDefinition,
  TokenPack,
  VocabularyPack
} from "@quoin/compiler";

// ── Token packs (5 preloaded) ─────────────────────────────────────────
import baselineRaw from "../../../02_reference-packs/tokens-baseline/tokens/index.json";
import baselineManifest from "../../../02_reference-packs/tokens-baseline/quoin.pack.json";

import geistRaw from "../../../03_harvest/packs/tokens-geist/tokens/index.json";
import geistManifest from "../../../03_harvest/packs/tokens-geist/quoin.pack.json";

import material3Raw from "../../../03_harvest/packs/tokens-material3/tokens/index.json";
import material3Manifest from "../../../03_harvest/packs/tokens-material3/quoin.pack.json";

import radixRaw from "../../../03_harvest/packs/tokens-radix/tokens/index.json";
import radixManifest from "../../../03_harvest/packs/tokens-radix/quoin.pack.json";

import primerRaw from "../../../03_harvest/packs/tokens-primer/tokens/index.json";
import primerManifest from "../../../03_harvest/packs/tokens-primer/quoin.pack.json";

// ── Vocabulary packs (always loaded) ──────────────────────────────────
import editorialPrims from "../../../02_reference-packs/vocab-editorial/primitives/index.json";
import editorialManifest from "../../../02_reference-packs/vocab-editorial/quoin.pack.json";

import dashboardPrims from "../../../02_reference-packs/vocab-dashboard/primitives/index.json";
import dashboardManifest from "../../../02_reference-packs/vocab-dashboard/quoin.pack.json";

// ── Implementation packs (2 preloaded) ────────────────────────────────
// @ts-ignore — emit.js is a plain ESM module, no .d.ts shipped.
import { emit as emitTailwind } from "../../../02_reference-packs/impl-tailwind/emit.js";
import tailwindManifest from "../../../02_reference-packs/impl-tailwind/quoin.pack.json";
import tailwindMeta from "../../../02_reference-packs/impl-tailwind/metadata.json";

// @ts-ignore
import { emit as emitRawCss } from "../../../02_reference-packs/impl-raw-css/emit.js";
import rawCssManifest from "../../../02_reference-packs/impl-raw-css/quoin.pack.json";
import rawCssMeta from "../../../02_reference-packs/impl-raw-css/metadata.json";

// ── Tokens.css inline (so the iframe render can apply them) ──────────
import baselineCss from "../../../02_reference-packs/tokens-baseline/tokens.css?raw";
import geistCss from "../../../03_harvest/packs/tokens-geist/tokens.css?raw";
import material3Css from "../../../03_harvest/packs/tokens-material3/tokens.css?raw";
import radixCss from "../../../03_harvest/packs/tokens-radix/tokens.css?raw";
import primerCss from "../../../03_harvest/packs/tokens-primer/tokens.css?raw";

// ── Tailwind shim CSS for the iframe ──────────────────────────────────
import shimCss from "../../../02_reference-packs/demos/shared/tailwind-shim.css?raw";

function buildTokenPack(
  manifest: unknown,
  raw: unknown,
  css: string
): { pack: TokenPack; css: string } {
  return {
    pack: {
      manifest: manifest as PackManifest,
      tokens: resolveReferences(flattenDtcg(raw)),
      capabilities: new Set((manifest as PackManifest).capabilities ?? [])
    },
    css
  };
}

function buildVocabPack(manifest: unknown, prims: unknown): VocabularyPack {
  const primitives: Record<string, PrimitiveDefinition> = {};
  for (const p of prims as PrimitiveDefinition[]) primitives[p.name] = p;
  return { manifest: manifest as PackManifest, primitives };
}

function buildImplPack(
  manifest: unknown,
  meta: unknown,
  emit: any
): ImplementationPack {
  return {
    manifest: manifest as PackManifest,
    emit,
    metadata: meta as ImplementationPack["metadata"]
  };
}

export const TOKEN_PACKS = {
  "tokens-baseline": buildTokenPack(baselineManifest, baselineRaw, baselineCss),
  "tokens-geist": buildTokenPack(geistManifest, geistRaw, geistCss),
  "tokens-material3": buildTokenPack(material3Manifest, material3Raw, material3Css),
  "tokens-radix": buildTokenPack(radixManifest, radixRaw, radixCss),
  "tokens-primer": buildTokenPack(primerManifest, primerRaw, primerCss)
} as const;

export const VOCAB_PACKS: VocabularyPack[] = [
  buildVocabPack(editorialManifest, editorialPrims),
  buildVocabPack(dashboardManifest, dashboardPrims)
];

export const IMPL_PACKS = {
  "impl-tailwind": buildImplPack(tailwindManifest, tailwindMeta, emitTailwind),
  "impl-raw-css": buildImplPack(rawCssManifest, rawCssMeta, emitRawCss)
} as const;

export const SHIM_CSS = shimCss;

export type TokenPackId = keyof typeof TOKEN_PACKS;
export type ImplPackId = keyof typeof IMPL_PACKS;
