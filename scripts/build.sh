#!/usr/bin/env bash
set -euo pipefail

npm ci
npm run prepare-viewer
quarto render --to html
mkdir -p _site/pdfs

for chapter in ch1 ch2 ch3 ch4; do
  quarto render "chapters/${chapter}.qmd" --to pdf --profile student --output "${chapter}-problems.pdf"
  mv "_site/${chapter}-problems.pdf" "_site/pdfs/${chapter}-problems.pdf"
  quarto render "chapters/${chapter}.qmd" --to pdf --output "${chapter}-solutions.pdf"
  mv "_site/${chapter}-solutions.pdf" "_site/pdfs/${chapter}-solutions.pdf"
done

quarto render chapters/mda3014.qmd --to pdf --profile student --output mda3014-problems.pdf
mv _site/mda3014-problems.pdf _site/pdfs/mda3014-problems.pdf
