# Guida ai droni — documento di progetto

Data: 20 settembre 2026. Stato: indice approvato dall'autore committente.

## Obiettivo

Una guida introduttiva al mondo dei droni per una persona inesperta del settore ma con basi di telecomunicazioni, elettronica e informatica. La parte normativa (UE + Italia) è trattata in dettaglio; la parte commerciale (marche, modelli, prezzi) è assente. La guida deve essere piacevole da leggere e impaginata con cura.

## Vincoli confermati

- Un PDF per capitolo (A4) più una scheda rapida stampabile e una versione HTML unica navigabile.
- Sorgenti (HTML, CSS, SVG, foto con crediti) conservati nella cartella per aggiornamenti futuri.
- Lunghezza totale: circa 60 pagine, massimo 90.
- Nessun quiz. Sì a scenari pratici nei capitoli normativi.
- Categoria Specific: solo panoramica.
- Foto con licenza libera (Wikimedia Commons) con credito in didascalia; schemi vettoriali disegnati ad hoc.

## Indice e budget pagine

| File | Titolo | Pagine |
|---|---|---|
| 00 | Introduzione e mappa della guida | 3 |
| 01 | Cos'è un drone | 6 |
| 02 | Anatomia e funzionamento | 8 |
| 03 | Radio, video e telemetria | 8 |
| 04 | Il quadro normativo europeo | 11 |
| 05 | Volare in Italia | 11 |
| 06 | Categoria Specific e prospettive | 4 |
| 07 | Volare in pratica | 7 |
| 08 | Percorso del neofita e appendici | 7 |
| SR | Scheda rapida | 2 |

Totale indicativo: 67 pagine.

## Convenzioni dei sorgenti

- Capitoli in `src/capitoli/NN-slug.html`, documenti HTML completi, `lang="it"`.
- `<head>` con `<title>` e `<link rel="stylesheet" href="../css/guida.css">`.
- `<body data-capitolo="NN" data-titolo="Titolo breve">`; il contenuto sta in `<main>`.
- Immagini in `src/img/foto/` (fotografie) e `src/img/schemi/` (SVG), riferite come `../img/...`.
- Crediti foto in `src/img/foto/crediti.json` e riportati in didascalia.
- Ogni capitolo dichiara in testa la data di verifica delle fonti normative.

## Design system

- Formato A4, margini 20 mm laterali, 22 mm alto e basso; piè di pagina con titolo capitolo e numero di pagina.
- Colori: blu profondo `#1B4965` (titoli, accenti), azzurro `#5FA8D3` (secondario), arancio `#E0851F` (attenzione), grigio testo `#2B2D31`, grigio chiaro `#F2F4F7` (sfondi box).
- Font: Source Serif 4 per il corpo nei PDF, Literata (20 px, interlinea 1,65, regolabile dal lettore) per il corpo nella versione HTML, Source Sans 3 per titoli e box, JetBrains Mono per sigle tecniche e codici.
- Box laterali: Nota, Attenzione, Riferimento normativo, Per chi viene dalle TLC, Scenario pratico.
- Ogni capitolo termina con una tabella o elenco "In sintesi".

## Pipeline di build

- `build/build.mjs` con Node e puppeteer-core, usando Google Chrome installato.
- `node build/build.mjs pdf` genera i PDF in `pdf/`.
- `node build/build.mjs html` genera `html/index.html` con tutti i capitoli e una barra di navigazione.
- `node build/build.mjs preview <pdf>` produce PNG delle pagine per il controllo visivo.

## Fasi di lavoro

1. Ricerca sulle fonti ufficiali (UE, Italia, radio) e reperimento foto, in parallelo con il toolchain.
2. Foglio di stile e schemi SVG.
3. Stesura dei capitoli: tecnici delegati a sub-agenti con brief e fact sheet; normativi scritti dal modello orchestratore.
4. Revisione editoriale e fattuale centralizzata, build, controllo visivo dei PDF.
