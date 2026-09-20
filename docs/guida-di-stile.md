# Guida di stile editoriale

Vale per tutti i capitoli. Chi scrive un capitolo la legge per intera prima di iniziare.

## Lettore e tono

- Il lettore non sa nulla di droni ma ha basi solide di telecomunicazioni, elettronica e informatica. Non spiegare cosa sono un'antenna, un accelerometro o un protocollo; spiega invece come si usano nei droni.
- Tono: quello di un collega competente che spiega con calma. Diretto, concreto, mai scolastico né promozionale. Niente frasi come "nel mondo affascinante dei droni".
- Seconda persona singolare ("tu") quando si parla di cosa fare; impersonale per le descrizioni.
- Ogni concetto nuovo va introdotto con una frase che dice a cosa serve, poi come funziona, poi le eccezioni.
- Paragrafi di tre-sei frasi. Una sola idea per paragrafo. Frasi di lunghezza variabile, in media sotto le 25 parole.
- Nessuna marca, modello o prezzo. Se serve un esempio, usare descrizioni generiche ("un quadricottero pieghevole da 249 g con marcatura C0").
- Sigle: forma estesa alla prima occorrenza, con `<abbr title="...">`. Poi solo la sigla.
- Numeri con unità: spazio non separabile tra numero e unità (`250&nbsp;g`, `120&nbsp;m`, `2,4&nbsp;GHz`). Virgola decimale. Migliaia con punto solo sopra 9999.
- Virgolette: « » per citazioni testuali di norme; “ ” per termini usati in senso figurato.
- Niente emoji. Niente punti esclamativi. Niente elenchi di tre aggettivi.

## Struttura di un capitolo

1. `header.apertura` con etichetta, numero, titolo, sommario di 2-3 frasi, elenco "In questo capitolo", riga con la data di verifica delle fonti.
2. Sezioni `h2` numerate come `NN.1`, `NN.2` con `<span class="numero">`. Sottosezioni `h3` non numerate. Massimo due livelli sotto il titolo.
3. Ogni sezione principale ha almeno un elemento visivo o un box ogni pagina circa: figura, tabella, box.
4. Chiusura obbligatoria con `section.sintesi` di 5-8 punti.
5. Nei capitoli normativi (04, 05, 06) chiudere con una sezione `h2` "Fonti" con elenco `ul.fonti` di link ufficiali.

## Box

Usarli con misura: al massimo uno ogni due-tre paragrafi.

- `box nota`: chiarimento che non interrompe il filo.
- `box attenzione`: rischio o errore comune. Prima la condizione, poi la conseguenza.
- `box norma`: citazione della fonte precisa (regolamento, articolo, edizione).
- `box tlc`: ponte tra un concetto dei droni e una conoscenza di telecomunicazioni o elettronica del lettore.
- `box scenario`: situazione concreta con la regola applicata. Inizia con un titolo in grassetto.
- `box definizione`: definizione formale di un termine.

## Figure e tabelle

- Numerazione `Figura NN.k` e `Tabella NN.k` in grassetto dentro `figcaption` o `caption`.
- Le didascalie aggiungono informazione, non ripetono il titolo.
- Foto: `figure.foto`, con `<span class="credito">` dal file `src/img/foto/crediti.json` (campo `didascalia_credito`). Non usare foto assenti dal file dei crediti.
- Schemi: `figure.schema` con SVG in `src/img/schemi/`. Testi in italiano, font Source Sans 3, palette del foglio di stile.
- Tabelle: prima colonna in `th` quando è una chiave. Usare `span.chip` per classi (`c0`..`c6`) e sottocategorie (`a1`, `a2`, `a3`).

## Lunghezza

Una pagina A4 di questo layout contiene circa 450 parole di solo testo; con figure e box circa 300. Il budget pagine per capitolo è nel documento di progetto. Non superarlo: tagliare prima le digressioni, poi gli esempi ridondanti.

## Accuratezza

- Ogni affermazione normativa deriva dai fact sheet in `docs/ricerca/` e riporta la fonte nel box norma o nella sezione Fonti.
- Se un fact sheet segnala un punto come incerto, il capitolo lo dice ("al momento della stesura non è chiaro se...") oppure lo omette. Mai risolvere un dubbio inventando.
- Date: la normativa cambia. Scrivere "al 20 settembre 2026" quando si dà un valore che potrebbe cambiare (tariffe, edizioni, scadenze).
