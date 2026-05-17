/**
 * Showcase pack registry — minimal subset of the playground registry.
 *
 * The showcase only needs 4 token packs (Tailwind, Radix, Geist,
 * Material 3) + 4 vocabulary packs + 1 implementation pack. Keeping
 * this slim avoids pulling the entire playground bundle into the
 * showcase page.
 */

import { flattenDtcg, resolveReferences } from "@quoin/compiler";
import type {
  ImplementationPack,
  PackManifest,
  PrimitiveDefinition,
  TokenPack,
  VocabularyPack
} from "@quoin/compiler";

import tailwindRaw from "../../../03_harvest/packs/tokens-tailwind/tokens/index.json";
import tailwindManifest from "../../../03_harvest/packs/tokens-tailwind/quoin.pack.json";
import tailwindCss from "../../../03_harvest/packs/tokens-tailwind/tokens.css?raw";

import radixRaw from "../../../03_harvest/packs/tokens-radix/tokens/index.json";
import radixManifest from "../../../03_harvest/packs/tokens-radix/quoin.pack.json";
import radixCss from "../../../03_harvest/packs/tokens-radix/tokens.css?raw";

import geistRaw from "../../../03_harvest/packs/tokens-geist/tokens/index.json";
import geistManifest from "../../../03_harvest/packs/tokens-geist/quoin.pack.json";
import geistCss from "../../../03_harvest/packs/tokens-geist/tokens.css?raw";

import material3Raw from "../../../03_harvest/packs/tokens-material3/tokens/index.json";
import material3Manifest from "../../../03_harvest/packs/tokens-material3/quoin.pack.json";
import material3Css from "../../../03_harvest/packs/tokens-material3/tokens.css?raw";

import editorialPrims from "../../../02_reference-packs/vocab-editorial/primitives/index.json";
import editorialManifest from "../../../02_reference-packs/vocab-editorial/quoin.pack.json";
import dashboardPrims from "../../../02_reference-packs/vocab-dashboard/primitives/index.json";
import dashboardManifest from "../../../02_reference-packs/vocab-dashboard/quoin.pack.json";
import essentialsPrims from "../../../02_reference-packs/vocab-essentials/primitives/index.json";
import essentialsManifest from "../../../02_reference-packs/vocab-essentials/quoin.pack.json";
import marketingPrims from "../../../03_harvest/packs/vocab-marketing/primitives/index.json";
import marketingManifest from "../../../03_harvest/packs/vocab-marketing/quoin.pack.json";

// @ts-ignore — plain ESM, no .d.ts shipped.
import { emit as emitTailwind } from "../../../02_reference-packs/impl-tailwind/emit.js";
import tailwindImplManifest from "../../../02_reference-packs/impl-tailwind/quoin.pack.json";
import tailwindImplMeta from "../../../02_reference-packs/impl-tailwind/metadata.json";

import shimCss from "../../../02_reference-packs/demos/shared/tailwind-shim.css?raw";
import companionCss from "../../../02_reference-packs/impl-tailwind/companion.css?raw";

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

export const SHOWCASE_TOKEN_PACKS = {
  "tokens-tailwind":  buildTokenPack(tailwindManifest, tailwindRaw, tailwindCss),
  "tokens-radix":     buildTokenPack(radixManifest, radixRaw, radixCss),
  "tokens-geist":     buildTokenPack(geistManifest, geistRaw, geistCss),
  "tokens-material3": buildTokenPack(material3Manifest, material3Raw, material3Css)
} as const;

export const SHOWCASE_VOCABS: VocabularyPack[] = [
  buildVocabPack(editorialManifest, editorialPrims),
  buildVocabPack(dashboardManifest, dashboardPrims),
  buildVocabPack(essentialsManifest, essentialsPrims),
  buildVocabPack(marketingManifest, marketingPrims)
];

export const SHOWCASE_IMPL: ImplementationPack = {
  manifest: tailwindImplManifest as PackManifest,
  emit: emitTailwind,
  metadata: tailwindImplMeta as ImplementationPack["metadata"]
};

export const SHOWCASE_SHIM_CSS = shimCss;
export const SHOWCASE_COMPANION_CSS = companionCss;

export type ShowcasePackId = keyof typeof SHOWCASE_TOKEN_PACKS;
