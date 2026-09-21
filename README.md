# Guida ai droni — sorgenti e build

Questo repository contiene i sorgenti di una guida introduttiva ai droni in italiano e la toolchain per trasformarli in PDF (uno per capitolo) e in una pagina HTML unica navigabile.

## Struttura

- `src/capitoli/NN-slug.html` — un capitolo per file, HTML completo con `lang="it"`.
- `src/css/guida.css` — foglio di stile del documento, usato sia dai PDF sia dal sito.
- `src/css/pagina.css` e `src/js/pagina.js` — stile e comportamento della sola pagina HTML unica: menu, dimensione del testo, definizioni delle sigle e schemi esplorabili. I PDF non li caricano.
- `src/css/fonts.css` e `src/css/fonts/` — dichiarazioni `@font-face` e file dei font, scaricati localmente una volta sola (nessuna dipendenza da Google Fonts in fase di build).
- `src/img/foto/` — fotografie con licenza libera; i crediti sono in `src/img/foto/crediti.json` e vanno riportati in didascalia.
- `src/img/schemi/` — schemi vettoriali (SVG) disegnati ad hoc.
- `src/img/schemi/spiegazioni.json` — testi delle parti toccabili degli schemi (vedi «Schemi esplorabili»).
- `build/` — script di build (Node), script Python per l'anteprima e `applica-crediti.py` per i crediti delle foto.
- `docs/` — documento di progetto, guida di stile editoriale, template di capitolo e fact sheet di ricerca (`docs/ricerca/`) con le fonti verificate.
- `pdf/` — PDF generati, uno per capitolo (non modificare a mano, è output dello script).
- `html/` — pagina HTML unica generata (non modificare a mano, è output dello script).

Ogni capitolo dichiara in testa la data di verifica delle fonti normative: prima di ripubblicare la guida, controllare che sia ancora aggiornata.

## Requisiti

- Node.js (consigliato tramite [mise](https://mise.jdx.dev/)).
- Google Chrome installato (per la generazione dei PDF via `puppeteer-core`). Percorso predefinito su macOS:
  `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. Per usarne un altro, impostare la variabile d'ambiente `CHROME_PATH`.
- Python 3 (per l'anteprima PNG dei PDF, tramite `pypdfium2`).

## Installazione

```
cd build
npm install
```

## Comandi di build

Tutti i comandi si lanciano dalla radice del progetto (o da qualsiasi altra directory: i percorsi predefiniti sono relativi alla posizione dello script).

### Generare i PDF, uno per capitolo

```
node build/build.mjs pdf
```

Opzioni: `--src <dir>` e `--out <dir>` per usare cartelle diverse da quelle predefinite, `--only NN` per generare un solo capitolo (es. `--only 03`). Lo script stampa a console il numero di pagine di ciascun PDF e il totale.

Ogni `<img>` che punta a un file dentro `img/schemi/` viene sostituito automaticamente con il contenuto SVG letto da disco (sia nel PDF sia nella pagina HTML unica): serve perché uno schema caricato come immagine esterna non vede i font della pagina, mentre inline sì. L'attributo `alt` diventa `<title>` se l'SVG non ne ha già uno, e `class`/`style` dell'`<img>` passano al tag `<svg>`.

### Generare la pagina HTML unica

```
node build/build.mjs html
```

Unisce tutti i capitoli in `html/index.html`, con barra di navigazione laterale e stile per la lettura a schermo. Il file si apre direttamente in un browser, senza bisogno di un server. Sotto i 900 px di larghezza (tablet e smartphone) la barra laterale diventa un menu a scomparsa: una barra fissa in alto mostra il capitolo in lettura e il pulsante che apre l'indice; il menu si chiude toccando fuori, con Esc o scegliendo un capitolo. Sotto i 640 px le griglie passano a una colonna e le tabelle larghe e gli schemi si scorrono in orizzontale.

A schermo il corpo del testo usa il font Literata a 20 px con interlinea 1,65, pensato per la lettura prolungata; nella barra laterale tre pulsanti «A» cambiano la dimensione del testo (17, 20 o 23 px; su smartphone 15,5, 17 o 19 px) e la scelta viene ricordata dal browser. I PDF mantengono Source Serif 4 a 10,75 pt per restare entro le 90 pagine.

#### Glossario attivo

Nel sito ogni `<abbr>` dei capitoli diventa toccabile e apre un riquadro con la definizione. Il testo viene cercato prima fra le voci dei `dl.glossario` presenti nella guida, confrontando la sigla e il termine; se non c'è corrispondenza si usa l'attributo `title` dell'`<abbr>` stesso. Non serve marcare altro nei capitoli: basta che la sigla sia dentro un `<abbr>` con il suo `title`. Sopra ogni glossario con almeno dieci voci compare anche un campo che filtra le voci mentre si scrive. Tutto questo esiste solo a schermo: i PDF restano identici.

#### Schemi esplorabili

Alcuni schemi hanno parti toccabili che aprono una spiegazione sotto il disegno. Servono due cose:

1. nell'SVG, un `<g id="...">` che avvolge gli elementi di quella parte;
2. in `src/img/schemi/spiegazioni.json`, una voce con lo stesso identificativo.

Il file è organizzato per nome dello schema, senza estensione:

```json
{
  "anatomia-quadricottero": {
    "suggerimento": "Tocca una parte del disegno per sapere che cosa fa.",
    "punti": [
      { "id": "anq-motore", "etichetta": "Motore brushless", "testo": "..." }
    ]
  }
}
```

Gli identificativi usano il prefisso già adottato dalle classi dello schema (`anq-`, `spe-`, `cat-`), così non collidono fra schemi diversi nella pagina unica. Alla generazione lo script confronta le due parti e avvisa in console se un identificativo dichiarato nel JSON non esiste nell'SVG, o se lo schema non compare in nessun capitolo.

Gli attributi aggiunti agli SVG sono inerti in stampa: dopo aver raggruppato le parti, i PDF dei capitoli interessati sono stati rigenerati e confrontati pagina per pagina con i precedenti, senza differenze di resa.

### Generare un'anteprima PNG di un PDF

```
node build/build.mjs preview pdf/01-cose-un-drone.pdf --pages 1-3 --scale 1.5
```

Le immagini vengono salvate in `build/preview/`. Al primo utilizzo lo script installa automaticamente `pypdfium2` (utente, oppure in un virtualenv in `build/.venv` se l'installazione utente non è possibile). Se `pypdfium2` non è disponibile, l'anteprima ripiega su `sips` (solo prima pagina, senza controllo di scala).

### Inserire i crediti delle foto

Nei capitoli una foto si può riferire come `../img/foto/NN.jpg` (numero a due cifre) con il segnaposto `[[credito:NN]]` nella didascalia. Il comando

```
python3 build/applica-crediti.py
```

sostituisce nome file e credito leggendo `src/img/foto/crediti.json`. È idempotente: si può rilanciare dopo ogni modifica.

Il campo `didascalia_credito` del file dei crediti contiene i collegamenti all'opera originale e alla licenza, perché le licenze Creative Commons con obbligo di attribuzione li richiedono. Quando quel campo cambia, i segnaposto `[[credito:NN]]` nei capitoli sono già stati sostituiti e il comando sopra non ha più nulla su cui intervenire: per riallineare le didascalie già scritte si usa

```
python3 build/aggiorna-crediti-didascalie.py
```

che abbina ogni `<span class="credito">` alla foto della stessa `<figure>` e ne riscrive il contenuto. Con `--prova` elenca i file che cambierebbero senza scriverli. Anche questo è idempotente. La sezione «Crediti delle fotografie» del capitolo 08 ripete gli stessi riferimenti con gli URL per esteso, perché sulla carta i collegamenti non sono cliccabili.

## Pubblicazione online

La versione HTML è pubblicata con GitHub Pages all'indirizzo <https://phlex89.github.io/guida-droni/>. Il workflow `.github/workflows/pages.yml` si avvia a ogni push su `main` che tocca `html/`, `pdf/` o il workflow stesso: copia i PDF dentro il sito (`html/pdf`, cartella ignorata da git) e pubblica la cartella `html/`. Per aggiornare il sito basta rigenerare PDF e HTML in locale, fare commit e push. Il PDF unico `pdf/guida-droni-completa.pdf` si rigenera con `python3 build/unisci-pdf.py` dopo aver rigenerato i PDF dei capitoli.

## Aggiornare la guida

La normativa cambia spesso. Per un aggiornamento:

1. Rileggere i fact sheet in `docs/ricerca/` e le sezioni "Cose da verificare" in fondo a ciascuno.
2. Correggere i capitoli interessati (soprattutto 04, 05 e la scheda rapida) e aggiornare la riga "Fonti normative verificate il ..." in testa a ogni capitolo modificato.
3. Rispettare `docs/guida-di-stile.md` e usare `docs/template-capitolo.html` per i nuovi contenuti.
4. Rigenerare PDF (`node build/build.mjs pdf`, poi `python3 build/unisci-pdf.py`) e HTML (`node build/build.mjs html`), quindi commit e push per aggiornare il sito.

## Aggiungere un capitolo

1. Creare `src/capitoli/NN-slug.html` seguendo la struttura degli altri capitoli: `<head>` con `<title>` e il link a `../css/guida.css`; `<body data-capitolo="NN" data-titolo="Titolo breve">` con il contenuto dentro `<main>`.
2. Riferire le immagini come `../img/foto/...` o `../img/schemi/...`.
3. Indicare in testa al capitolo la data di verifica delle fonti normative, se pertinente.
4. Rilanciare `node build/build.mjs pdf` e `node build/build.mjs html`.

## Font

I font (Source Serif 4, Source Sans 3, JetBrains Mono e Literata per la sola versione a schermo) sono stati scaricati una sola volta dai pacchetti `@fontsource` e copiati come file statici in `src/css/fonts/`, con le relative dichiarazioni in `src/css/fonts.css`. Non è necessaria alcuna connessione di rete in fase di build o di stampa dei PDF.
