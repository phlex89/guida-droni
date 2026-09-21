# Report di validazione della guida «Il mondo dei droni»

Data della revisione: **20 settembre 2026**. Oggetto: contenuti, chiarezza, coerenza e forma editoriale della guida.

## Valutazione complessiva

La guida ha una buona architettura didattica: parte dal sistema, distingue tecnica e normativa, arriva alla pianificazione e offre strumenti di consultazione. Il registro è generalmente adatto a un lettore con basi di elettronica e telecomunicazioni. Sono particolarmente utili la distinzione operatore/pilota, il collegamento tra caratteristiche tecniche e conseguenze operative e l'uso degli scenari.

**Non considererei però ancora validata la guida come riferimento operativo.** Ci sono errori che possono influire su legalità o sicurezza del volo, oltre a generalizzazioni tecniche e contraddizioni tra testo esteso, glossario, schemi e scheda rapida. La priorità è correggere questi punti; la revisione stilistica viene dopo.

Il problema ricorrente è questo: una spiegazione inizialmente qualificata perde le proprie condizioni quando viene riassunta. Succede, per esempio, con droni senza marcatura, autocostruiti, formazione, ritorno automatico e zone geografiche. Schemi e checklist vanno quindi revisionati come contenuto autonomo, non trattati come semplici illustrazioni.

## Metodo e copertura

- Letti i dieci HTML sorgente, dall'introduzione alla scheda rapida, i testi dei dodici schemi SVG e le spiegazioni interattive in JSON.
- Letti il documento di progetto e la guida di stile. Il progetto prevede circa 60 pagine, massimo 90; il PDF completo ne contiene **81**. Il conteggio approssimativo dei testi HTML è di **27.900 parole**, comprese tabelle e appendici ma esclusi i testi contenuti solo negli SVG.
- Verificate le principali affermazioni normative e le criticità tecniche su fonti primarie: EUR-Lex, EASA, ENAC, d-flight, ANSV, IATA, FAA, Garante, documentazione dei progetti e dei produttori.
- Controllo visivo campionario: entrambe le pagine della scheda rapida e pagine 4–5 del PDF del capitolo 4. Non è una certificazione grafica di tutte le 81 pagine.
- Controllo strutturale della pagina HTML generata: nessun ID duplicato e nessun collegamento interno `#...` privo di destinazione. Non è stato effettuato un audit completo di accessibilità o compatibilità browser.
- I riferimenti di riga sono quelli dei **sorgenti originali**, non degli HTML generati. La guida non è stata modificata.

Le fonti sono state consultate durante questa revisione. Una pagina ufficiale reperibile oggi non prova da sola che ogni dettaglio procedurale sia aggiornato: le incertezze residue sono indicate espressamente. Non ho trattato i documenti di ricerca del repository come prova indipendente delle loro stesse conclusioni.

### Come leggere le priorità

| Priorità | Significato |
|---|---|
| **P1 — alta** | Correzione necessaria prima di proporre il testo come guida operativa: rischio di comportamento non sicuro, errore normativo o decisione concretamente sbagliata. |
| **P2 — media** | Errore tecnico, condizione omessa o incoerenza che compromette comprensione e affidabilità. |
| **P3 — editoriale** | Miglioramento di stile, organizzazione, consultazione o presentazione. |

**Errore** indica un contrasto verificabile con una fonte o con un altro passaggio della guida. **Precisazione** indica una frase vera solo in certe condizioni. **Verifica aperta** indica un'affermazione da documentare meglio, senza sostituirla con un'altra certezza non dimostrata. Le preferenze di scrittura sono riconoscibili come proposte editoriali.

## 1. Correzioni prioritarie

### P01 — P1 · MTOM e peso misurato non sono la stessa cosa

**Dove:** [cap. 1, riga 142](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/01-cos-e-un-drone.html:142), riga 149; [cap. 8, riga 92](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:92), glossario riga 164.

**Errore:** la MTOM viene definita come il peso del mezzo pronto a volare. Inoltre, un C0 che supera 250 g con accessori «diventa legacy […] A3».

La MTOM è la **massa massima consentita definita dal fabbricante o costruttore**, comprensiva del carico utile. La massa effettiva si misura nella configurazione di volo e deve rispettare i limiti applicabili. Aggiungere peso non attribuisce un'altra classe e non rende automaticamente il drone un legacy utilizzabile in A3.

**Correzione proposta:** «Pesa la configurazione effettiva e confrontala con la MTOM e con gli accessori ammessi dal fabbricante. Se un accessorio rende il drone non conforme alla configurazione di classe, non presumere di poterlo usare semplicemente in una sottocategoria diversa». Separare poi il caso dei legacy ammessi dall'articolo 20. Fonte: [2019/947, art. 2(22), art. 20 e UAS.OPEN.060(1)(e)][EU947].

### P02 — P1 · Manca la condizione temporale che rende utilizzabile un drone legacy

**Dove:** [cap. 4, riga 242](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:242); cap. 8, righe 91 e 146; scheda rapida, righe 23 e 41; schemi `categorie-open` e relative spiegazioni.

**Errore per omissione:** «senza marcatura» viene usato come sinonimo di drone sempre ammesso in A1 o A3. L'articolo 20 riguarda UAS **immessi sul mercato prima del 1º gennaio 2024**, non tutti i prodotti senza classe venduti oggi. La data di immissione sul mercato non coincide necessariamente con la data di acquisto del singolo utente.

**Correzione:** distinguere tre percorsi: prodotto con classe; legacy che soddisfa l'articolo 20; costruzione privata. Eliminare anche «oggi e per sempre»: il cap. 4 stesso ammette una successiva procedura ufficiale del fabbricante per la marcatura. Fonte: [2019/947, artt. 4 e 20][EU947].

### P03 — P1 · La registrazione non richiede l'acquisto di un QR per ogni drone

**Dove:** [cap. 5, riga 61](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:61), tabella 5.1, sintesi riga 208.

**Errore:** il QR viene presentato come acquisto necessario per ogni drone, con 7 € o 112 € per unità.

Il QR **operatore** è unico e va applicato agli UAS dell'operatore. Il listino d-flight distingue i QR UAS per singolo drone, espressamente indicati come **facoltativi**. Gli importi riportati esistono, ma il loro significato è sbagliato: così il lettore viene indirizzato verso spese non necessarie.

**Correzione:** riscrivere procedura e tabella separando account, abbonamento/servizi, registrazione operatore, QR operatore e QR UAS facoltativo. Non equiparare automaticamente la scadenza di un servizio alla cancellazione giuridica dal registro senza documentare il relativo meccanismo. Fonti: [FAQ d-flight][DF-FAQ], [listino ufficiale QR][DF-QR].

### P04 — P1 · Il colore rosso non implica sempre il passaggio alla Specific

**Dove:** [cap. 5, riga 123](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:123), riga 146 e sintesi; [diagramma decisionale, riga 65](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/flowchart-posso-volare.svg:65).

**Errore:** «zone rosse = solo Specific» non vale per tutte le ragioni di istituzione della zona. ENAC distingue le restrizioni per safety da alcune zone istituite per altri motivi, nelle quali può essere ammessa anche la Open previo nulla osta dell'ente originatore.

**Correzione:** «Apri la scheda della zona e verifica motivo, condizioni, validità e autorità competente. Alcune zone escludono la Open; altre consentono l'accesso in Open con specifici nulla osta». Nel diagramma, usare «Non decollare finché non hai verificato e soddisfatto le condizioni», anziché dedurre la categoria dal solo colore. Fonte: [ENAC, limitazioni e riserve dello spazio aereo][ENAC-ZONE].

### P05 — P1 · La deroga vicino agli ostacoli aeroportuali è descritta come deroga alla Open

**Dove:** [cap. 5, riga 136](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:136).

**Errore di inquadramento:** dopo aver detto che in zona aeroportuale rossa la Open è vietata, il testo introduce «una sola deroga» entro 10 m lateralmente e 3 m sopra un ostacolo, oltre 500 m dal sedime. Il lettore può interpretarla come permesso di volare in Open.

La pagina ENAC presenta quelle distanze nella trattazione delle operazioni **Specific** e dell'esenzione dalla **riserva di spazio aereo**. Non sono un'autorizzazione generale a volare in Open né eliminano automaticamente gli altri adempimenti.

**Correzione:** separare categoria operativa, autorizzazione/dichiarazione, eventuale riserva di spazio aereo e nulla osta. Non pubblicare una procedura aeroportuale compressa in una singola «deroga». Fonte: [ENAC, sezione sulle operazioni Specific vicino agli ostacoli][ENAC-ZONE].

### P06 — P1 · La luce verde notturna non è un obbligo limitato a C1–C3

**Dove:** [cap. 4, riga 106](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:106); [cap. 7, riga 57](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:57) e sintesi; spiegazione interattiva `anq-led`; assente dalla scheda rapida.

**Errore per omissione:** il requisito di prodotto di alcune classi viene confuso con l'obbligo operativo. UAS.OPEN.060(2)(g) richiede al pilota, durante operazioni notturne in Open, di assicurarsi che una luce verde lampeggiante sia attivata.

**Correzione:** «Per volare di notte in Open serve una luce verde lampeggiante attiva, anche quando il drone non appartiene a C1, C2 o C3. Verifica compatibilità dell'eventuale accessorio con massa e configurazione ammessa». Inserire una voce condizionale nella checklist. Fonte: [2019/947, UAS.OPEN.060][EU947].

### P07 — P1 · Il ritorno automatico è presentato come garantito

**Dove:** [cap. 3, riga 149](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:149); [cap. 7, riga 120](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:120), procedura e tabella 7.1; [scheda rapida, riga 84](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/09-scheda-rapida.html:84).

**Precisazione necessaria:** «aspetta il rientro automatico» non è una procedura universale. Il failsafe può comandare atterraggio, mantenimento, RTH, disarmo o altre azioni; il comportamento dipende da firmware, configurazione, sensori, batteria e modalità. La guida riconosce queste alternative nel cap. 2 ma le cancella nelle istruzioni operative.

**Correzione:** «Mantieni acceso il radiocomando, osserva il drone e applica la procedura di perdita del collegamento prevista dal manuale. Il rientro è possibile solo se disponibile, configurato e supportato dallo stato del sistema». Togliere anche l'ordine di interrompere sempre il RTH appena il link torna: farlo solo se è la scelta più sicura. Fonti: [ArduPilot, failsafe][AP-FAIL], [RTL][AP-RTL].

### P08 — P1 · Quota RTH e salita per recuperare il video devono rispettare lo spazio disponibile

**Dove:** [cap. 7, riga 94](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:94), tabella 7.1 riga 139; scheda rapida riga 108.

**Omissione operativa:** viene prescritto di impostare il RTH sopra l'ostacolo più alto e di salire quando il video degrada, senza verificare tetto della zona, traffico, terreno e traiettoria automatica. Potrebbe non esistere una quota che soddisfi contemporaneamente tutti i vincoli.

**Correzione:** pianificare una traiettoria di rientro compatibile con ostacoli **e** limiti di altezza lungo il percorso; se non è possibile, cambiare punto di decollo, area o configurazione. Per il video degradato privilegiare mantenimento VLOS, antenne e riduzione della distanza; una salita è solo una possibile manovra se sicura e consentita. Fonti: [2019/947, UAS.OPEN.010 e .060][EU947], [ArduPilot RTL][AP-RTL].

### P09 — P1 · «Un incendio che l'acqua non spegne» è una formulazione scorretta

**Dove:** [cap. 2, riga 127](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:127).

**Errore:** la frase sulle batterie ricaricabili al litio confonde la persistenza della fuga termica con l'inefficacia dell'acqua. La FAA indica il raffreddamento con acqua come parte della risposta a incendi di batterie agli ioni di litio; non va sovrapposto automaticamente al comportamento del litio metallico.

**Correzione proposta:** «Una batteria danneggiata può entrare in fuga termica, emettere fumi pericolosi e riaccendersi. La soppressione delle fiamme non garantisce che il processo sia terminato: conta anche il raffreddamento. In caso di incendio allontana le persone e chiama i soccorsi; non improvvisare la manipolazione del pacco». Non trasformare la guida in un manuale antincendio domestico. Fonte: [FAA, SAFO 25002][FAA-FIRE].

### P10 — P1 · Le tensioni della batteria non sono valori universali da imparare a memoria

**Dove:** [cap. 2, riga 112](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:112), righe 124–125; cap. 7, riga 169; scheda rapida riga 120.

**Precisazione:** 3,7 V nominali e 4,2 V a piena carica sono un esempio comune, non una regola per ogni pacco. Esistono LiHV con tensioni massime diverse; la tensione sotto carico non coincide con quella a riposo e una soglia generica non garantisce autonomia di ritorno. Anche la conservazione dipende dal pacco e dal suo sistema di gestione.

**Correzione:** intitolare il paragrafo «Esempio: una LiPo convenzionale da 4,2 V/cella» e prescrivere caricatore, profilo, temperatura e limiti indicati dal fabbricante. «Entro la giornata» nella scheda rapida è inutilmente assoluto per pacchi con autoscarica programmata. Fonte: [manuale Gens Ace/Tattu LiHV][BATT-HV].

### P11 — P1 · Il diagramma «Posso volare?» dà risposte sbagliate o insufficienti

**Dove:** [flowchart, riga 31](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/flowchart-posso-volare.svg:31), righe 44–54 e 79–91; [schema categorie, riga 144](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/categorie-open.svg:144).

**Errori:** il flowchart ferma qualsiasi pilota senza A1/A3, anche quando l'attestato non è richiesto; il ramo «No» alla domanda peso/camera viene chiamato «giocattolo senza camera», ma non identifica tutti i casi possibili. Prima dell'esito «Vola» non verifica ammissibilità del drone nella sottocategoria, distanze da persone e aree, né limite strettamente inferiore a 25 kg. Lo schema delle classi scrive «attestato A1/A3 (salvo C0 senza camera)»: la presenza della camera non fa scattare l'esame per C0.

**Correzione:** distinguere «registrazione richiesta?» e «formazione richiesta per questa operazione?», verificare il ramo classe/legacy/autocostruito, poi zona, distanze e condizioni. L'esito positivo deve essere «I controlli indicati sono soddisfatti», senza promettere una validazione completa con quattro domande. Fonte: [2019/947, artt. 4, 14, 20 e parte A][EU947].

### P12 — P1 · Mancano i 60 minuti per informare ANSV

**Dove:** [cap. 5, riga 192](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:192); cap. 7, riga 195; scheda rapida, riga 87.

**Omissione importante:** le 72 ore per il reporting vengono ricordate; il distinto obbligo di informare ANSV per incidenti e inconvenienti gravi non ha invece un termine e viene associato genericamente a «feriti gravi o danni rilevanti». Un inconveniente grave può non avere feriti né danni.

**Correzione:** inserire due righe separate: segnalazione ENAC secondo il regime applicabile; comunicazione ANSV immediata e comunque entro **60 minuti dalla conoscenza dell'evento**, quando ricorre incidente o inconveniente grave. Usare le definizioni pertinenti e distinguere MOR/VOR; non presentare l'elenco divulgativo come tassativo. Fonti: [ANSV, modalità di segnalazione][ANSV], [ENAC, SPL-21][SPL21].

### P13 — P1 · Trasporto aereo delle batterie: numero, installazione e carica da correggere

**Dove:** [cap. 7, riga 177](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:177), tabella 7.2.

**Errori:** «senza limitazioni particolari di numero» sotto 100 Wh non riflette la guida IATA; «solo bagaglio a mano, mai in stiva» confonde ricambi con batterie installate. Il 30% è presentato come regola generale per il passeggero.

**Correzione:** per i ricambi ≤100 Wh, IATA indica normalmente un massimo di 20 batterie per persona, superabile con approvazione del vettore; per >100 e ≤160 Wh servono approvazione e limite specifico. I ricambi vanno in cabina, con terminali protetti. Le batterie installate seguono condizioni distinte. Presentare l'eventuale stato di carica ridotto come raccomandazione o requisito del vettore, non come obbligo universale dedotto dalle regole cargo. Verificare sempre le condizioni della compagnia. Fonte: [IATA, guida passeggeri 2026, tabella 1][IATA].

### P14 — P1 · La tabella radio suggerisce bande Wi-Fi non ammesse per UAS

**Dove:** [cap. 3, righe 64–65](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:64); [schema spettro, riga 53](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/spettro-radio.svg:53); spiegazione `spe-b5`.

**Errore:** l'accostamento «5,15–5,35 / 5,47–5,725 GHz: 200 mW indoor / 1 W con DFS» appare fra le bande usabili dai droni. La decisione 2022/179 distingue gli usi WAS/RLAN generali da quelli UAS: questi ultimi sono ammessi nella porzione **5170–5250 MHz**; l'uso UAS non è ammesso nella porzione **5470–5725 MHz** prevista dalla decisione. Il DFS non rimuove il divieto.

**Correzione:** separare «bande citate per confronto Wi-Fi» da «uso UAS consentito»; correggere insieme tabella, SVG e popup. La banda 5170–5250 MHz non è esclusivamente «dedicata ai droni»: è una porzione in cui è ammesso anche quello specifico impiego. Fonte: [decisione 2022/179 consolidata, allegato][RADIO5].

### P15 — P1 · Non è documentata l'esenzione assicurativa generale per i giocattoli

**Dove:** [cap. 5, riga 162](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:162) e sintesi riga 212.

**Errore di motivazione e verifica necessaria:** «giocattoli […] non rientrano nel regolamento» è falso come affermazione generale: il regolamento europeo contempla esplicitamente UAS C0 giocattolo e specifiche esenzioni. Non è corretto estendere automaticamente un'esenzione da registrazione o età all'assicurazione. L'art. 27 UAS-IT consultato non contiene questa esenzione espressa.

**Correzione:** togliere «giocattoli esclusi» finché non è accompagnato da un riferimento nazionale specifico e applicabile; mantenere distinta l'esclusione delle operazioni completamente indoor. Questo rilievo non afferma che qualsiasi oggetto giocattolo, in ogni contesto, sia soggetto a RC: contesta l'esenzione generale non dimostrata dal testo. Fonti: [UAS-IT, artt. 2 e 27][UASIT], [2019/947, art. 9 e art. 14][EU947].

## 2. Altre correzioni normative e procedurali

### N01 — P2 · Età minima: confusione tra categorie e sottocategorie

**Dove:** [cap. 4, riga 102](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:102); cap. 5, riga 101; scheda rapida, riga 59.

La riduzione nazionale massima è di quattro anni per **Open** e due per **Specific**, non quattro per A1/A3 e due per A2. Manca inoltre l'eccezione di età per UAS costruiti da privati con MTOM inferiore a 250 g. Precisare che le riduzioni nazionali valgono nel territorio dello Stato che le dispone; tenere separata la regola italiana. Fonte: [2019/947, art. 9][EU947].

### N02 — P2 · Registrazione: manca l'energia d'impatto e l'eccezione giocattolo si perde nei riepiloghi

**Dove:** [cap. 4, riga 80](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:80); cap. 5, riga 80; scheda rapida, righe 65 e 76; popup camera e C0.

L'art. 14 include anche la capacità di trasferire **oltre 80 J** in impatto. L'esenzione relativa al sensore per prodotti conformi alla direttiva giocattoli viene spiegata una volta e cancellata dalla formula «la camera obbliga comunque». Mettere la regola completa in un box, poi usare riepiloghi con rimando esplicito. Non suggerire che un giocattolo sia esente da ogni obbligo. Fonte: [2019/947, art. 14(5)][EU947].

### N03 — P2 · A2: i 5 metri non scattano solo perché esiste una modalità lenta

**Dove:** [cap. 4, riga 126](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:126); tabella 4.2; cap. 8, riga 79; scheda rapida, riga 36; popup A2.

La modalità deve essere **attiva**, non semplicemente disponibile; il pilota deve valutare meteo, prestazioni e segregazione dell'area. Scrivere «riducibile fino a 5 m con modalità lenta attiva e valutazione della situazione». Aggiungerei, distinguendola dal testo vincolante, la guida EASA sul rapporto tra altezza e distanza dalle persone. Fonte: [UAS.OPEN.030(1)][EU947].

### N04 — P2 · Due diversi riferimenti di altezza sono confusi

**Dove:** [cap. 4, riga 96](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:96), tabella C0 riga 190; cap. 8, riga 213; scheda rapida, riga 77.

«Punto più vicino della superficie terrestre» non equivale sempre a «suolo sotto il drone»: su pendii e pareti il punto più vicino può essere laterale. Inoltre il requisito di prodotto C0 limita l'altezza raggiungibile a 120 m **dal punto di decollo**; la tabella non deve aggiungere «o impostabile» come alternativa generica. Servono un piccolo disegno di pendio e due etichette: limite dell'operazione / limite tecnico del prodotto. Fonti: [UAS.OPEN.010][EU947], [EASA, C0 e limite di altezza][C0].

### N05 — P2 · Classi: correggere geo-awareness, C5 e confini numerici

**Dove:** [cap. 4, riga 181](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:181), tabella 4.3, riga 279; cap. 8, riga 158.

Non tutte le classi «da C1 in su» richiedono gli stessi sistemi: C4 è l'eccezione evidente; per C5/C6 la geo-awareness è facoltativa, con requisiti se installata. La C5 non ha un generico obbligo di geo-caging equivalente alla C6. Distinguere contenimento, terminazione del volo e avviso geografico. Nella C5 la modalità lenta richiesta, nei casi previsti, è ≤5 m/s; non eredita automaticamente il valore C2. Uniformare inoltre «fino a 25 kg» in **«meno di 25 kg»** quando questo è il limite. Fonte: [2019/945, allegato, parti 1–5, 16–17][EU945].

### N06 — P2 · Non ricavare prestazioni e impieghi commerciali dalla sola classe

**Dove:** [cap. 8, righe 56–86](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:56); cap. 5, riga 146; [schema spazio aereo, riga 84](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/spazio-aereo.svg:84).

«C0 autonomia breve», «C1 camera migliore», «C2 macchina da lavoro» sono tendenze commerciali, non caratteristiche determinate dalla classe. «In città sopra 900 g serve Specific» e «centro abitato: solo A1 con C0/C1» escludono erroneamente un C2 in A2 quando tutte le condizioni sono rispettate. C1 contempla inoltre l'alternativa del criterio energetico, già riportata dalla guida nella tabella dettagliata. Correggere le schede di scelta e lo schema urbano. Fonti: [parte A del 2019/947][EU947], [requisiti C1/C2][EU945].

### N07 — P2 · Autocostruiti: ripetere il limite di velocità e distinguere i kit

**Dove:** [cap. 4, riga 244](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:244); [cap. 8, riga 107](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:107); schema categorie e popup `cat-senza`.

Il requisito **<19 m/s** compare correttamente nella spiegazione estesa, ma scompare quando si consiglia il micro FPV <250 g per A1. È un'omissione rilevante proprio su mezzi veloci. Chiarire anche che assemblare un kit completo immesso sul mercato come unico prodotto pronto da montare non basta a ricadere nella definizione normativa di costruzione privata. Fonte: [art. 2(16), UAS.OPEN.020(5)(a)][EU947].

### N08 — P2 · A1/A3: costo e punteggio sono incoerenti

**Dove:** [cap. 4, riga 247](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:247); [cap. 5, riga 93](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:93).

L'attestato è detto «gratuito» nel cap. 4, mentre la procedura ENAC descritta nel cap. 5 costa 31 €. È gratuito il materiale didattico. Il test italiano richiede **60 punti su 80**, con +2 per risposta corretta, 0 omessa, −1 errata: 30 corrette e 10 errate danno 50 punti, quindi il 75% di risposte corrette non basta. Aggiungere anche i quattro tentativi associati al pagamento, se si vuole conservare il dettaglio procedurale. Fonte: [ENAC A1/A3][A1A3].

### N09 — P2 · A2: distinguere regola europea e procedura italiana

**Dove:** [cap. 4, riga 256](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:256); cap. 5, riga 97; glossario cap. 8, riga 137.

«L'esame A2 non è online» è sbagliato come regola europea: sono ammesse verifiche sorvegliate anche online. Questo **non** implica che la procedura ENAC descritta possa essere svolta da casa: la pagina ENAC consultata richiede la sede dell'entità riconosciuta. Non correggere quindi il cap. 5 trasformandolo in un esame domestico.

Aggiungere, per l'Italia, i **15 giorni** dal conseguimento A1/A3. La stessa pagina ENAC contiene un'incoerenza fra tre sessioni acquistate e un successivo riferimento a cinque tentativi: trattare quest'ultimo dettaglio come verifica aperta, non armonizzarlo per intuizione. Fonte: [ENAC A2][A2].

### N10 — P2 · Gli esempi introduttivi della Specific non dimostrano ciò che affermano

**Dove:** [cap. 6, riga 33](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/06-categoria-specific-e-prospettive.html:33).

Una ciminiera alta 150 m non richiede automaticamente Specific: la guida stessa spiega la deroga Open per ostacoli artificiali >105 m, con relative condizioni. Trasportare un campione medico non significa necessariamente sganciarlo; potrebbe essere consegnato dopo l'atterraggio. Inoltre il contenuto può essere merce pericolosa, da qualificare.

Sostituire con esempi univoci: BVLOS non coperto da un regime speciale; rilascio di materiale; operazione fuori dai requisiti Open senza possibilità di soddisfarne le eccezioni. Non promettere che «tutte queste operazioni sono possibili»: l'esito dipende dalla valutazione e dai permessi. Fonte: [artt. 4–6 e UAS.OPEN.010][EU947].

### N11 — P2 · Specific, STS e PDRA: evitare equivalenze automatiche

**Dove:** [cap. 6, righe 35 e 57](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/06-categoria-specific-e-prospettive.html:35); cap. 8, riga 47.

«Nella Specific non ci sono limiti prefissati» è eccessivo: STS e PDRA hanno condizioni precise; anche autorizzazioni e LUC hanno limiti. Nello scenario del viadotto, la presenza di una strada aperta non si risolve semplicemente scegliendo C5: occorre rendere effettivamente controllata l'area a terra e gestire gli utenti non coinvolti. Per una PDRA le competenze sono quelle previste dal percorso/autorizzazione, non un generico certificato STS sempre equivalente. «Specific senza autorizzazione» non descrive da sola un illecito, perché esistono dichiarazione STS e privilegi LUC. Fonte: [artt. 5, 7, 8 e appendice 1][EU947].

### N12 — P2 · Operazioni all'estero: notifica e conferma non sono intercambiabili

**Dove:** [cap. 6, riga 74](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/06-categoria-specific-e-prospettive.html:74), sintesi riga 104.

Per un'operazione Specific autorizzata occorre la procedura dell'art. 13, con conferma dello Stato ospitante sulle mitigazioni locali prima dell'avvio. Per gli STS si trasmettono copia della dichiarazione e della conferma di ricevimento/completezza dello Stato di registrazione. Non riassumere entrambi come «vale in tutta l'Unione con una notifica». La registrazione operatore, la competenza del pilota e l'autorizzazione di un'operazione sono tre cose diverse. Fonte: [2019/947, art. 13][EU947].

### N13 — P2 · U-space: ci sono eccezioni e l'annuncio non è una verifica operativa

**Dove:** [cap. 6, righe 84–90](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/06-categoria-specific-e-prospettive.html:84); [cap. 5, riga 202](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:202).

L'obbligo dei servizi U-space va accompagnato dalle esclusioni dell'art. 1 del 2021/664, fra cui specifiche operazioni leggere in A1 e aeromodellismo autorizzato. Non tutti gli operatori Open sono quindi nella medesima situazione. La frase «per chi vola Open non cambia nulla» è troppo ampia, anche se il testo poi precisa la rilevanza delle zone designate.

Ho riscontrato il comunicato ENAC che annuncia San Salvo dal 1º gennaio 2026; per affermarne lo stato operativo attuale servono anche designazione, condizioni e pubblicazioni pertinenti. Nel frattempo scrivere «ENAC ha annunciato…» e collegare il comunicato preciso, non la homepage. Fonti: [2021/664, art. 1][USPACE], [comunicato ENAC][SALVO].

### N14 — P2 · Privacy: il discrimine non è semplicemente hobby/lavoro

**Dove:** [cap. 5, righe 174–176](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:174) e sintesi.

La scrittura suggerisce «hobby → vademecum; lavoro → GDPR». L'esenzione riguarda attività **esclusivamente personali o domestiche**, non ogni uso gratuito o ricreativo. Il titolare del trattamento non coincide necessariamente con il pilota. L'informativa non si riduce a «quando è possibile darla» senza riferimenti alle condizioni applicabili; la DPIA dipende dal rischio elevato e dai casi previsti, non dalla sola etichetta professionale.

Riscrivere in tre passaggi: se si trattano dati personali; chi determina finalità e mezzi; quali obblighi/esenzioni si applicano. Tenere separati ripresa, conservazione e diffusione. Fonti: [GDPR, artt. 2, 4, 6, 13–14, 35][GDPR], [Garante droni][GARANTE].

### N15 — P2 · Sanzioni: le cifre e gli automatismi non sono sufficientemente documentati

**Dove:** [cap. 5, righe 184–187](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:184).

**Verifica aperta:** il testo qualifica in blocco le violazioni tipiche come amministrative, propone una fascia di importi e associa sequestro/confisca a fattispecie ampie senza citare gli articoli corrispondenti. L'art. 26 UAS-IT rinvia a più disposizioni e non sostiene una tariffa generale delle violazioni del principiante.

Toglierei gli ordini di grandezza non tracciati. Se si desidera conservarli, serve una tabella «condotta / norma violata / sanzione / eventuale misura accessoria / data», verificata giuridicamente. Sequestro cautelare e confisca non sono sinonimi. Una futura edizione UAS-IT non va descritta come se potesse da sola riscrivere qualsiasi sanzione di legge. Fonte: [UAS-IT, art. 26][UASIT].

### N16 — P2 · Parchi, Comuni e proprietà: distinguere i tipi di vincolo

**Dove:** [cap. 5, righe 128 e 148](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/05-volare-in-italia.html:128); cap. 7, didascalia riga 43 e riga 203.

La pagina ENAC consultata sostiene il riferimento a divieti di sorvolo dei parchi approvati e pubblicati su d-flight: non segnalo quella frase come falsa in sé. Il problema è dedurne «contano solo» quei vincoli, mentre altrove si parla genericamente di divieti locali assenti dalla mappa.

Separare restrizioni aeronautiche, accesso/decollo da un terreno, tutela della fauna, privacy e pubblica sicurezza. Il permesso del proprietario non autorizza lo spazio aereo; l'assenza di una zona UAS non risolve ogni questione relativa all'uso del luogo. Una telefonata al Comune non sostituisce la verifica dell'atto e dell'autorità competente. Fonti: [ENAC zone][ENAC-ZONE], [UAS-IT, art. 28][UASIT].

### N17 — P2 · «Danno trascurabile» sotto 250 g è una rassicurazione impropria

**Dove:** [cap. 4, riga 120](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/04-quadro-normativo-europeo.html:120); popup `cat-c0`.

Sostituire con «rischio generalmente inferiore, che giustifica requisiti meno onerosi». Il minor carico regolatorio non significa assenza di lesioni, in particolare da eliche o urti vulnerabili. La stessa guida calcola circa 28 J a 15 m/s: non c'è bisogno di aggiungere una soglia sanitaria arbitraria per spiegare perché «trascurabile» sia eccessivo. È una correzione di interpretazione del regime, non un nuovo limite di lesività. Fonte di contesto: [EASA C0][C0].

### N18 — P2 · Aggiungere tre distinzioni operative oggi troppo implicite

**Dove:** cap. 2, sezione 2.7; cap. 4, sezioni 4.4–4.5; glossario del cap. 8.

1. **Automatico / autonomo:** missioni a waypoint e RTH non significano necessariamente operazione autonoma; in Open il pilota deve poter intervenire nei termini previsti. Fonte: [EASA, GM a UAS.OPEN.060(2)(d)][EASA-OPEN].
2. **Persona avvisata / coinvolta:** il semplice annuncio del decollo non trasforma i presenti in persone coinvolte. Servono partecipazione consapevole, consenso e istruzioni adeguate al contesto; non basta che «sappiano del drone».
3. **Emergenze in corso:** aggiungere il divieto di volare vicino o dentro un'area di intervento senza permesso dei servizi responsabili. Non basta cedere il passo all'elicottero. Fonte: [UAS.OPEN.060(3)][EU947].

## 3. Tecnica e consigli di pilotaggio

### T01 — P2 · FPV non significa necessariamente acro

**Dove:** [cap. 2, riga 201](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:201); cap. 8, riga 107.

«Acro […] indispensabile per il volo FPV» confonde il modo di vedere con il modo di comandare. Si può volare in FPV in angle, horizon, position hold o altre modalità. Acro è adatto alle acrobazie senza autolivellamento, non un requisito del video in prima persona. Nella tabella precisare inoltre che lo stick del gas non segue necessariamente la descrizione degli assi di assetto e che acro non mantiene quota o posizione. Fonte: [Betaflight, modalità][BF-MODES].

### T02 — P2 · Perdita GNSS e mantenimento posizione dipendono dai sensori

**Dove:** [cap. 2, righe 149–161](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:149); cap. 3, riga 127; cap. 7, riga 130; popup `anq-gnss`.

La guida spiega correttamente l'optical flow e poi afferma che senza satelliti il drone non tiene la posizione e passa sempre al solo assetto. È una contraddizione. Il degrado dipende da disponibilità e qualità delle altre stime e dalla logica del firmware. Scrivere «può perdere il mantenimento della posizione o cambiare modalità: conosci il comportamento del tuo modello». Il punto home non viene necessariamente cancellato quando manca il fix: può diventare indisponibile la navigazione necessaria per raggiungerlo. Fonte: [ArduPilot, FlowHold][AP-FLOW].

### T03 — P2 · La latenza analogica non è inferiore a un millisecondo da lente a schermo

**Dove:** [cap. 3, righe 95 e 104–110](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:95), sintesi riga 158.

La didascalia dichiara misure «da vetro a vetro», ma la tabella assegna all'analogico meno di 1 ms. Il tratto radio analogico aggiunge poco ritardo; sensore, elaborazione, scansione e display ne aggiungono altro. Esistono camere analogiche con latenza dichiarata di 6 ms già da sole. Correggere in «bassa, dipendente da camera e display» oppure inserire intervalli provenienti da misure comparabili. Anche 15–35 ms non rappresenta tutti i link digitali consumer. Fonte primaria di controesempio: [RunCam Racer 3][RUNCAM].

### T04 — P2 · Il video FPV non «tollera meglio» un'interruzione senza condizioni

**Dove:** [cap. 3, riga 34](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:34), righe 95–114.

Per un pilota che conduce il mezzo usando l'immagine, perdere il video può essere immediatamente critico. Distinguere ripresa con pilotaggio VLOS da pilotaggio FPV. Anche «l'immagine analogica resta leggibile fino all'ultimo» è una promessa eccessiva, e un sistema digitale può degradare visibilmente prima del blocco. La colonna «banda occupata» confronta inoltre una larghezza di canale con «pacchetti compressi» e «Wi-Fi standard»: sono grandezze diverse. Dividere tecnologia, qualità, ritardo e larghezza di banda.

### T05 — P2 · Remote ID: un codice pubblico non è il nome del pilota, né ogni telefono riceve tutto

**Dove:** [cap. 3, righe 36 e 135](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:135); cap. 4, righe 270–274; glossario; schema `remote-id`.

«Uno smartphone […] li riceve tutti» è falso: trasporti radio ricevibili, permessi, chipset e sistema operativo variano. La documentazione OpenDroneID esplicita limitazioni e dispositivi provati. Inoltre il broadcast del numero operatore non rende automaticamente pubblici nome, recapiti e anagrafica del registro.

Scrivere «Ricevibile da dispositivi compatibili tramite un'app; trasmette identificativi e dati operativi. La risoluzione dell'identificativo nei dati personali del registro è distinta». Non equiparare identità dell'operatore e identità del pilota. Fonti: [OpenDroneID Android][ODID], [2019/945, requisiti identificazione diretta][EU945].

### T06 — P2 · Tabella SRD: norme di prodotto e autorizzazione d'uso vanno separate

**Dove:** [cap. 3, righe 49–79](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:49).

Le norme armonizzate ETSI non sono da sole il provvedimento che rende utilizzabile una frequenza; una raccomandazione CEPT non sostituisce le condizioni applicabili nel Paese. Per ogni riga indicare intervallo, categoria di apparato, ERP/EIRP, densità spettrale se pertinente, occupazione del canale, eventuali alternative di accesso e ammissibilità airborne. Per 433/868 MHz la tabella attuale è troppo compressa per servire da istruzione di configurazione.

Non basta scegliere il dominio «EU 868» nel firmware: ExpressLRS stesso distingue conformità delle frequenze da LBT. Presentare i valori come orientamento, rimandando alla dichiarazione di conformità del prodotto e alle condizioni nazionali. Fonti: [CEPT ERC 70-03][CEPT], [ExpressLRS, user defines][ELRS].

### T07 — P2 · «I 915 MHz non esistono in Europa per gli SRD» è troppo assoluto

**Dove:** [cap. 3, riga 71](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:71), sintesi; schema spettro e popup 868.

Esistono disposizioni UE per specifici impieghi SRD nella banda 915–921 MHz. Ciò non rende utilizzabile in Italia un radiocomando configurato per la banda statunitense 902–928 MHz, né autorizza automaticamente l'uso su drone.

La correzione utile è: «La configurazione statunitense 902–928 MHz non va usata presumendo che sia compatibile con le regole europee. Le assegnazioni europee in parte sovrapposte hanno destinazioni e condizioni diverse». Evitare anche di dedurre la conformità dal solo numero commerciale del modulo. Fonte: [decisione 2018/1538][RADIO915].

### T08 — P2 · Canali analogici: mancano i limiti sulla frequenza effettivamente occupata

**Dove:** [cap. 3, riga 95](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:95).

La guida elenca canali fra 5,6 e 5,9 GHz subito dopo aver dato la banda 5,725–5,875 GHz, senza avvertire che non tutti i canali disponibili nel menu sono utilizzabili. Chiarire che rispettare 25 mW non basta: contano anche frequenza, larghezza di emissione e conformità dell'apparato. Non proporrei una lista universale di canali «legali» senza verificarne gli specifici parametri. L'errore è già visibile nel confronto tra gli intervalli del testo; il riferimento tecnico è [CEPT ERC 70-03][CEPT].

### T09 — P2 · GNSS: numero di satelliti e Kp non sono semafori di sicurezza

**Dove:** [cap. 3, riga 127](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/03-radio-video-telemetria.html:127); cap. 7, righe 53 e 64; sintesi dei due capitoli.

«Almeno dieci satelliti» non garantisce precisione: contano geometria, qualità dei segnali, stima d'errore e controlli del sistema. Kp 4–5 non implica universalmente fix instabile o errore di bussola: è un indice planetario, non una misura locale della qualità GNSS. Mantenere l'avvertenza sul meteo spaziale, evitando una soglia automatica non documentata. Dare priorità ad avvisi di navigazione, correttezza del punto home e condizioni del sito. Fonti: [NOAA, indice Kp][KP], [NOAA, contenuto elettronico totale][TEC].

### T10 — P2 · Batterie: «due chimiche», «energia doppia» e C-rating richiedono revisione

**Dove:** [cap. 2, righe 110 e 116](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:110), tabella 2.2; popup batteria; glossario LiPo.

Il confronto mescola famiglia elettrochimica, formato e ottimizzazione della cella: LiPo e Li-ion cilindrica non sono due categorie contrapposte sufficienti a dedurre un rapporto fisso 2:1 di energia. Esistono celle cilindriche ad alta potenza: una P45B dichiara 4,5 Ah e 45 A di scarica continua, quindi non semplicemente «pochi C» in ogni caso. Il C-rating può essere continuo o di picco; non è sempre «misurato per pochi secondi».

Confrontare dati di celle/pacchi specifici e distinguere energia specifica, resistenza, corrente continua e burst, temperatura e durata della misura. Fonti: [Molicel P45B][MOLICEL], [GensTattu, C-rating continuo e burst][BATT-C].

### T11 — P2 · Il capitolo sul controllo trasforma una possibile architettura in una regola universale

**Dove:** [cap. 2, righe 147–165](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:147).

Non tutti i flight controller sono schede da circa 36 mm, usano lo stesso tipo di filtro o fanno girare PID e sensori alla stessa frequenza. «Non serve potenza di calcolo» è una falsa alternativa: servono risorse sufficienti e rispetto dei tempi. Ultrasuoni, ToF e visione stereoscopica non hanno lo stesso principio né le stesse sensibilità ambientali.

Introdurre «Una configurazione comune nel mondo FPV…» e «Un autopilota di navigazione può usare…». Separare controllo d'assetto e navigazione. Evitare «senza elettronica non resta in aria un secondo»: spiega l'assenza di autostabilizzazione senza attribuire una durata fisica universale. Per esempi concreti: [Betaflight modes][BF-MODES], [ArduPilot FlowHold][AP-FLOW].

### T12 — P2 · Dettagli di propulsione da rendere tecnicamente più precisi

**Dove:** [cap. 2, righe 68–87](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:68), riga 174; cap. 1, riga 63.

| Passaggio | Correzione proposta |
|---|---|
| «La costante di coppia è l'inverso» del KV espresso in rpm/V | Esplicitare conversione di unità e convenzioni: nel modello ideale coerente, `Kt = 60 / (2π Kv)` in N·m/A. Non far usare letteralmente `1/Kv` con quelle unità. |
| «un motore da 5 pollici» | «un motore per un'elica da 5 pollici». |
| ESC dimensionato «sui picchi» | Verificare anche corrente continua, durata del burst, raffreddamento, tensione e margine termico. |
| DShot trasporta un «valore di spinta» | È un comando throttle/comando speciale, non una misura diretta della spinta. La telemetria eRPM richiede l'interpretazione del numero di poli. |
| Mozzi «filettati di conseguenza» | Non è universale: esistono fissaggi a viti, autobloccanti e sganci rapidi. Rimandare alla specifica elica/motore. |
| Imbardata: accelerare e rallentare «della stessa quantità» conserva la spinta | Presentarlo come schema qualitativo: poiché la spinta dipende approssimativamente dal quadrato dei giri, uguali incrementi di rpm non garantiscono somma identica delle spinte. |
| Brushless «senza parti che si consumano» | «Senza spazzole soggette a usura»; cuscinetti e parti meccaniche si usurano. |

I rilievi su formule e causalità sono precisazioni del modello fisico; per la parte di protocollo la fonte è [Betaflight DShot][DSHOT]. Le leggi di scala delle eliche già riportate sono utili: aggiungere che il confronto presuppone coefficienti e condizioni aerodinamiche comparabili.

### T13 — P2 · Percentuali di batteria e metà velocità massima non bastano a pianificare

**Dove:** [cap. 7, righe 49 e 114](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:49); cap. 8, riga 97.

Sono euristiche, ma lo scenario le usa quasi come criteri sufficienti: «raffiche sotto metà, quindi il volo regge»; rientro al 25–30%; autonomia dichiarata meno un quarto. Un volo lontano controvento può richiedere di rientrare molto prima. La velocità massima dichiarata può riferirsi a una modalità differente da quella impiegata.

**Proposta editoriale operativa:** partire dai limiti del manuale, ridurli per esperienza e condizioni, valutare tratta di ritorno e aree alternative e mantenere una riserva. Le percentuali possono restare come esempio per un breve esercizio vicino, non come soglia generale. Non sostituirei quelle percentuali con un'altra regola numerica universale.

### T14 — P2 · Prove motori e antenne: due istruzioni ambigue da rendere sicure

**Dove:** [cap. 7, righe 96 e 124](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:96).

Separare test al banco di configurazione, da eseguire senza eliche secondo la procedura del costruttore, dai normali controlli pre-decollo nell'area sgombra. «Prova comandi a terra: risposta dei motori, escursione degli stick» non deve invitare un neofita a muovere liberamente il gas con eliche montate.

«Alza l'antenna verso il drone» può essere interpretato come puntare la punta di uno stilo, spesso direzione sfavorevole. Scrivere «orienta le antenne secondo il diagramma e le istruzioni del radiocomando»: una patch e uno stilo non si orientano nello stesso modo. È una correzione dell'ambiguità operativa, non una nuova procedura valida per ogni radio.

## 4. Forma, struttura e apparato editoriale

### F01 — P3 · Ridurre il tono paternalistico e le statistiche senza fonte

**Dove:** [introduzione, riga 26](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/00-introduzione.html:26); cap. 1, riga 158; cap. 7, riga 32; cap. 5, riga 187.

Espressioni come «quasi tutti entrano da quella sbagliata», «la maggior parte dei voli finiti male», «quasi tutte le violazioni» fanno sembrare documentati giudizi che non hanno dati. Proposta: «È facile comprare un drone prima di conoscerne i limiti. Questa guida mette le regole e la preparazione prima del primo volo». Il tono resta diretto, ma non rimprovera il lettore né simula statistiche.

### F02 — P3 · Eliminare assoluti e superlativi non necessari

**Dove:** [cap. 2, righe 213–215](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:213); cap. 7, righe 120, 163 e 205; cap. 8, righe 91 e 111.

Da rivedere: «un'integrazione che nessun assemblaggio raggiunge», «costa quanto un'elica», «l'evento più comune e il meno grave», «l'unica ricostruzione seria», «oggi e per sempre», «la palestra più economica che esista». Sostituire con il vantaggio concreto o eliminare la frase. «Se qualcuno ti chiede di smettere, smetti» va presentato come consiglio di convivenza, non obbligo giuridico universale o invito a interrompere bruscamente una manovra.

### F03 — P3 · Rendere visibile la differenza fra obbligo, consiglio ed esempio

**Dove:** trasversale, soprattutto capp. 7–9.

I box attuali distinguono il tipo di testo ma non sempre il valore dell'istruzione. Adotterei tre formulazioni riconoscibili: «Devi…» con riferimento per gli obblighi; «Per i primi voli consiglio…» per le cautele; «In questo esempio supponiamo…» per valori illustrativi. Esempi da riclassificare: A1/A3 consigliato per C0, simulatore 20–30 ore, registro voli Open, batterie a metà carica, sopralluogo diurno.

### F04 — P3 · Definire il drone assunto dagli esercizi pratici

**Dove:** [cap. 7, apertura](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/07-volare-in-pratica.html:14); [cap. 8, riga 43](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:43).

Checklist con gimbal, GNSS, SD e RTH presuppongono un multirotore stabilizzato con camera. Dichiararlo prima e marcare «se presente» dove necessario. Prevedere un riquadro di differenze per FPV/autocostruito. Evita che il lettore cerchi funzioni inesistenti o applichi una procedura del consumer a un mezzo acrobatico.

### F05 — P3 · La parte tecnica passa continuamente dal consumer all'FPV

**Dove:** capp. 1–3, specialmente cap. 2, sezioni 2.2–2.5.

Per un neofita, telaio in carbonio, formato 2207, DShot, Cortex-M, gimbal e smart battery possono sembrare componenti standard di ogni drone. Mantenere i dettagli, adatti al destinatario, ma usare due esempi dichiarati: **multirotore integrato per riprese** e **quadricottero FPV assemblato**. Un confronto iniziale rende più facili le eccezioni e riduce la necessità di ripetere «sui consumer» a metà spiegazione.

### F06 — P3 · I tempi di lettura e il piano settimanale non concordano

**Dove:** [introduzione, righe 69–85](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/00-introduzione.html:69); cap. 8, righe 32–43; schema percorso.

Il percorso completo promette circa sei ore, quello tecnico due e quello normativo due ore e mezza; la settimana 1 chiede però di leggere i capitoli 1–4 «con calma» dentro un piano da un paio d'ore settimanali. Sono già circa 14.000 parole, più schemi e assimilazione. Distinguere **lettura** e **studio**, esplicitare che le quattro settimane sono un esempio e dare carichi coerenti. Eviterei anche «con i capitoli 4 e 5 alle spalle [l'esame] non è difficile»: la guida non sostituisce il syllabus.

### F07 — P3 · Registrazione e polizza prima dell'acquisto: anticipare lo studio, non ogni spesa

**Dove:** [cap. 8, righe 32–42](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:32).

Il piano impone registrazione, attestato e polizza prima di sapere quale mezzo si userà. Meglio: capire l'operazione, scegliere il ramo normativo, studiare, verificare coperture e poi attivare gli adempimenti pertinenti prima del volo. La polizza può dipendere da mezzo e impiego; l'attestato può essere una scelta formativa consigliata. Segnalare anche che «con qualcuno che guarda il cielo per te» non trasferisce genericamente a un amico tutti gli obblighi del pilota.

### F08 — P3 · Uniformare la terminologia senza sostituire il lessico del settore

**Dove:** glossari dei capp. 0 e 8 e testo generale.

Preferire «videocamera/fotocamera» alla prima occorrenza, poi «camera» se desiderato; «controllore di volo (flight controller)»; «ritorno automatico al punto home (RTH)» e usare sempre la stessa forma. Distinguere «classe di prodotto», «categoria operativa», «sottocategoria», «attestato A1/A3» e «certificato A2». «Patentino» può essere registrato come uso comune, non titolo ufficiale.

La definizione UAS va presentata come schema didattico tipico: non tutti i sistemi hanno video, telemetria bidirezionale e stazione letteralmente a terra. Evitare «drone non compare nei testi normativi» e «agli Stati restano […] poco altro»: sono affermazioni assolute non utili alla comprensione.

### F09 — P3 · Glossario e acronimi devono spiegare, senza introdurre nuove regole abbreviate

**Dove:** [cap. 8, righe 115–240](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/08-percorso-e-appendici.html:115).

Correggere le voci MTOM, legacy, geo-caging, A2, Remote ID e LiPo secondo i rilievi precedenti. «BVLOS: solo in Specific» trascura Certified e altri regimi pertinenti: usare «tipicamente richiede un percorso fuori dalla Open ordinaria». «AGL» non è l'esatta formulazione del limite dei 120 m. AMC e GM non sono entrambi semplici «linee guida»: distinguere mezzi accettabili di rispondenza e materiale esplicativo, senza equipararli al regolamento.

Rivedere anche l'espansione di NOTAM: «Notice To Air Missions» è una scelta terminologica statunitense, non un'espansione internazionale da imporre al contesto ENAV senza fonte. È sufficiente «avviso aeronautico con informazioni operative temporanee».

### F10 — P3 · Le date di verifica devono avere un oggetto preciso

**Dove:** intestazioni dei capitoli, in particolare [cap. 2, riga 30](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/02-anatomia-e-funzionamento.html:30); introduzione, riga 170; cap. 8, riga 274.

«Fonti normative verificate» in un capitolo prevalentemente tecnico non dice cosa sia stato verificato; «tutti i collegamenti verificati» non equivale a contenuti aggiornati. Separare data dell'edizione, revisione normativa e revisione tecnica. Per ogni dato volatile conservare atto/versione, paragrafo, URL e data di consultazione. Togliere le previsioni «non ci sono segnali che cambieranno» e «resterà il tuo terreno per molto tempo», che aggiungono una promessa senza utilità operativa.

### F11 — P3 · Collegare le fonti al punto che dimostrano

**Dove:** sezioni Fonti dei capp. 3–6 e 8.

Le homepage ETSI, ENAV, EASA e comunicati ENAC costringono a ripetere la ricerca. Inserire collegamenti al documento/versione e, quando possibile, al paragrafo. In fondo a ogni tabella normativa aggiungere «Fonte: atto, articolo/punto, versione consultata». La raccolta EASA è periodicamente aggiornata: non chiamarla aggiornata automaticamente «a ogni modifica» senza controllarne l'edizione. La revisione trovata è quella di giugno 2026, mentre alcuni collegamenti indicizzati riportano ancora luglio 2024.

### F12 — P2 · I crediti fotografici non sono completi nella pubblicazione

**Dove:** didascalie fotografiche, ad esempio [cap. 1, riga 102](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/01-cos-e-un-drone.html:102); dati in [crediti.json](/Users/stefanotedeschi/Documents/guida-droni/src/img/foto/crediti.json).

Il JSON conserva autore, pagina originale e URL della licenza, ma nelle didascalie pubblicate restano solo nome, sigla e «via Wikimedia Commons». Nella pagina generata non ho trovato link a Commons né alle licenze Creative Commons. Inserire link all'opera e alla licenza; mantenere l'indicazione di ritaglio/modifica e gli altri elementi richiesti dalla specifica licenza. Per la stampa prevedere un indice crediti finale con URL utilizzabili. Fonte: [CC BY-SA 4.0, attribuzione e indicazione delle modifiche][CC]. Questo non è un audit della titolarità di ogni fotografia.

### F13 — P3 · Indice, conteggio capitoli e sintesi non sono uniformi

**Dove:** [introduzione, righe 16 e 48](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/00-introduzione.html:16); chiusura del cap. 8.

«Nove capitoli» è comprensibile contando 00–08, ma il percorso dice «dal capitolo 1 all'8» e poi compare un file 09 per la scheda. Preferire «Introduzione, otto capitoli e scheda rapida». L'introduzione promette una sintesi per ogni capitolo; 00 e 08 non hanno `section.sintesi`, mentre la guida di stile la prescrive. Aggiungere la sintesi dove aiuta, oppure esplicitare che introduzione e appendici seguono una struttura diversa.

### F14 — P3 · Le 81 pagine rispettano il massimo, ma si può ridurre la ridondanza

**Dove:** struttura complessiva e [documento di progetto](/Users/stefanotedeschi/Documents/guida-droni/docs/2026-09-20-progetto-guida-droni.md).

Pagine effettive per file: 00 **6**, 01 **8**, 02 **11**, 03 **8**, 04 **12**, 05 **11**, 06 **6**, 07 **9**, 08 **8**, scheda **2**. Il totale è 81 contro 67 indicative nell'indice di progetto, pur sotto il massimo 90.

Taglierei prima le ripetizioni normative nelle introduzioni, i giudizi retorici e parte delle prospettive di settore; manterrei condizioni ed eccezioni operative. Eviterei di recuperare spazio diminuendo il carattere: si perderebbe più leggibilità di quanta concisione si guadagni. L'introduzione di sei pagine è la prima candidata a un alleggerimento.

### F15 — P3 · Impaginazione buona nel campione, con alcuni affinamenti concreti

**Dove:** PDF cap. 4, pagine 4–5; scheda rapida, pagine 1–2.

Nel campione non ho osservato testo tagliato o sovrapposizioni. Titoli, box e tabelle hanno gerarchia leggibile. La scheda lascia ampio spazio bianco nella prima pagina: si può usarne una parte per luce notturna, condizioni di esenzione e distinzione fra quote senza rimpicciolire il testo.

Ridurre la sillabazione in metadati brevi, date e nomi tecnici; per esempio «set-tembre» in apertura della scheda distrae. Nel diagramma di pagina 2 i rami «gialla/con vincoli» terminano senza ricongiungersi ai controlli successivi: oltre al problema normativo, manca una conclusione grafica chiara. Didascalie e fonti andrebbero tenute vicine all'elemento cui si riferiscono. Non estendo questo giudizio alle pagine non esaminate visivamente.

### F16 — P3 · I rimandi dovrebbero portare alla sezione, non solo al capitolo

**Dove:** HTML generale e rimandi «capitolo 4», «capitolo 5», «capitolo 7» nei sorgenti.

Il controllo degli anchor esistenti non ha trovato destinazioni mancanti. Resta però un miglioramento editoriale: collegare i rimandi alla sezione precisa, con numero e titolo comprensibili anche su PDF. Per una lettura non lineare sono particolarmente importanti «massa e accessori», «formazione», «zone» e «perdita del link». Valutare inoltre una gerarchia di titoli coerente nella pagina unica, che oggi raccoglie 11 `h1`; non è da solo un errore di accessibilità, ma rende meno evidente il rapporto fra titolo dell'opera e capitoli.

### F17 — P3 · Le immagini devono chiarire anche i limiti dell'esempio

**Dove:** [cap. 1, riga 134](/Users/stefanotedeschi/Documents/guida-droni/src/capitoli/01-cos-e-un-drone.html:134); [schema spazio aereo, righe 29–33](/Users/stefanotedeschi/Documents/guida-droni/src/img/schemi/spazio-aereo.svg:29).

La fotografia di irrorazione agricola merita una nota: illustra un impiego specialistico, non un'attività consentita dal normale percorso Open. Lo schema che colloca il traffico con equipaggio sopra la fascia 120 m può suggerire una separazione garantita: aggiungere un elicottero anche sotto tale fascia e chiarire che non è spazio riservato ai droni. La didascalia «sopra la fascia c'è il traffico con equipaggio» va corretta nello stesso senso.

### F18 — P3 · Uniformare le microconvenzioni della guida di stile

**Dove:** tabelle e glossari; capp. 0–3.

Applicare sistematicamente spazio non separabile fra valore e unità, simbolo × per moltiplicazione/dimensioni quando appropriato, virgola decimale e una grafia coerente per d-flight. Il cap. 2 usa anche «20.000» e «39.000» coerentemente con il criterio sulle migliaia, ma gli esempi tecnici con `5x4,3x3` andrebbero esplicitati come sigla commerciale e non notazione fisica.

La policy «nessuna marca, modello o prezzo» è già in tensione con Crossfire, Semtech, software e tariffe obbligatorie. La riformulerei: niente consigli commerciali o confronti di acquisto; nomi di protocolli, progetti tecnici e costi amministrativi ammessi quando necessari. Così non si elimina informazione utile solo per obbedire letteralmente a una regola troppo ampia.

## 5. Passaggi che conserverei

- La distinzione fra **operatore** e **pilota remoto**, corretta come impianto e ripetuta utilmente; evitare solo di far coincidere sempre operatore e proprietario.
- La scelta di spiegare le categorie attraverso il **rischio dell'operazione**, senza dividere automaticamente hobby e professione.
- L'avvertenza che **sotto 250 g non significa senza regole**, da mantenere con le esenzioni corrette.
- La centralità di **VLOS**, assembramenti e precedenza agli aeromobili con equipaggio.
- Il calcolo energetico della batteria **14,8 V × 1,5 Ah = 22,2 Wh** e l'esempio di autonomia a 250 W: i numeri tornano, purché restino teorici.
- La spiegazione di giri, spinta e coppie contrapposte del quadricottero, con le precisazioni del rilievo T12.
- L'esempio **25 mW EIRP con antenna da 5 dBi ≈ 8 mW al connettore**, se si esplicita che si trascurano le perdite; nella formula ERP/EIRP scrivere chiaramente le unità logaritmiche, per esempio `ERP[dBm] = EIRP[dBm] − 2,15 dB`.
- La raccomandazione di controllare le zone **ogni volta**, verificando anche orari e tutta l'area di volo.
- I consigli su batterie gonfie, carica sorvegliata, conservazione dei log e formazione al simulatore, qualificati per modello e contesto.

Non trasformerei la panoramica Specific in un manuale SORA. È sufficiente correggere gli esempi e spiegare che competenze, limiti e documentazione dipendono dal percorso scelto. Eviterei anche stime come «SAIL II in poche decine di pagine»: il numero di pagine non misura la robustezza delle evidenze.

## 6. Esempi di riscrittura pronti da adattare

### Apertura dell'introduzione

> Un drone è insieme un aeromobile, un sistema elettronico e un apparato radio. Per usarlo servono competenze su tutti e tre gli aspetti. Questa guida parte dal funzionamento della macchina, spiega le regole europee e italiane e le traduce nei controlli da fare prima, durante e dopo il volo.

### Peso e marcatura

> La massa massima al decollo, o MTOM, è il limite stabilito dal fabbricante o costruttore, comprensivo del carico utile. La massa effettiva dipende dalla configurazione con cui voli: batteria, protezioni e accessori contano. Verifica entrambe. Superare un limite non assegna automaticamente al drone una classe diversa e non lo rende automaticamente utilizzabile come legacy.

### Notte

> In Open puoi volare di notte se rispetti anche le condizioni previste per quel volo, compresa una luce verde lampeggiante attiva. Il requisito riguarda l'operazione, non soltanto alcune classi di prodotto. Prima verifica che l'eventuale luce aggiunta sia compatibile con massa, configurazione e istruzioni del drone.

### Perdita del collegamento

> Prima del decollo verifica quale azione eseguirà il drone se perde il comando radio. Il ritorno automatico è una delle possibilità, non una garanzia. Se il collegamento si interrompe, mantieni acceso il radiocomando, osserva il mezzo e applica la procedura del manuale. Quando riprendi il controllo, valuta se completare il rientro automatico o atterrare manualmente.

### Registrazione d-flight

> Quando è richiesta, la registrazione riguarda l'operatore. Il QR identificativo dell'operatore è unico e si applica agli UAS con cui opera. I QR UAS per il singolo drone sono prodotti distinti, indicati come facoltativi nel listino d-flight consultato. Controlla quale servizio stai attivando prima di acquistare crediti.

## 7. Ordine consigliato per la revisione

1. **Correggere P01–P15**, comprese tutte le repliche in schemi, popup, glossario, sintesi e scheda rapida.
2. **Consolidare le regole in un'unica base editoriale**: non necessariamente software nuovo, ma almeno una tabella di controllo che associ ogni regola alle sue ripetizioni e alla fonte.
3. **Correggere N01–N18 e T01–T14**, mantenendo una distinzione esplicita tra regola, implementazione del prodotto ed euristica.
4. **Rivedere forma e carico didattico**, partendo da introduzione, transizioni consumer/FPV e piano delle quattro settimane.
5. **Completare fonti e crediti**, con documenti puntuali e collegamenti alle licenze.
6. **Rigenerare HTML e PDF e rileggerli come pubblicazioni autonome**. Controllare il PDF completo pagina per pagina, la scheda rapida stampata e i popup HTML; non basta rileggere i sorgenti.

### Casi minimi con cui ricontrollare la guida corretta

| Caso | Domanda che il testo deve risolvere senza contraddirsi |
|---|---|
| C0 con camera | Registrazione e formazione vengono tenute distinte? |
| C0 con luce/accessorio | Il testo evita il passaggio automatico a «legacy A3»? |
| FPV privato <250 g ma veloce | Compare il limite di velocità per A1? |
| Drone senza classe immesso sul mercato dopo il 2023 | Il diagramma evita di ammetterlo automaticamente in Open? |
| C2 in città | Viene valutata A2, anziché imporre Specific solo per il peso? |
| Zona rossa non-safety | Si legge la condizione specifica della zona? |
| Notte con legacy leggero | Compare la luce verde? |
| RTH con ostacolo sopra il tetto della zona | Il testo porta a ripianificare anziché alzare comunque la quota? |
| Perdita RC su FPV senza RTH | La checklist non promette il ritorno? |
| Inconveniente grave senza danni | Compare il percorso ANSV e il termine appropriato? |
| Batterie di ricambio in aereo | Sono distinti quantità, Wh, approvazione e bagaglio? |

## 8. Limiti e punti da documentare prima della nuova edizione

- **Sanzioni:** non è validata la fascia economica né la corrispondenza automatica fra condotta e confisca proposta dalla guida; vale N15.
- **San Salvo e prospettive:** verificato l'annuncio ufficiale, non svolta una verifica operativa dello spazio U-space via AIP/NOTAM e servizi attivi.
- **Radio sub-GHz:** individuate semplificazioni e verificati riferimenti ufficiali, ma non certificata ogni combinazione banda/apparato/firmware/uso airborne della tabella. Non usare il report come tabella sostitutiva di configurazione.
- **Standard Remote ID:** verificati regolamento e limitazioni dell'implementazione OpenDroneID; non effettuata una verifica integrale del testo commerciale EN 4709-002 né di un prodotto concreto.
- **Reporting 2026:** le fonti ENAC reperite includono un documento SPL-21 e una pagina eventi con riferimenti aggiornati. Prima di fissare l'elenco nella guida, riportare atto e decorrenza precisi, distinguendo il regime applicabile e le definizioni. Il termine ANSV è invece supportato direttamente dalla sua pagina istituzionale.
- **Link esterni e immagini:** controllate le fonti usate nel report e la struttura degli anchor locali, non tutti i link esterni né ogni licenza fotografica individuale.
- **Impaginazione:** giudizio visivo limitato alle quattro pagine dichiarate, non all'intera pubblicazione.

## Fonti primarie richiamate

I link seguenti rendono verificabili i rilievi. Gli articoli e i punti da leggere sono indicati nelle singole voci; una fonte generale non va interpretata come sostegno di ogni frase della guida.

[EU947]: https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:02019R0947-20250501
[EU945]: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02019R0945-20250624
[EASA-OPEN]: https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-unmanned-aircraft-systems?erules-id=ERULES-1963177438-19528
[C0]: https://www.easa.europa.eu/en/document-library/general-publications/drones-class-0-basics-and-height-limit-120-m
[UASIT]: https://www.enac.gov.it/app/uploads/2024/04/Regolamento_UAS-IT080121.pdf
[ENAC-ZONE]: https://www.enac.gov.it/sicurezza-aerea/droni/zone-geografiche-space/voli-con-droni-uas-limitazioni-riserve-dello
[DF-FAQ]: https://www.d-flight.it/new_portal/faq/
[DF-QR]: https://www.d-flight.it/store/index.php?path=59&route=product%2Fcategory
[A1A3]: https://www.enac.gov.it/sicurezza-aerea/droni/piloti-uas/come-si-diventa-pilota-uas-drone-open-a1a3/
[A2]: https://www.enac.gov.it/sicurezza-aerea/droni/come-si-diventa-pilota-uas-drone-open-a2/
[ANSV]: https://ansv.it/le-modalita-di-segnalazione/
[SPL21]: https://www.enac.gov.it/app/uploads/2026/06/SPL-21-Droni-segnalazioni-inconvenienti.pdf
[USPACE]: https://eur-lex.europa.eu/eli/reg_impl/2021/664/oj/eng
[SALVO]: https://comunicati.enac.gov.it/it/announcement/show/enac-da-gennaio-2026-lancia-il-primo-u-space-europeo-nonostante-la-sospensione-del-progetto-amazon-prime-air-in-italia
[GDPR]: https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita
[GARANTE]: https://www.garanteprivacy.it/temi/droni
[IATA]: https://www.iata.org/contentassets/6fea26dd84d24b26a7a1fd5788561d6e/passengers_travelling_with_lithium_batteries.pdf
[FAA-FIRE]: https://www.faa.gov/other_visit/aviation_industry/airline_operators/airline_safety/safo/all_safos/SAFO25002.pdf
[RADIO5]: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02022D0179-20221125
[RADIO915]: https://eur-lex.europa.eu/eli/dec_impl/2018/1538/oj/fin
[CEPT]: https://docdb.cept.org/download/4820
[ELRS]: https://www.expresslrs.org/software/user-defines/
[ODID]: https://github.com/opendroneid/receiver-android
[KP]: https://www.spaceweather.gov/products/planetary-k-index
[TEC]: https://www.spaceweather.gov/phenomena/total-electron-content
[AP-FAIL]: https://ardupilot.ardupilot.org/copter/docs/failsafe-landing-page.html
[AP-RTL]: https://www.ardupilot.ardupilot.org/copter/docs/rtl-mode.html
[AP-FLOW]: https://www.ardupilot.ardupilot.org/copter/docs/flowhold-mode.html
[BF-MODES]: https://betaflight.com/docs/wiki/guides/current/Modes
[DSHOT]: https://betaflight.com/docs/development/API/Dshot
[RUNCAM]: https://shop.runcam.com/runcam-racer-3/
[BATT-HV]: https://genstattu.com/content/instock/LiHv-Manual.pdf
[MOLICEL]: https://www.molicel.com/wp-content/uploads/INR21700P45B_1.4_Product-Data-Sheet-of-INR-21700-P45B-80109.pdf
[BATT-C]: https://genstattu.com/blog/all-around-improvement-tattu-rline-version-50-is-available/
[CC]: https://creativecommons.org/licenses/by-sa/4.0/

- [Regolamento 2019/947, consolidato 1 maggio 2025][EU947].
- [Regolamento 2019/945, consolidato 24 giugno 2025][EU945].
- [EASA Easy Access Rules, revisione giugno 2026](https://www.easa.europa.eu/en/document-library/easy-access-rules/online-publications/easy-access-rules-unmanned-aircraft-systems).
- [ENAC, elenco normativa droni, con UAS-IT edizione 1](https://www.enac.gov.it/sicurezza-aerea/droni/operatori-di-droni-uas/normativa-droni).
- [d-flight, manuale utente 2026, distinzione QR operatore/QR UAS facoltativo](https://www.d-flight.it/new_portal/wp-content/uploads/2026/01/D-Flight-Manuale_Utente-v15-ITA.pdf).
- [ENAC, segnalazione eventi aeronautici](https://www.enac.gov.it/sicurezza-aerea/flight-safety/segnalazione-eventi-aeronautici).
