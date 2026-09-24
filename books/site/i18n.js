(() => {
  const words = {
    en: {
      skip: "Skip to the covers", room: "Reading room", draft: "Draft, not signed, not a partnership.",
      draftShort: "Draft · unsigned · no partnership", heading: "Two manuscripts",
      lede: "Both drafts can be opened. Neither is signed. The manuscripts are in English.", kind: "Manuscript",
      whyStatus: "English research draft · 32 A4 pages · five labeled editorial images. Unsigned.",
      methodStatus: "English method draft · 14 A4 pages · two labeled editorial images. Unsigned.",
      turn: "Turn pages", text: "Text version", pdf: "Download PDF", enlarge: "Enlarge page",
      prev: "← Previous", next: "Next →", page: "Page", of: "of",
      readerHint: "Use the arrow keys or swipe to turn pages. On a phone, choose Text version for readable type. The manuscript is in English."
    },
    fr: {
      skip: "Aller aux couvertures", room: "Bibliothèque", draft: "Brouillons non signés. Aucun partenariat conclu.",
      draftShort: "Brouillon · non signé · aucun partenariat", heading: "Deux manuscrits",
      lede: "Les deux brouillons sont consultables. Aucun n'est signé. Les textes des livres sont en anglais.", kind: "Manuscrit",
      whyStatus: "Recherche en anglais · 32 pages A4 · cinq images éditoriales signalées. Non signé.",
      methodStatus: "Méthode en anglais · 14 pages A4 · deux images éditoriales signalées. Non signé.",
      turn: "Feuilleter", text: "Lire le texte", pdf: "Télécharger le PDF", enlarge: "Agrandir la page",
      prev: "← Précédente", next: "Suivante →", page: "Page", of: "sur",
      readerHint: "Utilisez les flèches ou balayez l'écran. Sur téléphone, choisissez Lire le texte pour une taille lisible. Le manuscrit est en anglais."
    },
    he: {
      skip: "דילוג לספרים", room: "הספרייה", draft: "טיוטות לא חתומות. אין שותפות מוסכמת.",
      draftShort: "טיוטה · ללא חתימה · ללא שותפות", heading: "שני כתבי יד",
      lede: "אפשר לעיין בשתי הטיוטות. אף אחת מהן אינה חתומה. תוכן הספרים באנגלית.", kind: "כתב יד",
      whyStatus: "טיוטת מחקר באנגלית · 32 עמודי A4 · חמש תמונות עריכה מסומנות. לא חתומה.",
      methodStatus: "טיוטת שיטה באנגלית · 14 עמודי A4 · שתי תמונות עריכה מסומנות. לא חתומה.",
      turn: "דפדוף", text: "קריאת הטקסט", pdf: "הורדת PDF", enlarge: "הגדלת העמוד",
      prev: "→ הקודם", next: "הבא ←", page: "עמוד", of: "מתוך",
      readerHint: "אפשר לדפדף בחצים או בהחלקה. בטלפון עדיף לבחור בקריאת הטקסט. כתב היד עצמו באנגלית."
    }
  };
  let lang = "he";
  try { lang = localStorage.getItem("tko-lang") || "he"; } catch {}
  if (!words[lang]) lang = "he";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  const t = words[lang];
  for (const el of document.querySelectorAll("[data-t]")) el.textContent = t[el.dataset.t] || el.textContent;
  window.tkoBooks = { lang, t };
})();
