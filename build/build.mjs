import { parseArgs } from "./lib/args.mjs";
import { buildPdf } from "./lib/pdf.mjs";
import { buildHtml } from "./lib/html.mjs";
import { buildPreview } from "./lib/preview.mjs";

async function main() {
  const [comando, ...resto] = process.argv.slice(2);
  const args = parseArgs(resto);

  switch (comando) {
    case "pdf":
      await buildPdf({ src: args.src, out: args.out, only: args.only });
      break;
    case "html":
      await buildHtml({ src: args.src, out: args.out });
      break;
    case "preview":
      await buildPreview(args._[0], { pages: args.pages, scale: args.scale });
      break;
    default:
      console.log("Comando sconosciuto. Uso: node build/build.mjs <pdf|html|preview> [opzioni]");
      process.exitCode = 1;
  }
}

main().catch((errore) => {
  console.error("Errore durante la build:", errore.message);
  process.exitCode = 1;
});
