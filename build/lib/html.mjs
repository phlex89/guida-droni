import fs from "node:fs/promises";
import path from "node:path";
import {
  listaFileCapitoli,
  estraiAttributoBody,
  estraiContenutoMain,
} from "./chapters.mjs";
import { eSvgSchemi, applicaAttributiSvg } from "./svg.mjs";
import { PROJECT_ROOT, risolviRispettoACwd } from "./paths.mjs";

function riscriviPercorsi(contenuto) {
  return contenuto.replaceAll("../css/", "assets/css/").replaceAll("../img/", "assets/img/");
}

function estraiAttributoTag(tag, nome) {
  const match = tag.match(new RegExp(`${nome}=["']([^"']*)["']`, "i"));
  return match ? match[1] : null;
}

async function inlineSvgSchemi(contenuto, cartellaCapitolo) {
  const segnaposti = [];
  const conSegnaposti = contenuto.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = estraiAttributoTag(tag, "src");
    if (!eSvgSchemi(src)) return tag;
    const segnaposto = `__INLINE_SVG_${segnaposti.length}__`;
    segnaposti.push({
      segnaposto,
      src,
      alt: estraiAttributoTag(tag, "alt"),
      classe: estraiAttributoTag(tag, "class"),
      stile: estraiAttributoTag(tag, "style"),
    });
    return segnaposto;
  });

  let risultato = conSegnaposti;
  for (const voce of segnaposti) {
    const percorsoSvg = path.resolve(cartellaCapitolo, voce.src);
    let svgTesto;
    try {
      svgTesto = await fs.readFile(percorsoSvg, "utf8");
    } catch {
      risultato = risultato.split(voce.segnaposto).join("");
      continue;
    }
    risultato = risultato.split(voce.segnaposto).join(applicaAttributiSvg(svgTesto, voce));
  }
  return risultato;
}

function sezioneCapitolo(numero, titolo, contenuto) {
  return `<section class="capitolo" id="cap-${numero}" data-titolo="${titolo}">\n${contenuto}\n</section>`;
}

function voceSidebar(numero, titolo) {
  return `      <li><a href="#cap-${numero}">${numero} · ${titolo}</a></li>`;
}

function stileLayout() {
  return `  <style>
    body { margin: 0; display: flex; min-height: 100vh; background: #fff; }
    .sidebar {
      position: fixed; top: 0; left: 0; bottom: 0; width: 300px;
      overflow-y: auto; padding: 28px 20px; background: #F2F4F7;
      border-right: 1px solid #D8DCE3; box-sizing: border-box;
      font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
    }
    .sidebar h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.08em; color: #1B4965; margin: 0 0 12px; border: 0; padding: 0; }
    .sidebar ul { list-style: none; padding: 0; margin: 0; }
    .sidebar li { margin: 0; }
    .sidebar a { display: block; text-decoration: none; color: #2B2D31; font-size: 17px; line-height: 1.35; padding: 7px 8px; border-radius: 6px; border: 0; }
    .sidebar a:hover { color: #1B4965; background: #E3EAF1; }
    .scarica-pdf { margin-top: 28px; padding-top: 18px; border-top: 1px solid #D8DCE3; }
    .scarica-pdf a { font-size: 15px; padding: 5px 8px; }
    .scarica-pdf a::before { content: "PDF"; display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: #fff; background: #5FA8D3; border-radius: 3px; padding: 2px 5px; margin-right: 8px; vertical-align: 2px; }
    .scarica-pdf li:first-child a { font-weight: 700; }
    .dimensione-testo { margin-top: 28px; padding-top: 18px; border-top: 1px solid #D8DCE3; }
    .dimensione-testo span { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #5C6370; margin-bottom: 8px; }
    .dimensione-testo button {
      font-family: inherit; font-weight: 700; color: #1B4965; background: #fff;
      border: 1px solid #C9D1DB; border-radius: 6px; padding: 6px 12px; margin-right: 6px; cursor: pointer;
    }
    .dimensione-testo button.attivo { background: #1B4965; color: #fff; border-color: #1B4965; }
    .dimensione-testo button[data-taglia="1"] { font-size: 14px; }
    .dimensione-testo button[data-taglia="2"] { font-size: 17px; }
    .dimensione-testo button[data-taglia="3"] { font-size: 21px; }
    .contenuto { margin-left: 300px; padding: 48px 40px 80px; max-width: 930px; width: 100%; box-sizing: border-box; }
    .solo-stampa { display: none; }
    .sidebar-toggle {
      display: none; position: fixed; top: 12px; left: 12px; z-index: 20;
      background: #1B4965; color: #fff; border: none; border-radius: 6px;
      padding: 10px 14px; font-size: 16px; cursor: pointer;
    }
    @media (max-width: 900px) {
      .sidebar { transform: translateX(-100%); transition: transform 0.2s ease; z-index: 10; }
      .sidebar.aperta { transform: translateX(0); }
      .contenuto { margin-left: 0; padding: 64px 20px 60px; }
      .sidebar-toggle { display: block; }
    }
  </style>`;
}

function scriptToggle() {
  return `  <script>
    const bottone = document.querySelector(".sidebar-toggle");
    const barra = document.querySelector(".sidebar");
    if (bottone && barra) {
      bottone.addEventListener("click", () => barra.classList.toggle("aperta"));
    }
    const taglie = { "1": "17px", "2": "20px", "3": "23px" };
    const bottoniTaglia = document.querySelectorAll(".dimensione-testo button");
    function applicaTaglia(taglia) {
      document.documentElement.style.fontSize = taglie[taglia] || taglie["2"];
      bottoniTaglia.forEach((b) => b.classList.toggle("attivo", b.dataset.taglia === taglia));
      try { localStorage.setItem("guida-droni-taglia", taglia); } catch (e) {}
    }
    let tagliaSalvata = "2";
    try { tagliaSalvata = localStorage.getItem("guida-droni-taglia") || "2"; } catch (e) {}
    applicaTaglia(tagliaSalvata);
    bottoniTaglia.forEach((b) => b.addEventListener("click", () => applicaTaglia(b.dataset.taglia)));
  </script>`;
}

async function elencaPdf(cartella) {
  try {
    const voci = await fs.readdir(cartella);
    return voci.filter((nome) => nome.endsWith(".pdf")).sort((a, b) => a.localeCompare(b, "it"));
  } catch {
    return [];
  }
}

async function copiaCartella(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.cp(src, dest, { recursive: true });
}

export async function buildHtml({ src, out }) {
  const srcDir = risolviRispettoACwd(src, path.join(PROJECT_ROOT, "src", "capitoli"));
  const outDir = risolviRispettoACwd(out, path.join(PROJECT_ROOT, "html"));
  const cssSrc = path.join(PROJECT_ROOT, "src", "css");
  const imgSrc = path.join(PROJECT_ROOT, "src", "img");

  await fs.mkdir(outDir, { recursive: true });
  await copiaCartella(cssSrc, path.join(outDir, "assets", "css"));
  await copiaCartella(imgSrc, path.join(outDir, "assets", "img"));
  const pdfSrc = path.join(PROJECT_ROOT, "pdf");
  const pdfDisponibili = await elencaPdf(pdfSrc);
  if (pdfDisponibili.length > 0) await copiaCartella(pdfSrc, path.join(outDir, "pdf"));

  const file = await listaFileCapitoli(srcDir);
  if (file.length === 0) {
    console.log("Nessun capitolo trovato in", srcDir);
    return;
  }

  const sidebarVoci = [];
  const sezioni = [];
  const pdfVoci = [];
  if (pdfDisponibili.includes("guida-droni-completa.pdf")) {
    pdfVoci.push(`    <li><a href="pdf/guida-droni-completa.pdf">Guida completa, tutti i capitoli</a></li>`);
  }

  for (const filePath of file) {
    const html = await fs.readFile(filePath, "utf8");
    const numero = estraiAttributoBody(html, "data-capitolo") || path.basename(filePath).slice(0, 2);
    const titolo = estraiAttributoBody(html, "data-titolo") || numero;
    const mainConSvgInline = await inlineSvgSchemi(estraiContenutoMain(html), path.dirname(filePath));
    const contenuto = riscriviPercorsi(mainConSvgInline);
    sidebarVoci.push(voceSidebar(numero, titolo));
    sezioni.push(sezioneCapitolo(numero, titolo, contenuto));
    const nomePdf = `${path.basename(filePath, ".html")}.pdf`;
    if (pdfDisponibili.includes(nomePdf)) {
      pdfVoci.push(`    <li><a href="pdf/${nomePdf}">${numero} · ${titolo}</a></li>`);
    }
  }
  const bloccoPdf = pdfVoci.length === 0 ? "" : `
  <div class="scarica-pdf">
    <h2>Scarica i PDF</h2>
    <ul>
${pdfVoci.join("\n")}
    </ul>
  </div>`;

  const pagina = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Guida ai droni</title>
<link rel="stylesheet" href="assets/css/guida.css">
${stileLayout()}
</head>
<body>
<button class="sidebar-toggle" type="button">Indice</button>
<nav class="sidebar">
  <h2>Indice</h2>
  <ul>
${sidebarVoci.join("\n")}
  </ul>
${bloccoPdf}
  <div class="dimensione-testo">
    <span>Dimensione del testo</span>
    <button type="button" data-taglia="1" aria-label="Testo normale">A</button>
    <button type="button" data-taglia="2" aria-label="Testo grande">A</button>
    <button type="button" data-taglia="3" aria-label="Testo molto grande">A</button>
  </div>
</nav>
<main class="contenuto">
${sezioni.join("\n\n")}
</main>
${scriptToggle()}
</body>
</html>
`;

  await fs.writeFile(path.join(outDir, "index.html"), pagina, "utf8");
  console.log(`html/index.html generato con ${file.length} capitoli in ${outDir}`);
}
