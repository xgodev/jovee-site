// Responsibility: start the page's scripts once it has loaded.
import { detectLang, applyLang, wireLangSwitch } from './i18n.js';
import { loadRelease } from './release.js';
import { wireReveal } from './reveal.js';

wireLangSwitch();
applyLang(detectLang());
loadRelease();
wireReveal();
