# Operator Handoff

This document is for the human operator (the project director). Every other document in this lab is for the AI agents.

## How this lab is organized

Each phase has its own folder with its own `README.md` describing what the phase produces and what "done" means. Phases run sequentially. No phase begins until the previous phase's exit criteria are met.

The current phase always lives in `00_spec/` (or whichever phase is in progress). Earlier phases are reference material; later phases are placeholders waiting for their handoff.

## How to use this with Claude Code

1. Drop this entire `quoin-lab/` directory into a workspace where Claude Code can read and write files.
2. Run the **initialization prompt** in `PHASE_PROMPTS.md` first. It creates the GitHub repo at `github.com/harrowhaus/quoin` and pushes the lab as the initial commit.
3. For each phase: open `PHASE_PROMPTS.md`, copy the phase prompt, paste into Claude Code, let it run.
4. Every phase prompt ends with a git commit + push to `github.com/harrowhaus/quoin`. Version history is preserved automatically.
5. When Claude Code reports completion, review the output against the phase's exit criteria in `PHASE_GATES.md`.
6. If criteria are met, advance to the next phase. If not, redirect Claude Code with specific corrections.

## Git workflow

- **Origin:** `github.com/harrowhaus/quoin` (single repo for the language, lab, and reference packs)
- **Branch model:** `main` is the canonical branch. Each phase commits incrementally; large in-progress work may be staged on a `phase-N` branch and merged to main at phase completion.
- **Commit cadence:** every phase prompt instructs the agent to commit at logical milestones and push to origin at phase end. The operator does not run git commands manually unless something has gone wrong.
- **Auth:** the operator's machine must have a GitHub PAT or SSH key configured for the `harrowhaus` account before Claude Code can push. This is the one-time setup step.

## Your role as operator

You direct; you do not author. The agents draft; you review and approve, redirect, or reject. The taste calls are baked into the spec citations (Alexander, Swiss/Brutalist tradition, DaisyUI prior art, Tailwind v4 architecture) — agents reference those rather than asking you to invent from scratch.

The decisions genuinely reserved for you:

- **Naming.** Pack names, primitive names, the final language name if it changes from Quoin. The agents will propose; you pick.
- **Editorial veto.** Anything that "feels wrong" — kill it. You don't need to justify; the agents will iterate.
- **Phase advancement.** Only you advance phases. Agents stop at the phase boundary and request review.
- **External distribution.** npm publication, GitHub org creation, domain registration. These require your credentials.

## What you should never do

- Write code yourself.
- Author specification prose yourself.
- Iterate on documents inside the lab manually. If something needs to change, instruct an agent to change it.
- Advance a phase before its exit criteria are demonstrably met.

## Adversarial review pattern

At each phase gate, run the same prompt through two different models (Claude + ChatGPT, or two separate Claude sessions). Compare outputs. Where they agree, trust. Where they disagree, the disagreement is the signal — investigate before advancing.

## Glossary

- **Phase** — a numbered work unit with its own folder, README, and exit criteria.
- **Gate** — the boundary between phases. A gate has explicit pass/fail criteria.
- **Pack** — a distributable unit. Three types: token, vocabulary, implementation.
- **Primitive** — a single semantic element defined by a vocabulary pack.
- **Implementation target** — the output format the compiler emits (Tailwind v4, raw CSS, Open Props, etc.).

## What to do right now

Current state: Phases 0–4, 4.5, 5a–5d, 0.5, and 3.5c are complete.
The canonical token namespace is frozen at its v1.0 surface area —
164 tokens across 11 DTCG 2025.10 types — and every token pack
(reference + 30 harvested) supplies a `$value` for every canonical
name. Strict validation passes catalogue-wide. Phase 3.5 + 3.5b
shipped the existing color/dimension extractions; Phase 3.5c filled
the geometric/typographic gap with programmatic defaults so the
namespace contract is satisfied. An optional Phase 3.5d would refine
per-pack shadow / border / typography composite values to match each
source system's actual geometric specs — incremental polish, not
blocking. Phase 4.5 refreshed the docs site. Phase 5e (launch) is
staged but not executed.

If this is your first time opening this lab:

1. Read `README.md` (top-level project overview).
2. Confirm your machine has GitHub auth configured for the `harrowhaus` account (PAT or SSH key).
3. Read `PHASE_GATES.md` (what done looks like at each phase).
4. Open `PHASE_PROMPTS.md` and copy the **Initialization** prompt. Paste into Claude Code. This creates the repo and pushes the lab.
5. After init completes, copy the **Phase 0** prompt and paste it.
6. Come back when each phase reports completion.
