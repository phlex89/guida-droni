import path from "node:path";
import { fileURLToPath } from "node:url";

const LIB_DIR = path.dirname(fileURLToPath(import.meta.url));

export const BUILD_DIR = path.resolve(LIB_DIR, "..");
export const PROJECT_ROOT = path.resolve(BUILD_DIR, "..");

export function risolviRispettoACwd(percorso, predefinito) {
  if (!percorso) return predefinito;
  return path.isAbsolute(percorso) ? percorso : path.resolve(process.cwd(), percorso);
}
