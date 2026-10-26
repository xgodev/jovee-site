import { wireTheme } from './theme.js';
import { wireShotTheme, syncShots } from './shot-theme.js';
import { wireReveal } from './reveal.js';
import { loadSections } from './sections.js';
import { loadRelease } from './release.js';
import { wireCaptureDemo } from './capture-demo.js';
import { detectLang, applyLang, wireLangSwitch } from './i18n.js';

wireTheme();
wireShotTheme();
loadSections().then(() => {
  wireReveal(document);
  wireLangSwitch(document);
  wireCaptureDemo(document);
  syncShots(document);
  loadRelease().then(() => applyLang(detectLang()));
});
