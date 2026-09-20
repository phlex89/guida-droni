import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { BUILD_DIR } from "./paths.mjs";

function pypdfium2Disponibile(pythonBin) {
  const risultato = spawnSync(pythonBin, ["-c", "import pypdfium2"], { stdio: "ignore" });
  return risultato.status === 0;
}

function installaPypdfium2Utente() {
  const risultato = spawnSync("python3", ["-m", "pip", "install", "--user", "pypdfium2"], {
    stdio: "inherit",
  });
  return risultato.status === 0;
}

function creaVenvEInstalla() {
  const venvDir = path.join(BUILD_DIR, ".venv");
  let risultato = spawnSync("python3", ["-m", "venv", venvDir], { stdio: "inherit" });
  if (risultato.status !== 0) return null;
  const pipBin = path.join(venvDir, "bin", "pip");
  risultato = spawnSync(pipBin, ["install", "pypdfium2"], { stdio: "inherit" });
  if (risultato.status !== 0) return null;
  return path.join(venvDir, "bin", "python3");
}

function trovaPython() {
  if (pypdfium2Disponibile("python3")) return "python3";
  console.log("pypdfium2 non trovato, tento l'installazione utente...");
  if (installaPypdfium2Utente() && pypdfium2Disponibile("python3")) return "python3";
  console.log("Installazione utente fallita, creo un virtualenv in build/.venv...");
  const venvPython = creaVenvEInstalla();
  if (venvPython && pypdfium2Disponibile(venvPython)) return venvPython;
  return null;
}

function parseIntervalloPagine(specifica) {
  if (!specifica || specifica === true) return [1];
  const [inizio, fine] = specifica.split("-").map(Number);
  if (!fine) return [inizio];
  const pagine = [];
  for (let n = inizio; n <= fine; n++) pagine.push(n);
  return pagine;
}

function renderConSips(pdfPath, outDir, nomeBase) {
  const outPath = path.join(outDir, `${nomeBase}-p1.png`);
  const risultato = spawnSync("sips", ["-s", "format", "png", pdfPath, "--out", outPath], {
    stdio: "inherit",
  });
  if (risultato.status !== 0) {
    console.error("Anteprima non disponibile: né pypdfium2 né sips hanno funzionato.");
    process.exitCode = 1;
    return;
  }
  console.log("Attenzione: fallback su sips, disponibile solo la prima pagina, senza controllo di scala.");
  console.log(`Generato ${outPath}`);
}

export async function buildPreview(pdfArg, { pages, scale }) {
  if (!pdfArg) {
    console.error("Specificare il file PDF da anteprima.");
    process.exitCode = 1;
    return;
  }
  const pdfPath = path.isAbsolute(pdfArg) ? pdfArg : path.resolve(process.cwd(), pdfArg);
  if (!fs.existsSync(pdfPath)) {
    console.error(`File non trovato: ${pdfPath}`);
    process.exitCode = 1;
    return;
  }
  const outDir = path.join(BUILD_DIR, "preview");
  fs.mkdirSync(outDir, { recursive: true });
  const nomeBase = path.basename(pdfPath, ".pdf");
  const pagine = parseIntervalloPagine(pages);
  const fattoreScala = scale ? Number(scale) : 1.5;

  const pythonBin = trovaPython();
  if (!pythonBin) {
    console.log("pypdfium2 non installabile, ripiego su sips (solo macOS, solo prima pagina).");
    renderConSips(pdfPath, outDir, nomeBase);
    return;
  }

  const scriptPath = path.join(BUILD_DIR, "preview.py");
  const argomenti = [scriptPath, pdfPath, outDir, nomeBase, pagine.join(","), String(fattoreScala)];
  const risultato = spawnSync(pythonBin, argomenti, { stdio: "inherit" });
  if (risultato.status !== 0) {
    console.error("Generazione anteprima fallita.");
    process.exitCode = 1;
    return;
  }
  for (const numeroPagina of pagine) {
    console.log(`Generato ${path.join(outDir, `${nomeBase}-p${numeroPagina}.png`)}`);
  }
}
