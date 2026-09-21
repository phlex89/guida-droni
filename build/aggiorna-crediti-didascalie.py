"""Riallinea le didascalie dei crediti fotografici al file crediti.json.

Serve dopo aver cambiato il campo `didascalia_credito`, quando i segnaposto
[[credito:NN]] sono già stati sostituiti nei capitoli e `applica-crediti.py`
non ha più nulla su cui intervenire. Abbina ogni <span class="credito"> alla
foto della stessa <figure> e ne riscrive il contenuto. È idempotente.

Uso: python3 build/aggiorna-crediti-didascalie.py [--prova]
"""

import json
import pathlib
import re
import sys

radice = pathlib.Path(__file__).resolve().parent.parent
crediti = json.loads((radice / "src" / "img" / "foto" / "crediti.json").read_text(encoding="utf-8"))
per_file = {voce["file"]: voce for voce in crediti}

prova = "--prova" in sys.argv
figura = re.compile(
    r'(<figure\b[^>]*>.*?</figure>)',
    re.DOTALL,
)
sorgente = re.compile(r'\.\./img/foto/([^"\']+\.jpg)')
credito = re.compile(r'(<span class="credito">)(.*?)(</span>)', re.DOTALL)

senza_voce = set()
for capitolo in sorted((radice / "src" / "capitoli").glob("*.html")):
    testo = capitolo.read_text(encoding="utf-8")

    def sostituisci_figura(m):
        blocco = m.group(1)
        nomi = sorgente.findall(blocco)
        if not nomi:
            return blocco
        voce = per_file.get(nomi[0])
        if not voce:
            senza_voce.add(nomi[0])
            return blocco
        return credito.sub(
            lambda c: c.group(1) + voce["didascalia_credito"] + c.group(3),
            blocco,
        )

    nuovo = figura.sub(sostituisci_figura, testo)
    if nuovo != testo:
        if prova:
            print(f"cambierebbe {capitolo.name}")
        else:
            capitolo.write_text(nuovo, encoding="utf-8")
            print(f"aggiornato {capitolo.name}")

if senza_voce:
    print("foto senza voce nei crediti:", ", ".join(sorted(senza_voce)))
