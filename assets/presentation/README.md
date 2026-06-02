# Presentation — Zukunft Bau Projekttage 2026

The project's **end-of-project slide deck** for the Zukunft Bau Projekttage 2026, plus its media.

```
presentation/
├── README.md              ← this file
├── <deck-name>.html       ← the latest deck, compiled to a single standalone HTML  (pending)
└── assets/                ← the deck's media (axo renders, scheme SVGs/GIFs, pictograms, video)
```

- **Last compiled:** _not yet — see "Updating the deck" below._

## Updating the deck

The deck is authored in **Claude Design** (project `SpatialTimber Deck v6`,
`claude.ai/design/p/e699544b-8985-4a6c-96fb-d2d86a7bbd9c`). To refresh it, just ask Claude Code to
**"update the presentation"** — the [`update-presentation`](../../.claude/skills/update-presentation/SKILL.md)
skill fetches the latest version and compiles it into a single standalone `.html` here, with the
source media kept in [`assets/`](assets/).

> **Fetching needs a handoff export link** (`api.anthropic.com/v1/design/h/<hash>`), not the
> `claude.ai/design/p/...` project link (that one is auth-gated → 403). Generate the handoff/export
> link in Claude Design (Share / export-to-coding-agent) and hand it over when you ask for an update.

"Standalone" = one self-contained HTML (media inlined as data URIs) that opens from disk with no
server. The `assets/` subfolder keeps the source media so the deck can be re-compiled or edited.

## Conventions for `assets/`

- Prefer **vector** (`.svg`) and transparent **PNG**; use descriptive filenames.
- Keep the visual language consistent with the design system ([`../../design-system/`](../../design-system/))
  and the illustration rules in [`../scheme-styleguide/`](../scheme-styleguide/) — one-terracotta-accent,
  warm backgrounds.
- **Large binaries are fine here** — videos, animated GIFs, multi-MB inline SVGs live together. Keep
  individual files under GitHub's 100 MB hard limit (ideally < 50 MB); for anything larger, link out.
