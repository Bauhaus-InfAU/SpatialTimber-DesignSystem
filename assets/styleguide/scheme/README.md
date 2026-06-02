# Anthropic Engineering — Scheme Reference

> **Converting a Gemini PNG scheme to an editable / animatable SVG?** Read **[`svg-from-png-workflow.md`](svg-from-png-workflow.md)** first — it's the calibration loop (PIL measurement → SVG authoring → headless Chrome render → re-measure), the locked style tokens (palette, typography, geometry), the animation-hook pattern, and a quick-start checklist. Worked example: `scheme_lora_annotated_v7.png` → `_assets/_shared/scheme_lora_annotated.svg`.

> **Authoritative SVG palette (May 2026 refresh):** the colour values in the "Shared style fingerprint" table below describe what the **Anthropic reference images** use — they're observed values from the source PNGs and a useful baseline. **The project's own SVG schemes use a refined, consolidated palette** documented in `svg-from-png-workflow.md` § 4. Summary: page `#FAF9F5`, card fill `#F0EEE6`, chrome (card outline + arrows) `#9C9A92` at stroke-width 6, text `#5E5D59` (title medium 600 + body regular 400, same colour). Always defer to the workflow doc for project SVGs.

Reference scheme illustrations downloaded from two Anthropic engineering posts. Used as STYLE TEMPLATES when re-rendering hand-drafted SpatialTimber schemes through the monet image-generation pipeline (nanobanana). All 8 schemes share one editorial-illustration language: warm cream background, rounded soft-grey nodes, thin dark-grey hairlines, geometric sans typography, a single terracotta accent reserved for the system's defining element.

The schemes break down into **eight reusable archetypes**. When you have a hand-drafted scheme to re-render, pick the archetype that matches its **structural intent** (hub vs. flow vs. matrix vs. pipeline), then reference the corresponding PNG as the style starter.

---

## Shared style fingerprint (true for all 8)

| Element | Treatment |
|---|---|
| Outer container | Large rounded rectangle (~32 px corner radius), filled with a paler cream (~#FAF6EE) than the page (~#F5F0E6); no visible stroke |
| Page background | Warm cream (~#F5F0E6 — slightly warmer than off-white, NOT pure white) |
| Node boxes | Rounded rectangles (~12–16 px radius), filled cream-beige (~#EAE3D4); top edge has a thin tab/header strip (~28 px tall) in a slightly darker cream (~#DDD6C6) carrying the bold node label |
| "Emphasis" node fill | Warm mid-grey (~#C8C2B6) — used for the focus / output / highlighted node in a flow |
| Stacked multiplicity | 2–3 offset duplicate cards behind the primary node (5–8 px offset), same fill, suggesting many-of |
| Outlines / hairlines | Single thin stroke (~1.2 px), warm dark grey (~#7A746A); never thick, never wobbly, never hand-drawn |
| Typography — node title | Bold geometric sans (Styrene-like), near-black (~#1A1A1A), centred on the tab |
| Typography — sub-caption | Light italic grey sans (~#8C8579), small, sits BELOW the node |
| Typography — arrow label | Regular sans, near-black, floating directly on/above the arrow with no chip background |
| Solid arrow | Thin warm grey (~#9A9489) line ~1.5 px, simple stroked V arrowhead (NOT filled triangle) |
| Dashed arrow | Same colour and weight, dash pattern ~6 on / 4 off |
| Group container | DASHED rounded rectangle in warm grey, encloses related nodes; group label is a plain bold caption above the container, not in a tab |
| Icons inside nodes | Single-weight line icons in near-black, schematic and simple (toolkit, terminal `>_`, checklist, node-graph) |
| Accent colour | ONE terracotta / claude-coral (~#CC785C) — reserved for the system's defining element (the "spark" / asterisk icon, or the data-ramp accent in scatter plots); never used for outlines, never for fills of nodes |
| Shadows / gradients / 3D | NONE. Fully flat editorial |
| Composition | Generous whitespace, axis-aligned grid, clear single reading direction (hub-and-spoke OR left-to-right OR top-to-bottom) |

---

## The 8 archetypes — when to use which

### A · Hub-and-spoke architecture
**File:** `managed-agents-fig1.png`
**Pattern:** One central node, 4 satellite nodes (N / E / S / W), bidirectional arrows on each spoke (solid out, dashed in).
**Use for:** System-architecture overviews where one component sits at the centre and exchanges with a fixed set of peers. The centre is the **emphasis node** (mid-grey fill + terracotta accent icon); satellites are the **default cream nodes**.
**SpatialTimber fit:** generative core ↔ (structural surrogate, floor-plan generator, Neufert-LoRA, RL feedback). The "generative core" gets the terracotta spark.

### B · Interface / contract table
**File:** `managed-agents-fig2.png`
**Pattern:** Three-column table — concept name · pseudocode signature · plain-language "satisfied by". Header band slightly darker.
**Use for:** Showing that an abstract role can be filled by many concrete implementations (a contract → realization map). All-text, no icons.
**SpatialTimber fit:** mapping abstract slots ("Generator", "Evaluator", "Surrogate", "Sampler") to concrete tooling (the AP modules, named solvers, ML model checkpoints).

### C · Two-node bidirectional exchange
**File:** `managed-agents-fig3.png`
**Pattern:** Two nodes side-by-side, two labelled arrows between them (one solid going right, one going left), one dashed arrow for the asynchronous path. Compact wide aspect.
**Use for:** Showing a **protocol / API conversation** between exactly two components.
**SpatialTimber fit:** generator ↔ surrogate (request → loss prediction → next sample), or solver ↔ result-cache.

### D · Stacked-pair multiplicity
**File:** `managed-agents-fig4.png`
**Pattern:** Two stacked-card nodes (each shown as 3 offset duplicates), connected by one solid and one dashed arrow.
**Use for:** Many-of-X talks to many-of-Y. Emphasizes that both endpoints are pooled / parallelized.
**SpatialTimber fit:** many concurrent generator runs ↔ many surrogate-model evaluations, or training-job pool ↔ checkpoint store.

### E · 2-axis trade-off scatter
**File:** `claude-code-auto-mode-fig1.png`
**Pattern:** Drawn X-Y axes with bold axis labels ("Security / safety" vs. "Task autonomy"), data points placed as filled coloured circles with a name below + small italic caption. A discrete colour ramp (grey → yellow → coral → dark red) in a legend box top-left. A DASHED arrow shows trajectory from one point to another (current → target state).
**Use for:** Positioning multiple approaches across two qualitative axes — the canonical "quadrant chart". The arrow-from-dashed-circle is a beautiful pattern for "where we are headed".
**SpatialTimber fit:** material-use vs. floor-plan flexibility quadrant; rule-based → AI-based methodology trajectory; existing-stock vs. extension-potential map.

### F · Main flow + branched sub-pipeline
**File:** `claude-code-auto-mode-fig2.png`
**Pattern:** One tall main-process node on the left, a column of named worker nodes on the right with labelled arrows between them, plus a DASHED-OUTLINED group box enclosing an alternative recursive sub-path. Edge labels are inline (no chips). A side caption block sits next to each grouped node.
**Use for:** A primary flow that has a conditional branch / sub-pipeline with its own internal nodes. Captures "happy path + escalation path" cleanly.
**SpatialTimber fit:** main generation loop with a fallback structural-rescue sub-pipeline; primary RL loop with an imitation-learning warm-start branch.

### G · Side-by-side before / after mapping
**File:** `claude-code-auto-mode-fig3.png`
**Pattern:** Two columns ("Full" on the left, "Filtered" on the right), each holding rows of small text-only boxes. Rows are connected by short arrows (kept) or marked with an `×` (dropped). The right column uses the darker emphasis fill.
**Use for:** Filter / projection / transformation views — showing what survives a processing step and what is discarded.
**SpatialTimber fit:** raw structural-analysis output → surrogate-training feature vector; full apartment-mix candidate set → constraint-passing subset.

### H · Two-stage pipeline with named regions
**File:** `claude-code-auto-mode-fig4.png`
**Pattern:** Two or three dashed-outlined group regions (each titled in plain bold caption above), each containing 1–3 internal nodes. Cross-region arrows are labelled with inline phrases ("Permission prompt", "Allowed list", "Allow / Deny"). One feedback loop arches back across the diagram. End state is a single emphasis node.
**Use for:** The most complex archetype — end-to-end pipeline split into 2-3 named stages, with internal sub-decisions and a feedback path.
**SpatialTimber fit:** the full AP05 → AP06 → AP07 chain (training → integration → validation), or the closed-loop generative pipeline (sample → evaluate → update → resample).

---

## Choosing an archetype for a hand-drafted scheme

1. **Count the components.** 1 centre + N peers → **A**. 2 components → **C** or **D**. 3+ in a row → **G** or **H**.
2. **Is there a decision / branch?** Yes → **F** or **H**. No → **A**, **B**, **C**, **D**, or **G**.
3. **Are you positioning items on axes?** → **E**.
4. **Are you mapping abstract slots to concrete fills?** → **B**.
5. **Are you showing filtering / before-after of a list?** → **G**.
6. **Is there a feedback loop / recursion?** → **H** (or **F** if simpler).

When in doubt, pick the **structurally simplest** archetype that still expresses the relationship — Anthropic schemes consistently reach for the LEAST decorated form. If your hand draft has 9 nodes and one is the centre, drop everything that doesn't change the meaning and aim for archetype **A** with 4–5 satellites.

---

## Pairing with the project's terracotta convention

The deck's existing convention is **TERRACOTTA = the project-defining material (timber Raumtragwerk)**. Anthropic's convention is **TERRACOTTA = the system-defining element (the Claude spark)**. The two read the same: terracotta marks "the thing this whole diagram is really about". When re-rendering, place the terracotta accent on the node that represents the **timber framework, the surrogate model, or whichever element the slide is making a claim about** — and on nothing else.

---

## Files

| File | Archetype | Source post |
|---|---|---|
| `managed-agents-fig1.png` | A · Hub-and-spoke | [managed-agents](https://www.anthropic.com/engineering/managed-agents) |
| `managed-agents-fig2.png` | B · Interface table | managed-agents |
| `managed-agents-fig3.png` | C · Two-node exchange | managed-agents |
| `managed-agents-fig4.png` | D · Stacked-pair multiplicity | managed-agents |
| `claude-code-auto-mode-fig1.png` | E · 2-axis scatter | [claude-code-auto-mode](https://www.anthropic.com/engineering/claude-code-auto-mode) |
| `claude-code-auto-mode-fig2.png` | F · Main + branch | claude-code-auto-mode |
| `claude-code-auto-mode-fig3.png` | G · Before / after | claude-code-auto-mode |
| `claude-code-auto-mode-fig4.png` | H · Two-stage pipeline | claude-code-auto-mode |

The synthesized monet style block lives next to this README as `anthropic_scheme_style.md`.
