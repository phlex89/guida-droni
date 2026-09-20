import sys, pathlib
import pypdfium2 as pdfium

soglia = float(sys.argv[2]) if len(sys.argv) > 2 else 0.62
for percorso in sorted(pathlib.Path(sys.argv[1]).glob("*.pdf")):
    doc = pdfium.PdfDocument(str(percorso))
    n = len(doc)
    for i in range(n - 1):
        pagina = doc[i]
        img = pagina.render(scale=0.5).to_pil().convert("L")
        w, h = img.size
        px = img.load()
        limite_piede = int(h * 0.93)
        ultima = 0
        for y in range(limite_piede, 0, -1):
            riga = [px[x, y] for x in range(int(w * 0.1), int(w * 0.9), 3)]
            if min(riga) < 235:
                ultima = y
                break
        frazione = ultima / h
        if frazione < soglia:
            print(f"{percorso.name} pagina {i+1}: contenuto finisce al {frazione:.0%} dell'altezza")
