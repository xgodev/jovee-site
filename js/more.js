// Responsibility: collapses each feature list to its first three items behind a "+N" toggle.
for (const ul of document.querySelectorAll('.fg ul')) {
  const hidden = ul.children.length - 3;
  if (hidden < 1) continue;
  const b = document.createElement('button');
  b.type = 'button'; b.className = 'more-n'; b.textContent = `+${hidden}`;
  b.setAttribute('aria-expanded', 'false');
  b.addEventListener('click', () => { const o = ul.classList.toggle('open'); b.textContent = o ? '−' : `+${hidden}`; b.setAttribute('aria-expanded', String(o)); });
  ul.after(b);
}
