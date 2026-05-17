/**
 * Playground + showcase pack registry — in-memory pack objects ready
 * to feed the compiler.
 *
 * All 30 token packs and 12 vocabulary packs are pre-bundled via
 * Vite's import-attribute machinery (?raw for CSS, JSON imports for
 * manifests + tokens). The bundle size cost is acceptable because the
 * playground is the largest interactive demo in the docs site.
 *
 * Phase 4.5: expanded from 5 token packs to all 30. Token packs
 * declare their fidelity tier (A/B/C) from their manifest's
 * attribution block; the playground and pack browser surface this.
 */

import { flattenDtcg, resolveReferences } from "@quoin/compiler";
import type {
  ImplementationPack,
  PackManifest,
  PrimitiveDefinition,
  TokenPack,
  VocabularyPack
} from "@quoin/compiler";

/* ─────────────── Reference token pack ─────────────── */

import baselineRaw from "../../../02_reference-packs/tokens-baseline/tokens/index.json";
import baselineManifest from "../../../02_reference-packs/tokens-baseline/quoin.pack.json";
import baselineCss from "../../../02_reference-packs/tokens-baseline/tokens.css?raw";

/* ─────────────── 29 Harvested token packs ─────────────── */

import antRaw from "../../../03_harvest/packs/tokens-ant/tokens/index.json";
import antManifest from "../../../03_harvest/packs/tokens-ant/quoin.pack.json";
import antCss from "../../../03_harvest/packs/tokens-ant/tokens.css?raw";

import atlassianRaw from "../../../03_harvest/packs/tokens-atlassian/tokens/index.json";
import atlassianManifest from "../../../03_harvest/packs/tokens-atlassian/quoin.pack.json";
import atlassianCss from "../../../03_harvest/packs/tokens-atlassian/tokens.css?raw";

import baseWebRaw from "../../../03_harvest/packs/tokens-base-web/tokens/index.json";
import baseWebManifest from "../../../03_harvest/packs/tokens-base-web/quoin.pack.json";
import baseWebCss from "../../../03_harvest/packs/tokens-base-web/tokens.css?raw";

import bootstrapRaw from "../../../03_harvest/packs/tokens-bootstrap/tokens/index.json";
import bootstrapManifest from "../../../03_harvest/packs/tokens-bootstrap/quoin.pack.json";
import bootstrapCss from "../../../03_harvest/packs/tokens-bootstrap/tokens.css?raw";

import bulmaRaw from "../../../03_harvest/packs/tokens-bulma/tokens/index.json";
import bulmaManifest from "../../../03_harvest/packs/tokens-bulma/quoin.pack.json";
import bulmaCss from "../../../03_harvest/packs/tokens-bulma/tokens.css?raw";

import carbonRaw from "../../../03_harvest/packs/tokens-carbon/tokens/index.json";
import carbonManifest from "../../../03_harvest/packs/tokens-carbon/quoin.pack.json";
import carbonCss from "../../../03_harvest/packs/tokens-carbon/tokens.css?raw";

import chakraRaw from "../../../03_harvest/packs/tokens-chakra/tokens/index.json";
import chakraManifest from "../../../03_harvest/packs/tokens-chakra/quoin.pack.json";
import chakraCss from "../../../03_harvest/packs/tokens-chakra/tokens.css?raw";

import clarityRaw from "../../../03_harvest/packs/tokens-clarity/tokens/index.json";
import clarityManifest from "../../../03_harvest/packs/tokens-clarity/quoin.pack.json";
import clarityCss from "../../../03_harvest/packs/tokens-clarity/tokens.css?raw";

import elasticRaw from "../../../03_harvest/packs/tokens-elastic/tokens/index.json";
import elasticManifest from "../../../03_harvest/packs/tokens-elastic/quoin.pack.json";
import elasticCss from "../../../03_harvest/packs/tokens-elastic/tokens.css?raw";

import evergreenRaw from "../../../03_harvest/packs/tokens-evergreen/tokens/index.json";
import evergreenManifest from "../../../03_harvest/packs/tokens-evergreen/quoin.pack.json";
import evergreenCss from "../../../03_harvest/packs/tokens-evergreen/tokens.css?raw";

import fluentRaw from "../../../03_harvest/packs/tokens-fluent/tokens/index.json";
import fluentManifest from "../../../03_harvest/packs/tokens-fluent/quoin.pack.json";
import fluentCss from "../../../03_harvest/packs/tokens-fluent/tokens.css?raw";

import geistRaw from "../../../03_harvest/packs/tokens-geist/tokens/index.json";
import geistManifest from "../../../03_harvest/packs/tokens-geist/quoin.pack.json";
import geistCss from "../../../03_harvest/packs/tokens-geist/tokens.css?raw";

import gestaltRaw from "../../../03_harvest/packs/tokens-gestalt/tokens/index.json";
import gestaltManifest from "../../../03_harvest/packs/tokens-gestalt/quoin.pack.json";
import gestaltCss from "../../../03_harvest/packs/tokens-gestalt/tokens.css?raw";

import govukRaw from "../../../03_harvest/packs/tokens-govuk/tokens/index.json";
import govukManifest from "../../../03_harvest/packs/tokens-govuk/quoin.pack.json";
import govukCss from "../../../03_harvest/packs/tokens-govuk/tokens.css?raw";

import herouiRaw from "../../../03_harvest/packs/tokens-heroui/tokens/index.json";
import herouiManifest from "../../../03_harvest/packs/tokens-heroui/quoin.pack.json";
import herouiCss from "../../../03_harvest/packs/tokens-heroui/tokens.css?raw";

import lightningRaw from "../../../03_harvest/packs/tokens-lightning/tokens/index.json";
import lightningManifest from "../../../03_harvest/packs/tokens-lightning/quoin.pack.json";
import lightningCss from "../../../03_harvest/packs/tokens-lightning/tokens.css?raw";

import mantineRaw from "../../../03_harvest/packs/tokens-mantine/tokens/index.json";
import mantineManifest from "../../../03_harvest/packs/tokens-mantine/quoin.pack.json";
import mantineCss from "../../../03_harvest/packs/tokens-mantine/tokens.css?raw";

import material3Raw from "../../../03_harvest/packs/tokens-material3/tokens/index.json";
import material3Manifest from "../../../03_harvest/packs/tokens-material3/quoin.pack.json";
import material3Css from "../../../03_harvest/packs/tokens-material3/tokens.css?raw";

import muiRaw from "../../../03_harvest/packs/tokens-mui/tokens/index.json";
import muiManifest from "../../../03_harvest/packs/tokens-mui/quoin.pack.json";
import muiCss from "../../../03_harvest/packs/tokens-mui/tokens.css?raw";

import openPropsRaw from "../../../03_harvest/packs/tokens-open-props/tokens/index.json";
import openPropsManifest from "../../../03_harvest/packs/tokens-open-props/quoin.pack.json";
import openPropsCss from "../../../03_harvest/packs/tokens-open-props/tokens.css?raw";

import orbitRaw from "../../../03_harvest/packs/tokens-orbit/tokens/index.json";
import orbitManifest from "../../../03_harvest/packs/tokens-orbit/quoin.pack.json";
import orbitCss from "../../../03_harvest/packs/tokens-orbit/tokens.css?raw";

import pasteRaw from "../../../03_harvest/packs/tokens-paste/tokens/index.json";
import pasteManifest from "../../../03_harvest/packs/tokens-paste/quoin.pack.json";
import pasteCss from "../../../03_harvest/packs/tokens-paste/tokens.css?raw";

import polarisRaw from "../../../03_harvest/packs/tokens-polaris/tokens/index.json";
import polarisManifest from "../../../03_harvest/packs/tokens-polaris/quoin.pack.json";
import polarisCss from "../../../03_harvest/packs/tokens-polaris/tokens.css?raw";

import primerRaw from "../../../03_harvest/packs/tokens-primer/tokens/index.json";
import primerManifest from "../../../03_harvest/packs/tokens-primer/quoin.pack.json";
import primerCss from "../../../03_harvest/packs/tokens-primer/tokens.css?raw";

import radixRaw from "../../../03_harvest/packs/tokens-radix/tokens/index.json";
import radixManifest from "../../../03_harvest/packs/tokens-radix/quoin.pack.json";
import radixCss from "../../../03_harvest/packs/tokens-radix/tokens.css?raw";

import shadcnRaw from "../../../03_harvest/packs/tokens-shadcn/tokens/index.json";
import shadcnManifest from "../../../03_harvest/packs/tokens-shadcn/quoin.pack.json";
import shadcnCss from "../../../03_harvest/packs/tokens-shadcn/tokens.css?raw";

import spectrumRaw from "../../../03_harvest/packs/tokens-spectrum/tokens/index.json";
import spectrumManifest from "../../../03_harvest/packs/tokens-spectrum/quoin.pack.json";
import spectrumCss from "../../../03_harvest/packs/tokens-spectrum/tokens.css?raw";

import tailwindRaw from "../../../03_harvest/packs/tokens-tailwind/tokens/index.json";
import tailwindManifest from "../../../03_harvest/packs/tokens-tailwind/quoin.pack.json";
import tailwindCss from "../../../03_harvest/packs/tokens-tailwind/tokens.css?raw";

import uswdsRaw from "../../../03_harvest/packs/tokens-uswds/tokens/index.json";
import uswdsManifest from "../../../03_harvest/packs/tokens-uswds/quoin.pack.json";
import uswdsCss from "../../../03_harvest/packs/tokens-uswds/tokens.css?raw";

import workdayRaw from "../../../03_harvest/packs/tokens-workday/tokens/index.json";
import workdayManifest from "../../../03_harvest/packs/tokens-workday/quoin.pack.json";
import workdayCss from "../../../03_harvest/packs/tokens-workday/tokens.css?raw";

/* ─────────────── Vocabulary packs ─────────────── */

import editorialPrims from "../../../02_reference-packs/vocab-editorial/primitives/index.json";
import editorialManifest from "../../../02_reference-packs/vocab-editorial/quoin.pack.json";

import dashboardPrims from "../../../02_reference-packs/vocab-dashboard/primitives/index.json";
import dashboardManifest from "../../../02_reference-packs/vocab-dashboard/quoin.pack.json";

import essentialsPrims from "../../../02_reference-packs/vocab-essentials/primitives/index.json";
import essentialsManifest from "../../../02_reference-packs/vocab-essentials/quoin.pack.json";

import appShellPrims from "../../../02_reference-packs/vocab-app-shell/primitives/index.json";
import appShellManifest from "../../../02_reference-packs/vocab-app-shell/quoin.pack.json";

import marketingPrims from "../../../03_harvest/packs/vocab-marketing/primitives/index.json";
import marketingManifest from "../../../03_harvest/packs/vocab-marketing/quoin.pack.json";

import docsPrims from "../../../03_harvest/packs/vocab-docs/primitives/index.json";
import docsManifest from "../../../03_harvest/packs/vocab-docs/quoin.pack.json";

import formsPrims from "../../../03_harvest/packs/vocab-forms/primitives/index.json";
import formsManifest from "../../../03_harvest/packs/vocab-forms/quoin.pack.json";

import dashboardExtendedPrims from "../../../03_harvest/packs/vocab-dashboard-extended/primitives/index.json";
import dashboardExtendedManifest from "../../../03_harvest/packs/vocab-dashboard-extended/quoin.pack.json";

/* ─────────────── Implementation packs ─────────────── */

// @ts-ignore — emit.js is a plain ESM module, no .d.ts shipped.
import { emit as emitTailwind } from "../../../02_reference-packs/impl-tailwind/emit.js";
import tailwindImplManifest from "../../../02_reference-packs/impl-tailwind/quoin.pack.json";
import tailwindMeta from "../../../02_reference-packs/impl-tailwind/metadata.json";

// @ts-ignore
import { emit as emitRawCss } from "../../../02_reference-packs/impl-raw-css/emit.js";
import rawCssManifest from "../../../02_reference-packs/impl-raw-css/quoin.pack.json";
import rawCssMeta from "../../../02_reference-packs/impl-raw-css/metadata.json";

import shimCss from "../../../02_reference-packs/demos/shared/tailwind-shim.css?raw";
import companionCss from "../../../02_reference-packs/impl-tailwind/companion.css?raw";

/* ─────────────── builders ─────────────── */

function buildTokenPack(
  manifest: unknown,
  raw: unknown,
  css: string
): { pack: TokenPack; css: string; manifest: PackManifest } {
  return {
    pack: {
      manifest: manifest as PackManifest,
      tokens: resolveReferences(flattenDtcg(raw)),
      capabilities: new Set((manifest as PackManifest).capabilities ?? [])
    },
    css,
    manifest: manifest as PackManifest
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

/* ─────────────── exported registries ─────────────── */

export const TOKEN_PACKS = {
  "tokens-baseline":  buildTokenPack(baselineManifest, baselineRaw, baselineCss),
  "tokens-ant":       buildTokenPack(antManifest, antRaw, antCss),
  "tokens-atlassian": buildTokenPack(atlassianManifest, atlassianRaw, atlassianCss),
  "tokens-base-web":  buildTokenPack(baseWebManifest, baseWebRaw, baseWebCss),
  "tokens-bootstrap": buildTokenPack(bootstrapManifest, bootstrapRaw, bootstrapCss),
  "tokens-bulma":     buildTokenPack(bulmaManifest, bulmaRaw, bulmaCss),
  "tokens-carbon":    buildTokenPack(carbonManifest, carbonRaw, carbonCss),
  "tokens-chakra":    buildTokenPack(chakraManifest, chakraRaw, chakraCss),
  "tokens-clarity":   buildTokenPack(clarityManifest, clarityRaw, clarityCss),
  "tokens-elastic":   buildTokenPack(elasticManifest, elasticRaw, elasticCss),
  "tokens-evergreen": buildTokenPack(evergreenManifest, evergreenRaw, evergreenCss),
  "tokens-fluent":    buildTokenPack(fluentManifest, fluentRaw, fluentCss),
  "tokens-geist":     buildTokenPack(geistManifest, geistRaw, geistCss),
  "tokens-gestalt":   buildTokenPack(gestaltManifest, gestaltRaw, gestaltCss),
  "tokens-govuk":     buildTokenPack(govukManifest, govukRaw, govukCss),
  "tokens-heroui":    buildTokenPack(herouiManifest, herouiRaw, herouiCss),
  "tokens-lightning": buildTokenPack(lightningManifest, lightningRaw, lightningCss),
  "tokens-mantine":   buildTokenPack(mantineManifest, mantineRaw, mantineCss),
  "tokens-material3": buildTokenPack(material3Manifest, material3Raw, material3Css),
  "tokens-mui":       buildTokenPack(muiManifest, muiRaw, muiCss),
  "tokens-open-props":buildTokenPack(openPropsManifest, openPropsRaw, openPropsCss),
  "tokens-orbit":     buildTokenPack(orbitManifest, orbitRaw, orbitCss),
  "tokens-paste":     buildTokenPack(pasteManifest, pasteRaw, pasteCss),
  "tokens-polaris":   buildTokenPack(polarisManifest, polarisRaw, polarisCss),
  "tokens-primer":    buildTokenPack(primerManifest, primerRaw, primerCss),
  "tokens-radix":     buildTokenPack(radixManifest, radixRaw, radixCss),
  "tokens-shadcn":    buildTokenPack(shadcnManifest, shadcnRaw, shadcnCss),
  "tokens-spectrum":  buildTokenPack(spectrumManifest, spectrumRaw, spectrumCss),
  "tokens-tailwind":  buildTokenPack(tailwindManifest, tailwindRaw, tailwindCss),
  "tokens-uswds":     buildTokenPack(uswdsManifest, uswdsRaw, uswdsCss),
  "tokens-workday":   buildTokenPack(workdayManifest, workdayRaw, workdayCss)
} as const;

export const VOCAB_PACKS = {
  "vocab-editorial":           buildVocabPack(editorialManifest, editorialPrims),
  "vocab-dashboard":           buildVocabPack(dashboardManifest, dashboardPrims),
  "vocab-essentials":          buildVocabPack(essentialsManifest, essentialsPrims),
  "vocab-app-shell":           buildVocabPack(appShellManifest, appShellPrims),
  "vocab-marketing":           buildVocabPack(marketingManifest, marketingPrims),
  "vocab-docs":                buildVocabPack(docsManifest, docsPrims),
  "vocab-forms":               buildVocabPack(formsManifest, formsPrims),
  "vocab-dashboard-extended":  buildVocabPack(dashboardExtendedManifest, dashboardExtendedPrims)
} as const;

export const IMPL_PACKS = {
  "impl-tailwind": buildImplPack(tailwindImplManifest, tailwindMeta, emitTailwind),
  "impl-raw-css":  buildImplPack(rawCssManifest, rawCssMeta, emitRawCss)
} as const;

export const SHIM_CSS = shimCss;
export const COMPANION_CSS = companionCss;

export type TokenPackId = keyof typeof TOKEN_PACKS;
export type VocabPackId = keyof typeof VOCAB_PACKS;
export type ImplPackId = keyof typeof IMPL_PACKS;

/* ─────────────── fidelity helpers ─────────────── */

/**
 * Fidelity tier per token pack, read from each pack's manifest at
 * import time. Reference packs (tokens-baseline) have no tier — they
 * are not harvested.
 */
export const TOKEN_PACK_TIERS: Record<TokenPackId, "A" | "B" | "C" | null> = (() => {
  const out: Partial<Record<TokenPackId, "A" | "B" | "C" | null>> = {};
  for (const [id, entry] of Object.entries(TOKEN_PACKS)) {
    const tier = (entry.manifest as any)?.attribution?.fidelityTier ?? null;
    out[id as TokenPackId] = tier;
  }
  return out as Record<TokenPackId, "A" | "B" | "C" | null>;
})();
