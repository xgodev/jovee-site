// Responsibility: show the page in the visitor's language (one of JoVee's nine languages).

const LANGS = ['en', 'pt-BR', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', 'ko-KR', 'zh-CN', 'hi-IN'];
const STORAGE_KEY = 'jovee-lang';

export function detectLang() {
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked: use the browser language */ }
  if (LANGS.includes(saved)) return saved;
  // The browser's language when JoVee has it, English otherwise (owner, 2026-11-11).
  const nl = (navigator.language || 'en').toLowerCase();
  return LANGS.find(l => nl.startsWith(l.slice(0, 2).toLowerCase())) || 'en';
}

export async function applyLang(lang) {
  let dict = {};
  try {
    const r = await fetch(`i18n/${lang}.json`, { cache: 'no-cache' });
    if (r.ok) dict = await r.json();
  } catch (e) { /* offline: the inline English stays */ }
  document.documentElement.lang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode: the choice lasts this visit */ }
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const v = dict[el.dataset.i18nAlt];
    if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
    const v = dict[el.dataset.i18nAriaLabel];
    if (v !== undefined) el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('[data-i18n-content]').forEach(el => {
    const v = dict[el.dataset.i18nContent];
    if (v !== undefined) el.content = v;
  });
  document.querySelectorAll('[data-lang-switch] button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  document.querySelectorAll('[data-lang-switch]').forEach(sw => {
    const on = sw.querySelector(`button[data-lang="${lang}"]`);
    const cur = sw.querySelector('[data-lang-cur]');
    if (on && cur) cur.textContent = on.textContent;
    sw.open = false;
  });
}

export function wireLangSwitch() {
  document.querySelectorAll('[data-lang-switch] button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  document.addEventListener('click', e => document.querySelectorAll('details[data-lang-switch][open]').forEach(d => { if (!d.contains(e.target)) d.open = false; }));
}
