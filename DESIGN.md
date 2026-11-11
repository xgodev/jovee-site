# JoVee site — design direction

Direction taken from real music-software sites, rendered headless at 1440 on
2026-11-11 and studied as data (patterns only, nothing copied):

| Ref | What we take |
|---|---|
| yousician.com | Split block: a solid brand-colour panel on one half, a full-bleed photo on the other, edge to edge, no gap. Light sections between coloured ones. Row of photo tiles, one per instrument, with a label under each. Pill buttons. Bold sans headings ~48px, grey body ~18px. |
| splice.com | Feature block on a dark page: a rounded container, solid colour panel with dark text on the left, the real app screen floating on a dark area on the right. Dark text on a bright panel. |
| bandlab.com | Each product in the family gets its own label (symbol + product name) above its headline. |
| ableton.com, moises.ai | Hero: one full-bleed photo of people making music, big headline set straight on it. |

Rejected as references: teenage.engineering (one product, no family), fender.com/play (rendered empty).

## Rules that come out of the refs
- **Each product owns a block in its colour.** The page alternates three block types so no two neighbours look alike: *split* (Yousician), *panel + screen on dark* (Splice), *light editorial* (Yousician white sections).
- **Not all black.** Dark only for hero, the Splice-type blocks and footer; light (`--paper`) sections in between.
- **Text on a colour panel is dark ink**, as on Splice's yellow panel (≥ 4.5:1 with `--ink-d` for every colour except Tone, 3.9:1). Tone's panel uses light text (`--ink-l`, 4.7:1), as on Yousician's purple block.
- **Product symbol on its own colour panel** sits on a dark rounded chip, or it disappears into the panel.

## Colour
| Token | Value | Role |
|---|---|---|
| `--night` | #0e1013 | dark sections, top bar, footer |
| `--paper` | #f4f1ea | light sections |
| `--ink-d` | #121418 | text on paper and on colour panels |
| `--ink-d2` | #3d424b | body text on paper/panels |
| `--ink-l` | #f4f1ea / `--ink-l2` #b9bec7 | text on dark |
| `--rig` #1F8FE5, `--studio` #1FA37A, `--jam` #E89A12, `--tone` #7C5CE0, `--lut` #B8693A, `--live` #E5484D, `--school` #E0A21F | | panel fill of that product's block only |

## Type
Owner (2026-11-11): prefers thin, delicate type — no heavy or condensed headings.
Large light headings as on moises.ai's hero.
- Hero headline: Barlow 200, 88px/1.02, tracking -0.025em.
- Section headings: Barlow 300, 54px/1.1, tracking -0.02em.
- Product label, buttons: Barlow 500. Body: Barlow 400 20px/1.55, max 34em. Never below 18px (owner: readability).
- Archivo 900 only in the JoVee wordmark. No Bebas Neue, no 600+ weights elsewhere.

## Spacing, shape
- 8px scale; sections 120px top/bottom; content width 1200px.
- Radius: 16px for Splice-type containers and tiles, 999px for pills. No shadows except the floating app screen (one: `0 30px 60px -20px #000a`).

## Components
- Top bar: wordmark + app links + language menu (globe icon and the current language, menu below) on the right. No YouTube button there (owner, 2026-11-11: "horrível"); YouTube lives in the footer.
- Language: the visitor's own pick (saved) first, then the browser's language when JoVee has it, English otherwise (owner, 2026-11-11).
- Review renders and screenshots sent to the owner are taken in English (owner, 2026-11-11).
- Pill button: 52px high, Barlow 600 18px; dark pill on colour/paper, paper pill on dark.
- Imagery: `assets/photos/*.webp` for people, `assets/loops/*.mp4` (poster `.jpg`) for app screens, `assets/jovee-*-symbol.svg` for icons. No third-party or gear brand names.
