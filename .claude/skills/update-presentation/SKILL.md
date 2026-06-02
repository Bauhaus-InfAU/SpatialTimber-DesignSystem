---
name: update-presentation
description: Use when the user asks to update / refresh / rebuild / compile the SpatialTimber Projektetage 2026 presentation (the Zukunft Bau end-of-project slide deck). Fetches the latest deck from Claude Design and compiles it into a single standalone HTML at assets/presentation/. Trigger on "update the presentation", "compile the latest deck", "rebuild the Projektetage deck", "refresh the slides".
user-invocable: true
---

# Update the SpatialTimber Projektetage 2026 presentation

When the user asks to **update the presentation**, fetch the latest deck from Claude Design and
compile it into a **single standalone HTML** living at the top of `assets/presentation/`.

## Source

- **Claude Design project:** `SpatialTimber Deck v6` —
  `claude.ai/design/p/e699544b-8985-4a6c-96fb-d2d86a7bbd9c` (the 27–29-slide Zukunft Bau
  Projekttage 2026 deck). This is the *project* link and is **auth-gated (HTTP 403) — WebFetch
  cannot read it.**
- **What you actually fetch:** a **handoff export link** of the form
  `https://api.anthropic.com/v1/design/h/<hash>`. This is public/unauthenticated and returns a
  gzipped tar bundle (the same mechanism the `design-system/` bundle came from).
- **Always ask the user for the current handoff link** unless one is recorded below. In Claude
  Design, the user generates it via Share / Export-to-coding-agent on the deck project.
  - **Latest handoff link:** _(none recorded yet — ask the user)_

## Procedure

1. **Get the handoff URL** (`api.anthropic.com/v1/design/h/<hash>`) from the user if not recorded.
2. **Fetch it** with WebFetch. The response is binary (`application/gzip`); WebFetch saves it to a
   `.bin` file and prints the path. (Ask the prompt to report the saved path.)
3. **Extract** the bundle: `gzip -dc <bin> | tar -xf - -C <tmp>` and locate the **primary deck
   HTML** (e.g. `SpatialTimber Deck v6.html`, or the main file the chat/README points to).
4. **Compile to one standalone HTML** — inline everything so it runs from `file://` with no server
   and no external files:
   - Inline `<link rel=stylesheet>` and `<script src>` (local ones) into the document.
   - Convert local media (`<img src>`, CSS `url(...)`, `<video>`, fonts) to **base64 data URIs**.
   - Leave genuinely external CDN/font URLs as-is (or inline if offline use is required).
   - Keep CDN libs (React/Babel etc.) referenced unless the deck is plain HTML/CSS/JS.
5. **Place the output:**
   - Write the standalone file to `assets/presentation/<deck-name>.html` (this is "the latest").
   - Put/refresh the deck's **source media** in `assets/presentation/assets/` (so the deck can be
     re-compiled or edited later).
   - There should be exactly **one** deck `.html` at the top of `assets/presentation/`; replace the
     previous one (don't accumulate versioned copies — git history is the version trail).
6. **Update `assets/presentation/README.md`** — the deck filename and a "last compiled: YYYY-MM-DD".
7. **Record the handoff link** under "Latest handoff link" above if the user wants it reused.
8. **Commit & push** (the repo's convention: branch is `main`, push when done).

## Notes

- "Standalone" = a single self-contained `.html` (media inlined as data URIs). The
  `assets/presentation/assets/` subfolder keeps the *source* media for future re-compiles.
- The deck's media (axonometric renders, scheme SVGs/GIFs, pictograms, video) already lives in
  `assets/presentation/assets/` — reuse it if the handoff bundle's media matches; otherwise refresh.
- Visual identity / brand tokens for the deck come from the design system
  (`design-system/`, via the `spatialtimber-design` skill) — keep the deck consistent with it.
