import fs from "node:fs/promises";
import path from "node:path";
import {
  listaFileCapitoli,
  estraiAttributoBody,
  estraiContenutoMain,
} from "./chapters.mjs";
import { eSvgSchemi, applicaAttributiSvg } from "./svg.mjs";
import { PROJECT_ROOT, risolviRispettoACwd } from "./paths.mjs";

const COLONNE_TABELLA_LARGA = 4;

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
    const nome = path.basename(voce.src, ".svg");
    const svg = `<div class="area-scorrevole" data-schema="${nome}">${applicaAttributiSvg(svgTesto, voce)}</div>`;
    risultato = risultato.split(voce.segnaposto).join(svg);
  }
  return risultato;
}

function contaColonne(tabella) {
  const righe = tabella.match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  return righe.reduce((massimo, riga) => {
    let colonne = 0;
    for (const cella of riga.matchAll(/<t[hd]\b([^>]*)>/gi)) {
      const span = cella[1].match(/colspan=["']?(\d+)/i);
      colonne += span ? Number(span[1]) : 1;
    }
    return Math.max(massimo, colonne);
  }, 0);
}

function avvolgiTabelle(contenuto) {
  return contenuto.replace(/<table\b[\s\S]*?<\/table>/gi, (tabella) => {
    if (contaColonne(tabella) < COLONNE_TABELLA_LARGA) {
      return `<div class="tabella-scorrevole"><div class="area-scorrevole">${tabella}</div></div>`;
    }
    let didascalia = "";
    const senzaCaption = tabella.replace(/<caption\b[^>]*>([\s\S]*?)<\/caption>/i, (_, testo) => {
      didascalia = `<p class="didascalia">${testo.trim()}</p>`;
      return "";
    });
    return `<div class="tabella-scorrevole larga"><div class="area-scorrevole">${senzaCaption}</div>${didascalia}</div>`;
  });
}

function sezioneCapitolo(numero, titolo, contenuto, nomePdf) {
  const azioni = nomePdf
    ? `<div class="azioni-capitolo"><a class="scarica-capitolo" href="pdf/${nomePdf}" download>Scarica il capitolo in PDF</a></div>\n`
    : "";
  return `<section class="capitolo" id="cap-${numero}" data-titolo="${titolo}">\n${azioni}${contenuto}\n</section>`;
}

function voceSidebar(numero, titolo) {
  return `      <li><a href="#cap-${numero}">${numero} · ${titolo}</a></li>`;
}

function iconaMenu() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
}

function iconaChiudi() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`;
}

function scriptTaglia() {
  return `<script>
(function () {
  var taglia = "2";
  try { taglia = localStorage.getItem("guida-droni-taglia") || "2"; } catch (e) {}
  document.documentElement.setAttribute("data-taglia", /^[123]$/.test(taglia) ? taglia : "2");
})();
</script>`;
}

function bloccoDati(dati) {
  const testo = JSON.stringify(dati).replaceAll("<", "\\u003c");
  return `<script type="application/json" id="dati-guida">${testo}</script>`;
}

async function leggiSpiegazioniSchemi() {
  const percorso = path.join(PROJECT_ROOT, "src", "img", "schemi", "spiegazioni.json");
  try {
    return JSON.parse(await fs.readFile(percorso, "utf8"));
  } catch {
    return {};
  }
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

function verificaPuntiSchemi(pagina, spiegazioni) {
  const mancanti = [];
  for (const [nome, scheda] of Object.entries(spiegazioni)) {
    if (!pagina.includes(`data-schema="${nome}"`)) {
      mancanti.push(`${nome}: schema non presente in nessun capitolo`);
      continue;
    }
    for (const punto of scheda.punti || []) {
      if (!pagina.includes(`id="${punto.id}"`)) mancanti.push(`${nome}: manca il punto ${punto.id} nell'SVG`);
    }
  }
  return mancanti;
}

export async function buildHtml({ src, out }) {
  const srcDir = risolviRispettoACwd(src, path.join(PROJECT_ROOT, "src", "capitoli"));
  const outDir = risolviRispettoACwd(out, path.join(PROJECT_ROOT, "html"));
  const cssSrc = path.join(PROJECT_ROOT, "src", "css");
  const imgSrc = path.join(PROJECT_ROOT, "src", "img");
  const jsSrc = path.join(PROJECT_ROOT, "src", "js");

  await fs.mkdir(outDir, { recursive: true });
  await copiaCartella(cssSrc, path.join(outDir, "assets", "css"));
  await copiaCartella(imgSrc, path.join(outDir, "assets", "img"));
  await copiaCartella(jsSrc, path.join(outDir, "assets", "js"));
  const pdfSrc = path.join(PROJECT_ROOT, "pdf");
  const pdfDisponibili = await elencaPdf(pdfSrc);
  if (pdfDisponibili.length > 0) await copiaCartella(pdfSrc, path.join(outDir, "pdf"));

  const file = await listaFileCapitoli(srcDir);
  if (file.length === 0) {
    console.log("Nessun capitolo trovato in", srcDir);
    return;
  }

  const spiegazioni = await leggiSpiegazioniSchemi();
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
    const contenuto = avvolgiTabelle(riscriviPercorsi(mainConSvgInline));
    const nomePdf = `${path.basename(filePath, ".html")}.pdf`;
    const pdfPresente = pdfDisponibili.includes(nomePdf);
    sidebarVoci.push(voceSidebar(numero, titolo));
    sezioni.push(sezioneCapitolo(numero, titolo, contenuto, pdfPresente ? nomePdf : null));
    if (pdfPresente) {
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
<meta name="theme-color" content="#1B4965">
<title>Guida ai droni</title>
${scriptTaglia()}
<link rel="stylesheet" href="assets/css/guida.css">
<link rel="stylesheet" href="assets/css/pagina.css">
</head>
<body>
<header class="barra-mobile">
  <button class="apri-menu" type="button" aria-label="Apri l'indice" aria-expanded="false" aria-controls="indice">${iconaMenu()}</button>
  <div class="titoli">
    <span class="nome-guida">Guida ai droni</span>
    <span class="capitolo-corrente">Indice</span>
  </div>
</header>
<div class="velo"></div>
<nav class="sidebar" id="indice" aria-label="Indice della guida">
  <button class="chiudi-menu" type="button" aria-label="Chiudi l'indice">${iconaChiudi()}</button>
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
${bloccoDati({ schemi: spiegazioni })}
<script src="assets/js/pagina.js"></script>
</body>
</html>
`;

  await fs.writeFile(path.join(outDir, "index.html"), pagina, "utf8");
  const mancanti = verificaPuntiSchemi(pagina, spiegazioni);
  for (const avviso of mancanti) console.warn("Attenzione:", avviso);
  const puntiTotali = Object.values(spiegazioni).reduce((somma, scheda) => somma + (scheda.punti || []).length, 0);
  console.log(`html/index.html generato con ${file.length} capitoli in ${outDir}`);
  console.log(`Schemi esplorabili: ${Object.keys(spiegazioni).length}, punti definiti: ${puntiTotali}, avvisi: ${mancanti.length}`);
}
