import pathlib, sys
import pypdfium2 as pdfium

radice = pathlib.Path(__file__).resolve().parent.parent
cartella = radice / "pdf"
uscita = cartella / "guida-droni-completa.pdf"
capitoli = sorted(p for p in cartella.glob("*.pdf") if p != uscita)
unito = pdfium.PdfDocument.new()
totale = 0
for percorso in capitoli:
    doc = pdfium.PdfDocument(str(percorso))
    unito.import_pages(doc)
    totale += len(doc)
unito.save(str(uscita))
print(f"{uscita.name}: {len(capitoli)} capitoli, {totale} pagine")
