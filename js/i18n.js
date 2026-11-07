// Responsibility: show the page in the visitor's language (English, Portuguese or Spanish).

const LANGS = ['en', 'pt-BR', 'es-ES'];
const STORAGE_KEY = 'jovee-lang';

export function detectLang() {
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage blocked: use the browser language */ }
  if (LANGS.includes(saved)) return saved;
  const nl = (navigator.language || 'en').toLowerCase();
  if (nl.startsWith('pt')) return 'pt-BR';
  if (nl.startsWith('es')) return 'es-ES';
  return 'en';
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
  document.querySelectorAll('[data-i18n-content]').forEach(el => {
    const v = dict[el.dataset.i18nContent];
    if (v !== undefined) el.content = v;
  });
  document.querySelectorAll('[data-lang-switch] button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
}

export function wireLangSwitch() {
  document.querySelectorAll('[data-lang-switch] button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
}
