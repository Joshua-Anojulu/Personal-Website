---
review_provenance:
  status: aborted
  rounds: []
  historical_cross_model_review: false
  final_body_cross_model_approved: false
  degraded_rounds: []
---

> **SUPERSEDED 2026-08-02. Do not build from this file.**
>
> This plan proposed replacing the matchday world with an observatory instrument
> rack. The direction changed: the matchday world is being **kept** and redesigned
> in place under the Ch8 redesign protocol, because it already commits to a world
> and that instinct was correct.
>
> The live design contract is **`DESIGN.md`**. Read that instead.
>
> Act 2 of the grill chain never ran against this plan, so `status` is `aborted`
> rather than `deadlocked` and nothing here carries a reviewer verdict. It is kept
> only for the reasoning it records: why several projects were excluded from the
> site (results maturity, and one withheld for confidentiality), which survives the
> change of direction and still applies.

# Plan: Rebuild Personal-Website as an observatory instrument rack
_Locked via grill — by Claude + Joshua Anojulu. SUPERSEDED, see above._

## Goal

Replace the soccer "matchday" portfolio at `joshua-anojulu.github.io/Personal-Website/` with a
machined-hardware world: a rack-mounted scientific instrument whose modules are Joshua's projects.
The existing site is being discarded, not iterated on. It carries six dead outbound links, describes
an obsolete version of the satellite research, still calls EnsureCollege "Scholarships4U" against a
domain that now returns 503, and gates its content behind a penalty-kick minigame.

The world is chosen to argue the site's actual thesis: every project here is about **how much to
trust a reading** (expected calibration error, an F1 that collapses out of biome, a docking screen
that returned null, a dictation tool judged on whether it heard you correctly). One module is a
genuinely working instrument driven by real measured data, not decoration.

Audience is personal expression, not admissions or recruiting. That licenses a high WORLD dial and a
playful hook, but it does not license hiding content or inventing numbers.

## Approach

### 1. Strip and reset
1. Delete `index.html`, `css/styles.css`, `js/site.js` wholesale. No copy, no class names, and no
   structure survives from the soccer build (per the standing "redesign means no legacy anchoring"
   rule). The `projectData` shape is a useful precedent but is re-derived, not imported.
2. Keep the repository name, the Pages URL, and the default branch exactly as they are. The site is
   served from a **project** page at `/Personal-Website/`, so **every asset path must stay relative**
   (`css/…`, `js/…`); a root-absolute `/css/…` will 404 in production while working locally.
3. No `CNAME` is added. No custom domain in this change.

### 2. Stack
4. Stay vanilla HTML + CSS + JS with **no build step**. Rationale: GitHub Pages serves the repo
   directly, there is no CI, there are zero current dependencies, and a build step would add a
   failure mode between commit and deploy for a single static page. This is a deliberate constraint,
   not an oversight.
5. Three files: `index.html`, `css/styles.css`, `js/site.js`. No framework, no bundler, no CDN
   `<script>` tags (a CDN dependency is a third-party availability risk for a page that must simply
   keep working).
6. Fonts: keep Google Fonts, but move to a machined pairing. A condensed industrial face for engraved
   plate labels, plus a monospace for readouts. `display=swap` stays. Preconnect stays. If the
   chosen display face is unavailable, fall back to the existing stack rather than adding a
   self-hosted binary.

### 3. The world (dials W8 / M8 / V7 / D4 stage, D7 content)
7. Build the rack from CSS only: layered linear-gradients plus an SVG `feTurbulence` noise overlay
   for brushed metal, inset/outset boxshadow for bezel depth, `text-shadow` for engraved and debossed
   type, radial-gradients for LED lamps and their bloom. **No illustration is generated** (Higgsfield
   has 0 credits), and none is needed: the machined-hardware family reaches WORLD 8 on material
   craft, which is exactly why it was chosen over an illustrated place.
8. The page is one continuous rack read top to bottom. Chapters are rack sections separated by
   physical rails and rivets, not by whitespace. One flat theme per chapter, minimum 1.5 viewports.
9. Palette derives from the world, not from a trend list: instrument-panel greys and gunmetal, warm
   amber phosphor for readouts, a single saturated green for OK lamps, amber for CAUTION, and red
   reserved exclusively for genuine failure states. Colour is a status channel and is never decorative.

### 4. Boot sequence and motion
10. On load, the rack powers on over roughly 1.2s: LED lamps sweep in sequence, needles swing past
    their target and settle, phosphor readouts warm from dark to amber. The sequence is decorative
    only. **Nothing is gated.** All content is present in the DOM at first paint and readable even if
    JS never executes.
11. `prefers-reduced-motion: reduce` is mandatory and must render the **assembled end-state**: lamps
    already lit, needles already at rest, readouts already warm. Never a blank or dark rack.
12. Ambient life, budgeted: a slow needle jitter on one gauge, a phosphor flicker, an LED breathing
    cycle. All ambient animation uses `transform`/`opacity` only, and pauses via
    `IntersectionObserver` when its module is off-screen.

### 5. Module 01 — the live calibration instrument (the one detail carve-out)
13. This is the only module that publishes below-headline detail. Every other research module is one
    line. The carve-out was explicitly decided: IEEE URTC is single-blind (the submitted
    `URTC_paper.tex` carries a full author block), IEEE permits author preprints, and the paper
    contains no data-availability statement pointing anywhere, so nothing about publishing this
    endangers the submission.
14. Embed `js/calib-data.js` (~5.3 KB) holding the real matrix extracted from
    `results/metrics_by_magnitude_agg.csv`: 4 models × 5 magnitude bins × {raw, bright-fit Platt,
    bright-fit isotonic, bright-fit temperature} ECE means. **These are measured values. Not one
    number on this page is invented**, which is a hard ban.
15. Controls: a model selector (LogReg / RandomForest / HistGB / MLP) and a magnitude dial across the
    five bins `[14,17) [17,18) [18,19) [19,20) [20,22)`. Dragging the dial updates four readouts and
    a bar meter live.
16. The finding the instrument must make visible: recalibration fit on bright sources fails on faint
    ones, and Platt fails worst. At `[20,22)` the MLP reads raw **0.00603** but bright-fit Platt
    **0.06192**, a >10x degradation, while temperature holds at **0.00652**. RandomForest shows the
    same shape (0.00362 → 0.06336 Platt, 0.01747 temperature). A PASS/FAIL lamp per method makes the
    failure legible without reading the digits.
17. Accessibility is not optional here. The dial is a real `<input type="range">` styled to look
    machined, so it is keyboard-operable and screen-reader-labelled for free. Readouts are
    `aria-live="polite"`. A static table of the same values sits behind a `<details>` element so the
    data is reachable without pointer interaction.

### 6. Remaining modules — headline only
18. Seven modules total. Every non-calibration research module gets one result line, an
    `aria`-labelled status lamp, and an engraved `SOURCE: RESTRICTED` plate where a repo link would
    be. **No dead links, and no link that implies a repo a visitor cannot open.**
    - **02 Satellite / domain shift.** 8 frontiers, 3 biomes. Congo Basin F1 **0.001**, AdaBN
      recovery to **0.397**. Green lamp on the recovery.
    - **03 Anti-virulence screen (SpyCEP).** Result NULL. SpeB positive control **FAILED**. Amber
      lamp, not red. Copy states plainly that a screen which cannot recover its own positive control
      cannot rank actives, and that the work is being reframed as a pipeline benchmark.
    - **04 Influenza timing.** Amber lamp. Engraved `PRELIMINARY / n=19 SEASONS`. Copy must not
      exceed what the project's own README claims ("preliminary and descriptive… nothing here is a
      final claim").
    - **05 localflow.** Public repo, live link. Local-first Windows dictation, faster-whisper
      large-v3-turbo, no audio leaves the machine.
    - **06 plan-hardening.** Public repo, live link. Adversarial cross-model plan review.
    - **07 EnsureCollege.** Live link to `https://ensurecollege.com/` only. Repo is private, so the
      source plate reads RESTRICTED. Stack is FastAPI + Postgres on Vercel/Neon. It is **not**
      "Scholarships4U" and **not** on Render; both are stale and must not reappear.

### 7. Audio
19. A speaker toggle on the rack chassis, **defaulting to off**, persisted in `localStorage`. While
    off, zero audio nodes are constructed.
20. Sounds are synthesized with WebAudio (short filtered-noise burst for a toggle click, a click per
    dial detent, one low thunk on power-on). No audio files, so no asset weight. `AudioContext` is
    created only inside the user gesture that enables audio, satisfying autoplay policy.

### 8. Content correctness pass
21. Delete all six dead links. Never reintroduce `scholarships4u.dev` (503) or
    `github.com/Joshua-Anojulu/scholarship-matcher` (renamed, 404).
22. No repo link may point at a private repository. Before shipping, every outbound href is fetched
    unauthenticated and must return 200.
23. **No em dashes or en dashes in any user-visible copy.** Hyphens, commas, colons, parentheses, or
    two sentences. This is a mechanical pre-flight check, not a stylistic preference.
24. Update `README.md` to describe the instrument build and drop the stale project description.

### 9. Performance and verification
25. Stated budget, required because WORLD > 6: total page weight under **250 KB** excluding fonts;
    no image assets at all; first contentful paint unblocked by JS; the boot animation must never
    delay text becoming readable.
26. Verify before claiming done: serve locally and confirm the page renders with **JS disabled**;
    confirm the reduced-motion path shows the assembled rack; run keyboard-only navigation through
    every control including the dial; check every outbound link returns 200 anonymously; grep the
    built copy for em dashes and for the strings "Scholarships4U", "scholarships4u.dev", "Render",
    "scholarship-matcher".

## Key decisions & tradeoffs

| Decision | Chosen | Rejected, and why |
|---|---|---|
| Aesthetic family | Machined hardware (instrument rack) | Illustrated place needs generated art and Higgsfield has 0 credits, capping WORLD at 5. Plate archive, dither mono, and field ledger all reach 8 too but do not argue the measurement-reliability thesis. |
| Gating | Nothing gated; boot is decorative | The old penalty gate made a reader opt out of a game to see projects. Keeping a gate was offered and declined. |
| Research detail | Headline only, calibration module carved out | A full-detail site risks over-publishing work in submission. A pure headline site kills the one genuinely great interaction. The carve-out is defensible because URTC is single-blind and IEEE permits preprints. |
| Live-module data | Real embedded matrix | Invented statistics are a hard ban. Plausible-looking fake curves would have been easier and are disqualified. |
| Null result | Published as its own module | Hiding it was offered and declined. A portfolio that reports a failed positive control is more credible than one that only reports wins. |
| Influenza | Included, explicitly labelled preliminary | Omitting it undersells real work; including it unlabelled would overclaim past its own README. |
| vocab-scaling, agn-lag | Excluded | Surveyed on disk: vocab's `results/` holds only benchmark logs and GPU telemetry, and agn-lag's last commit is mid-build ("P5: building the driver"). Neither has a statable finding yet. |
| One further project | Excluded, hard block | Withheld for confidentiality. Publishing anything about it now would forfeit rights that are not recoverable later. Revisit only once that status changes. |
| Build step | None | A bundler adds a deploy failure mode to a three-file static page for no benefit. |
| Audio | Opt-in, off by default | On-by-default startles readers and risks autoplay-policy breakage. Silence forfeits the one context where sound is genuinely diegetic. |

## Risks / open questions

1. **Metal-via-CSS can read as cheap.** Gradient-and-shadow "metal" is easy to do badly. Mitigation:
   commit to real bezel depth, consistent light direction from a single source, and restraint in the
   noise overlay. If the material still reads as plastic after the first pass, fall back to a flatter
   painted-steel finish rather than piling on more gradients.
2. **`feTurbulence` is expensive.** Rendered once to a tiled background, not animated, and never
   applied per-element.
3. **Seven modules of near-identical chrome will feel repetitive.** Each module needs a distinct
   instrument face (gauge, strip chart, lamp bank, counter) so the rack reads as assembled from
   different equipment rather than one component duplicated seven times.
4. **The calibration carve-out is a judgement call.** It publishes a per-magnitude, per-method matrix
   from a paper under review. Assessed as safe (single-blind venue, IEEE preprint policy, no
   data-availability statement in the tex). Reversible: the module degrades to the four already-public
   baseline ECE values by swapping the data file.
5. **Open:** the exact display typeface is unresolved and will be settled during the build.
6. **Open:** whether `localStorage` audio preference should also persist reduced-motion overrides.

## Out of scope

- Any change to repository visibility. That was completed before this plan.
- A custom domain, analytics, or a contact form.
- Rebuilding the profile README (already updated and pushed).
- Any module for: vocab-scaling-boundary, agn-lag-benchmark, writing-voice-spec, Paesa, coasta-site,
  lesson-platform, question-bank-overlay, or the confidentiality-withheld project noted above.
- Publishing raw SDSS source data. Only aggregate ECE means are embedded.
- Migrating the Pages URL or changing the repo name.
