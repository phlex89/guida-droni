import json, re, sys, pathlib

radice = pathlib.Path(__file__).resolve().parent.parent
cartella_foto = radice / "src" / "img" / "foto"
crediti = json.loads((cartella_foto / "crediti.json").read_text(encoding="utf-8"))
per_numero = {}
for voce in crediti:
    numero = voce["file"][:2]
    per_numero[numero] = voce

mancanti = set()
for capitolo in sorted((radice / "src" / "capitoli").glob("*.html")):
    testo = capitolo.read_text(encoding="utf-8")
    originale = testo

    def sostituisci_src(m):
        numero = m.group(1)
        voce = per_numero.get(numero)
        if not voce:
            mancanti.add(numero)
            return m.group(0)
        return f'../img/foto/{voce["file"]}'

    def sostituisci_credito(m):
        numero = m.group(1)
        voce = per_numero.get(numero)
        if not voce:
            mancanti.add(numero)
            return m.group(0)
        return voce["didascalia_credito"]

    testo = re.sub(r"\.\./img/foto/(\d{2})\.jpg", sostituisci_src, testo)
    testo = re.sub(r"\[\[credito:(\d{2})\]\]", sostituisci_credito, testo)
    if testo != originale:
        capitolo.write_text(testo, encoding="utf-8")
        print(f"aggiornato {capitolo.name}")

if mancanti:
    print("foto senza voce nei crediti:", ", ".join(sorted(mancanti)))
