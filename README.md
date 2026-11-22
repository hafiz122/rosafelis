# Rosafelis

Original calculus problem sets by **hafiz122** and an MDA3014 probability and statistics past-paper question bank, written in Quarto Markdown with LaTeX mathematics.

## Edit a problem set

Edit the relevant `chapters/ch1.qmd` through `chapters/ch4.qmd` file for calculus. Each calculus question is followed by a collapsible solution block. The MDA3014 questions are grouped by topic in `chapters/mda3014.qmd`. Use inline math as `$...$` and display math as `$$...$$`.

## Build locally

Install Quarto, a TeX distribution, and Node.js. Then run:

```sh
bash scripts/build.sh
```

The site is written to `_site/`. Open it through a local HTTP server rather than from `file://` so the PDF worker can load.

## Publishing

The GitHub Actions workflow renders the website, eight calculus PDFs and the MDA3014 question bank PDF, then deploys them to GitHub Pages. It uploads the generated files as an artifact without committing them to the repository.

The site uses CMU Serif from the Computer Modern Unicode family. Its SIL Open Font License is in `fonts/OFL.txt`. The PDF.js license is included with the generated viewer assets.
