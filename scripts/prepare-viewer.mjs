import { copyFile, mkdir } from 'node:fs/promises';

await mkdir('assets', { recursive: true });
for (const file of ['pdf.mjs', 'pdf.worker.mjs']) {
  await copyFile(`node_modules/pdfjs-dist/build/${file}`, `assets/${file}`);
}
await copyFile('node_modules/pdfjs-dist/LICENSE', 'assets/pdfjs-LICENSE.txt');
