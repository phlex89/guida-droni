import fs from "node:fs/promises";
import path from "node:path";
import {
  listaFileCapitoli,
  estraiAttributoBody,
  estraiContenutoMain,
} from "./chapters.mjs";
import { eSvgSchemi, applicaAttributiSvg } from "./svg.mjs";
import { PROJECT_ROOT, risolviRispettoACwd } from "./paths.mjs";

const SOGLIA_MENU = "900px";
const SOGLIA_STRETTO = "640px";
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
    const svg = `<div class="area-scorrevole">${applicaAttributiSvg(svgTesto, voce)}</div>`;
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

function stileLayout() {
  return `  <style>
    html { scroll-padding-top: 16px; }
    html[data-taglia="1"] { font-size: 17px; }
    html[data-taglia="2"] { font-size: 20px; }
    html[data-taglia="3"] { font-size: 23px; }
    body { margin: 0; display: flex; min-height: 100vh; background: #fff; }
    .sidebar {
      position: fixed; top: 0; left: 0; bottom: 0; width: 300px; z-index: 10;
      overflow-y: auto; padding: 28px 20px; background: #F2F4F7;
      border-right: 1px solid #D8DCE3; box-sizing: border-box;
      font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
    }
    .sidebar h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.08em; color: #1B4965; margin: 0 0 12px; border: 0; padding: 0; }
    .sidebar ul { list-style: none; padding: 0; margin: 0; }
    .sidebar li { margin: 0; }
    .sidebar a { display: block; text-decoration: none; color: #2B2D31; font-size: 17px; line-height: 1.35; padding: 7px 8px; border-radius: 6px; border: 0; }
    .sidebar a:hover { color: #1B4965; background: #E3EAF1; }
    .sidebar a[aria-current="true"] { color: #1B4965; background: #E3EAF1; font-weight: 600; box-shadow: inset 3px 0 0 #5FA8D3; }
    .chiudi-menu { display: none; }
    .scarica-pdf { margin-top: 28px; padding-top: 18px; border-top: 1px solid #D8DCE3; }
    .scarica-pdf a { font-size: 15px; padding: 5px 8px; }
    .scarica-pdf a::before { content: "PDF"; display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; color: #fff; background: #5FA8D3; border-radius: 3px; padding: 2px 5px; margin-right: 8px; vertical-align: 2px; }
    .scarica-pdf li:first-child a { font-weight: 700; }
    .dimensione-testo { margin-top: 28px; padding-top: 18px; border-top: 1px solid #D8DCE3; }
    .dimensione-testo span { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #5C6370; margin-bottom: 8px; }
    .dimensione-testo button {
      font-family: inherit; font-weight: 700; color: #1B4965; background: #fff;
      border: 1px solid #C9D1DB; border-radius: 6px; padding: 6px 12px; margin-right: 6px; cursor: pointer;
      min-width: 44px; min-height: 40px;
    }
    .dimensione-testo button.attivo { background: #1B4965; color: #fff; border-color: #1B4965; }
    .dimensione-testo button[data-taglia="1"] { font-size: 14px; }
    .dimensione-testo button[data-taglia="2"] { font-size: 17px; }
    .dimensione-testo button[data-taglia="3"] { font-size: 21px; }
    .contenuto { margin-left: 300px; padding: 48px 40px 80px; max-width: 930px; width: 100%; box-sizing: border-box; }
    .solo-stampa { display: none; }
    .azioni-capitolo { display: flex; justify-content: flex-end; margin: 0 0 -8px; }
    .capitolo + .capitolo .azioni-capitolo { margin-top: 24px; }
    .scarica-capitolo {
      display: inline-flex; align-items: center; gap: 10px;
      font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif; font-size: 16px; font-weight: 600;
      color: #1B4965; background: #fff; border: 1px solid #C9D1DB; border-radius: 8px;
      padding: 9px 14px; text-decoration: none;
    }
    .scarica-capitolo::before {
      content: "PDF"; font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
      color: #fff; background: #5FA8D3; border-radius: 3px; padding: 3px 6px;
    }
    .scarica-capitolo:hover { background: #E3EAF1; border-color: #1B4965; }
    .barra-mobile { display: none; }
    .velo { display: none; }

    @media (max-width: ${SOGLIA_MENU}) {
      html { scroll-padding-top: 72px; }
      .barra-mobile {
        display: flex; align-items: center; gap: 10px;
        position: fixed; top: 0; left: 0; right: 0; height: 56px; z-index: 20;
        padding: 0 12px 0 max(6px, env(safe-area-inset-left));
        background: rgba(255, 255, 255, 0.96); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
        border-bottom: 1px solid #D8DCE3; box-sizing: border-box;
        font-family: "Source Sans 3", "Helvetica Neue", Arial, sans-serif;
      }
      .apri-menu, .chiudi-menu {
        display: inline-flex; align-items: center; justify-content: center; flex: 0 0 auto;
        width: 44px; height: 44px; padding: 0; border: 0; border-radius: 8px;
        background: transparent; color: #1B4965; cursor: pointer;
      }
      .apri-menu:hover, .apri-menu:focus-visible, .chiudi-menu:hover, .chiudi-menu:focus-visible { background: #E3EAF1; }
      .apri-menu svg { width: 26px; height: 26px; }
      .chiudi-menu svg { width: 22px; height: 22px; }
      .barra-mobile .titoli { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
      .barra-mobile .nome-guida { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #5FA8D3; }
      .barra-mobile .capitolo-corrente { font-size: 15px; font-weight: 600; color: #1B4965; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .sidebar {
        width: min(320px, 86vw); z-index: 40; padding-top: 14px;
        padding-left: max(20px, env(safe-area-inset-left));
        transform: translateX(-100%); transition: transform 0.25s ease;
      }
      .sidebar.aperta { transform: translateX(0); box-shadow: 0 0 40px rgba(18, 53, 74, 0.28); }
      .sidebar > h2 { margin-top: 10px; padding-right: 52px; }
      .sidebar a { padding: 10px 10px; }
      .chiudi-menu { position: absolute; top: 6px; right: 8px; }
      .velo {
        display: block; position: fixed; inset: 0; z-index: 30;
        background: rgba(18, 53, 74, 0.45); opacity: 0; pointer-events: none; touch-action: none;
        transition: opacity 0.25s ease;
      }
      body.menu-aperto { overflow: hidden; }
      body.menu-aperto .velo { opacity: 1; pointer-events: auto; }
      .contenuto { margin-left: 0; padding: 72px 16px 56px; max-width: none; overflow-x: clip; }
      .azioni-capitolo { justify-content: flex-start; margin-bottom: 18px; }
      .capitolo + .capitolo .azioni-capitolo { margin-top: 20px; }
      .scarica-capitolo { font-size: 15px; padding: 8px 12px; }
    }
    @media (max-width: ${SOGLIA_STRETTO}) {
      html[data-taglia="1"] { font-size: 15.5px; }
      html[data-taglia="2"] { font-size: 17px; }
      html[data-taglia="3"] { font-size: 19px; }
    }
    @media (prefers-reduced-motion: reduce) {
      .sidebar, .velo { transition: none; }
    }
    @media print {
      .barra-mobile, .velo, .sidebar, .azioni-capitolo { display: none !important; }
      .contenuto { margin-left: 0; padding: 0; max-width: none; }
    }
  </style>`;
}

function scriptPagina() {
  return `  <script>
(function () {
  const html = document.documentElement;
  const body = document.body;
  const menu = document.querySelector(".sidebar");
  const apri = document.querySelector(".apri-menu");
  const chiudi = document.querySelector(".chiudi-menu");
  const velo = document.querySelector(".velo");
  const etichettaCorrente = document.querySelector(".capitolo-corrente");
  const mobile = window.matchMedia("(max-width: ${SOGLIA_MENU})");

  function menuAperto() { return body.classList.contains("menu-aperto"); }
  function aggiornaInert() { menu.inert = mobile.matches && !menuAperto(); }
  function apriMenu() {
    body.classList.add("menu-aperto");
    menu.classList.add("aperta");
    apri.setAttribute("aria-expanded", "true");
    aggiornaInert();
    const primo = menu.querySelector("ul a");
    if (primo) primo.focus({ preventScroll: true });
  }
  function chiudiMenu(riportaFocus) {
    body.classList.remove("menu-aperto");
    menu.classList.remove("aperta");
    apri.setAttribute("aria-expanded", "false");
    aggiornaInert();
    if (riportaFocus) apri.focus({ preventScroll: true });
  }
  apri.addEventListener("click", () => (menuAperto() ? chiudiMenu(false) : apriMenu()));
  chiudi.addEventListener("click", () => chiudiMenu(true));
  velo.addEventListener("click", () => chiudiMenu(false));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menuAperto()) chiudiMenu(true);
  });
  menu.addEventListener("click", (evento) => {
    if (mobile.matches && evento.target.closest("a")) chiudiMenu(false);
  });
  mobile.addEventListener("change", () => {
    if (!mobile.matches) chiudiMenu(false); else aggiornaInert();
  });
  aggiornaInert();

  const capitoli = Array.from(document.querySelectorAll(".capitolo"));
  const linkCapitoli = new Map(
    Array.from(menu.querySelectorAll('a[href^="#cap-"]')).map((a) => [a.getAttribute("href").slice(1), a])
  );
  let capitoloAttivo = null;
  function capitoloCorrente() {
    const inFondo = window.innerHeight + window.scrollY >= html.scrollHeight - 2;
    if (inFondo) return capitoli[capitoli.length - 1];
    const soglia = (mobile.matches ? 56 : 0) + 24;
    let corrente = capitoli[0];
    for (const capitolo of capitoli) {
      if (capitolo.getBoundingClientRect().top <= soglia) corrente = capitolo; else break;
    }
    return corrente;
  }
  function aggiornaCorrente() {
    const corrente = capitoloCorrente();
    if (!corrente || corrente === capitoloAttivo) return;
    capitoloAttivo = corrente;
    linkCapitoli.forEach((a, id) => {
      if (id === corrente.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    if (etichettaCorrente) {
      etichettaCorrente.textContent = corrente.id.replace("cap-", "") + " · " + (corrente.dataset.titolo || "");
    }
  }
  let aggiornamentoPianificato = 0;
  function pianificaAggiornamento() {
    if (aggiornamentoPianificato) return;
    aggiornamentoPianificato = requestAnimationFrame(() => {
      aggiornamentoPianificato = 0;
      aggiornaCorrente();
    });
  }
  window.addEventListener("scroll", pianificaAggiornamento, { passive: true });
  window.addEventListener("resize", pianificaAggiornamento);
  window.addEventListener("load", pianificaAggiornamento);
  aggiornaCorrente();

  const bottoniTaglia = document.querySelectorAll(".dimensione-testo button");
  function applicaTaglia(taglia) {
    html.setAttribute("data-taglia", taglia);
    bottoniTaglia.forEach((b) => {
      const attivo = b.dataset.taglia === taglia;
      b.classList.toggle("attivo", attivo);
      b.setAttribute("aria-pressed", String(attivo));
    });
    try { localStorage.setItem("guida-droni-taglia", taglia); } catch (e) {}
    pianificaAggiornamento();
  }
  applicaTaglia(html.getAttribute("data-taglia") || "2");
  bottoniTaglia.forEach((b) => b.addEventListener("click", () => applicaTaglia(b.dataset.taglia)));
})();
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
${stileLayout()}
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
${scriptPagina()}
</body>
</html>
`;

  await fs.writeFile(path.join(outDir, "index.html"), pagina, "utf8");
  console.log(`html/index.html generato con ${file.length} capitoli in ${outDir}`);
}
