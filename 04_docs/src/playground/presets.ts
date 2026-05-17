/**
 * Playground preset seeds — canonical example sources that exercise
 * different vocab combinations. Picking a preset replaces the source
 * AND toggles the vocab checkboxes the seed needs.
 *
 * Phase 4.5 expanded from 4 presets to 10.
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

  hero: {
    label: "Hero + CTA",
    description: "Marketing hero with headline, lead, and a paired call-to-action.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-marketing"],
    source: `<hero-banner variant="centered">
  <stack gap="loose">
    <authority-mark>Build interfaces, not boilerplate.</authority-mark>
    <lead-graf>
      Quoin turns the boilerplate of utility CSS into a vocabulary of
      semantic primitives. You write what you mean. The compiler
      handles the rest.
    </lead-graf>
    <cluster>
      <primary-action>Open the playground</primary-action>
      <secondary-action>Read the spec</secondary-action>
    </cluster>
  </stack>
</hero-banner>`
  },

  pricing: {
    label: "Pricing (3-tier)",
    description: "Three pricing tiers in a row, middle tier featured.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-essentials", "vocab-marketing"],
    source: `<canvas-block>
  <stack gap="loose">
    <stack>
      <authority-mark weight="emphasize">Pricing</authority-mark>
      <lead-graf>One plan per shape of team.</lead-graf>
    </stack>

    <columns ratio="1:1:1">
      <pricing-tier>
        <stack>
          <lead-graf weight="emphasize">Solo</lead-graf>
          <div style="font-size: 2.5rem; font-family: var(--font-display)">$0</div>
          <recede-block>For one builder.</recede-block>
          <ul style="margin: 0; padding-left: 1.25rem; font-size: var(--type-size-sm)">
            <li>1 project</li>
            <li>Community support</li>
            <li>All open packs</li>
          </ul>
          <secondary-action>Start free</secondary-action>
        </stack>
      </pricing-tier>
      <pricing-tier variant="featured">
        <stack>
          <lead-graf weight="emphasize">Studio</lead-graf>
          <div style="font-size: 2.5rem; font-family: var(--font-display)">$24</div>
          <recede-block>Per seat. Most teams pick this.</recede-block>
          <ul style="margin: 0; padding-left: 1.25rem; font-size: var(--type-size-sm)">
            <li>Unlimited projects</li>
            <li>Email support, 24h</li>
            <li>Private pack registry</li>
          </ul>
          <primary-action>Try Studio</primary-action>
        </stack>
      </pricing-tier>
      <pricing-tier>
        <stack>
          <lead-graf weight="emphasize">Enterprise</lead-graf>
          <div style="font-size: 2.5rem; font-family: var(--font-display)">Talk</div>
          <recede-block>SSO, audit, custom packs.</recede-block>
          <ul style="margin: 0; padding-left: 1.25rem; font-size: var(--type-size-sm)">
            <li>SAML SSO</li>
            <li>Dedicated support</li>
            <li>Custom token packs</li>
          </ul>
          <secondary-action>Contact sales</secondary-action>
        </stack>
      </pricing-tier>
    </columns>
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
  </content-region>
</app-shell>`
  },

  navigation: {
    label: "Navigation bar",
    description: "Top-level nav with logo, links, and a primary action.",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    source: `<wayfinder>
  <strong style="font-family: var(--font-display); font-size: 1.25rem">Quoin</strong>
  <a href="/spec/">Spec</a>
  <a href="/playground/">Playground</a>
  <a href="/packs/">Packs</a>
  <a href="/components/">Components</a>
  <primary-action>Get started</primary-action>
</wayfinder>`
  },

  form: {
    label: "Form",
    description: "Form with multiple input types, label/help layout, and submit.",
    vocabs: ["vocab-editorial", "vocab-dashboard", "vocab-forms"],
    source: `<canvas-block>
  <stack gap="loose">
    <stack>
      <authority-mark weight="emphasize">Account settings</authority-mark>
      <lead-graf>Profile and notifications.</lead-graf>
    </stack>

    <stack>
      <recede-block>Display name</recede-block>
      <input-cell type="text" value="Jane Doe" />
      <recede-block style="font-size: var(--type-size-xs)">Visible on your public profile.</recede-block>
    </stack>

    <stack>
      <recede-block>Email</recede-block>
      <input-cell type="email" value="jane@example.com" />
    </stack>

    <stack>
      <recede-block>Notifications</recede-block>
      <cluster>
        <label style="display: flex; gap: 0.5rem; align-items: center">
          <input type="checkbox" checked />
          <span>Weekly digest</span>
        </label>
        <label style="display: flex; gap: 0.5rem; align-items: center">
          <input type="checkbox" />
          <span>Mentions</span>
        </label>
        <label style="display: flex; gap: 0.5rem; align-items: center">
          <input type="checkbox" checked />
          <span>Direct messages</span>
        </label>
      </cluster>
    </stack>

    <cluster>
      <primary-action>Save changes</primary-action>
      <secondary-action>Cancel</secondary-action>
    </cluster>
  </stack>
</canvas-block>`
  },

  "empty-state": {
    label: "Empty state",
    description: "First-run empty state with a single clear call to action.",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    source: `<canvas-block>
  <stack gap="loose">
    <empty-state>
      <stack>
        <authority-mark>No projects yet</authority-mark>
        <lead-graf>
          Projects organise your work and let you invite collaborators.
          Start with a template or import from another tool.
        </lead-graf>
        <cluster>
          <primary-action>Create project</primary-action>
          <secondary-action>Import</secondary-action>
        </cluster>
      </stack>
    </empty-state>
  </stack>
</canvas-block>`
  },

  alert: {
    label: "Alert band",
    description: "All four alert intents stacked, with compact pill variant.",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    source: `<canvas-block>
  <stack gap="loose">
    <alert-band intent="info">
      The new version of Quoin ships <strong>variants</strong> on key primitives.
    </alert-band>
    <alert-band intent="success">
      Build complete. <strong>3.2s</strong> total, <strong>0 warnings</strong>.
    </alert-band>
    <alert-band intent="warning">
      Your trial expires in 5 days. <a href="#">Upgrade now</a> to continue.
    </alert-band>
    <alert-band intent="critical">
      <strong>Deploy failed.</strong> The production token pack is missing a required token.
    </alert-band>
    <cluster>
      <alert-band intent="info" variant="compact">Cmd-K opens search</alert-band>
      <alert-band intent="success" variant="compact">2 ahead</alert-band>
      <alert-band intent="warning" variant="compact">Drafts</alert-band>
    </cluster>
  </stack>
</canvas-block>`
  },

  blank: {
    label: "Blank",
    description: "Empty starting point.",
    vocabs: ["vocab-editorial", "vocab-dashboard"],
    source: `<canvas-block>
  <stack>
    <authority-mark>Start here</authority-mark>
    <reading-flow>
      <p>Replace this with your own Quoin source.</p>
    </reading-flow>
  </stack>
</canvas-block>`
  }
};

export type PresetId = keyof typeof PRESETS;
