import sys

import pypdfium2 as pdfium


def main():
    pdf_path, out_dir, nome_base, pagine_spec, scala = sys.argv[1:6]
    scala = float(scala)
    pagine = [int(n) for n in pagine_spec.split(",")]

    pdf = pdfium.PdfDocument(pdf_path)
    for numero in pagine:
        pagina = pdf[numero - 1]
        bitmap = pagina.render(scale=scala)
        immagine = bitmap.to_pil()
        percorso_out = f"{out_dir}/{nome_base}-p{numero}.png"
        immagine.save(percorso_out)


if __name__ == "__main__":
    main()
