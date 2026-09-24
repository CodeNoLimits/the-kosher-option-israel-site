/*
  Pièce « plat éclaté ».

  Brancher dans une page du site (le HTML vit à côté du dossier pieces/) :

    <link rel="stylesheet" href="pieces/eclate.css">
    <div id="eclate">
      <p>Sceau, couvercle, plat, certificat. Pad autochauffant : option.
      Exemple — pas un certificat, sans logo de rabbanut.</p>
    </div>
    <script src="pieces/eclate.js"></script>

  Le script remplace le contenu de #eclate, ou de [data-piece="eclate"]
  s’il n’y a pas d’id. Sans script, le paragraphe français reste lisible.
  Souris : le plat se décompose au survol. Doigt : au premier appui,
  et un second appui le referme. Clavier : Entrée ou Espace.
  Ordre, du haut vers le bas : sceau, couvercle, plat, certificat,
  puis le pad autochauffant marqué option.
  Légendes hébreu, français, anglais. Le feuillet est un exemple :
  pas un certificat, pas de logo de rabbanut.
*/
(function () {
  "use strict";

  var COPY = {
    seal: { he: "פס סגירה", fr: "Bande témoin", en: "Tamper strip" },
    lid: { he: "מכסה", fr: "Couvercle", en: "Lid" },
    plat: { he: "מנה", fr: "Plat", en: "Dish" },
    cert: { he: "תעודה", fr: "Certificat", en: "Certificate" },
    pad: { he: "כרית חימום עצמי", fr: "Pad autochauffant", en: "Self-heating pad" },
    option: { he: "אפשרות", fr: "option", en: "optional" },
    hint: { he: "ריחוף או אצבע", fr: "Survol ou doigt", en: "Hover or finger" },
    note: {
      he: "דוגמה — לא תעודה, בלי סמל רבנות",
      fr: "Exemple — pas un certificat, sans logo de rabbanut",
      en: "Example — not a certificate, no rabbinate logo"
    },
    sr: {
      he: "פירוק המנה לשכבות",
      fr: "Décomposer le plat en couches",
      en: "Split the dish into layers"
    }
  };

  var ORDER = ["seal", "lid", "plat", "cert", "pad"];

  var GLYPH = {
    seal: '<span class="seal"><span class="seal-ring"></span></span>',
    lid:
      '<span class="lid">' +
        '<span class="lid-edge"></span>' +
        '<span class="lid-top"></span>' +
        '<span class="lid-knob"></span>' +
      "</span>",
    plat:
      '<span class="plat">' +
        '<span class="plat-shadow"></span>' +
        '<span class="plat-edge"></span>' +
        '<span class="plat-face">' +
          '<span class="food food-a"></span>' +
          '<span class="food food-b"></span>' +
        "</span>" +
      "</span>",
    cert:
      '<span class="cert">' +
        '<span class="cert-rule"></span>' +
        '<span class="cert-words">' +
          '<span lang="he" dir="rtl">דוגמה</span>' +
          '<span lang="fr">exemple</span>' +
          '<span lang="en">example</span>' +
        "</span>" +
      "</span>",
    pad: '<span class="pad"><span class="pad-tag">option</span></span>'
  };

  function tri(row) {
    return (
      '<span lang="he" dir="rtl">' + row.he + "</span>" +
      '<span class="eclate-dot" aria-hidden="true">·</span>' +
      '<span lang="fr">' + row.fr + "</span>" +
      '<span class="eclate-dot" aria-hidden="true">·</span>' +
      '<span lang="en">' + row.en + "</span>"
    );
  }

  function names(key) {
    var row = COPY[key];
    return (
      '<span class="eclate-names">' +
        '<span lang="he" dir="rtl">' + row.he + "</span>" +
        '<span lang="fr">' + row.fr + "</span>" +
        '<span lang="en">' + row.en + "</span>" +
      "</span>"
    );
  }

  function mount() {
    var root = document.getElementById("eclate") || document.querySelector("[data-piece=\"eclate\"]");
    if (!root || root.getAttribute("data-ready") === "1") return;
    root.setAttribute("data-ready", "1");
    root.classList.add("eclate");
    root.setAttribute("data-piece", "eclate");

    var layers = ORDER.map(function (key, i) {
      var option = key === "pad" ? " is-option" : "";
      return (
        '<span class="eclate-layer eclate-' + key + option + '">' +
          '<span class="eclate-glyph">' + GLYPH[key] + "</span>" +
          '<span class="eclate-num">' + (i + 1) + "</span>" +
        "</span>"
      );
    }).join("");

    var items = ORDER.map(function (key, i) {
      var opt = "";
      if (key === "pad") {
        opt =
          '<span class="eclate-opt">' +
            '<span lang="he" dir="rtl">' + COPY.option.he + "</span>" +
            '<span lang="fr">' + COPY.option.fr + "</span>" +
            '<span lang="en">' + COPY.option.en + "</span>" +
          "</span>";
      }
      return (
        "<li" + (key === "pad" ? ' class="is-option"' : "") + ">" +
          '<span class="eclate-idx">' + (i + 1) + "</span>" +
          names(key) +
          opt +
        "</li>"
      );
    }).join("");

    var note =
      '<span lang="he" dir="rtl">' + COPY.note.he + "</span>" +
      '<span lang="fr">' + COPY.note.fr + "</span>" +
      '<span lang="en">' + COPY.note.en + "</span>";

    root.innerHTML =
      '<p class="eclate-hint" id="eclate-hint">' + tri(COPY.hint) + "</p>" +
      '<button type="button" class="eclate-stage" aria-pressed="false" aria-describedby="eclate-legend eclate-note">' +
        '<span class="eclate-sr" lang="fr"></span>' +
        '<span class="eclate-stack" aria-hidden="true">' + layers + "</span>" +
      "</button>" +
      '<ol class="eclate-legend" id="eclate-legend">' + items + "</ol>" +
      '<p class="eclate-note" id="eclate-note">' + note + "</p>";

    var stage = root.querySelector(".eclate-stage");
    var sr = root.querySelector(".eclate-sr");
    var hot = false;
    var pinned = false;
    var touchDown = false;
    var blockHoverUntil = 0;

    function pack() {
      var lang = document.documentElement.lang;
      if (lang === "he" || lang === "en") return lang;
      return "fr";
    }

    function syncName() {
      var code = pack();
      sr.lang = code;
      sr.dir = code === "he" ? "rtl" : "ltr";
      sr.textContent = COPY.sr[code];
    }

    function paint() {
      var open = hot || pinned;
      root.classList.toggle("is-open", open);
      stage.setAttribute("aria-pressed", open ? "true" : "false");
    }

    function onEnter(e) {
      if (e.pointerType === "touch") return;
      if (Date.now() < blockHoverUntil) return;
      hot = true;
      paint();
    }

    function onLeave(e) {
      if (e.pointerType === "touch") return;
      hot = false;
      paint();
    }

    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "touch") return;
      blockHoverUntil = Date.now() + 900;
      touchDown = true;
      hot = true;
      paint();
    }, { passive: true });

    stage.addEventListener("pointerup", function (e) {
      if (e.pointerType !== "touch") return;
      var toggle = touchDown;
      touchDown = false;
      hot = false;
      if (toggle) pinned = !pinned;
      paint();
    }, { passive: true });

    stage.addEventListener("pointercancel", function () {
      touchDown = false;
      hot = false;
      paint();
    });

    stage.addEventListener("click", function () {
      if (Date.now() < blockHoverUntil) return;
      pinned = !pinned;
      paint();
    });

    stage.addEventListener("focus", function () {
      if (Date.now() < blockHoverUntil) return;
      if (stage.matches(":focus-visible")) {
        hot = true;
        paint();
      }
    });

    stage.addEventListener("blur", function () {
      hot = false;
      paint();
    });

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);

    syncName();
    if (window.MutationObserver) {
      var obs = new MutationObserver(syncName);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    }
    paint();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
