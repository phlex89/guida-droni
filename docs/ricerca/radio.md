# Ricerca: Radio, video, telemetria e posizionamento dei droni

Ricerca a supporto del capitolo "Radio, video e telemetria". Ogni fatto riporta la fonte con URL e data di verifica (2026-09-20). Le voci non confermate sono segnalate con ⚠ INCERTO.

---

## 1. Bande radio consumer/hobby in Europa: limiti EIRP e duty cycle

### 2,4 GHz (2400-2483,5 MHz) — EN 300 328
- Banda usata per radiocomando (ELRS 2,4 GHz, Crossfire 2,4 GHz, protocolli proprietari come OcuSync/O3/O4 per il canale di controllo) e per Wi-Fi/video su droni economici.
- Limite di potenza: **100 mW (20 dBm) EIRP** massima media durante il burst di trasmissione (apparati "adattivi" con LBT/DAA o FHSS).
- Per apparati non adattivi, densità spettrale di potenza massima 10 dBm/MHz; per FHSS non adattivo il tempo massimo di occupazione di un canale è 5 ms seguito da una pausa minima di 5 ms; separazione minima tra canali hopping 100 kHz.
- Sotto i 10 dBm EIRP non si applicano i requisiti di adattività/utilizzo del canale.
- La conformità a EN 300 328 è uno dei riferimenti armonizzati usati per dimostrare la conformità alla direttiva RED 2014/53/UE.
- Fonte: [ETSI EN 300 328 V2.2.2 (2019-07)](https://www.etsi.org/deliver/etsi_en/300300_300399/300328/02.02.02_60/en_300328v020202p.pdf) (verificato il 2026-09-20)
- Fonte: [Intertek — ETSI EN 300 328 V2.2.2](https://www.intertek.com/ict/etsi-en-300-328/) (verificato il 2026-09-20)

### 5,725-5,875 GHz — EN 300 440 (video FPV analogico/digitale, non Wi-Fi)
- Banda usata storicamente per la trasmissione video FPV analogica (raceband) e per alcuni sistemi digitali (es. canale video di OcuSync/O3/O4 CE).
- Limite: **25 mW EIRP** per gli apparati SRD generici in questa sottobanda.
- Fonte: [ETSI EN 300 440 V2.2.1 (2018-07)](https://www.etsi.org/deliver/etsi_en/300400_300499/300440/02.02.01_60/en_300440v020201p.pdf) (verificato il 2026-09-20)
- Fonte: [UAVMODEL — VTX Power Limits by Country](https://blog.uavmodel.com/vtx-power-limits-by-country-fcc-ce-and-international-fpv-compliance-2026-guide/) (blog tecnico, non normativo; verificato il 2026-09-20)
- ⚠ INCERTO: non ho trovato nella ricerca il testo esatto della tabella EN 300 440 con il valore numerico di 25 mW riferito specificamente alla sottobanda 5725-5875 MHz (il PDF ufficiale non è stato letto integralmente); il valore è ampiamente riportato da fonti secondarie di settore ma andrebbe confrontato col testo ETSI definitivo prima di pubblicarlo come assoluto.

### 5,150-5,350 GHz e 5,470-5,725 GHz — EN 301 893 (WAS/RLAN, Wi-Fi)
- 5,150-5,350 GHz: uso **solo indoor**, limite **200 mW (23 dBm) EIRP**.
- 5,470-5,725 GHz: uso indoor/outdoor, limite **1 W (30 dBm) EIRP**, con obbligo di DFS (Dynamic Frequency Selection) e TPC (Transmit Power Control) per evitare interferenze con radar.
- Fonte: [ETSI EN 301 893 V2.2.1](https://www.etsi.org/deliver/etsi_en/301800_301899/301893/02.02.01_60/en_301893v020201p.pdf) (verificato il 2026-09-20)
- Fonte: [MiCOM Labs — EN 301 893 Explained](https://micomlabs.com/en-301-893-explained-5ghz-wifi-dfs/) (verificato il 2026-09-20)

### Novità 2022: 5,170-5,250 GHz per UAS (Decisione UE 2022/179)
- L'UE ha aggiunto una banda dedicata a controllo/telemetria/video dei droni: **5170-5250 MHz**, potenza massima **200 mW EIRP**.
- L'Italia ha recepito questa allocazione nel Piano Nazionale di Ripartizione delle Frequenze (PNRF), aggiornamento approvato il 31 agosto 2022 e pubblicato in Gazzetta Ufficiale il 13 settembre 2022.
- Questa è la banda usata dal sistema O4 di DJI in modalità CE (canale di controllo 5,1 GHz).
- Fonte: [Piano Nazionale di Ripartizione delle Frequenze — Gazzetta Ufficiale, 13/09/2022](https://www.gazzettaufficiale.it/eli/gu/2022/09/13/214/so/35/sg/pdf) (verificato il 2026-09-20)
- Fonte: [MIMIT — PNRF](https://www.mimit.gov.it/it/digitale/gestione-spettro-radio/piano-nazionale-ripartizione-frequenze) (verificato il 2026-09-20)
- Fonte: [Quadricottero News — Nuove frequenze UE per i droni](https://www.quadricottero.com/2023/01/nuove-frequenze-ue-per-i-droni-il.html) (verificato il 2026-09-20)
- ⚠ INCERTO: non ho potuto leggere il testo integrale della Decisione 2022/179 su ec.europa.eu/efis.cept.org per confermare in modo primario il valore di 200 mW; il dato viene da fonti secondarie di settore convergenti.

### 863-870 MHz — EN 300 220 / ERC Recommendation 70-03 (usato da ExpressLRS 868 MHz)
Sottobande SRD non specifiche (Annex 1 ERC 70-03 / EC Decision 2006/771/CE):
| Sottobanda | Potenza max | Duty cycle max |
|---|---|---|
| 863-865 MHz | 25 mW ERP | 0,1% |
| 865-868 MHz | 25 mW ERP | 1% |
| 868-868,6 MHz | 25 mW ERP | 1% |
| 868,7-869,2 MHz | 25 mW ERP | 0,1% |
| 869,4-869,65 MHz | 500 mW ERP | 10% (o LBT+AFA in alternativa) |
| 869,7-870 MHz | valori discordanti tra fonti (vedi nota) | — |

- Il duty cycle si applica sull'intera trasmissione (non per singolo canale hopping); per FHSS con dwell time inferiore a 10 ms si applica un limite di duty cycle dello 0,1%.
- ExpressLRS in variante 868/915 MHz opera in queste bande in Europa; il modulo usa chip LoRa Semtech SX127x.
- Fonte: [ERC Recommendation 70-03, Annex 1](https://docdb.cept.org/download/4635) (verificato il 2026-09-20)
- Fonte: [The Things Network — EU863-870 MHz Band](https://www.thethingsnetwork.org/docs/lorawan/regional-parameters/eu868/) (verificato il 2026-09-20)
- Fonte: [ETSI EN 300 220-2 V3.2.1](https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.02.01_60/en_30022002v030201p.pdf) (verificato il 2026-09-20)
- ⚠ INCERTO: per la sottobanda 869,7-870 MHz ho trovato due valori discordanti nelle fonti secondarie (25 mW ERP con 1% duty cycle da un lato, 5 mW ERP senza limite di duty cycle dall'altro). Non ho potuto verificare il testo ufficiale ETSI/ERC per dirimere; da controllare sul PDF ufficiale EN 300 220-2 o ERC 70-03 Annex 1 prima della pubblicazione.

### 433 MHz
- Banda SRD storicamente usata per telemetria a lungo raggio (es. moduli 433 MHz per MAVLink) e in alcuni sistemi radioamatoriali; rientra nelle bande SRD non specifiche regolate da EN 300 220 nell'intervallo 25 MHz-1000 MHz, con limiti di potenza ed eventuali restrizioni di duty cycle specifiche del segmento 433,05-434,79 MHz.
- ⚠ INCERTO: non ho trovato nella ricerca il valore preciso di potenza EIRP e duty cycle per la sottobanda 433 MHz applicabile ai droni hobbistici in Italia/UE; servirebbe consultare direttamente ERC 70-03 Annex 1 o EN 300 220-1.

### Perché 915 MHz e 5,8 GHz ad alta potenza (600 mW+) sono illegali in Europa
- **915 MHz**: la banda ISM statunitense 902-928 MHz (usata da FCC per ExpressLRS/Crossfire "900 MHz" a potenze fino a 1 W) **non è allocata come banda SRD in Europa**; in Europa l'equivalente approssimativo è la banda 863-870 MHz (868 MHz), con potenze molto più basse (25-500 mW ERP a seconda della sottobanda e del duty cycle) e vincoli di duty cycle assenti nella normativa FCC. Usare un modulo 915 MHz in Europa significa trasmettere fuori dalla banda armonizzata e senza conformità RED.
- **5,8 GHz a 600 mW+**: negli USA la FCC consente potenze fino a circa 1 W in alcune configurazioni; in Europa **EN 300 440 limita la banda 5725-5875 MHz a 25 mW EIRP**. Un trasmettitore video 5,8 GHz impostato a 200 o 600 mW (comune nei prodotti venduti per il mercato FCC) supera di 8-24 volte il limite EIRP europeo ed è quindi non conforme se usato in UE, indipendentemente dalla marcatura CE eventualmente presente sulla confezione.
- Fonte: [DigiKey — Unlisenced 915-MHz Band](https://www.digikey.com/en/articles/unlicensed-915-mhz-band-fits-many-applications-and-allows-higher-transmit-power) (verificato il 2026-09-20)
- Fonte: [Oscar Liang — 5.8GHz FPV Channels & Frequency Chart](https://oscarliang.com/fpv-channels/) (verificato il 2026-09-20)
- Fonte: [UAVMODEL — VTX Power Limits by Country](https://blog.uavmodel.com/vtx-power-limits-by-country-fcc-ce-and-international-fpv-compliance-2026-guide/) (verificato il 2026-09-20)

---

## 2. Direttiva RED 2014/53/UE e marcatura CE

- La **Radio Equipment Directive (RED) 2014/53/UE** disciplina l'immissione sul mercato UE di apparecchiature radio, inclusi droni e radiocomandi che trasmettono via radio.
- Il fabbricante (o il suo rappresentante autorizzato in UE) deve: valutare la conformità ai requisiti essenziali (uso efficiente dello spettro, compatibilità elettromagnetica, sicurezza), applicare la marcatura **CE** in modo visibile e leggibile (lettere di altezza minima 5 mm), redigere e firmare la **Dichiarazione UE di Conformità**, e conservare la documentazione tecnica e la dichiarazione per **10 anni** dall'immissione sul mercato.
- Per un drone, la conformità RED riguarda tipicamente il collegamento di controllo/telemetria (es. EN 300 328 per 2,4 GHz) e la compatibilità elettromagnetica (es. EN 301 489 serie).
- Un drone destinato al mercato UE deve avere marcatura CE per il quadro UAS (regolamento (UE) 2019/945) **e** conformità RED se dotato di apparati radio.
- **Importazione di apparati non conformi**: chi importa da paesi extra-UE diventa responsabile dell'immissione sul mercato europeo (obblighi dell'importatore). Merce priva di marcatura CE o non conforme può essere fermata in dogana e sequestrata; l'operatore economico è soggetto a sanzione amministrativa pecuniaria (in Italia, indicativamente da 10.000 a 60.000 euro per ciascuna misura non adottata, secondo il quadro sanzionatorio collegato alle direttive di prodotto).
- Fonte: [EUR-Lex — Direttiva 2014/53/UE](https://eur-lex.europa.eu/eli/dir/2014/53/oj/eng) (verificato il 2026-09-20)
- Fonte: [Commissione Europea — Radio Equipment Directive (RED)](https://single-market-economy.ec.europa.eu/sectors/electrical-and-electronic-engineering-industries-eei/radio-equipment-directive-red_en) (verificato il 2026-09-20)
- Fonte: [Krono — CE Marking for Drones and UAVs](https://krono-labs.com/guides/ce-marking-for-drones) (verificato il 2026-09-20)
- Fonte: [EU Drone Port — Obligations for Drone Importers](https://eudroneport.com/blog/drone-importers-obligations-european-union/) (verificato il 2026-09-20)
- ⚠ INCERTO: l'importo esatto delle sanzioni amministrative italiane per mancata marcatura CE su apparati radio (RED) andrebbe verificato sul testo del D.Lgs. di recepimento della RED in Italia (D.Lgs. 128/2016), non consultato direttamente in questa ricerca.

---

## 3. Come funziona un link radiocomando moderno

### Concetti generali
- **FHSS (Frequency Hopping Spread Spectrum)**: il trasmettitore e il ricevitore cambiano canale radio secondo una sequenza pseudo-casuale sincronizzata, per resistere a interferenze e riuso dello spettro; è la tecnica usata da quasi tutti i protocolli RC moderni su 2,4 GHz.
- **Telemetria bidirezionale**: il ricevitore/drone invia indietro al radiocomando dati come RSSI, LQ (link quality), tensione batteria, GPS, permettendo di monitorare lo stato del volo e del link stesso.
- **Packet rate**: frequenza di invio dei pacchetti di comando (Hz); rate più alti riducono la latenza ma, a parità di potenza, riducono la portata e la robustezza del link.
- **RSSI / LQ**: RSSI è l'intensità del segnale ricevuto (dBm); LQ (Link Quality) è la percentuale di pacchetti ricevuti correttamente su una finestra recente, spesso più informativa dell'RSSI da solo per capire la salute del link.
- **Failsafe**: comportamento predefinito del ricevitore/volo quando il link viene perso oltre una soglia di tempo (es. mantenimento ultimo comando, atterraggio automatico, o attivazione RTH).
- Fonte: [ExpressLRS — Signal Health](https://www.expresslrs.org/info/signal-health/) (verificato il 2026-09-20)

### ExpressLRS (ELRS)
- Sistema open source basato su moduli LoRa Semtech (SX1280 per 2,4 GHz, SX127x per 868/915 MHz).
- **2,4 GHz**: packet rate configurabile fino a **1000 Hz** (modalità FLRC/LoRa "Full"); a 500 Hz latenza stick-to-output circa 7-8 ms, a 1000 Hz circa 3-4 ms. Portata dichiarata dalla community fino a oltre 40 km a 250 Hz/100 mW con antenne omnidirezionali in condizioni favorevoli.
- **868/915 MHz**: packet rate fino a 1000 Hz nelle modalità più veloci; le modalità a rate più basso privilegiano portata estrema (superiore a 100 km riportata in condizioni ideali da fonti di community, non verificata in modo indipendente).
- Modulazioni disponibili: **LoRa** (maggiore portata e resistenza alle interferenze, latenza più alta) e **FLRC** (minore latenza, portata inferiore); LoRa arriva fino a 500 Hz, FLRC fino a 1000 Hz.
- Fonte: [ExpressLRS.org — Hardware Selection](https://www.expresslrs.org/hardware/hardware-selection/) (verificato il 2026-09-20)
- Fonte: [ExpressLRS — Wikipedia](https://en.wikipedia.org/wiki/ExpressLRS) (verificato il 2026-09-20)
- Fonte: [UAVMODEL — ELRS Packet Rate Optimization](https://blog.uavmodel.com/elrs-packet-rate-optimization-50hz-to-1000hz-telemetry-ratio-and-link-reliability-2026/) (blog tecnico, verificato il 2026-09-20)
- ⚠ INCERTO: i valori di portata (40 km, 100+ km) sono cifre riportate da community/blog di settore in condizioni di test non standardizzate, non da documentazione tecnica ufficiale del progetto ExpressLRS con metodologia di misura dichiarata.

### TBS Crossfire (CRSF)
- Opera in **868 MHz (EU) o 915 MHz (US)**.
- Packet rate: **50 Hz** standard, **150 Hz** con firmware 6.0+; latenza stick-to-serial riportata di circa 22 ms a 50 Hz e circa 8 ms a 150 Hz.
- Usa il protocollo seriale **CRSF** (vedi punto 5) per RC e telemetria su un solo filo/UART.
- Fonte: [UAVMODEL — Crossfire vs ELRS](https://blog.uavmodel.com/crossfire-vs-elrs-the-ultimate-long-range-rc-link-comparison-for-2026/) (blog tecnico, verificato il 2026-09-20)
- Fonte: [ArduPilot — Crossfire and ELRS RC Systems](https://ardupilot.org/copter/docs/common-tbs-rc.html) (verificato il 2026-09-20)

### Sistemi proprietari integrati (DJI OcuSync/O3/O4)
- **O3**: canale di controllo/immagine adattivo su 2,4 GHz e 5,8 GHz; potenza in modalità CE ≤ 20 dBm (2,4 GHz) e ≤ 14 dBm (5,8 GHz), contro ≤ 28,5 dBm e ≤ 31,5 dBm in modalità FCC. Portata massima dichiarata: **2 km in modalità CE** contro **10 km in modalità FCC** (e 6 km in modalità SRRC, Cina).
- **O4**: bande operative **5,170-5,250 GHz** e **5,725-5,850 GHz**; potenza in modalità CE < 23 dBm (5,1 GHz) e < 14 dBm (5,8 GHz), contro fino a 33 dBm in modalità FCC sul canale 5,8 GHz. Portata massima dichiarata con DJI Goggles 3/N3: **8 km in modalità CE** contro **10 km in modalità FCC**.
- Il sistema commuta automaticamente tra le bande disponibili in base alle interferenze rilevate ("adattamento di frequenza").
- Fonte: [DJI — O4 Air Unit Series, Specs](https://www.dji.com/o4-air-unit/specs) (verificato il 2026-09-20, fonte primaria del produttore)
- Fonte: [Mavic Pilots forum — O3 vs O4 specs](https://mavicpilots.com/threads/will-the-rc-pro-be-compatible-with-oc4-drones-what-are-the-differences-in-specs-between-ocusync-3-and-4.142151/) (verificato il 2026-09-20)
- ⚠ INCERTO: le cifre O3 riportate sopra provengono da fonti secondarie aggregate (non dalla pagina prodotto DJI O3 direttamente consultata); solo i dati O4 sono stati verificati sulla pagina specifiche ufficiale DJI.

### Portata "dichiarata" vs portata reale
- Le portate dichiarate dai produttori (es. 8-10 km) sono misurate tipicamente in campo aperto, senza ostacoli, senza altre fonti di interferenza RF e spesso con antenne e goggle/ricevitori di fascia alta abbinati al sistema.
- La portata reale in uso tipico è ridotta da: ostacoli (edifici, alberi, terreno), interferenze da altri dispositivi 2,4/5,8 GHz (Wi-Fi, altri piloti, Bluetooth), orientamento e polarizzazione delle antenne, altezza di volo, e limiti di potenza imposti dalla normativa locale (in Europa, modalità CE con potenze molto più basse rispetto a FCC).
- Non ho trovato una fonte tecnica primaria che quantifichi in modo generale il rapporto tra portata dichiarata e portata reale (dipende troppo dallo scenario); questo va trattato nel capitolo come principio qualitativo, non come cifra fissa.

---

## 4. Link video

### Video analogico 5,8 GHz
- Trasmissione continua (non pacchettizzata) su 5,8 GHz; 5 bande storiche (A, B, E, F/Fatshark, R/Raceband) da 8 canali ciascuna, più le frequenze Raceband aggiuntive per un totale di 40 canali comunemente commercializzati.
- Frequenze Raceband: 5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917 MHz, con separazione di 37 MHz tra canali (per ridurre l'interferenza tra piloti che volano insieme); canali più ravvicinati (es. 20 MHz) causano interferenza reciproca ("frosting"/disturbo a neve).
- Latenza: sostanzialmente **sub-millisecondo** (analogico puro, nessuna codifica/decodifica digitale).
- Qualità: degrado "morbido" (graceful degradation) con l'aumentare della distanza o del disturbo — l'immagine si riempie gradualmente di disturbo (neve) invece di interrompersi bruscamente.
- Fonte: [Oscar Liang — 5.8GHz FPV Channels & Frequency Chart](https://oscarliang.com/fpv-channels/) (verificato il 2026-09-20)
- Fonte: [Oscar Liang — Managing 5.8GHz VTX Channel in FPV Race](https://oscarliang.com/manage-video-frequency-in-a-fpv-race-8-channels-5-8ghz/) (verificato il 2026-09-20)

### Video digitale (DJI O3/O4, HDZero, Walksnail)
- Usa compressione video (es. H.264 o codec proprietari) che introduce latenza di codifica/decodifica.
- Latenza tipica dichiarata: **HDZero** circa 14 ms glass-to-glass a 540p/90fps, circa 20 ms a 720p/60fps (sistema a compressione minima/bassa latenza costante). **DJI O4** in modalità Racing circa 20 ms; sistemi digitali con compressione variabile (DJI, Walksnail) possono avere latenza che aumenta con la complessità dell'immagine (es. volo tra alberi), a differenza di HDZero che mantiene latenza costante.
- Effetto **"cliff" (digital cliff)**: superata una certa distanza o soglia di errore di bit, la qualità del video digitale degrada molto rapidamente e improvvisamente fino alla perdita completa dell'immagine, a differenza del degrado graduale dell'analogico.
- Fonte: [UAVMODEL — Digital vs Analog FPV: Glass-to-Glass Latency](https://blog.uavmodel.com/digital-vs-analog-fpv-glass-to-glass-latency-racing-performance-and-when-analog-still-wins-2026-guide/) (blog tecnico, verificato il 2026-09-20)
- Fonte: [Zbotic — FPV Drone Video Latency](https://zbotic.in/fpv-drone-video-latency-minimize-delay-for-responsive-flight/) (verificato il 2026-09-20)
- Fonte: [Juyeuav — Why Analog Video Transmission Dominates (spiegazione digital cliff)](https://juyeuav.com/why-analog-video-transmission-dominates-in-fpv-drones/) (verificato il 2026-09-20)
- ⚠ INCERTO: i valori 20-40 ms indicati nella richiesta come "latenza tipica" per il digitale sono coerenti con quanto trovato (fascia 14-35 ms a seconda del sistema e della risoluzione/frame rate), ma non esiste un singolo numero "ufficiale": varia per prodotto, risoluzione e condizioni di link.

### Video su Wi-Fi (droni economici/giocattolo)
- I droni giocattolo economici trasmettono spesso il video via **Wi-Fi diretto** verso un'app su smartphone/tablet.
- Latenza tipica riportata: **fino a circa 1 secondo**, molto più alta degli standard FPV professionali (che puntano a restare sotto i 150 ms).
- Portata tipica limitata: circa 15-50 metri outdoor, meno indoor.
- Fonte: [Servo Magazine — Mini Wi-Fi Video Cameras](https://www.servomagazine.com/magazine/article/february2016_WiFiVideoCameras) (verificato il 2026-09-20)
- ⚠ INCERTO: fonte datata (2016) e generica; non ho trovato una fonte tecnica recente e autorevole con misure di latenza standardizzate per droni Wi-Fi economici attuali.

---

## 5. Telemetria e protocolli

### MAVLink
- Protocollo di messaggistica leggero usato per comunicare con/tra veicoli aerei senza pilota; standard de facto per **PX4** e **ArduPilot**.
- Ogni messaggio ha un ID numerico e un set di campi fissi; i pacchetti includono indirizzo sorgente/destinazione, numero di sequenza e checksum.
- Ogni dispositivo sulla rete MAVLink ha un **system ID** (identifica il veicolo) e un **component ID** (identifica una parte specifica, es. autopilota, gimbal, computer companion).
- Il "common message set" (common.xml) definisce centinaia di messaggi standard usati dalla maggior parte delle ground control station e autopiloti.
- Usato per telemetria live, configurazione parametri, upload missioni ed esecuzione comandi.
- Fonte: [MAVLink — Common Message Set](https://mavlink.io/en/messages/common.html) (verificato il 2026-09-20)
- Fonte: [PX4 Guide — MAVLink Messaging](https://docs.px4.io/main/en/mavlink/) (verificato il 2026-09-20)
- Fonte: [MAVLink — Wikipedia](https://en.wikipedia.org/wiki/MAVLink) (verificato il 2026-09-20)

### CRSF (Crossfire Serial Protocol)
- Protocollo bidirezionale sviluppato da Team BlackSheep per Crossfire, adottato anche da ExpressLRS in modalità compatibile.
- Richiede un solo UART per comandi RC e telemetria insieme.
- Baud rate di default **400 kbaud 8N1** (invertito o non invertito, livello 3,3V); supporta anche 115,2 kbaud o rate superiori (1/2 Mbaud) a seconda dell'hardware. ELRS in modalità compatibile CRSF usa tipicamente 420 kbaud contro i 416 kbaud di CRSF nativo.
- Fonte: [PX4 Guide — CRSF Telemetry](https://docs.px4.io/main/en/telemetry/crsf_telemetry) (verificato il 2026-09-20)
- Fonte: [tbs-fpv/tbs-crsf-spec su GitHub](https://github.com/tbs-fpv/tbs-crsf-spec/blob/main/crsf.md) (verificato il 2026-09-20, specifica pubblicata dal produttore/community)

### S.Port (FrSky SmartPort)
- Protocollo bidirezionale su singolo filo (half-duplex) in cui il ricevitore interroga ("ping") i sensori collegati e ne raccoglie le misure per la telemetria verso la radio.
- Dati tipici trasmessi: accelerazioni (AccX/Y/Z), altitudine barometrica, corrente, percentuale/consumo batteria, altitudine e coordinate GPS, velocità al suolo, prua (heading), tensione batteria (VFAS), velocità verticale.
- Architettura a bus: più sensori possono essere collegati in parallelo, ciascuno con un ID sensore univoco.
- Fonte: [ArduPilot — FrSky Telemetry Protocols](https://ardupilot.org/copter/docs/common-frsky-protocol-info.html) (verificato il 2026-09-20)
- Fonte: [FrSky — Two-way system protocol (manuale ufficiale)](https://www.frsky-rc.com/wp-content/uploads/2017/07/Manual/FRSKY%20TELEMETRY%20PROTOCOL.PDF) (verificato il 2026-09-20)

### Ground Control Station (GCS)
- Software (a terra o su tablet/PC) che riceve la telemetria del drone via MAVLink (o protocolli equivalenti) e permette pianificazione missione, configurazione parametri, monitoraggio in tempo reale e invio comandi.
- Esempi: **QGroundControl** (multipiattaforma, per PX4 e ArduPilot), **Mission Planner** (principalmente ArduPilot).
- Fonte: [QGroundControl — MAVLink Settings](https://docs.qgroundcontrol.com/Stable_V5.0/en/qgc-user-guide/settings_view/mavlink.html) (verificato il 2026-09-20)

---

## 6. GNSS sui droni

- Costellazioni disponibili: **GPS** (USA), **Galileo** (UE), **GLONASS** (Russia), **BeiDou** (Cina); i moduli GNSS multi-costellazione dei droni moderni possono tracciare più sistemi contemporaneamente.
- Precisione tipica GNSS standalone: **diversi metri** (dell'ordine di 2-5 m in condizioni buone).
- **Multi-banda** (tracciamento di più frequenze per costellazione, es. L1+L5 per GPS) riduce gli errori dovuti alla ionosfera e migliora la velocità e affidabilità del fix.
- **RTK (Real-Time Kinematic)**: riceve correzioni in tempo reale da una stazione base, raggiungendo precisione **centimetrica** durante il volo; richiede un collegamento dati costante e stabile con la base (raggio operativo tipico fino a circa 10 km dalla base secondo alcune fonti di settore).
- **PPK (Post-Processed Kinematic)**: registra i dati grezzi GNSS sia a bordo sia alla stazione base, e li elabora dopo il volo in post-processing; non richiede link dati continuo durante il volo, è più robusto in aree con connettività scarsa, ma richiede elaborazione successiva (raggio operativo maggiore, riportato fino a 50 km da alcune fonti di settore).
- Quando servono: RTK/PPK sono usati per rilievi topografici, fotogrammetria/mappatura di precisione e applicazioni che richiedono accuratezza centimetrica; per il volo hobbistico/FPV generico non sono necessari.
- Effetti dell'**indice Kp** (attività geomagnetica): quando il Kp sale a 4 o superiore, l'affidabilità del segnale GNSS può degradare per effetto delle tempeste geomagnetiche e della scintillazione ionosferica, che alterano ampiezza e fase del segnale, più marcatamente alle latitudini equatoriali e polari.
- **Multipath**: riflessioni del segnale su edifici, superfici metalliche o terreno possono introdurre errori di posizione, soprattutto in ambienti urbani; l'uso di più costellazioni migliora la geometria dei satelliti disponibili e riduce l'impatto di scarsa visibilità satellitare o multipath.
- Numero di satelliti per l'armamento: su **ArduPilot**, il parametro di default richiede un minimo di **6 satelliti** (AHRS_GPS_MINSATS) sotto il quale le stime di velocità GPS sono considerate troppo inaffidabili; il valore soglia di HDOP "buono" di default (GPS_HDOP_GOOD) è tipicamente basso (nell'ordine di 1,4-2, alcuni utenti lo rilassano fino a 2,2-2,5). In pratica molti produttori/community consigliano 7-10+ satelliti prima del decollo per un margine di sicurezza.
- Fonte: [ArduPilot Discourse — ArduCopter minimum 6 Satellites required](https://discuss.ardupilot.org/t/arducopter-minimum-6-satellites-required/30302) (verificato il 2026-09-20)
- Fonte: [ArduPilot — Pre-Arm Safety Checks](https://ardupilot.org/copter/docs/common-prearm-safety-checks.html) (verificato il 2026-09-20)
- Fonte: [PointOneNav — Drone RTK: How It Works, Accuracy & Applications](https://pointonenav.com/insights/drone-rtk/) (verificato il 2026-09-20)
- Fonte: [JOUAV — RTK vs. PPK Drone Mapping](https://www.jouav.com/blog/rtk-drone.html) (verificato il 2026-09-20)
- Fonte: [GeoCue — KP Index and geomagnetic activity](https://support.geocue.com/kp-index/) (verificato il 2026-09-20)
- ⚠ INCERTO: il valore preciso di default del parametro ArduPilot GPS_HDOP_GOOD non è stato confermato con un numero esatto univoco dalle fonti consultate (sono emersi valori di riferimento come 2,2/2,5 come soglie "rilassate", non il default esatto); da verificare sulla documentazione parametri ArduPilot corrente.

---

## 7. Sensori per la stabilizzazione

- **IMU (Inertial Measurement Unit)**: combina **giroscopio** (misura le velocità angolari — beccheggio, rollio, imbardata) e **accelerometro** (misura le accelerazioni lineari); spesso il modulo IMU è affiancato da un magnetometro per formare un sensore a "10 gradi di libertà" (3 assi accelerometro + 3 assi giroscopio + 3 assi magnetometro + 1 quota barometrica).
- **Barometro**: misura la pressione atmosferica per stimare l'altitudine relativa (confrontando con la pressione al livello del mare o al punto di decollo); è il riferimento primario per l'hold di quota in assenza di altri sensori di distanza.
- **Magnetometro**: misura il campo magnetico terrestre per determinare la prua/orientamento; è sensibile a **interferenze elettromagnetiche** generate da motori, ESC e cavi di potenza vicini, che possono causare errori di stima dell'orientamento (da qui la calibrazione periodica e il posizionamento del sensore lontano da fonti di disturbo).
- **Optical flow**: sensore ottico (spesso una piccola videocamera a bassa risoluzione puntata verso il basso) che stima lo spostamento orizzontale confrontando fotogrammi successivi, utile per l'hold di posizione in assenza di GPS (es. volo indoor).
- **Sensori di distanza**: tipicamente laser/infrarossi a tempo di volo (ToF) puntati verso il basso, usati insieme all'optical flow per la stima di quota/posizione a bassa quota.
- **Sensori anti-collisione**: **visione stereo** (due camere che calcolano la profondità triangolando la disparità tra le immagini, es. sistema APAS di DJI) e sensori **ToF** (misurano la distanza dal tempo di andata/ritorno di un impulso, efficaci ma sensibili a luce solare diretta e superfici riflettenti). I droni con visione omnidirezionale usano tipicamente sei sensori di visione (fronte, retro, basso) più un ToF verso il basso, con portate di rilevamento che vanno da circa 50 cm fino a 18-30 m a seconda del sensore.
- Fonte: [DroneZon — Drone Gyro Stabilization, IMU And Flight Controllers Explained](https://www.dronezon.com/learn-about-drones-quadcopters/three-and-six-axis-gyro-stabilized-drones/) (verificato il 2026-09-20)
- Fonte: [Droneblog — Obstacle Avoidance in DJI Drones](https://www.droneblog.com/dji-drone-obstacle-avoidance/) (verificato il 2026-09-20)
- Fonte: [B&H eXplora — What Is Obstacle Avoidance in Drones?](https://www.bhphotovideo.com/explora/drones/tips-and-solutions/what-is-obstacle-avoidance-in-drones) (verificato il 2026-09-20)

---

## 8. Remote ID diretto europeo

- Obbligatorio per le classi **C1, C2, C3, C5 e C6** (e in generale per droni con MTOM ≥ 250 g o dotati di camera, salvo eccezioni previste dal regolamento).
- Dati trasmessi (secondo il regolamento delegato (UE) 2019/945, Parte 6, come recepito anche nella normativa UK equivalente consultata):
  - numero di registrazione dell'operatore UAS e codice di verifica fornito dallo Stato membro di registrazione;
  - numero seriale univoco dell'add-on/drone (conforme allo standard ANSI/CTA-2063-A);
  - timestamp, posizione geografica del drone e altezza sopra la superficie/punto di decollo;
  - rotta (course, misurata in senso orario dal nord vero) e velocità al suolo;
  - posizione geografica del pilota remoto o, se non disponibile, del punto di decollo.
  - ⚠ INCERTO: non ho trovato conferma esplicita, nel testo consultato, della presenza obbligatoria di un campo "stato di emergenza" nel set minimo dati; alcune fonti secondarie lo includono per analogia con lo standard statunitense, ma il testo della Parte 6 letto non lo cita esplicitamente. Da verificare sul testo consolidato di EASA/EUR-Lex.
- **Tecnologia di trasmissione**: broadcast diretto tramite protocollo aperto e documentato, ricevibile da dispositivi mobili standard nel raggio di trasmissione; lo standard tecnico di riferimento è **ASD-STAN EN 4709-002** (già prEN 4709-002, pubblicato inizialmente a novembre 2021, con Corrigendum 1 nel 2023, versione EN 4709-002:2023 pubblicata il 30 ottobre 2023), che definisce protocolli basati su **Bluetooth Legacy Advertising (Bluetooth 4.x), Bluetooth 5 Long Range, e Wi-Fi Beacon**, con **Wi-Fi NAN** come opzione aggiuntiva; sono richiesti almeno alcuni di questi protocolli (non tutti) per la conformità.
- App per leggerlo: esistono app e ricevitori dedicati (es. Dronetag, FLARM/Dronavia) capaci di decodificare i broadcast Remote ID conformi allo standard europeo.
- **Moduli add-on**: droni già in commercio prima dell'obbligo possono essere resi conformi tramite moduli aggiuntivi (DRI add-on) che rispettano gli stessi requisiti della Parte 6.
- **Differenze con il Remote ID statunitense (ASTM F3411/FAA Part 89)**: lo standard USA (basato su ASTM F3411) è concettualmente simile (broadcast diretto con dati di identificazione e posizione) ma con set di messaggi e requisiti di certificazione differenti; i due standard sono stati progettati per essere in parte compatibili (un ricevitore costruito su ASTM F3411 può decodificare broadcast conformi in generale), ma non sono identici nel dettaglio dei campi e delle regole di registrazione dell'operatore, che restano nazionali/EASA da un lato e FAA dall'altro.
- Fonte: [PART 6 — Requirements for a direct remote identification add-on (regulatorylibrary.caa.co.uk, testo equivalente a 2019/945)](https://regulatorylibrary.caa.co.uk/2019-945/Content/Regs/PART%206%20-%20Requirements%20for%20a%20direct%20remote%20identification%20add-on.htm) (verificato il 2026-09-20)
- Fonte: [ASD-STAN — Introduction to the European digital RID UAS Standard](https://cms.stan-shop.org/uploads/2024/01/ASD-STAN_DRI_Introduction_to_the_European_digital_RID_UAS_Standard.pdf) (verificato il 2026-09-20)
- Fonte: [Unmanned Airspace — ASD-STAN publishes Direct Remote Identification standard](https://www.unmannedairspace.info/emerging-regulations/asd-stan-publishes-direct-remote-identification-standard-to-meet-eu-2019-945/) (verificato il 2026-09-20)
- Fonte: [Dronetag Help — Remote ID Explained](https://help.dronetag.com/knowledge-base/remote-id-explained/) (verificato il 2026-09-20)

---

## 9. Geo-awareness

- Il regolamento (UE) 2019/945 richiede che i droni di classe **C1, C2 e C3** dispongano di una funzione di **geo-awareness**: capacità di ricevere, memorizzare e interpretare i dati sulle **zone geografiche UAS** pubblicati dalle autorità, e di segnalare al pilota remoto un potenziale superamento dei limiti spaziali prima che avvenga.
- La geo-awareness è **obbligatoria** per C1/C2/C3 ed è **opzionale** per le classi C5 e C6 (droni più grandi/con equipaggiamento addizionale).
- Implementazione: gli Stati membri devono pubblicare, dal 1° gennaio 2022, le informazioni sulle zone geografiche in **formato digitale armonizzato tra i Paesi UE**; questi dati (aree vietate, ristrette o soggette ad autorizzazione, es. aeroporti) alimentano database che i produttori integrano nei propri sistemi o nelle app di pianificazione volo.
- Il regolamento **non impone necessariamente il blocco automatico del decollo** in zona vietata: richiede che il sistema avvisi il pilota, lasciando ai singoli Stati/produttori la scelta se implementare anche un blocco (geofencing "duro") oltre al semplice avviso.
- Fonte: [EASA — Geographical zones (where I can fly)](https://www.easa.europa.eu/en/the-agency/faqs/geographical-zones-where-i-can-fly) (verificato il 2026-09-20)
- Fonte: [Wingtra Knowledge Base — Geo-awareness](https://knowledge.wingtra.com/en/geo-awareness) (verificato il 2026-09-20)
- ⚠ INCERTO: la formulazione esatta del regolamento sul fatto che il blocco al decollo non sia obbligatorio andrebbe confermata leggendo direttamente il testo dell'Allegato al regolamento (UE) 2019/945 (parti relative ai requisiti C1-C3), non consultato integralmente in questa ricerca; le fonti secondarie concordano sulla sostanza (avviso obbligatorio, blocco opzionale) ma non ho una citazione diretta dell'articolo.

---

## 10. Interferenze e coesistenza

- Il **2,4 GHz è affollato** perché condiviso da Wi-Fi, Bluetooth, sistemi RC (ELRS, Crossfire 2,4 GHz, protocolli proprietari), video digitale e molti altri dispositivi ISM: in aree urbane o eventi con molti piloti, il numero di canali e la tecnica FHSS/adattiva aiutano a mitigare ma non eliminano le collisioni.
- **Strutture metalliche** (edifici, tralicci, superfici riflettenti) possono causare riflessioni (multipath) sia sul link radio di controllo sia sul GNSS, degradando la qualità del segnale e la precisione di posizionamento; possono anche fare da schermo, riducendo la portata effettiva.
- **Perdita di link e failsafe**: quando il ricevitore non riceve pacchetti validi per un tempo superiore alla soglia configurata, entra in stato di failsafe; il comportamento tipico configurabile va dal mantenimento dell'ultimo comando, alla riduzione automatica di gas, fino all'attivazione del **Return To Home (RTH)**, che fa tornare il drone al punto di decollo (o all'ultima posizione nota del pilota) usando il GNSS come riferimento.
- Fonte: [ExpressLRS — Signal Health](https://www.expresslrs.org/info/signal-health/) (verificato il 2026-09-20)
- Fonte: [Oscar Liang — GPS Rescue Mode in Betaflight](https://oscarliang.com/setup-gps-rescue-mode-betaflight/) (verificato il 2026-09-20, esempio pratico di RTH/failsafe basato su GPS)
- ⚠ INCERTO: non ho trovato una fonte tecnica primaria che quantifichi in modo generale l'effetto delle strutture metalliche sulla portata RC (dipende troppo da geometria, frequenza, materiali); da trattare come principio qualitativo.

---

## 11. Compatibilità con i limiti normativi italiani

- Il **Piano Nazionale di Ripartizione delle Frequenze (PNRF)** italiano recepisce le allocazioni SRD europee (incluse le bande 2,4 GHz, 5,8 GHz e 863-870 MHz, oltre alla nuova banda UAS 5,17-5,25 GHz introdotta dalla Decisione UE 2022/179); l'ultimo aggiornamento verificato è stato approvato il 31 agosto 2022 e pubblicato in Gazzetta Ufficiale il 13 settembre 2022.
- Per l'uso hobbistico dei droni in Italia, quindi, valgono gli stessi limiti di potenza/duty cycle SRD validi nel resto dell'UE (vedi punto 1); non risultano deroghe nazionali che aumentino i limiti di potenza rispetto agli standard ETSI armonizzati.
- ⚠ INCERTO: non ho letto integralmente il testo del PNRF (solo pagine di presentazione del sito MIMIT) per confermare la formulazione esatta delle tabelle di attribuzione relative a uso hobbistico dei droni; l'affermazione sopra si basa su fonti secondarie di settore (Quadricottero News) convergenti con quanto noto della normativa europea, non su lettura diretta della tabella PNRF.
- **Uso di frequenze radioamatoriali per il FPV (1,2 GHz, 433 MHz, 5,6-5,8 GHz)**: dalle fonti consultate risulta che, per operare legalmente su bande riservate ai radioamatori (es. 1240-1300 MHz / 23 cm, alcune porzioni vicine a 433 MHz e 5650-5850 MHz nella banda dei 5 cm), è necessaria la **patente di operatore di stazione di radioamatore**, il cui esame in Italia è armonizzato con il certificato europeo **HAREC** (Harmonised Amateur Radio Examination Certificate, secondo la raccomandazione CEPT T/R 61-02); la patente di classe A corrisponde allo standard HAREC.
  - ⚠ INCERTO: non ho trovato una fonte primaria (testo del Codice delle Comunicazioni Elettroniche o Allegato 26 del PNRF) che elenchi in modo esplicito ed univoco quali sotto-bande radioamatoriali siano effettivamente utilizzabili per il volo FPV con potenze/parametri specifici; le fonti trovate sono forum di settore (DroneRC.it) che confermano il principio generale (serve la patente per usare bande diverse da quelle SRD libere) ma non danno una tabella normativa completa e verificata. Questo punto andrebbe verificato consultando direttamente l'Allegato 26 del Codice delle Comunicazioni o il sito del Ministero (mimit.gov.it) prima di scriverlo nel capitolo come regola definitiva.
- Fonte: [Gazzetta Ufficiale — PNRF, 13/09/2022](https://www.gazzettaufficiale.it/eli/gu/2022/09/13/214/so/35/sg/pdf) (verificato il 2026-09-20)
- Fonte: [MIMIT — PNRF](https://www.mimit.gov.it/it/comunicazioni/radio/pnrf-piano-nazionale-di-ripartizione-delle-frequenze) (verificato il 2026-09-20)
- Fonte: [Quadricottero News — Nuove frequenze UE per i droni](https://www.quadricottero.com/2023/01/nuove-frequenze-ue-per-i-droni-il.html) (verificato il 2026-09-20)
- Fonte: [codref.org — Patente e Normativa per Radioamatori in Italia](https://codref.org/ham-radio/patente-radioamatore/) (verificato il 2026-09-20)
- Fonte: [DroneRC.it forum — FPV nei limiti di legge (e patentino radioamatore)](https://www.dronerc.it/forum/forum/categoria-robotica-droni-fpv-e-multicotteri-ad-esclusivo-uso-amatoriale/fpv-e-riprese-aeree/5292-fpv-nei-limiti-di-legge-e-patentino-radioamatore) (fonte non ufficiale, forum di appassionati; verificato il 2026-09-20)

---

## 12. Batterie

- **Chimica**: le batterie usate sui droni sono principalmente **LiPo** (litio-polimero) e, sempre più spesso su droni commerciali/consumer di fascia alta, **Li-ion** (litio-ione) per la maggiore densità energetica e stabilità.
- **Tensione**: tensione nominale **3,7 V per cella**; tensione massima di carica **4,2 V per cella** (alcune varianti "high voltage"/LiHV arrivano a 4,35 V per cella). Tensione minima di sicurezza indicativa: 3,0 V per cella come limite assoluto di danno permanente; in pratica si raccomanda di non scaricare sotto 3,5 V per cella sotto carico (circa 3,3 V a riposo) per preservare la vita utile.
- **C-rating**: indica la corrente massima di scarica continua come multiplo della capacità nominale (es. batteria 2000 mAh a 1C eroga 2 A per un'ora); rating più alti indicano capacità di erogare correnti di picco maggiori, tipiche delle batterie per droni FPV ad alte prestazioni.
- **Conservazione**: per la conservazione a lungo termine si raccomanda una tensione per cella di circa **3,7-3,85 V** ("storage voltage"), diversa dalla tensione di carica piena; una batteria mantenuta correttamente a questa tensione e mai scaricata eccessivamente può durare tipicamente 200-400 cicli di carica prima di scendere sotto l'80% della capacità originale.
- **Rischi termici**: sovraccarica, cortocircuito, danno fisico o scarica eccessiva possono portare a rigonfiamento, incendio o fenomeno di "thermal runaway" (fuga termica) tipico delle celle al litio; da qui l'uso di sacchetti ignifughi per carica/trasporto e caricabatterie con bilanciamento di cella.
- **Trasporto aereo (limiti IATA)**:
  - Batterie/dispositivi con batterie al litio devono viaggiare in **bagaglio a mano**, mai in stiva, per le batterie di scorta/power bank.
  - Batterie **fino a 100 Wh**: generalmente consentite in bagaglio a mano senza autorizzazione specifica della compagnia.
  - Batterie **tra 100 e 160 Wh**: consentite solo con **approvazione della compagnia aerea**, con un limite tipico di **2 batterie di scorta per passeggero** in questo intervallo.
  - Batterie **oltre 160 Wh**: generalmente **non ammesse** su aerei passeggeri.
  - I terminali delle batterie di scorta devono essere protetti (nastro isolante o imballo originale) per prevenire cortocircuiti.
- Fonte: [IATA — Safe Travel with Lithium Batteries](https://www.iata.org/en/youandiata/travelers/batteries/) (verificato il 2026-09-20, fonte primaria)
- Fonte: [FAA — PackSafe: Lithium Batteries](https://www.faa.gov/hazmat/packsafe/lithium-batteries) (verificato il 2026-09-20)
- Fonte: [Grepow — LiPo Battery Voltage, Discharge Rate and Cycle Life](https://www.grepow.com/blog/basis-of-lipo-battery-specifications.html) (verificato il 2026-09-20, produttore di celle, dato tecnico generico)
- Fonte: [HobbyKing Blog — LiPo Battery Voltage Chart](https://hobbyking.com/blog/lipo-battery-voltage-chart-per-cell-what-3-7v-4-2v-3-5v-means) (verificato il 2026-09-20)

---

## Fonti consultate

- ETSI: EN 300 328 V2.2.2, EN 300 440 V2.2.1, EN 301 893 V2.2.1, EN 300 220-2 V3.2.1 (deliverable ufficiali su etsi.org)
- ERC/CEPT: Recommendation 70-03, Annex 1 (docdb.cept.org)
- EUR-Lex: Direttiva 2014/53/UE (RED)
- Commissione Europea: pagina RED (single-market-economy.ec.europa.eu)
- MIMIT/Gazzetta Ufficiale: Piano Nazionale di Ripartizione delle Frequenze (aggiornamento 2022)
- EASA: pagine su geographical zones e FAQ UAS
- ASD-STAN: introduzione allo standard EN 4709-002 (Direct Remote ID)
- Regolamento (UE) 2019/945, Parte 6 (via regulatorylibrary.caa.co.uk, testo equivalente)
- ExpressLRS.org: Signal Health, Hardware Selection
- TBS/tbs-fpv: specifica CRSF su GitHub
- PX4 Docs: MAVLink Messaging, CRSF Telemetry
- MAVLink.io: Common Message Set
- ArduPilot Docs: Pre-Arm Safety Checks, FrSky Telemetry Protocols, Crossfire/ELRS RC Systems
- QGroundControl Docs: MAVLink Settings
- DJI (fonte produttore): pagina specifiche O4 Air Unit Series
- IATA: Safe Travel with Lithium Batteries
- FAA: PackSafe Lithium Batteries
- Fonti secondarie di settore usate per dati descrittivi/tecnici non normativi (da trattare con cautela, citate singolarmente nel testo): Oscar Liang, UAVMODEL Insights blog, DroneZon, Grepow, HobbyKing, Dronetag, Wingtra, JOUAV, PointOneNav, GeoCue, Quadricottero News, DroneRC.it forum, codref.org

## Cose che l'autore deve decidere o verificare

1. **Sottobanda 869,7-870 MHz**: valori discordanti tra fonti (25 mW/1% vs 5 mW/no duty cycle). Verificare sul PDF ufficiale ETSI EN 300 220-2 o ERC 70-03 Annex 1 prima di pubblicare un numero.
2. **433 MHz**: non trovato il valore preciso di potenza/duty cycle applicabile ai droni hobbistici; da cercare in ERC 70-03 Annex 1 o EN 300 220-1.
3. **EN 300 440 a 5,8 GHz**: confermare il valore di 25 mW EIRP leggendo direttamente il testo ETSI (non solo fonti secondarie di settore).
4. **Decisione UE 2022/179** (banda 5,17-5,25 GHz per UAS): non letta in forma primaria su ec.europa.eu o efis.cept.org; solo fonti secondarie concordanti. Verificare testo ufficiale prima di citare il valore di 200 mW come definitivo.
5. **Sanzioni italiane per non conformità RED**: l'importo (10.000-60.000 euro) andrebbe confermato sul D.Lgs. 128/2016 di recepimento della RED in Italia, non consultato direttamente.
6. **Remote ID — campo "stato di emergenza"**: non confermato esplicitamente nel testo della Parte 6 di 2019/945 consultato; verificare sul testo consolidato EASA/EUR-Lex se il campo è realmente richiesto nel set minimo o è un'aggiunta di alcune implementazioni.
7. **Geo-awareness e blocco al decollo**: verificare la formulazione esatta nell'Allegato del regolamento 2019/945 (Parte 9/requisiti C1-C3), letta qui solo tramite fonti secondarie.
8. **Bande radioamatoriali per FPV in Italia (1,2 GHz, 433 MHz, 5,6-5,8 GHz)**: non trovata una fonte normativa primaria con tabella completa; le fonti sono forum di appassionati. Da verificare sull'Allegato 26 del Codice delle Comunicazioni Elettroniche o direttamente presso il Ministero/ARI (Associazione Radioamatori Italiani) prima di scrivere il capitolo.
9. **Portate ExpressLRS estreme** (40 km a 2,4 GHz, 100+ km a 868/915 MHz): cifre da community/blog senza metodologia di test dichiarata; da presentare nel capitolo come "riportate dalla community in condizioni ideali", non come specifica garantita.
10. **Parametro ArduPilot GPS_HDOP_GOOD (valore di default esatto)**: non confermato con precisione; verificare sulla pagina parametri ArduPilot corrente.
11. **Dati O3 di DJI**: verificati solo tramite fonti secondarie aggregate, non sulla pagina prodotto ufficiale DJI (a differenza di O4, verificato su fonte primaria). Se possibile, verificare anche O3 sulla pagina dji.com.
