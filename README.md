# Rosafelis

Original calculus problem sets by **hafiz122**, written in Quarto Markdown with LaTeX mathematics. The site covers the four chapters in the course outline and gives a worked solution below every exercise.

## Edit a problem set

Edit the relevant `chapters/ch1.qmd` through `chapters/ch4.qmd` file. Each question is followed by a collapsible solution block. Use inline math as `$...$` and display math as `$$...$$`.

## Build locally

Install Quarto, a TeX distribution, and Node.js. Then run:

```sh
bash scripts/build.sh
```

The site is written to `_site/`. Open it through a local HTTP server rather than from `file://` so the PDF worker can load.

## Publishing

The GitHub Actions workflow renders the website and eight chapter PDFs and deploys them to GitHub Pages. It uploads the generated files as an artifact without committing them to the repository.
