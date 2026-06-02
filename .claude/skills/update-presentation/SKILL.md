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
- **Handoff links are ONE-TIME and expire within minutes** — they start returning HTTP 404 /
  `not found` shortly after issue and cannot be reused on the next update. So **always ask the user
  for a fresh export link each time**; never rely on a previously recorded one. In Claude Design the
  user generates it via Share / Export-to-coding-agent on the deck project. Download it immediately.

## Procedure

1. **Get a fresh handoff URL** (`api.anthropic.com/v1/design/h/<hash>`) from the user.
2. **Download it immediately** (the link expires within minutes). The bundle is large (~135 MB for
   v7) — **WebFetch fails** (10 MB cap), so use curl:
   `curl -sSL -o <tmp>/deck.tar.gz "<handoff-url>"`. It's a gzipped tar. **Keep the extracted bundle
   until the standalone is verified** — you can't re-download once the link dies.
3. **Extract** the bundle: `gzip -dc <tmp>/deck.tar.gz | tar -xf - -C <tmp>` and locate the
   **primary deck HTML** under `…/project/` (the one named in the `open_file=` query, e.g.
   `SpatialTimber Deck v7.html`). The bundle keeps older versions too — use the latest / requested.
4. **Compile to one standalone HTML** — inline everything so it runs from `file://` with no server
   and no external files:
   - **Inline the deck runtime FIRST: `<script src="deck-stage.js"></script>`** → replace with an
     inline `<script>…</script>` holding the file's contents. **This is the #1 gotcha — skip it and
     every slide renders stacked on top of the others.** The deck is a `<deck-stage>` web component
     and `deck-stage.js` is what shows one slide at a time. Inline any other local `<script src>` /
     `<link rel=stylesheet>` the same way.
   - Convert local media under `assets/` (`<img src>`, `<video>`/`<source>`, `poster=`, CSS
     `url(...)`, fonts) to **base64 data URIs**.
   - Leave genuinely external URLs (CDN, `https://doi.org`, `https://zukunftbau.de`) as plain links.
   - **In code, pass a function as the regex replacement** (not a string) so backslashes in the
     JS/CSS (e.g. `\s` in a regex) aren't mangled as escape sequences.
5. **Place the output:**
   - Write the standalone file to `assets/presentation/<deck-name>.html` (this is "the latest").
   - Put/refresh the deck's **source media** in `assets/presentation/assets/` (so the deck can be
     re-compiled or edited later).
   - Exactly **one** deck `.html` at the top of `assets/presentation/`; replace the previous one
     (don't accumulate versioned copies — git history is the version trail).
6. **Verify before claiming done:**
   - Real external local refs remaining must be **0**: search `<script src="…">` / `<link href="…">`
     pointing at local files. (A lingering `deck-stage.js` string *inside* the inlined runtime's
     JSDoc comment is fine — confirm it's not an actual tag.)
   - `customElements.define('deck-stage'` IS present (the runtime got inlined).
   - Report any **missing assets** the build flagged — e.g. slide-19 Furnisher clips
     (`19_furnisher_*.mp4`) are often absent from the export, so those videos stay blank.
7. **Update `assets/presentation/README.md`** — deck filename, "last compiled: YYYY-MM-DD", any gaps.
8. **Commit & push** to `main`.

## Notes

- "Standalone" = a single self-contained `.html` (media inlined as data URIs). The
  `assets/presentation/assets/` subfolder keeps the *source* media for future re-compiles.
- The deck's media (axonometric renders, scheme SVGs/GIFs, pictograms, video) already lives in
  `assets/presentation/assets/` — reuse it if the handoff bundle's media matches; otherwise refresh.
- Visual identity / brand tokens for the deck come from the design system
  (`design-system/`, via the `spatialtimber-design` skill) — keep the deck consistent with it.
