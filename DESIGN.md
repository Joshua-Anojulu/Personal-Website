---
schema_version: 1
generated: 2026-08-02
source_authority: house-style
source_version: 2026-08-02
precedence: below current user and project instructions
regenerate_when: the design read changes, or the source authority is edited
---

# Design contract - Personal-Website

**Family:** editorial ledger, translated into the site's existing matchday
**World:** a floodlit pitch at night, read as a team sheet
**Dials:** WORLD 7 / MOTION 8 / VARIANCE 7 / DENSITY 4 stage, 7 content
**Primary action:** "Match report" - this exact label in nav, hero, sticky bar, contact and the section heading
**Palette:** derived from the world. Pitch night `#07110d`, pitch `#0e4d2f`, chalk `#f2f1ea`, floodlight amber `#f6c453` (carried over from the previous build), ball `#f26d5b`, ink `#0b1410`
**Type:** display Archivo (variable, wght 400-900, wdth 62-125), body Inter, mono IBM Plex Mono

## Why WORLD is 7 and not the house default of 8

Ch6.3 row 2 applies: no image generation is available (Higgsfield at 0 credits) and no
photography is being supplied, so figurative art is out. Machined type, chalk rule structure and
CSS-drawn pitch markings reach 7 honestly. **Do not claim 8.** The gap closes the moment real
football photography exists, and nothing in the current build blocks adding it: the hero is a type
composition, so a full-bleed image can slot behind it without restructuring.

## References this was steered by

Supplied by Josh, matched for feel and never for layout or content:

- `theperformancelab.ca` - colossal tight-tracked grotesk as the hero's entire visual, hard
  black-to-light chapter flip, mono micro-eyebrows against huge display, one saturated accent.
- `eladiodieste.com` - the wordmark split across the composition (top-left / bottom-right), a
  hairline rule with navigation sitting on it, type colour drawn from the ground.
- `klimtwine.com` - diegetic progress (the glass is the loading bar). Taken as a principle only.
  Its intro overlay failed to dismiss during review, which is exactly the Ch3.9 failure mode, so
  no blocking intro was built here.

`~/.claude/design-library/` was empty at build time, so these three are the whole reference set.

## Diegetic chrome (Ch1.5)

| UI role | Rendered as |
|---|---|
| Primary nav | Sitting on the halfway line, with the centre spot as its marker |
| Project entry | A team-sheet row with a shirt number |
| Chapter boundary | A pitch marking, different each time: centre circle, penalty arc, goal line |
| Research metrics | A match-stats table with tabular figures |
| Status | A lamp, one hue bound to one meaning |

## Layout families used (Ch5.7, no family repeated)

1. Hero: full-bleed type composition, name split across the frame
2. Match report: numbered ledger rows (not a card grid, and there are zero equal-card rows)
3. Stats: a real data table with filter controls
4. Project skills: asymmetric two-column split, live panel beside a played object
5. Contact: sparse left-aligned type

## Hard bans - these always fail, no override

1. A gradient as the hero's primary visual
2. Div-based fake screenshots, dashboards, terminals, task lists
3. Invented precise statistics
4. Spray-on glassmorphism
5. Placeholder-slop content and filler verbs
6. Em dashes and en dashes in user-visible copy

**On ban 3 specifically:** every number on this page is measured. The calibration matrix in
`js/site.js` is real output from the study's own `results/metrics_by_magnitude_agg.csv`, and the
satellite and influenza figures come from those projects' reported results. If you add a number,
it must be sourced or the block must be marked as mock.

## Overrides taken, with reasons

- **Scroll cue in the hero**, because the hero is a full-bleed type composition with no content
  edge visible below the fold.
- **Numbered entries in the match report**, because a shirt number is real information in this
  world rather than a `001 / INDEX` decorative eyebrow. The Ch5.7 eyebrow count is 1, against a
  budget of `ceil(sections / 3)`.
- **Ch0.5 stages 1 and 2 skipped**, because the direction was fully locked by interview (family,
  world, register, asset route and references all settled) which is the stated skip condition.

## Preserved from the previous build - do not change silently (Ch8.3)

- URL and Pages path. This is a **project** page served at `/Personal-Website/`, so **every asset
  path must stay relative**. A root-absolute `/css/...` works locally and 404s in production.
- Anchor ids: `#top`, `#match-report`, `#toolkit`, `#contact`.
- Nav labels: Match report, Project skills, Contact, GitHub.
- The crest, the keeper, the pitch greens, and `--amber #f6c453`.

## Changed deliberately, and stated rather than done silently

- **Section headings now match nav labels exactly**, which Ch2.2 requires and the previous build
  violated ("Match report" in the nav against "Same stats, new matchday frame." as the heading).
- **Display face** moved from Bricolage Grotesque to Archivo, for the tight colossal grotesk the
  references depend on. Ch8.4 lever 1, the largest visual lift per unit of risk.
- **"Scholarships4U" is now "EnsureCollege"** and points at `ensurecollege.com`. The old name and
  the `scholarships4u.dev` domain are dead; that domain returned 503.
- **The penalty is no longer a gate.** It is a signposted easter egg (Ch4.4). Nothing on the page
  is hidden behind it.

## Implementation rules a future session must not break

- **The reveal system fails open.** `.reveal { opacity: 0 }` is scoped to `.js`, set by an inline
  head script. No JS, a thrown error, or an IntersectionObserver that never delivers (Chrome
  defers IO callbacks in background tabs) all leave content **visible**. Never move that rule out
  of the `.js` scope.
- **The ambient gate fails open too.** CSS default is `running`; the JS sets `paused`. A wiring
  failure costs battery rather than silently freezing a MOTION 8 page with no error.
- **Ambient budget:** 1 system, 3 members desktop, 1 on mobile. Cap is 3 systems / 30 elements.
- **No build step.** Vanilla HTML, CSS and JS, three files, no bundler and no CDN script tag.
