# What USML and Quoin Are

**USML (UI Semantics Markup Language) is the specification for UI semantics. Quoin is the reference implementation in HTML and CSS that demonstrates USML works in practice.** The bifurcation between specification and implementation is deliberate and mirrors HTML/Firefox, ECMAScript/Node.js, ARIA/axe-core, DTCG/Style Dictionary.

This distinction matters. Most contemporary design systems are implementations without a publishable specification — Material, Carbon, Polaris, shadcn each ship working components but the *anatomy contract* underneath those components is implicit, framework-bound, and not portable. A team that adopts one of these systems inherits its working implementation but cannot extract its underlying semantic model to use elsewhere. The result is the silo problem: every design system is a vertically integrated ecosystem, and switching between them means rewriting the application layer.

USML and Quoin invert this relationship. The specification is the strategic product. The reference implementation proves the specification is workable and provides a complete usable design system today. But the specification is what's published, what other systems can implement, what standards bodies can ratify, and what AI tools can consume as a stable target.

This is the same shape HTML occupies relative to web browsers. HTML is a specification published by the W3C. Chrome, Firefox, Safari are implementations. Browsers compete on implementation quality, but they all implement the same HTML specification, which is why a webpage written in one browser renders correctly in another. Without that specification underneath, the web could not exist as we know it.

USML proposes the equivalent for UI semantics: a specification that captures *what something is* (a hero, a nav, a button, a modal — at the level of semantic intent and anatomy) independent of *what it looks like* (the aesthetic layer), *what framework it renders in* (the backend layer), and *how AI tools generate it* (the consumption layer). The specification is small, stable, and publishable. Implementations are diverse and pluggable. Quoin is the first such implementation; future implementations targeting React, Vue, web components, and native frameworks will follow.

## What the specification covers

The USML specification defines:

**Anatomy contracts.** The structural definition of every UI pattern as a slot graph — mandatory slots (always present), conditional slots (gated by variant or state), variant axes (orthogonal modal dimensions), microstates (interaction states), ARIA roles and properties, composition lineage (which peer patterns this pattern consumes). Each pattern's anatomy is a typed contract independent of any specific rendering.

**Variant tokenization rules.** Every visual choice that a pattern exposes is expressed as a token-typed variant axis. Aesthetic packs supply token values for those axes. A pattern with a `data-alignment` axis accepts values from any aesthetic pack; a pattern with a `data-palette` axis pulls from the aesthetic pack's palette tokens. This separation is what makes aesthetic-pack swap possible.

**Composition rules.** Patterns consume other patterns through declared peer-pack relationships. The composition is structural and traceable — a hero's action cluster consumes the button-system pattern; a nav's search affordance consumes the form-fields pattern and the modal-dialog pattern. Composition cannot be inlined; it must be real. This is what makes the catalog evolve coherently rather than fracturing into parallel implementations.

**Aesthetic-pack interface.** An aesthetic pack is a typed bundle of token values that override the baseline defaults. The specification defines the token vocabulary (color tokens, motion tokens, typography tokens, spacing tokens, density tokens) and the binding rules (which token slots each pattern's variants expose). Any aesthetic pack composes with any pattern.

**Backend emission contracts.** Backends emit patterns into specific framework outputs — plain CSS, web components, React, Vue, native frameworks. The specification defines the IR (intermediate representation) that backends consume and the fidelity requirements they must meet. Same source pattern, different backend emissions, equivalent semantic output.

**AI consumption surfaces.** The specification defines the format AI tools consume — `/llms.txt`, `/llms-full.txt`, `/registry.json`, and the MCP server endpoints. These are serialization views of the canonical IR, designed so AI tools can generate Quoin patterns reliably without hallucinating composition rules.

The specification is small. It can be expressed in roughly 50-100 pages of formal documentation. It's intended to be stable across major versions, evolving only through deliberate revision rather than continuous churn.

## What the reference implementation ships

The reference implementation is what's in the repository today and what continues to grow over time. It includes:

A working pattern catalog — 22 patterns plus 4 content primitives plus 6 layout primitives as of Phase 22.7 closure, growing toward ~30 anatomical primitives plus ~50 reference compositions. The catalog is genuine production-quality UI infrastructure — it can be used directly to build websites, applications, and documentation. It's not a stub; it's a working design system that happens to be a reference implementation of the specification.

A set of aesthetic packs (Boeing Watch precision-instrumental, Harrow Haus post-industrial publishing, a tasteful neutral default) that demonstrate the aesthetic-swap mechanism in production, shipped in Phase 22.5.A with a live View Transitions API crossfade demo. Additional aesthetic packs can be authored by anyone using the documented aesthetic-pack interface.

A plain-CSS backend that emits the IR to web-standard HTML and CSS. Additional backends (Material Web Components, Carbon Web Components, React + Tailwind, etc.) are planned and will be added as the IR engine completes (Phase 23).

A translation skill (transitional infrastructure) for ingesting patterns from external design systems that haven't yet implemented the specification natively. As major design systems adopt the spec as a publication target, the translation skill becomes obsolete by design.

AI consumption surfaces (`/llms.txt`, `/llms-full.txt`, `/registry.json`, eventual MCP server) that make Quoin discoverable and consumable by AI coding tools.

## The strategic position

The specification framing positions Quoin asymmetrically to every existing system in the category:

Against component libraries (shadcn, MUI, Chakra, Ant Design): USML is a different layer of abstraction. Component libraries are implementations bound to specific frameworks. USML is the specification underneath that any of them could implement. They are not competitors; they are potential adopters or implementers.

Against utility-first frameworks (Tailwind, UnoCSS): Quoin operates at the semantic level rather than the CSS property level. They solve different problems. A Tailwind user can adopt Quoin for semantics while keeping Tailwind for property-level customization. They compose, they don't compete.

Against design tokens systems (Open Props, Style Dictionary, DTCG): USML specifies the layer above tokens — anatomy contracts, composition rules, variant tokenization. Tokens are an input to USML, not a competitor. Open Props can serve as USML's token layer; DTCG 2025.10-compatible token files are first-class inputs (USML's aesthetic-pack interface consumes DTCG verbatim).

Against AI design tools (v0, Lovable, Cursor with shadcn defaults): USML is the structured target these tools can generate against. Currently they generate utility-first or shadcn-style output because those are in their training data. As USML becomes standardized and the AI consumption surface is published, AI tools can target USML as a more semantic, more aesthetic-flexible, more multi-backend-capable generation target.

Against existing design system specifications (none that we know of, at the level of completeness Quoin targets): the field is open. There's no published W3C-track specification for UI anatomy contracts. There's no DTCG-equivalent body for pattern semantics. The space Quoin occupies has no incumbent.

## The standards track

The USML specification is intended to be publishable to standards bodies. Once Phase 23 (USML IR Architecture) completes and the specification is stable, the deliberate path is:

Phase 23 closure ships a complete IR specification draft. The draft is published openly under MIT license at the repository.

The draft is submitted to the W3C Community Group process as a starting point for a working group. Possible targets include the Web Components Community Group, the Open UI Community Group (which already publishes proposals for native UI controls), or a new Community Group specifically for UI anatomy semantics.

The draft is submitted to the Design Tokens Community Group (DTCG) for the token vocabulary alignment, since DTCG already specifies the design token format Quoin's token layer conforms to.

Major design system maintainers (Material, Carbon, Polaris, shadcn) are approached with the proposal that their systems publish anatomy in Quoin IR format alongside their existing implementation distributions. Each adoption strengthens the specification's standing.

Academic alignment is pursued — citations in design system research papers, presentations at design system conferences (Clarity Conf, Schema, Friends of Figma), engagement with the design tokens academic community.

This is a multi-year arc. The specification doesn't need to be a W3C Recommendation for Quoin to be useful (the reference implementation is already useful today). But the standards track is the asymmetric move that determines whether Quoin becomes infrastructure or remains a library. It is pursued deliberately.

## Adoption modes

Different audiences adopt Quoin differently. The specification framing makes each mode explicit:

**Developers building applications.** Adopt the reference implementation directly. Use the pattern catalog, choose an aesthetic pack, ship a working application. No knowledge of the specification required. This is the easy path — Quoin works like a design system today for anyone who just wants to build.

**Teams maintaining design systems.** Implement the specification. Publish your existing design system's anatomy in Quoin IR format alongside your current framework-specific distribution. Your users can now compose your patterns with any Quoin aesthetic pack, emit to any Quoin backend, generate against your patterns with AI tools that consume Quoin. This is the interoperability path.

**Framework authors.** Build backend emitters. USML's IR compiles to your framework's component model — write the emitter, get all Quoin patterns rendering in your framework. This is the platform path — you make USML work in your ecosystem without needing pattern-authoring expertise.

**Designers building aesthetic packs.** Use the documented aesthetic-pack interface to bundle token values that fit your brand or aesthetic vision. Aesthetic packs are pure data; they require no engineering. Brand-guidelines-PDF-to-aesthetic-pack tooling is an open extension category. This is the design path.

**AI tool builders.** Consume the specification through the AI consumption surfaces. Your tool generates against Quoin's structured intent format rather than against framework-specific syntax. The output is more reliable, more semantically meaningful, more easily edited. This is the integration path.

**Standards bodies.** Adopt USML or align with it. The specification is intended to be acceptable for standards-track work. This is the ratification path.

**Researchers.** Cite the specification. Build on the abstractions. Propose extensions through the documented community contribution process. This is the academic path.

## The architecture commitments

The specification framing only holds if each architectural commitment holds. Each is evaluable by examining the implementation:

The IR is canonical. The pack manifest format, the AI consumption files, the registry serializations are derivative views of the canonical IR. They cannot drift from the IR because they're generated from it. (Phase 23 work formalizes this canonicalization.)

Anatomy is separable from aesthetic. Patterns expose variant axes that aesthetic packs supply values for; patterns do not bake aesthetic choices into anatomy. (Phase 22's nine consolidations enforce this through gates v3.G.15-G.21.)

Composition is real. Patterns consume peer patterns through declared composition; they do not inline peer pattern contracts. (Gate v3.G.17 enforces this.)

Backend emission is fidelity-preserving. Each backend's output is idiomatic for that backend; the IR's structural intent is preserved across backends. (Phase 23 work, with first reference backend in Phase 23.5.)

AI consumption is structured. AI tools consume the same canonical IR that backends emit from; the AI consumption surface is not a separate workstream. (Phase 23 work, with MCP server in Phase 24.)

Extension is open. The pattern catalog, aesthetic packs, source adapters, backend emitters are open to community contribution through the documented extension interfaces, while the core specification is curated tightly. (Community model formalized at Phase 23.5 closure.)

## The lineage

Quoin builds on a lineage of prior work that has been pointing toward this position for years. The lineage matters because Quoin is not claiming to invent semantic UI; it is claiming to formalize what the field has been converging on.

Every Layout (Heydon Pickering, Andy Bell) argued for semantic layout primitives that compose. Quoin generalizes this to all UI semantics, not just layout — and ships its own layout primitive layer (Phase 22.6) that consciously builds on the Every Layout vocabulary (`prim-stack`, `prim-cluster`, `prim-center`, `prim-grid`, `prim-sidebar`, `prim-switcher`).

Open Props (Adam Argyle, Google) made design tokens libre and CDN-distributable at scale. Quoin specifies the layer above tokens — anatomy contracts that consume tokens.

shadcn/ui (shadcn) demonstrated the copy-and-own model and won the AI-tool default-generation race. USML is the specification layer that shadcn could implement, making its patterns aesthetic-swappable and multi-backend-emittable.

Radix UI proved that headless behavioral primitives plus styling separation works. Quoin generalizes this from React-bound primitives to framework-independent IR.

The W3C ARIA Authoring Practices Guide documents canonical accessible patterns as reference HTML. USML absorbs and structures these patterns through the Quoin reference implementation's source-adapter mechanism, with ARIA APG serving as the first source adapter in Phase 23.4 and the first reference translations (`disclosure`, `combobox`, `tabs`) shipping in Phase 22.7.

The DTCG (Design Tokens Community Group) standardized token vocabulary. Quoin's token layer conforms to DTCG; alignment is pursued through DTCG submission of the variant-tokenization rules layer.

Recent academic work on intent-based UI generation (Weave, PrototypeFlow, SpecifyUI, WireGen, CrossTL [arXiv 2508.21256]) confirms the strategic direction. USML is the production-grade specification this research has been prototyping toward; Quoin is the working reference implementation it can be evaluated against.

Quoin does not replace any of these. It provides the formal layer underneath them — the specification they can implement against to gain interoperability.

## The tradeoffs

The specification framing is honest about its tradeoffs:

Specifications move slowly compared to implementations. Quoin's spec evolves through deliberate revision, not continuous churn. This is a strength for adopters who need stability and a constraint for contributors who want rapid evolution.

The reference implementation does not match the specification's full potential. Many spec features are documented but await implementation work in subsequent phases. Phase 22 closed the foundational architecture; Phase 22.5 shipped the first aesthetic packs (Phase 22.5.A), the second half of the editorial pattern batch (Phase 22.5.C), and the first page templates (Phase 22.5.D); Phase 22.6 shipped the layout primitive layer; Phase 22.7 ships the translation skill and specification-framing documentation; Phase 23 builds the canonical IR engine and publishes the specification draft; Phase 24 ships distribution; Phase 25 grows the catalog through harvest. Adopters get working infrastructure today but the specification's full power is realized over time.

The semantic-first markup with data attributes is not universally preferable. Adopters who prefer utility-first markup or framework-component-first composition may find Quoin's semantic markup less ergonomic. The tradeoff is paid in semantic clarity and AI-tool consumption quality.

The specification's openness invites fragmentation. Open specifications can fork or split if competing implementations diverge. Quoin's spec maintenance discipline must be tight enough to prevent this — a real organizational challenge that the project will face as adoption grows.

## Current state, honest

As of this writing, Quoin has shipped:

- **Phase 22:** nine structural consolidations producing 15 patterns + 4 content primitives + gate set v3.G.1 through v3.G.21.
- **Phase 22.5.A:** first three aesthetic packs (Boeing Watch, Harrow Haus, Default) plus live aesthetic-swap demo using View Transitions API.
- **Phase 22.5.C:** second half of the editorial pattern batch — `footnote`, `table-of-contents`, `article-meta`, `prose-aside`. (Phase 22.5.B, the first half — `prose-body`, `code-block`, `pull-quote`, `figure-with-caption` — remains queued.)
- **Phase 22.5.D:** first page-template batch — `template-landing-saas` (complete), `template-docs-site` (scaffold pending 22.5.B), `template-blog-with-prose` (scaffold pending 22.5.B). New `quoin.template.json` format introduced.
- **Phase 22.6:** layout primitive layer — six primitives (`prim-stack`, `prim-cluster`, `prim-center`, `prim-grid`, `prim-sidebar`, `prim-switcher`) that future patterns compose for layout rather than redeclaring layout CSS.
- **Phase 22.7 (this document and its session):** pattern translation skill (framed as transitional infrastructure), curated source registry, anatomy extraction rules, quality gates, three reference translations from ARIA APG (`disclosure`, `combobox`, `tabs`), and this THESIS document.
- AI consumption surfaces in their current form (`/llms.txt`, `/llms-full.txt`, `/registry.json`).
- Comprehensive documentation of the architecture.

Catalog totals as of Phase 22.7 closure: **22 production patterns + 4 content primitives + 6 layout primitives = 32 directly-usable specification-conformant artifacts**, three aesthetic packs, three page templates (one production, two scaffold).

In flight or queued next:

- **Phase 22.5.B:** first half of editorial pattern batch (`prose-body`, `code-block`, `pull-quote`, `figure-with-caption`). Blocks full composition of templates D.2 + D.3.
- **Harvest sessions** executing against the source registry shipped in this phase — multiple external systems translated to Quoin patterns under the curation framework.
- **Phase 23:** Quoin IR Architecture — the canonical IR engine **and the published specification draft**. The Phase 23 reframe is documented in PHASES.md.
- **Phase 23.5:** first live translation demo plus specification draft publication (`Quoin-IR-Specification.md` at repository root).
- **Phase 24:** build pipeline integration + AI tool distribution surfaces.
- **Phase 25:** multi-source harvest + external adoption push.

Activated by Phase 23.5 closure (no longer indefinitely deferred):

- **Phase 26:** standards bodies engagement (W3C Web Components CG, W3C Open UI CG, DTCG, direct outreach to major design system maintainers).

The work is genuine. The specification framing is what the work has been pointing toward. This document makes that explicit so future readers — adopters, contributors, standards body reviewers, AI tool builders — encounter the truthful framing rather than the surface-level "design system" reading.

## What USML is asking

USML asks designers and developers to express what something *is* rather than what it looks like or what framework it renders in. The promise is that doing so makes everything downstream tractable — aesthetics swap, frameworks compile, AI tools consume reliably, design systems become interoperable rather than siloed, standards bodies have something to ratify.

The architecture is built to make the bet evaluable on its merits at every stage. Each phase produces a demonstrable result. Each commit is traceable. Each pattern's anatomy is documented. Each gate is enforced. There is no opacity layer between the claims and the code: USML is the specification, Quoin is the implementation, and the two are visibly aligned.

The specification framing makes the ambition legible. USML is not trying to be a better Material or shadcn — those are implementations. USML is trying to be the specification under which a future Material, a future shadcn, a future framework-not-yet-invented can all interoperate. That is a different and larger ambition. It is also, on the architecture's current trajectory, achievable.

Built at Harrow Haus, Rockford, Illinois. May 2026.

— Donald Pilger
