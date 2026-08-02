# Plan review log — Personal-Website instrument-rack redesign

**Task:** Full redesign of `Joshua-Anojulu/Personal-Website`, replacing the soccer "matchday"
portfolio with a machined-hardware observatory instrument rack.

**Resolved caps:** `MAX_ROUNDS=5`, `MAX_ATTEMPTS=8`, `PLAN_FILE=PLAN.md`,
`LOG_FILE=PLAN-REVIEW-LOG.md`.

---

## Act 1 — Grill summary

Interviewed to resolution. Decisions locked, in the order they were settled:

1. **World: observatory instrument rack** (machined-hardware family). Chosen over illustrated place
   because Higgsfield has 0 credits, which caps illustrated worlds at WORLD 5; machined hardware
   reaches WORLD 8 on pure CSS craft. Chosen over plate archive / dither mono / field ledger because
   it argues the portfolio's actual through-line: every project is about how much to trust a reading.

2. **Interaction: boots, then a real calibration dial. Nothing gated.** The old penalty-kick gate was
   offered as an option and explicitly declined. The boot sequence is decorative only.

3. **Research detail: headline only, with the calibration module carved out.** This was a direct
   contradiction caught during the grill: the centrepiece interaction requires per-magnitude data,
   which "headline only" would have forbidden. Surfaced and resolved in favour of the carve-out
   after establishing that IEEE URTC is single-blind (author block present in the submitted `.tex`),
   IEEE permits author preprints, and the paper carries no data-availability statement.

4. **SpyCEP null result published as its own module**, including the failed SpeB positive control.
   Amber lamp, not red.

5. **Roster set to seven modules** after a disk-wide survey of all active projects, not just the
   GitHub ones. Excluded with reasons: `vocab-scaling-boundary` (results/ holds only benchmark logs
   and GPU telemetry, no finding yet), `agn-lag-benchmark` (last commit is mid-build, "P5: building
   the driver"), `writing-voice-spec` (personal tooling, uncommitted), and one further project
   withheld for confidentiality, where publishing now would forfeit rights that cannot be recovered
   later.

6. **Influenza included as a seventh module, explicitly labelled preliminary**, bounded by what its
   own README claims ("preliminary and descriptive… nothing here is a final claim").

7. **Audio: opt-in, off by default**, WebAudio-synthesized, no asset files.

**Facts established by exploration rather than by asking:**
- The site is a *project* Pages page served at `/Personal-Website/`, so root-absolute asset paths
  would 404 in production while working locally. No `CNAME` present.
- Six outbound links on the current site are dead: `scholarships4u.dev` returns **503**,
  `scholarship-matcher` is a renamed repo (404), and three source links point at repos made private
  earlier in this session.
- The real calibration matrix was extracted from `results/metrics_by_magnitude_agg.csv`
  (4 models x 5 magnitude bins). At `[20,22)` the MLP reads raw ECE 0.00603 against bright-fit Platt
  0.06192 with temperature holding at 0.00652, so the instrument shows a genuine >10x failure.

---

## Act 2 — Adversarial review

**Reviewer selection.** `codex` is the only row that is `selection: auto` + `status: verified`.
Probe returned `codex-cli 0.146.0`, which falls **outside** the row's `verified_versions`
(`>=0.130 <0.146`). Per the selection rule this fails closed to UNVERIFIED rather than being
assumed compatible, so auto-selection produced no eligible reviewer.

Presented the options to the user; they chose to re-verify rather than proceed unverified or
switch adapters. Running `scripts/acceptance-readonly.sh codex` against 0.146.0.

