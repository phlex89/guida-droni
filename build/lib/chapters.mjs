import fs from "node:fs/promises";
import path from "node:path";

export async function listaFileCapitoli(srcDir, solo) {
  const voci = await fs.readdir(srcDir);
  return voci
    .filter((nome) => nome.endsWith(".html"))
    .filter((nome) => (solo ? nome.startsWith(`${solo}-`) : true))
    .sort((a, b) => a.localeCompare(b, "it"))
    .map((nome) => path.join(srcDir, nome));
}

export function estraiAttributoBody(html, attributo) {
  const bodyMatch = html.match(/<body\b[^>]*>/i);
  if (!bodyMatch) return "";
  const attrMatch = bodyMatch[0].match(new RegExp(`${attributo}="([^"]*)"`, "i"));
  return attrMatch ? attrMatch[1] : "";
}

export function estraiContenutoMain(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return match ? match[1].trim() : "";
}
