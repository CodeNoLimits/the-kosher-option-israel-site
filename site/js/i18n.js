(function () {
  var DICT = window.TKO_DICT || {};
  var KEY = "tko-lang";

  function current() {
    var l = "fr";
    try { l = localStorage.getItem(KEY) || "fr"; } catch (e) {}
    if (!DICT[l]) l = "fr";
    return l;
  }

  function apply(l) {
    var t = DICT[l];
    if (!t) return;
    document.documentElement.lang = l;
    document.documentElement.dir = l === "he" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (t[k] == null) return;
      el.textContent = t[k];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (t[k] == null) return;
      el.setAttribute("aria-label", t[k]);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-alt");
      if (t[k] == null) return;
      el.setAttribute("alt", t[k]);
    });
    var page = document.body.getAttribute("data-page") || "home";
    document.title = t["title_" + page] || "The Kosher Option Israel";
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === l ? "true" : "false");
    });
    try { localStorage.setItem(KEY, l); } catch (e) {}
    document.documentElement.classList.remove("booting");
  }

  function probe() {
    if (document.documentElement.dataset.probed === "1") return;
    document.documentElement.dataset.probed = "1";
    var nav = document.querySelector(".nav");
    var l = current();
    var t = DICT[l] || {};
    fetch("table-3d.html", { method: "GET" }).then(function (r) {
      if (!r.ok || !nav || nav.querySelector("[data-i18n='nav3d']")) return;
      var a = document.createElement("a");
      a.href = "table-3d.html";
      a.setAttribute("data-i18n", "nav3d");
      a.textContent = (DICT[current()] || t).nav3d || "3D";
      nav.appendChild(a);
    }).catch(function () {});

    var reports = document.getElementById("reports");
    var link = document.getElementById("reports-link");
    if (!reports || !link) return;
    var candidates = ["rapports.html", "../rapports/index.html"];
    function tryAt(i) {
      if (i >= candidates.length) return;
      fetch(candidates[i], { method: "GET" }).then(function (r) {
        if (!r.ok) { tryAt(i + 1); return; }
        link.href = candidates[i];
        reports.hidden = false;
      }).catch(function () { tryAt(i + 1); });
    }
    tryAt(0);
  }

  document.querySelectorAll("[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      apply(btn.getAttribute("data-lang"));
    });
  });

  var group = document.querySelector(".langs");
  if (group) {
    group.addEventListener("keydown", function (e) {
      var buttons = Array.prototype.slice.call(group.querySelectorAll("[data-lang]"));
      var i = buttons.indexOf(document.activeElement);
      if (i < 0) return;
      var dir = 0;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") dir = 1;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") dir = -1;
      if (!dir && e.key !== "Home" && e.key !== "End") return;
      e.preventDefault();
      var next = e.key === "Home" ? buttons[0] : e.key === "End" ? buttons[buttons.length - 1] : buttons[(i + dir + buttons.length) % buttons.length];
      next.focus();
    });
  }

  var THEME_KEY = "tko-theme";
  var THEME_COLOR = { papier: "#100e0c", nuit: "#100e0c", pierre: "#100e0c" };

  function paintTheme(name) {
    if (!THEME_COLOR[name]) name = "papier";
    document.documentElement.setAttribute("data-theme", name);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLOR[name]);
    document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-theme-set") === name ? "true" : "false");
    });
    try { localStorage.setItem(THEME_KEY, name); } catch (e) {}
  }

  document.querySelectorAll("[data-theme-set]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      paintTheme(btn.getAttribute("data-theme-set"));
    });
  });

  var themeName = "papier";
  try {
    themeName = localStorage.getItem(THEME_KEY) || document.documentElement.getAttribute("data-theme") || "papier";
  } catch (e) {}
  paintTheme(themeName);

  apply(current());
  probe();
  setTimeout(function () { document.documentElement.classList.remove("booting"); }, 2600);
})();
