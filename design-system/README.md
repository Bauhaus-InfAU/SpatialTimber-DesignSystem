# CODING AGENTS: READ THIS FIRST

This folder is the **SpatialTimber design system**, consolidated from Claude Design
(claude.ai/design). A user mocked up the brand, web app, and slide deck in HTML/CSS/JS, then
consolidated them here so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read [`project/README.md`](project/README.md) top to bottom first.** It is the primary
reference: project/product context, content fundamentals, visual foundations, iconography rules,
the token set, the asset generator, the UI kit, and sample slides. Then **follow its imports** —
open every file it pulls in (`colors_and_type.css`, the components under `project/ui_kits/`, the
generator in `project/assets/`) so you understand how the pieces fit before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much
cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS + JSX** — these are prototypes, not production code. Your job is
to **recreate them faithfully** in whatever technology fits the target codebase (React, Vue, native,
whatever). Match the visual output; don't copy the prototype's internal structure unless it happens
to fit. Pull values from `project/colors_and_type.css` rather than hard-coding hex.

**Don't render these files in a browser or take screenshots unless the user asks you to.**
Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML
and CSS directly.

## Contents

- `README.md` — this file
- [`project/`](project/) — the SpatialTimber Design System: `README.md`, `SKILL.md`,
  `colors_and_type.css`, `assets/` (logos, glyphs, favicons + the `spatialtimber-assets.mjs`
  generator), `preview/` cards, `ui_kits/` (the Aufstockung Assistent UI kit + a component
  library), `slides/`, and `docs/handover/`.
