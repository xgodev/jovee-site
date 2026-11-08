// Responsibility: point every installer link at its file in the latest JoVee Rig release.

// Installers are published on xgodev/jovee-release. Nothing is hardcoded: the
// latest release is read live, and each link keeps the releases page as fallback.
const API = 'https://api.github.com/repos/xgodev/jovee-release/releases/latest';

// Asset names come from jovee-release's release workflow.
const PATTERNS = {
  'mac-dmg': /macos-universal\.dmg$/i,
  'win-msi': /windows-x64\.msi$/i,
  'x64-appimage': /linux-x86_64\.AppImage$/i,
  'x64-deb': /_amd64\.deb$/i,
  'x64-rpm': /\.x86_64\.rpm$/i,
  'arm-appimage': /linux-aarch64\.AppImage$/i,
  'arm-deb': /_arm64\.deb$/i,
  'arm-rpm': /\.aarch64\.rpm$/i,
};

export async function loadRelease() {
  try {
    const r = await fetch(API);
    if (!r.ok) return;
    const rel = await r.json();
    const assets = rel.assets || [];
    document.querySelectorAll('[data-asset]').forEach(a => {
      const re = PATTERNS[a.dataset.asset];
      const hit = re && assets.find(x => re.test(x.name));
      if (hit) a.href = hit.browser_download_url;
    });
    const v = document.querySelector('[data-release-version]');
    if (v && rel.tag_name) v.textContent = rel.tag_name;
  } catch (e) { /* offline or rate-limited: the links keep the releases page */ }
}
