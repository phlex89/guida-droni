(function () {
  "use strict";

  var html = document.documentElement;
  var body = document.body;

  function leggiDati() {
    var blocco = document.getElementById("dati-guida");
    if (!blocco) return {};
    try {
      return JSON.parse(blocco.textContent) || {};
    } catch (e) {
      return {};
    }
  }

  function sogliaMenu() {
    var valore = getComputedStyle(html).getPropertyValue("--soglia-menu").trim();
    return valore || "900px";
  }

  var dati = leggiDati();
  var mobile = window.matchMedia("(max-width: " + sogliaMenu() + ")");

  var menu = document.querySelector(".sidebar");
  var apri = document.querySelector(".apri-menu");
  var chiudi = document.querySelector(".chiudi-menu");
  var velo = document.querySelector(".velo");
  var etichettaCorrente = document.querySelector(".capitolo-corrente");

  function menuAperto() {
    return body.classList.contains("menu-aperto");
  }

  function aggiornaInert() {
    menu.inert = mobile.matches && !menuAperto();
  }

  function apriMenu() {
    body.classList.add("menu-aperto");
    menu.classList.add("aperta");
    apri.setAttribute("aria-expanded", "true");
    aggiornaInert();
    var primo = menu.querySelector("ul a");
    if (primo) primo.focus({ preventScroll: true });
  }

  function chiudiMenu(riportaFocus) {
    body.classList.remove("menu-aperto");
    menu.classList.remove("aperta");
    apri.setAttribute("aria-expanded", "false");
    aggiornaInert();
    if (riportaFocus) apri.focus({ preventScroll: true });
  }

  apri.addEventListener("click", function () {
    if (menuAperto()) chiudiMenu(false);
    else apriMenu();
  });
  chiudi.addEventListener("click", function () {
    chiudiMenu(true);
  });
  velo.addEventListener("click", function () {
    chiudiMenu(false);
  });
  menu.addEventListener("click", function (evento) {
    if (mobile.matches && evento.target.closest("a")) chiudiMenu(false);
  });
  mobile.addEventListener("change", function () {
    if (!mobile.matches) chiudiMenu(false);
    else aggiornaInert();
  });
  aggiornaInert();

  var capitoli = Array.prototype.slice.call(document.querySelectorAll(".capitolo"));
  var linkCapitoli = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#cap-"]'));
  var capitoloAttivo = null;

  function capitoloCorrente() {
    var inFondo = window.innerHeight + window.scrollY >= html.scrollHeight - 2;
    if (inFondo) return capitoli[capitoli.length - 1];
    var soglia = (mobile.matches ? 56 : 0) + 24;
    var corrente = capitoli[0];
    for (var i = 0; i < capitoli.length; i++) {
      if (capitoli[i].getBoundingClientRect().top <= soglia) corrente = capitoli[i];
      else break;
    }
    return corrente;
  }

  function aggiornaCorrente() {
    var corrente = capitoloCorrente();
    if (!corrente || corrente === capitoloAttivo) return;
    capitoloAttivo = corrente;
    linkCapitoli.forEach(function (a) {
      if (a.getAttribute("href").slice(1) === corrente.id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    if (etichettaCorrente) {
      etichettaCorrente.textContent = corrente.id.replace("cap-", "") + " · " + (corrente.dataset.titolo || "");
    }
  }

  var aggiornamentoPianificato = 0;
  function pianificaAggiornamento() {
    if (aggiornamentoPianificato) return;
    aggiornamentoPianificato = requestAnimationFrame(function () {
      aggiornamentoPianificato = 0;
      aggiornaCorrente();
    });
  }
  window.addEventListener("scroll", pianificaAggiornamento, { passive: true });
  window.addEventListener("resize", pianificaAggiornamento);
  window.addEventListener("load", pianificaAggiornamento);
  aggiornaCorrente();

  var bottoniTaglia = Array.prototype.slice.call(document.querySelectorAll(".dimensione-testo button"));
  function applicaTaglia(taglia) {
    html.setAttribute("data-taglia", taglia);
    bottoniTaglia.forEach(function (b) {
      var attivo = b.dataset.taglia === taglia;
      b.classList.toggle("attivo", attivo);
      b.setAttribute("aria-pressed", String(attivo));
    });
    try {
      localStorage.setItem("guida-droni-taglia", taglia);
    } catch (e) {}
    pianificaAggiornamento();
  }
  applicaTaglia(html.getAttribute("data-taglia") || "2");
  bottoniTaglia.forEach(function (b) {
    b.addEventListener("click", function () {
      applicaTaglia(b.dataset.taglia);
    });
  });

  function normalizza(testo) {
    return (testo || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function costruisciGlossario() {
    var indice = {};
    Array.prototype.slice.call(document.querySelectorAll("dl.glossario")).forEach(function (dl) {
      var figli = Array.prototype.slice.call(dl.children);
      figli.forEach(function (nodo, posizione) {
        if (nodo.tagName !== "DT") return;
        var dd = figli[posizione + 1];
        if (!dd || dd.tagName !== "DD") return;
        var definizione = dd.textContent.replace(/\s+/g, " ").trim();
        if (!definizione) return;
        var chiavi = [];
        var sigle = nodo.querySelectorAll(".sigla");
        Array.prototype.slice.call(sigle).forEach(function (s) {
          chiavi.push(s.textContent);
        });
        var principale = nodo.cloneNode(true);
        Array.prototype.slice.call(principale.querySelectorAll(".sigla")).forEach(function (s) {
          s.remove();
        });
        principale.textContent.split(",").forEach(function (pezzo) {
          chiavi.push(pezzo);
        });
        chiavi.forEach(function (chiave) {
          var k = normalizza(chiave);
          if (k && !indice[k]) indice[k] = definizione;
        });
      });
    });
    return indice;
  }

  var glossario = costruisciGlossario();
  var riquadro = null;
  var sigliaAperta = null;

  function chiudiDefinizione() {
    if (!riquadro) return;
    riquadro.remove();
    riquadro = null;
    if (sigliaAperta) {
      sigliaAperta.setAttribute("aria-expanded", "false");
      sigliaAperta = null;
    }
  }

  function posiziona(elemento) {
    var margine = 8;
    var rettangolo = elemento.getBoundingClientRect();
    var larghezza = riquadro.offsetWidth;
    var altezza = riquadro.offsetHeight;
    var sinistra = rettangolo.left;
    var massimo = document.documentElement.clientWidth - larghezza - margine;
    if (sinistra > massimo) sinistra = massimo;
    if (sinistra < margine) sinistra = margine;
    var sopra = rettangolo.bottom + altezza + margine > window.innerHeight && rettangolo.top > altezza + margine;
    var alto = sopra ? rettangolo.top - altezza - 6 : rettangolo.bottom + 6;
    riquadro.style.left = Math.round(sinistra + window.scrollX) + "px";
    riquadro.style.top = Math.round(alto + window.scrollY) + "px";
  }

  function mostraDefinizione(elemento) {
    var termine = elemento.textContent.replace(/\s+/g, " ").trim();
    var espansione = (elemento.getAttribute("title") || "").trim();
    var definizione = glossario[normalizza(termine)] || "";
    if (!definizione && !espansione) return;

    chiudiDefinizione();
    riquadro = document.createElement("div");
    riquadro.className = "definizione-sigla";
    riquadro.setAttribute("role", "dialog");
    riquadro.setAttribute("aria-label", "Definizione di " + termine);

    var titolo = document.createElement("span");
    titolo.className = "termine";
    titolo.textContent = definizione && espansione && normalizza(espansione) !== normalizza(termine)
      ? termine + ", " + espansione
      : termine;
    riquadro.appendChild(titolo);

    var corpo = document.createElement("span");
    corpo.textContent = definizione || espansione;
    riquadro.appendChild(corpo);

    var bottone = document.createElement("button");
    bottone.type = "button";
    bottone.className = "chiudi";
    bottone.setAttribute("aria-label", "Chiudi la definizione");
    bottone.textContent = "×";
    bottone.addEventListener("click", function () {
      var ancora = elemento;
      chiudiDefinizione();
      ancora.focus({ preventScroll: true });
    });
    riquadro.appendChild(bottone);

    document.body.appendChild(riquadro);
    posiziona(elemento);
    elemento.setAttribute("aria-expanded", "true");
    sigliaAperta = elemento;
  }

  Array.prototype.slice.call(document.querySelectorAll("main abbr")).forEach(function (sigla) {
    var termine = sigla.textContent.replace(/\s+/g, " ").trim();
    if (!glossario[normalizza(termine)] && !(sigla.getAttribute("title") || "").trim()) return;
    sigla.classList.add("sigla-attiva");
    sigla.setAttribute("tabindex", "0");
    sigla.setAttribute("aria-expanded", "false");
    sigla.addEventListener("click", function (evento) {
      evento.stopPropagation();
      if (sigliaAperta === sigla) chiudiDefinizione();
      else mostraDefinizione(sigla);
    });
    sigla.addEventListener("keydown", function (evento) {
      if (evento.key !== "Enter" && evento.key !== " ") return;
      evento.preventDefault();
      if (sigliaAperta === sigla) chiudiDefinizione();
      else mostraDefinizione(sigla);
    });
  });

  document.addEventListener("click", function (evento) {
    if (riquadro && !evento.target.closest(".definizione-sigla")) chiudiDefinizione();
  });
  window.addEventListener("resize", function () {
    if (riquadro && sigliaAperta) posiziona(sigliaAperta);
  });

  Array.prototype.slice.call(document.querySelectorAll("dl.glossario")).forEach(function (dl, indice) {
    var voci = [];
    var figli = Array.prototype.slice.call(dl.children);
    figli.forEach(function (nodo, posizione) {
      if (nodo.tagName !== "DT") return;
      var dd = figli[posizione + 1];
      if (!dd || dd.tagName !== "DD") return;
      voci.push({ dt: nodo, dd: dd, testo: normalizza(nodo.textContent + " " + dd.textContent) });
    });
    if (voci.length < 10) return;

    var contenitore = document.createElement("div");
    contenitore.className = "cerca-glossario";
    var idCampo = "cerca-glossario-" + indice;
    var etichetta = document.createElement("label");
    etichetta.setAttribute("for", idCampo);
    etichetta.textContent = "Cerca nel glossario";
    var campo = document.createElement("input");
    campo.type = "search";
    campo.id = idCampo;
    campo.setAttribute("placeholder", "Scrivi una parola, per esempio registrazione");
    campo.setAttribute("autocomplete", "off");
    var esito = document.createElement("p");
    esito.className = "esito";
    esito.setAttribute("role", "status");
    contenitore.appendChild(etichetta);
    contenitore.appendChild(campo);
    contenitore.appendChild(esito);
    dl.parentNode.insertBefore(contenitore, dl);

    campo.addEventListener("input", function () {
      var cerca = normalizza(campo.value);
      if (!cerca) {
        voci.forEach(function (voce) {
          voce.dt.hidden = false;
          voce.dd.hidden = false;
        });
        esito.textContent = "";
        return;
      }
      var trovate = 0;
      voci.forEach(function (voce) {
        var visibile = voce.testo.indexOf(cerca) !== -1;
        voce.dt.hidden = !visibile;
        voce.dd.hidden = !visibile;
        if (visibile) trovate++;
      });
      if (trovate === 0) esito.textContent = "Nessuna voce trovata.";
      else if (trovate === 1) esito.textContent = "1 voce su " + voci.length;
      else esito.textContent = trovate + " voci su " + voci.length;
    });
  });

  var schemi = dati.schemi || {};

  function preparaSchema(area) {
    var nome = area.dataset.schema;
    var scheda = schemi[nome];
    var svg = area.querySelector("svg");
    if (!scheda || !svg || !scheda.punti || scheda.punti.length === 0) return;
    var figura = area.closest("figure") || area.parentNode;

    var suggerimento = document.createElement("p");
    suggerimento.className = "suggerimento-schema";
    suggerimento.textContent = scheda.suggerimento || "Tocca una parte dello schema per leggere che cosa fa.";
    figura.insertBefore(suggerimento, area);

    var pannello = document.createElement("div");
    pannello.className = "spiegazione-schema vuota";
    pannello.setAttribute("role", "status");
    pannello.textContent = "Nessuna parte selezionata.";
    if (area.nextSibling) figura.insertBefore(pannello, area.nextSibling);
    else figura.appendChild(pannello);

    var gruppi = [];
    var trascinamento = false;
    var partenza = null;

    function mostra(gruppo, punto) {
      gruppi.forEach(function (g) {
        g.classList.toggle("attivo", g === gruppo);
      });
      pannello.classList.remove("vuota");
      pannello.textContent = "";
      var titolo = document.createElement("span");
      titolo.className = "termine";
      titolo.textContent = punto.etichetta;
      var testo = document.createElement("p");
      testo.textContent = punto.testo;
      pannello.appendChild(titolo);
      pannello.appendChild(testo);
    }

    scheda.punti.forEach(function (punto) {
      var gruppo = svg.querySelector('[id="' + punto.id + '"]');
      if (!gruppo) return;
      gruppi.push(gruppo);
      gruppo.classList.add("punto-schema");
      gruppo.setAttribute("tabindex", "0");
      gruppo.setAttribute("role", "button");
      gruppo.setAttribute("aria-label", punto.etichetta);

      try {
        var riquadroParte = gruppo.getBBox();
        var margine = 8;
        var alone = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        alone.setAttribute("class", "alone-punto");
        alone.setAttribute("x", riquadroParte.x - margine);
        alone.setAttribute("y", riquadroParte.y - margine);
        alone.setAttribute("width", riquadroParte.width + margine * 2);
        alone.setAttribute("height", riquadroParte.height + margine * 2);
        alone.setAttribute("rx", "10");
        gruppo.insertBefore(alone, gruppo.firstChild);
      } catch (e) {}

      gruppo.addEventListener("pointerdown", function (evento) {
        trascinamento = false;
        partenza = { x: evento.clientX, y: evento.clientY };
      });
      gruppo.addEventListener("pointermove", function (evento) {
        if (!partenza) return;
        if (Math.abs(evento.clientX - partenza.x) > 8 || Math.abs(evento.clientY - partenza.y) > 8) {
          trascinamento = true;
        }
      });
      gruppo.addEventListener("click", function () {
        if (trascinamento) {
          trascinamento = false;
          return;
        }
        mostra(gruppo, punto);
      });
      gruppo.addEventListener("keydown", function (evento) {
        if (evento.key !== "Enter" && evento.key !== " ") return;
        evento.preventDefault();
        mostra(gruppo, punto);
      });
    });

    if (gruppi.length === 0) {
      suggerimento.remove();
      pannello.remove();
    }
  }

  Array.prototype.slice.call(document.querySelectorAll(".area-scorrevole[data-schema]")).forEach(preparaSchema);

  document.addEventListener("keydown", function (evento) {
    if (evento.key !== "Escape") return;
    if (menuAperto()) chiudiMenu(true);
    else if (riquadro) {
      var ancora = sigliaAperta;
      chiudiDefinizione();
      if (ancora) ancora.focus({ preventScroll: true });
    }
  });
})();
