/**
 * Playground preset seeds — four canonical example sources that
 * exercise different vocab combinations. Picking a preset replaces
 * the source AND toggles the vocab checkboxes the seed needs.
 */

import type { VocabPackId } from "./packs";

export interface Preset {
  label: string;
  description: string;
  vocabs: VocabPackId[];
  source: string;
}

export const PRESETS: Record<string, Preset> = {
  article: {
    label: "Article",
    description: "Long-form editorial: headline, lead, body, pull-quote, colophon.",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    source: `<canvas-block>
  <stack gap="loose">

    <breadcrumb-trail>
      <a href="/">Home</a>
      <span>/</span>
      <a href="/journal">Journal</a>
      <span>/</span>
      <span>The Bot Smell Problem</span>
    </breadcrumb-trail>

    <authority-mark>The Bot Smell Problem</authority-mark>

    <lead-graf>
      For the last fifteen years, the dominant aesthetic of the web has
      been one of progressive simplification — flat surfaces, generous
      whitespace, and utility classes wide enough to encode every
      visual decision twice over.
    </lead-graf>

    <reading-flow>
      <p>
        Quoin proposes a different layering. The author writes intent;
        the compiler resolves it; the browser receives standard HTML
        and CSS. Nothing about that flow is novel.
      </p>
      <p>
        What is novel is the level of abstraction at which the author
        works. A <code>&lt;primary-action&gt;</code> is not a button
        class string; it is a semantic role.
      </p>
    </reading-flow>

    <pull-quote>The grid is a refusal of chance.</pull-quote>

    <aside-note>
      Cf. Müller-Brockmann, <em>Grid Systems</em> (1981), p. 41.
    </aside-note>

    <colophon>Set in Junicode. Composed in Quoin v0.1.</colophon>
  </stack>
</canvas-block>`
  },

  marketing: {
    label: "Marketing",
    description: "Landing page: hero with stats, feature grid, pricing tiers, CTA band, FAQ.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-essentials", "vocab-marketing"],
    source: `<hero-banner variant="centered">
  <stack gap="loose">
    <authority-mark>Tools for people who write code.</authority-mark>
    <lead-graf>
      A small studio. We design and build software in the open —
      interfaces, languages, and operating procedures that outlive
      their first user.
    </lead-graf>
    <cluster>
      <primary-action>See the work</primary-action>
      <secondary-action>Read the journal</secondary-action>
    </cluster>
  </stack>
</hero-banner>

<canvas-block>
  <stack gap="loose">

    <columns ratio="1:1:1">
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">12</div>
        <recede-block>shipped projects</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">4</div>
        <recede-block>active engagements</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 3rem; font-family: var(--font-display); line-height: 1">96%</div>
        <recede-block>client retention</recede-block>
      </stat-display>
    </columns>

    <feature-grid min-cell-width="280px">
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Languages</lead-graf>
          <recede-block>Small DSLs, semantic compilers, type-driven tooling.</recede-block>
        </stack>
      </feature-cell>
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Interfaces</lead-graf>
          <recede-block>Editorial product surfaces. Long-form reading, dense data, internal tooling.</recede-block>
        </stack>
      </feature-cell>
      <feature-cell>
        <stack>
          <lead-graf weight="emphasize">Operations</lead-graf>
          <recede-block>How small teams ship without the overhead of a large one.</recede-block>
        </stack>
      </feature-cell>
    </feature-grid>

    <columns ratio="1:1:1">
      <pricing-tier>
        <stack>
          <lead-graf weight="emphasize">Workshop</lead-graf>
          <recede-block>1-2 week residency.</recede-block>
          <primary-action>Apply</primary-action>
        </stack>
      </pricing-tier>
      <pricing-tier variant="featured">
        <stack>
          <lead-graf weight="emphasize">Studio engagement</lead-graf>
          <recede-block>3-6 month build.</recede-block>
          <primary-action>Discuss</primary-action>
        </stack>
      </pricing-tier>
      <pricing-tier>
        <stack>
          <lead-graf weight="emphasize">Open course</lead-graf>
          <recede-block>Cohort-based. Free, MIT.</recede-block>
          <secondary-action>Browse</secondary-action>
        </stack>
      </pricing-tier>
    </columns>

    <cta-band variant="split">
      <stack>
        <authority-mark weight="emphasize">Have something specific in mind?</authority-mark>
        <recede-block>Send a short note.</recede-block>
      </stack>
      <cluster>
        <primary-action>Get in touch</primary-action>
        <secondary-action>See calendar</secondary-action>
      </cluster>
    </cta-band>

  </stack>
</canvas-block>`
  },

  dashboard: {
    label: "Dashboard",
    description: "Data-dense console: KPIs, alerts, status, data table, segment control.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-essentials", "vocab-dashboard-extended"],
    source: `<canvas-block>
  <stack gap="loose">

    <breadcrumb-trail>
      <a href="/">Console</a>
      <span>/</span>
      <span>Today</span>
    </breadcrumb-trail>

    <authority-mark weight="emphasize">Operations</authority-mark>

    <alert-band intent="warning">
      Build cache reduced. Next build may be slow.
    </alert-band>

    <columns ratio="1:1:1:1">
      <stat-display>
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">12</div>
        <recede-block>active jobs</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">3</div>
        <recede-block>queue depth</recede-block>
      </stat-display>
      <stat-display intent="critical">
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">1</div>
        <recede-block>open alert</recede-block>
      </stat-display>
      <stat-display intent="success">
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">98%</div>
        <recede-block>uptime, 30d</recede-block>
      </stat-display>
    </columns>

    <segment-control>
      <button role="tab" aria-selected="true">Day</button>
      <button role="tab">Week</button>
      <button role="tab">Month</button>
    </segment-control>

    <data-table>
      <table style="width: 100%; border-collapse: collapse; font-size: var(--type-size-sm)">
        <thead>
          <tr>
            <th style="text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border)">Job</th>
            <th style="text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border)">Status</th>
            <th style="text-align: left; padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border)">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding: 0.5rem 0.75rem">build-prod</td><td><resolved-mark>complete</resolved-mark></td><td>2m 41s</td></tr>
          <tr><td style="padding: 0.5rem 0.75rem">sync-tokens</td><td><pending-block>running</pending-block></td><td>—</td></tr>
          <tr><td style="padding: 0.5rem 0.75rem">audit-report</td><td><resolved-mark>complete</resolved-mark></td><td>11s</td></tr>
        </tbody>
      </table>
    </data-table>

    <cluster>
      <primary-action>Run build</primary-action>
      <secondary-action>View logs</secondary-action>
      <destructive-action>Stop all</destructive-action>
    </cluster>

  </stack>
</canvas-block>`
  },

  "app-shell": {
    label: "App shell",
    description: "Full app surface: command bar, sidebar nav, content with page header.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-essentials", "vocab-app-shell"],
    source: `<app-shell nav-position="left" command-bar="true">

  <command-bar>
    <strong style="font-family: var(--font-display); font-size: 1.125rem">Acme</strong>
    <input-cell type="search" placeholder="Search…"></input-cell>
    <cluster>
      <secondary-action>Invite</secondary-action>
      <primary-action>New project</primary-action>
    </cluster>
  </command-bar>

  <sidebar-nav width="comfortable">
    <stack>
      <recede-block>Workspace</recede-block>
      <a href="#">Dashboard</a>
      <a href="#">Projects</a>
      <a href="#">Team</a>
    </stack>
    <stack>
      <recede-block>Settings</recede-block>
      <a href="#">Billing</a>
      <a href="#">Account</a>
    </stack>
  </sidebar-nav>

  <content-region>
    <page-header>
      <breadcrumb-trail>
        <a href="#">Acme</a>
        <span>/</span>
        <span>Projects</span>
      </breadcrumb-trail>
      <authority-mark>Projects</authority-mark>
      <lead-graf>Eight active. Two awaiting review.</lead-graf>
    </page-header>

    <columns ratio="1:1:1">
      <stat-display>
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">8</div>
        <recede-block>active</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">2</div>
        <recede-block>awaiting review</recede-block>
      </stat-display>
      <stat-display>
        <div style="font-size: 2.5rem; font-family: var(--font-display); line-height: 1">14</div>
        <recede-block>shipped 2026</recede-block>
      </stat-display>
    </columns>

  </content-region>
</app-shell>`
  }
};

export type PresetId = keyof typeof PRESETS;
