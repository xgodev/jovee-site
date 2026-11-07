// Responsibility: point the download buttons at the latest JoVee Rig installer for the visitor's system.

// Installers are published on xgodev/jovee-release. Nothing is hardcoded: the
// latest release is read live, and the releases page stays as the fallback.
const API = 'https://api.github.com/repos/xgodev/jovee-release/releases/latest';

// Asset names come from jovee-release's release workflow.
const PATTERNS = {
  mac: /macos-universal\.dmg$/i,
  windows: /windows-x64\.msi$/i,
  'linux-x86_64': /linux-x86_64\.AppImage$/i,
  'linux-aarch64': /linux-aarch64\.AppImage$/i,
};

async function detectSystem() {
  const uad = navigator.userAgentData;
  let platform = (uad && uad.platform) || navigator.platform || '';
  const ua = navigator.userAgent || '';
  if (/android|iphone|ipad/i.test(ua)) return null;
  if (/mac/i.test(platform) || /mac os x/i.test(ua)) return 'mac';
  if (/win/i.test(platform) || /windows/i.test(ua)) return 'windows';
  if (/linux/i.test(platform) || /linux/i.test(ua)) {
    let arch = '';
    try {
      if (uad && uad.getHighEntropyValues) arch = (await uad.getHighEntropyValues(['architecture'])).architecture || '';
    } catch (e) { /* not exposed: read the user agent */ }
    return /arm|aarch64/i.test(arch + ' ' + ua) ? 'linux-aarch64' : 'linux-x86_64';
  }
  return null;
}

export async function loadRelease() {
  const system = await detectSystem();
  if (!system) return;
  try {
    const r = await fetch(API);
    if (!r.ok) return;
    const rel = await r.json();
    const asset = (rel.assets || []).find(a => PATTERNS[system].test(a.name));
    if (!asset) return;
    document.querySelectorAll('[data-download]').forEach(a => { a.href = asset.browser_download_url; });
  } catch (e) { /* offline or rate-limited: the buttons keep the releases page */ }
}
