/**
 * Pack manifest validation via JSON Schema (Ajv).
 *
 * Ajv ships dual CJS/ESM with the constructor under `.default` in some
 * loaders. We resolve through `any` to keep this robust across resolvers.
 */

import AjvImport from "ajv/dist/2020.js";
import addFormatsImport from "ajv-formats";
import schema from "./schema/pack-manifest.json" with { type: "json" };
import type { PackManifest } from "./types.js";
import { PackValidationError } from "./errors.js";

type AjvCtor = new (opts?: Record<string, unknown>) => {
  compile(schema: unknown): (input: unknown) => boolean;
};

const AjvImportAny = AjvImport as unknown as { default?: AjvCtor };
const Ajv: AjvCtor =
  (AjvImportAny && AjvImportAny.default ? AjvImportAny.default : (AjvImport as unknown as AjvCtor));

type AddFormats = (instance: unknown) => void;
const addFormatsAny = addFormatsImport as unknown as { default?: AddFormats };
const addFormats: AddFormats =
  (addFormatsAny && addFormatsAny.default ? addFormatsAny.default : (addFormatsImport as unknown as AddFormats));

type ValidatorFn = ((input: unknown) => boolean) & {
  errors?: Array<{ instancePath?: string; message?: string }>;
};

let validator: ValidatorFn | undefined;

function getValidator(): ValidatorFn {
  if (validator) return validator;
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  validator = ajv.compile(schema) as ValidatorFn;
  return validator;
}

export function validateManifest(input: unknown): PackManifest {
  const validate = getValidator();
  if (!validate(input)) {
    const messages = (validate.errors ?? [])
      .map((e) => `${e.instancePath || "<root>"} ${e.message ?? ""}`)
      .join("; ");
    const name =
      input && typeof input === "object" && "name" in input
        ? (input as { name?: string }).name
        : undefined;
    throw new PackValidationError(`Invalid pack manifest: ${messages}`, name);
  }
  return input as PackManifest;
}
