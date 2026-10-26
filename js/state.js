// Everything the page displays that isn't copy: filled in by release.js,
// read back by i18n.js when it interpolates {version}, {downloads}.
export const release = {
  version: '',
  downloadUrl: 'https://github.com/xgodev/jovee-site/releases',
  changelogUrl: 'https://github.com/xgodev/jovee-site/releases',
  betaVersion: '',
  betaUrl: '',
  totalDownloads: 0,
};

export function fmtNum(n) { return n.toLocaleString('en-US'); }
