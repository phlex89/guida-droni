import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";
import { listaFileCapitoli, estraiAttributoBody } from "./chapters.mjs";
import { PROJECT_ROOT, risolviRispettoACwd } from "./paths.mjs";

const CHROME_PATH_PREDEFINITO =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function contaPagine(buffer) {
  const grezzo = buffer.toString("latin1");
  let testo = grezzo;
  const streamPattern = /<<([^>]*?)>>\s*stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  while ((match = streamPattern.exec(grezzo)) !== null) {
    if (!/\/Filter\s*\/FlateDecode/.test(match[1])) continue;
    try {
      testo += zlib.inflateSync(Buffer.from(match[2], "latin1")).toString("latin1");
    } catch {
      continue;
    }
  }
  return (testo.match(/\/Type\s*\/Page(?!s)/g) || []).length;
}

function footerTemplate() {
  return `
    <div style="width:100%; box-sizing:border-box; padding:0 20mm; display:flex; justify-content:space-between; font-family:Helvetica, Arial, sans-serif; font-size:9px; color:#6B7280;">
      <span class="title"></span>
      <span>Pagina <span class="pageNumber"></span></span>
    </div>
  `;
}

async function avviaChrome(executablePath) {
  try {
    return await puppeteer.launch({ executablePath, headless: true });
  } catch (primoErrore) {
    console.log("Primo avvio di Chrome fallito, riprovo con --no-sandbox...");
    try {
      return await puppeteer.launch({
        executablePath,
        headless: true,
        args: ["--no-sandbox", "--disable-dev-shm-usage"],
      });
    } catch (secondoErrore) {
      throw new Error(
        `Chrome non si avvia dopo due tentativi.\n1) ${primoErrore.message}\n2) ${secondoErrore.message}`,
      );
    }
  }
}

async function trovaImmaginiSvgSchemi(page) {
  return page.evaluate(() => {
    const trovate = [];
    Array.from(document.images).forEach((img, indice) => {
      const src = img.getAttribute("src") || "";
      if (/\.svg$/i.test(src) && src.includes("img/schemi")) {
        img.dataset.inlineIndex = String(indice);
        trovate.push({
          indice,
          src,
          alt: img.getAttribute("alt"),
          classe: img.getAttribute("class"),
          stile: img.getAttribute("style"),
        });
      }
    });
    return trovate;
  });
}

async function sostituisciConSvgInline(page, immagine, svgTesto) {
  await page.evaluate(
    ({ indice, alt, classe, stile, svg }) => {
      const img = document.querySelector(`img[data-inline-index="${indice}"]`);
      if (!img) return;
      const doc = new DOMParser().parseFromString(svg, "image/svg+xml");
      const radice = doc.documentElement;
      if (radice.nodeName.toLowerCase() !== "svg") return;
      if (alt && !radice.querySelector("title")) {
        const titolo = doc.createElementNS("http://www.w3.org/2000/svg", "title");
        titolo.textContent = alt;
        radice.insertBefore(titolo, radice.firstChild);
      }
      if (classe) radice.setAttribute("class", classe);
      if (stile) radice.setAttribute("style", stile);
      img.replaceWith(radice);
    },
    { indice: immagine.indice, alt: immagine.alt, classe: immagine.classe, stile: immagine.stile, svg: svgTesto },
  );
}

async function inlineSvgSchemi(page, cartellaCapitolo) {
  const immagini = await trovaImmaginiSvgSchemi(page);
  for (const immagine of immagini) {
    const percorsoSvg = path.resolve(cartellaCapitolo, immagine.src);
    let svgTesto;
    try {
      svgTesto = await fs.readFile(percorsoSvg, "utf8");
    } catch {
      continue;
    }
    await sostituisciConSvgInline(page, immagine, svgTesto);
  }
}

async function stampaCapitolo(browser, filePath, outDir) {
  const html = await fs.readFile(filePath, "utf8");
  const titolo = estraiAttributoBody(html, "data-titolo");
  const slug = path.basename(filePath, ".html");
  const outPath = path.join(outDir, `${slug}.pdf`);

  const page = await browser.newPage();
  await page.goto(pathToFileURL(filePath).href, { waitUntil: "networkidle0" });
  await page.evaluate((t) => {
    if (t) document.title = t;
  }, titolo);
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  await inlineSvgSchemi(page, path.dirname(filePath));
  await page.evaluate(() => document.fonts.ready.then(() => undefined));

  await page.pdf({
    path: outPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: footerTemplate(),
    margin: { top: "22mm", bottom: "22mm", left: "20mm", right: "20mm" },
  });
  await page.close();

  const buffer = await fs.readFile(outPath);
  return { slug, pagine: contaPagine(buffer) };
}

export async function buildPdf({ src, out, only }) {
  const srcDir = risolviRispettoACwd(src, path.join(PROJECT_ROOT, "src", "capitoli"));
  const outDir = risolviRispettoACwd(out, path.join(PROJECT_ROOT, "pdf"));
  await fs.mkdir(outDir, { recursive: true });

  const file = await listaFileCapitoli(srcDir, only);
  if (file.length === 0) {
    console.log("Nessun capitolo trovato in", srcDir);
    return;
  }

  const executablePath = process.env.CHROME_PATH || CHROME_PATH_PREDEFINITO;
  const browser = await avviaChrome(executablePath);

  let totale = 0;
  try {
    for (const filePath of file) {
      const { slug, pagine } = await stampaCapitolo(browser, filePath, outDir);
      console.log(`${slug}.pdf: ${pagine} pagine`);
      totale += pagine;
    }
  } finally {
    await browser.close();
  }
  console.log(`Totale pagine: ${totale}`);
}
