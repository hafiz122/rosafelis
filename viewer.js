import * as pdfjsLib from './assets/pdf.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.mjs';

const params = new URLSearchParams(location.search);
const doc = params.get('doc') ?? '';
const valid = /^ch([1-4])-(problems|solutions)$/.exec(doc);
const status = document.querySelector('#status');
const canvas = document.querySelector('#pdf-canvas');
const context = canvas.getContext('2d');
const controls = {
  previous: document.querySelector('#previous'),
  next: document.querySelector('#next'),
  zoomOut: document.querySelector('#zoom-out'),
  zoomIn: document.querySelector('#zoom-in'),
};

if (!valid) {
  status.textContent = 'Choose a PDF from a chapter page.';
  for (const control of Object.values(controls)) control.disabled = true;
} else {
  const chapter = Number(valid[1]);
  const kind = valid[2] === 'problems' ? 'Problems' : 'Worked solutions';
  document.querySelector('#document-title').textContent = `Chapter ${chapter} · ${kind}`;
  document.title = `Chapter ${chapter} ${kind} · Rosafelis`;
  const pdfUrl = new URL(`./pdfs/${doc}.pdf`, location.href).href;
  document.querySelector('#open-pdf').href = pdfUrl;
  document.querySelector('#download-pdf').href = pdfUrl;

  let pdf;
  let pageNumber = 1;
  let scale = 1;
  let activeRender = null;

  async function renderPage() {
    if (activeRender) {
      activeRender.cancel();
      try { await activeRender.promise; } catch { /* A newer render replaced this one. */ }
    }
    const page = await pdf.getPage(pageNumber);
    const regionWidth = document.querySelector('#pdf-region').clientWidth - 24;
    const base = page.getViewport({ scale: 1 });
    const fit = Math.min(1, regionWidth / base.width);
    const viewport = page.getViewport({ scale: fit * scale });
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.ceil(viewport.width * ratio);
    canvas.height = Math.ceil(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    activeRender = page.render({ canvasContext: context, viewport, canvas });
    try { await activeRender.promise; } catch (error) { if (error.name !== 'RenderingCancelledException') throw error; }
    canvas.style.display = 'inline-block';
    status.hidden = true;
    document.querySelector('#page-number').textContent = String(pageNumber);
    document.querySelector('#page-count').textContent = String(pdf.numPages);
    document.querySelector('#zoom-level').textContent = `${Math.round(scale * 100)}%`;
    controls.previous.disabled = pageNumber === 1;
    controls.next.disabled = pageNumber === pdf.numPages;
    controls.zoomOut.disabled = scale <= .6;
    controls.zoomIn.disabled = scale >= 2;
  }

  controls.previous.addEventListener('click', () => { if (pageNumber > 1) { pageNumber--; renderPage(); } });
  controls.next.addEventListener('click', () => { if (pageNumber < pdf.numPages) { pageNumber++; renderPage(); } });
  controls.zoomOut.addEventListener('click', () => { scale = Math.max(.6, scale - .2); renderPage(); });
  controls.zoomIn.addEventListener('click', () => { scale = Math.min(2, scale + .2); renderPage(); });
  window.addEventListener('resize', () => { if (pdf) renderPage(); });

  try {
    pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    await renderPage();
  } catch (error) {
    status.textContent = 'The PDF could not be loaded. Try opening it directly.';
    console.error(error);
  }
}
