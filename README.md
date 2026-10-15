# Personal Website

The personal site of Joshua Anojulu: publications, research, the software I have built,
and how to reach me. It is a single static page with no build step and no dependencies,
served by GitHub Pages at
[joshua-anojulu.github.io/Personal-Website](https://joshua-anojulu.github.io/Personal-Website/).

The page opens with one real result instead of a decoration: a chart from my SDSS
calibration study showing how much purity four classifiers promised against how much they
delivered for the faintest sources. Three models keep their promise; logistic regression
promises 92% and delivers 77%. The numbers come straight from
[`results/metrics_selection_agg.csv`](https://github.com/Joshua-Anojulu/sdss-photometric-calibration/blob/main/results/metrics_selection_agg.csv)
in the study's repository.

## Design

[`DESIGN.md`](DESIGN.md) is the design contract: palette, type, layout and the rules that
keep the page honest. Read it before changing the visual layer.

## Built with

- HTML, CSS and a small amount of JavaScript
- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) and
  [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) from Google Fonts

## Project structure

```text
.
|-- index.html      the whole page, including the chart as inline SVG
|-- css/
|   `-- styles.css  tokens, layout and the chart's load sequence
|-- js/
|   `-- site.js     the chart's load sequence and point readouts (optional)
`-- DESIGN.md       the design contract
```

`PLAN.md` and `PLAN-REVIEW-LOG.md` record the previous design and are kept for history.

## Running it locally

Serve the folder over HTTP so relative paths resolve the way they do on GitHub Pages:

```bash
git clone https://github.com/Joshua-Anojulu/Personal-Website.git
cd Personal-Website
python -m http.server 8000
```

Then open `http://localhost:8000`.
