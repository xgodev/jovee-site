// Responsibility: reveal page blocks as they scroll into view.

// Each entry: the blocks to reveal, how they enter, whether siblings enter one after another.
const BLOCKS = [
  ['.kick, .h2, .sec .lede, .bigshot, .fg-b, .step > div', 'up', false],
  ['.hw, .family .app, .list > div, .gal figure', 'up', true],
  ['.step:nth-child(odd) .ph, .fg:not(.fg-rev):not(.fg-txt) > figure', 'left', false],
  ['.step:nth-child(even) .ph, .fg-rev > figure', 'right', false],
  ['.h-copy, .h-fam h2, .h-fam .h-lead, .h-panel .scr, .h-ed .fig', 'up', false],
  ['.h-tile', 'up', true],
];
const STAGGER_MS = 80;

function belowTheFold(el) {
  return el.getBoundingClientRect().top > window.innerHeight * 0.92;
}

export function wireReveal() {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const seen = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      seen.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  for (const [selector, enter, stagger] of BLOCKS) {
    for (const el of document.querySelectorAll(selector)) {
      // What the visitor already sees stays put: only blocks still below the screen animate in.
      if (!belowTheFold(el)) continue;
      el.classList.add('rv', `rv-${enter}`);
      if (stagger) {
        const index = [...el.parentElement.children].indexOf(el);
        el.style.setProperty('--d', `${index * STAGGER_MS}ms`);
      }
      seen.observe(el);
    }
  }
  document.documentElement.classList.add('rv-on');
}
