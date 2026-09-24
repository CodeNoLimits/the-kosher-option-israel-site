(function () {
  "use strict";
  const copy = window.TKO_DICT || {};
  const key = "tko-lang";
  const valid = ["he", "fr", "en"];
  const root = document.documentElement;
  let lang = valid.includes(root.lang) ? root.lang : "he";
  let audio = null;
  const audioButton = document.querySelector("[data-audio]");
  const heroFilm = document.querySelector(".hero-film");
  if (heroFilm && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const source = heroFilm.querySelector("source[data-src]");
    const startFilm = () => {
      if (!source || source.hasAttribute("src") || document.visibilityState !== "visible") return;
      source.src = source.dataset.src;
      heroFilm.load();
      heroFilm.play().catch(() => {});
    };
    const scheduleFilm = () => window.setTimeout(startFilm, 1800);
    if (document.readyState === "complete") scheduleFilm();
    else window.addEventListener("load", scheduleFilm, { once: true });
    document.addEventListener("visibilitychange", startFilm);
  }

  function stopAudio() {
    if (audio) { audio.pause(); audio.currentTime = 0; }
    if (audioButton) {
      audioButton.setAttribute("aria-pressed", "false");
      const label = audioButton.querySelector("[data-i18n]");
      if (label) label.textContent = copy[lang].hListen;
    }
  }
  function apply(next) {
    if (!valid.includes(next)) return;
    stopAudio();
    lang = next;
    root.lang = next;
    root.dir = next === "he" ? "rtl" : "ltr";
    const text = copy[next] || {};
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const value = text[el.dataset.i18n];
      if (value != null) el.textContent = value;
    });
    document.querySelectorAll("[data-lang]").forEach(el => el.setAttribute("aria-pressed", String(el.dataset.lang === next)));
    document.querySelector("[data-menu-trigger]")?.setAttribute("aria-label", text.hMenu || "Menu");
    document.querySelector(".object-image")?.setAttribute("aria-label", `360° — ${text.hOpen3d || "Open 3D"}`);
    document.title = text.title_home || "The Kosher Option Israel";
    try { localStorage.setItem(key, next); } catch (_) {}
  }
  document.querySelectorAll("[data-lang]").forEach(el => el.addEventListener("click", () => apply(el.dataset.lang)));
  apply(lang);

  const menu = document.querySelector("[data-menu-trigger]");
  const drawer = document.getElementById("site-drawer");
  function toggleMenu(open) {
    drawer.hidden = !open;
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
    if (open) drawer.querySelector("a")?.focus();
  }
  menu.addEventListener("click", () => toggleMenu(drawer.hidden));
  drawer.querySelectorAll("a").forEach(el => el.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !drawer.hidden) { toggleMenu(false); menu.focus(); }
  });

  const visual = document.querySelector(".journey-visual");
  const steps = [...document.querySelectorAll("[data-step]")];
  function selectStep(index) {
    steps.forEach((el, i) => {
      const active = i === index;
      el.classList.toggle("is-active", active);
      el.setAttribute("aria-selected", String(active));
    });
    visual.dataset.active = String(index);
  }
  steps.forEach((el, i) => {
    el.addEventListener("click", () => selectStep(i));
    el.addEventListener("keydown", e => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const next = (i + (e.key === "ArrowDown" ? 1 : steps.length - 1)) % steps.length;
      selectStep(next);
      steps[next].focus();
    });
  });

  if (audioButton) {
    audioButton.addEventListener("click", async () => {
      if (audio && !audio.paused) { stopAudio(); return; }
      audio = new Audio("audio/elevenlabs/hero-" + lang + ".mp3");
      audio.addEventListener("ended", stopAudio, { once: true });
      try {
        await audio.play();
        audioButton.setAttribute("aria-pressed", "true");
        audioButton.querySelector("[data-i18n]").textContent = copy[lang].hStop;
      } catch (_) { stopAudio(); }
    });
  }

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const items = document.querySelectorAll(".section-index, .manifesto-body, .journey-heading, .restaurant-copy, .object-grid > div, .library-grid > div:first-child");
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("in-view"); io.unobserve(entry.target); }
    }), { threshold: 0.08 });
    items.forEach(el => { el.classList.add("can-reveal"); io.observe(el); });
    setTimeout(() => items.forEach(el => el.classList.add("in-view")), 1500);
  }
})();
