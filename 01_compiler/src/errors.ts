/**
 * Compiler error types. Diagnostic strings match the format described
 * in spec.md §5.3.
 */

export type CompilerErrorCode =
  | "UNKNOWN_PRIMITIVE"
  | "INVALID_ATTRIBUTE_VALUE"
  | "MISSING_TOKEN"
  | "MISSING_EMITTER"
  | "CIRCULAR_TOKEN_REFERENCE"
  | "INVALID_PACK"
  | "DUPLICATE_PRIMITIVE";

export interface CompilerErrorLocation {
  filename?: string;
  primitive?: string;
  pack?: string;
}

export class CompilerError extends Error {
  readonly code: CompilerErrorCode;
  readonly location: CompilerErrorLocation;

  constructor(
    code: CompilerErrorCode,
    message: string,
    location: CompilerErrorLocation = {}
  ) {
    super(message);
    this.name = "CompilerError";
    this.code = code;
    this.location = location;
  }

  /** Format as a multi-line diagnostic. */
  toDiagnostic(): string {
    const head = `ERROR  [${this.code}]`;
    const loc = this.location.filename ?? "<unknown>";
    const ctx: string[] = [];
    if (this.location.primitive) ctx.push(`primitive: <${this.location.primitive}>`);
    if (this.location.pack) ctx.push(`pack: ${this.location.pack}`);
    return [head, `  ${loc}`, ...ctx.map((c) => `  ${c}`), `  ${this.message}`].join(
      "\n"
    );
  }
}

export class PackValidationError extends CompilerError {
  constructor(message: string, pack?: string) {
    super("INVALID_PACK", message, { pack });
    this.name = "PackValidationError";
  }
}
