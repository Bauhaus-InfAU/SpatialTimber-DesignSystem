# Website / web-app template — SpatialTimber Solver

The reference **web UI** for the SpatialTimber project: the *Aufstockung Assistent* /
"Spatial Timber Solver" — the layout-generation app's front end. Designed in
[Claude Design](https://claude.ai/design) and exported here on **2026-06-02** as the
canonical starting point for SpatialTimber sites and web apps (the Demonstrator in
particular).

> **To see it: open [`spatial-timber-solver.html`](spatial-timber-solver.html) in a
> browser.** It's a single self-contained file — inline CSS + JS, no build step — that
> renders directly. The only external references are Google Fonts (Inter + JetBrains Mono,
> with system fallbacks) and the two funder logos in [`assets/`](assets/).

This is the **web** pillar of the SpatialTimber design system. For the identity (logo,
tokens, glyphs) see [`../../brand/`](../../brand/); for slides see [`../deck/`](../deck/);
the index that routes between them is [`../../README.md`](../../README.md).

## What it is

A warm, editorial, Anthropic-register single-page app mock: paper/oat background, off-white
cards, clay `#D97757` as the only accent, large radii, hairline rules, tabular numerals.
Built on the brand tokens (Inter + JetBrains Mono; ink + paper + clay). It demonstrates the
solver's layout — controls, the generated floor-plan canvas, distribution plots, and the
funder-attribution footer.

## How to use it

- **As a visual reference / mock** — open it, screen-record it, or hand it to a colleague.
- **As a build target** — recreate it in the Demonstrator's real stack (React, etc.); match
  the visual output, don't copy the prototype's internal structure. The repo already has a
  React shell (`src/app/`) on the Demonstrator side — this is the design to converge on.
- Pull colours/type from [`../../brand/colors_and_type.css`](../../brand/colors_and_type.css)
  rather than the hex values baked into the prototype, so the app stays in sync with the brand.

## Contents

| Path | What it is |
|---|---|
| [`spatial-timber-solver.html`](spatial-timber-solver.html) | **The template** — final, self-contained |
| [`assets/`](assets/) | The two funder logos the page references (bmwsb, zukunftbau) |
| [`handoff/frontend-proposal-brief.md`](handoff/frontend-proposal-brief.md) | The original design brief (the requirements) |
| [`handoff/chats/`](handoff/chats/) | Claude Design chat transcripts — the *why* behind the iterations |
| [`handoff/explorations/`](handoff/explorations/) | Earlier iterations (solver v1/v2, distribution-plot options) for reference |

## Notes

- **Typography is Inter** (the locked project typeface) + JetBrains Mono for technical
  labels — consistent with the brand. The brief asked for Söhne; Inter is the production
  choice (see [`../../brand/README.md`](../../brand/README.md)).
- The two funder logos here are copies of the canonical marks in
  [`../../logos/`](../../logos/), kept local so the template opens standalone.
