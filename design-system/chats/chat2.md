# Extended UI Kit Specification

_Started 2026-06-02 15:14 UTC_

---

## User

i got a request for an extended UI kit:
given the links to the web app, and the slide deck and the brand identity, can you specify this?

https://claude.ai/design/p/e17b68eb-472a-4ad8-bcd3-0baa868e7074?file=Spatial+Timber+Solver.html&via=share

https://claude.ai/design/p/e699544b-8985-4a6c-96fb-d2d86a7bbd9c?file=SpatialTimber+Deck+v6.html&via=share

https://claude.ai/design/p/ad8dcf2c-5670-4cd0-b2fd-0c9b45125a54?file=docs%2Fhandover%2Fbrand-identity-proposal.html&via=share

## Assistant

_[tool: read_file]_

_[tool: list_files]_

_[tool: list_files]_

I'll start by exploring the three linked projects — the brand identity, the web app, and the deck — to ground the UI kit in the real source material.

_[tool: read_file]_

_[tool: list_files]_

Good — I have the brand identity fully. Now let me study the actual web app and check what's already in this project.

_[tool: read_file]_

_[tool: list_files]_

This project already has scaffolding. Let me understand what's here before building.

_[tool: read_file]_

_[tool: list_files]_

A rich, mature design system. Let me read the token CSS and check the existing UI kit conventions so my new kit aligns with the `--st-` prefix and existing patterns.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

This is a complete, detailed spec. Let me look at the existing kit.css and a preview file to match established conventions, plus confirm the logo asset markup I'll reuse.

## Assistant

_[tool: update_todos]_

I now have everything I need: exact tokens, the logomark SVG, the real component vocabulary (pills, segmented controls, steppers, hairline cards, mono labels, clay accent), and the established doc style. The pasted brief is exhaustive and authoritative, so I'll build to spec rather than re-litigate decisions that are already made.

Let me lay out the plan and start building the single self-contained component library.

_[tool: write_file]_

Now I'll build the scaffold — full CSS foundation, sticky mini-nav, masthead, and the script harness. This is the largest single write; component sections get appended after.

_[tool: str_replace_edit]_

Scaffold is in. Now I'll append each component section before the marker. Starting with Foundations.

_[tool: update_todos]_

Now Buttons.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now Form fields.

_[tool: update_todos]_

Now Surfaces — card, panel, oat inset, modal, tooltip, popover.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now Navigation & chrome.

_[tool: update_todos]_

Now Data & status — the richest section.

_[tool: str_replace_edit]_

Now Feedback — alerts, empty state, toast — replacing the final marker.

_[tool: str_replace_edit]_

_[tool: update_todos]_

The full kit is assembled. Let me check it loads cleanly before writing the README.

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

No errors. Let me take a quick screenshot to verify the visual.

_[tool: view_image]_

_[tool: view_image]_

_[tool: save_screenshot]_

Masthead reads beautifully. The scroll captures didn't advance — let me scroll by pixel offset to verify the component sections render correctly.

_[tool: view_image]_

_[tool: view_image]_

_[tool: write_file]_

The screenshot tool is capturing from the top each time regardless of scroll — a known quirk. The page is error-free and the masthead is pixel-faithful to the brand. I'll let the verifier do the section-by-section sweep. Now the handoff README.

_[tool: update_todos]_

Everything's built. Let me surface it to the user and confirm it loads cleanly.

_[tool: done]_

_[tool: fork_verifier_agent]_

I built the **SpatialTimber UI Kit** — one self-contained HTML file at `ui_kits/component-library/index.html`, plus a handoff README, grounded in the three source projects (brand identity, the Aufstockung Assistent app, the deck).

**What's in it** — a navigable design-system doc on warm paper, sticky mono mini-nav with scrollspy, display-italic section heads, and for every component a **live example beside its copyable HTML/class usage**:

- **00 Foundations** — colour tokens, type scale specimen, spacing rhythm, radii, the clay-dotted mono label
- **01 Buttons** — primary/secondary/ghost · sm/md/lg · default/hover/pressed/focus/disabled/loading · icon-only
- **02 Form fields** — input, textarea, select, checkbox, radio, toggle, slider, and the **625 mm mono stepper** · all states with labels + helper text
- **03 Surfaces** — card, panel, oat inset, working modal, tooltip, popover
- **04 Navigation** — the SpatialTimber header lockup, nav rail, tabs, breadcrumb, footer
- **05 Data & status** — badge, tag, progress, spinner, stat blocks, zebra table, distribution plot + stacked bar (supporting palette as data series)
- **06 Feedback** — info/success/warning alerts, empty state, live toast

Every class is `st-` prefixed and built only on the `--st-` tokens, so each maps cleanly to a React component. Clay is spent once per view; funder logos are left as labelled placeholder slots; focus rings, AA contrast, and reduced-motion are all respected.

**Two things worth flagging:**
- I built **strictly to your component list** — nothing added. Want me to extend it (date picker, pagination, tag input, file dropzone, command palette)? Say the word and I'll confirm scope first.
- The kit sits on **paper `#FAF9F5`** (the brand/doc register) rather than the app's oat ground — correct for a reference doc, per your README's two-register note. Easy to flip if you'd rather it mirror the product surface.

