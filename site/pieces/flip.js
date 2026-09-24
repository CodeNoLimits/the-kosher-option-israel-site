/* Brancher : <link rel="stylesheet" href="pieces/flip.css"><div data-flip></div><script src="pieces/flip.js"></script> */
(function () {
  var CARDS = [
    {
      n: "1",
      he: { title: "השולחן", text: "נשאר יחד." },
      fr: { title: "La table", text: "Elle reste." },
      en: { title: "The table", text: "It stays." }
    },
    {
      n: "2",
      he: { title: "מנה סגורה", text: "מגיעה מכוסה." },
      fr: { title: "Le plat fermé", text: "Il arrive couvert." },
      en: { title: "The closed dish", text: "It arrives covered." }
    },
    {
      n: "3",
      he: { title: "החותם", text: "על העטיפה." },
      fr: { title: "Le sceau", text: "Sur l’emballage." },
      en: { title: "The seal", text: "On the wrap." }
    },
    {
      n: "4",
      he: { title: "שורה בתפריט", text: "עוד אחת." },
      fr: { title: "La ligne au menu", text: "Une de plus." },
      en: { title: "The line on the menu", text: "One more." }
    }
  ];

  function boot() {
    document.querySelectorAll("[data-flip]").forEach(mount);
  }

  function mount(root) {
    if (root.getAttribute("data-flip-ready") === "1") return;
    root.setAttribute("data-flip-ready", "1");

    var seq = document.querySelectorAll("[data-flip-ready]").length;
    var nameId = "tko-flip-name-" + seq;
    var hintId = "tko-flip-hint-" + seq;
    var liveId = "tko-flip-live-" + seq;

    root.classList.add("tko-flip");
    root.setAttribute("role", "region");
    root.setAttribute("aria-labelledby", nameId);
    root.setAttribute("aria-describedby", hintId);
    if (!root.hasAttribute("tabindex")) root.setAttribute("tabindex", "0");
    root.textContent = "";

    var name = document.createElement("p");
    name.id = nameId;
    name.className = "tko-flip-sr";
    name.appendChild(langSpan("he", "דפדוף"));
    name.appendChild(langSpan("fr", "Feuilletage"));
    name.appendChild(langSpan("en", "Page turn"));

    var stage = document.createElement("div");
    stage.className = "tko-flip-stage";

    var deckFar = document.createElement("div");
    deckFar.className = "tko-flip-deck tko-flip-deck-far";
    deckFar.setAttribute("aria-hidden", "true");
    var deckNear = document.createElement("div");
    deckNear.className = "tko-flip-deck";
    deckNear.setAttribute("aria-hidden", "true");

    var sheet = document.createElement("div");
    sheet.className = "tko-flip-sheet";
    var front = document.createElement("div");
    front.className = "tko-flip-face tko-flip-front";
    var back = document.createElement("div");
    back.className = "tko-flip-face tko-flip-back";
    back.setAttribute("aria-hidden", "true");
    sheet.appendChild(front);
    sheet.appendChild(back);
    stage.appendChild(deckFar);
    stage.appendChild(deckNear);
    stage.appendChild(sheet);

    var hint = document.createElement("p");
    hint.id = hintId;
    hint.className = "tko-flip-hint";
    hint.appendChild(langSpan("he", "אצבע, עכבר, או חצים."));
    hint.appendChild(langSpan("fr", "Doigt, souris ou flèches."));
    hint.appendChild(langSpan("en", "Finger, mouse, or arrow keys."));

    var live = document.createElement("p");
    live.id = liveId;
    live.className = "tko-flip-sr";
    live.setAttribute("aria-live", "polite");
    live.setAttribute("aria-atomic", "true");

    root.appendChild(name);
    root.appendChild(stage);
    root.appendChild(hint);
    root.appendChild(live);

    var index = 0;
    var last = CARDS.length - 1;
    var turn = 0;
    var busy = false;
    var tracking = false;
    var pointerId = 0;
    var startX = 0;
    var startY = 0;
    var lastX = 0;
    var lastT = 0;
    var velocity = 0;
    var axis = "";
    var moved = false;
    var dragMode = 0;
    var progress = 0;
    var raf = 0;
    var gen = 0;
    var seen = false;
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function reduced() {
      return !!(motion && motion.matches);
    }

    function isRtl() {
      var el = document.documentElement;
      var lang = (el.lang || "").toLowerCase();
      return el.dir === "rtl" || lang.indexOf("he") === 0;
    }

    function packs(card) {
      var lang = (document.documentElement.lang || "").toLowerCase();
      if (lang.indexOf("he") === 0) return [card.he];
      if (lang.indexOf("en") === 0) return [card.en];
      if (lang.indexOf("fr") === 0) return [card.fr];
      if (!document.documentElement.hasAttribute("lang")) return [card.he, card.fr, card.en];
      return [card.fr];
    }

    function paint(t) {
      if (t < 0) t = 0;
      if (t > 1) t = 1;
      turn = t;
      sheet.style.setProperty("--turn", String(Math.round(t * 1000) / 1000));
      if (!reduced() && t > 0.001) sheet.setAttribute("data-hot", "1");
      else sheet.removeAttribute("data-hot");
    }

    function fill(face, card) {
      face.textContent = "";
      if (!card) return;
      var inner = document.createElement("div");
      inner.className = "tko-flip-inner";
      var folio = document.createElement("p");
      folio.className = "tko-flip-folio";
      folio.setAttribute("aria-hidden", "true");
      folio.textContent = card.n;
      var copy = document.createElement("div");
      copy.className = "tko-flip-copy";
      var rule = document.createElement("span");
      rule.className = "tko-flip-rule";
      rule.setAttribute("aria-hidden", "true");
      var title = document.createElement("h2");
      title.className = "tko-flip-title";
      var lede = document.createElement("p");
      lede.className = "tko-flip-lede";
      ["he", "fr", "en"].forEach(function (lang) {
        title.appendChild(langSpan(lang, card[lang].title));
        lede.appendChild(langSpan(lang, card[lang].text));
      });
      copy.appendChild(rule);
      copy.appendChild(title);
      copy.appendChild(lede);
      inner.appendChild(folio);
      inner.appendChild(copy);
      face.appendChild(inner);
    }

    function announce() {
      var card = CARDS[index];
      var line = packs(card).map(function (pack) {
        return pack.title + ". " + pack.text;
      }).join(" ");
      live.textContent = (index + 1) + " / " + CARDS.length + ". " + line;
    }

    function settle() {
      fill(front, CARDS[index]);
      fill(back, CARDS[index + 1] || null);
      paint(0);
      dragMode = 0;
      progress = 0;
      if (seen) announce();
      seen = true;
    }

    function run(from, to, ms, done) {
      var token = ++gen;
      if (reduced()) {
        done();
        return;
      }
      var t0 = performance.now();
      function frame(now) {
        if (token !== gen) return;
        var k = Math.min(1, (now - t0) / ms);
        var eased = 1 - Math.pow(1 - k, 3);
        paint(from + (to - from) * eased);
        if (k < 1) raf = requestAnimationFrame(frame);
        else {
          raf = 0;
          done();
        }
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    }

    function go(dir) {
      if (busy || tracking) return;
      if (dir > 0 && index >= last) return;
      if (dir < 0 && index <= 0) return;
      if (reduced()) {
        index += dir;
        settle();
        return;
      }
      busy = true;
      if (dir > 0) {
        fill(front, CARDS[index]);
        fill(back, CARDS[index + 1]);
        paint(0);
        run(0, 1, 680, function () {
          index += 1;
          busy = false;
          settle();
        });
      } else {
        fill(back, CARDS[index]);
        fill(front, CARDS[index - 1]);
        paint(1);
        run(1, 0, 680, function () {
          index -= 1;
          busy = false;
          settle();
        });
      }
    }

    function signed(dx) {
      return isRtl() ? dx : -dx;
    }

    function applyDrag(dx) {
      var width = stage.getBoundingClientRect().width || 1;
      var p = signed(dx) / (width * 0.72);
      var want = p > 0.02 ? 1 : p < -0.02 ? -1 : 0;
      if (want > 0 && index >= last) want = 0;
      if (want < 0 && index <= 0) want = 0;
      progress = Math.min(1, Math.abs(p));
      if (reduced()) {
        dragMode = want;
        return;
      }
      if (want === 0) {
        paint(dragMode < 0 ? 1 : 0);
        return;
      }
      if (dragMode !== want) {
        dragMode = want;
        if (want > 0) {
          fill(front, CARDS[index]);
          fill(back, CARDS[index + 1]);
        } else {
          fill(back, CARDS[index]);
          fill(front, CARDS[index - 1]);
        }
      }
      paint(want > 0 ? progress : 1 - progress);
    }

    function release() {
      var mode = dragMode;
      var amount = progress;
      var flick = signed(velocity);
      var commit = false;
      if (mode > 0 && flick < -0.45) commit = false;
      else if (mode < 0 && flick > 0.45) commit = false;
      else if (mode > 0 && (amount > 0.32 || flick > 0.45)) commit = true;
      else if (mode < 0 && (amount > 0.32 || flick < -0.45)) commit = true;

      if (reduced()) {
        if (commit) index += mode;
        busy = false;
        settle();
        return;
      }
      if (!mode) {
        busy = false;
        settle();
        return;
      }
      busy = true;
      if (!commit) {
        run(turn, mode < 0 ? 1 : 0, 420, function () {
          busy = false;
          settle();
        });
        return;
      }
      if (mode > 0) {
        run(turn, 1, 640, function () {
          index += 1;
          busy = false;
          settle();
        });
      } else {
        run(turn, 0, 640, function () {
          index -= 1;
          busy = false;
          settle();
        });
      }
    }

    function clickTurn(clientX) {
      var rect = stage.getBoundingClientRect();
      var x = (clientX - rect.left) / (rect.width || 1);
      var rtl = isRtl();
      if ((!rtl && x > 0.72) || (rtl && x < 0.28)) go(1);
      else if ((!rtl && x < 0.28) || (rtl && x > 0.72)) go(-1);
    }

    stage.addEventListener("pointerdown", function (e) {
      if (busy) return;
      if (e.button != null && e.button !== 0) return;
      tracking = true;
      pointerId = e.pointerId;
      startX = lastX = e.clientX;
      startY = e.clientY;
      lastT = performance.now();
      velocity = 0;
      axis = "";
      moved = false;
      dragMode = 0;
      progress = 0;
      stage.classList.add("is-drag");
      try { stage.setPointerCapture(e.pointerId); } catch (err) {}
      try { root.focus({ preventScroll: true }); } catch (err2) { root.focus(); }
      e.preventDefault();
    }, { passive: false });

    stage.addEventListener("pointermove", function (e) {
      if (!tracking || e.pointerId !== pointerId) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        moved = true;
        if (axis === "y") {
          tracking = false;
          stage.classList.remove("is-drag");
          try { stage.releasePointerCapture(pointerId); } catch (err) {}
          return;
        }
      }
      if (axis !== "x") return;
      var now = performance.now();
      var dt = now - lastT;
      if (dt > 0) velocity = (e.clientX - lastX) / dt;
      lastX = e.clientX;
      lastT = now;
      applyDrag(dx);
    }, { passive: false });

    stage.addEventListener("pointerup", function (e) {
      if (!tracking || e.pointerId !== pointerId) return;
      tracking = false;
      stage.classList.remove("is-drag");
      try { stage.releasePointerCapture(pointerId); } catch (err) {}
      if (axis !== "x") {
        if (!moved) clickTurn(e.clientX);
        return;
      }
      release();
    });

    stage.addEventListener("pointercancel", function (e) {
      if (!tracking || e.pointerId !== pointerId) return;
      gen += 1;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      tracking = false;
      busy = false;
      dragMode = 0;
      stage.classList.remove("is-drag");
      settle();
    });

    stage.addEventListener("click", function (e) {
      e.stopPropagation();
    }, true);

    root.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      var rtl = isRtl();
      var dir = 0;
      if (e.key === "ArrowDown" || e.key === (rtl ? "ArrowLeft" : "ArrowRight")) dir = 1;
      else if (e.key === "ArrowUp" || e.key === (rtl ? "ArrowRight" : "ArrowLeft")) dir = -1;
      else return;
      e.preventDefault();
      go(dir);
    });

    if (motion && motion.addEventListener) {
      motion.addEventListener("change", function () {
        gen += 1;
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        tracking = false;
        busy = false;
        dragMode = 0;
        stage.classList.remove("is-drag");
        settle();
      });
    }

    settle();
  }

  function langSpan(lang, text) {
    var s = document.createElement("span");
    s.setAttribute("data-lang", lang);
    s.lang = lang;
    s.dir = lang === "he" ? "rtl" : "ltr";
    s.textContent = text;
    return s;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
