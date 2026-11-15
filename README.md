# MOONKEEPER: Beyond Earth

**One spaceship. Three worlds. One mission beyond Earth.**

A cinematic showcase site for [MOONKEEPER](https://ruibinray.github.io/NASA-MoonKeeper/), a free browser game about keeping a base alive on the Moon and on Mars, built on real NASA data. This repository is the showcase only; the game lives in [RuibinRay/NASA-MoonKeeper](https://github.com/RuibinRay/NASA-MoonKeeper).

Live site: https://ruibinray.github.io/NASA-MoonWeb/

## What is on the page

1. **Launch**: a spacecraft appears out of the dark. Scrolling moves three films forwards and backwards.
2. **Three worlds**: a live 3D view of Earth, the Moon and Mars. Hover to read, click to fly there, drag to look around.
3. **Earth**: the creator, and how the project came together.
4. **Moon**: the game's story and five scenes (the impact, survival, the station's eleven rooms, the sixteen job games, the two-week night), with clips recorded from the game and its 30-second trailer.
5. **Mars**: the game's second world, with clips recorded from it.
6. **The game**: what you do, who it is for, and the keys.
7. **How it was built**: the workflow, who did what, and the architecture.
8. **Science**: Earth, Moon and Mars side by side, three small experiments, a "real or made up?" quiz, and the sources.
9. **The goal** and **Contact**.

## Run it on your computer

```bash
node tools/serve.mjs . frames 8153
```

Then open http://localhost:8153/. Any static server that can send part of a file works; that is what lets the films follow the scroll.

## Put it online

The site is a folder of plain files: no build step.

- **GitHub Pages with Actions (this repository):** pushing to `main` runs `.github/workflows/pages.yml`, which publishes the whole folder. In the repository's Settings → Pages, "Source" must be "GitHub Actions".
- **Any other static host:** upload the folder as it is.

All links inside the site are relative, so it works at any address.

## How it is made

| File | What it does |
|---|---|
| `index.html` | the page and its words |
| `css/site.css` | the look: one dark palette, two typefaces |
| `js/data.js` | what the site says: lists, tables, sources. Every statement was checked against the game's repository or the creator's portfolio |
| `js/space.js` | the live 3D scene: stars, the spacecraft, Earth, the Moon and Mars (Three.js) |
| `js/main.js` | scrolling, the films, the three worlds, the experiments, the sound |
| `lib/three.module.min.js` | Three.js r160 |
| `assets/video/` | the cinematic clips and their first frames |
| `assets/clips/` | clips recorded from the game |
| `assets/tex/` | the pictures wrapped round the three worlds |
| `tools/` | how the films and the Mars globe were made, and a small server |
| `docs/HIGGSFIELD_SHOTS.md` | every cinematic shot: its prompt, where it is used, how to make it again |

The page still works if something fails to load: without the 3D scene, a film or the animation library, every section is readable and every button works. People who ask their device for less motion get the page without pinned scrolling.

## Credits and what was made with SI

SI (Super Intelligence) is the NASA Space Apps name for AI tools.

| What | How it was made |
|---|---|
| Cinematic stills and clips (`assets/video/`) | **SI:** Higgsfield image model and Seedance 2.5, from the prompts in `docs/HIGGSFIELD_SHOTS.md`. Each is shown with a visible "SI-generated" mark |
| The site's code and text | **SI:** written with Claude (Anthropic) under human direction |
| Clips in `assets/clips/` | recorded from the game, frame by frame |
| Earth and Moon pictures | NASA (Blue Marble, CGI Moon Kit), as used in the game |
| Mars globe | drawn by `tools/mars_tex.mjs` from NASA's MOLA elevation data: the heights are real, the colours are an illustration |
| 3D | [Three.js](https://threejs.org/) r160 (MIT licence) |
| Scroll animation | [GSAP](https://gsap.com/) and ScrollTrigger, loaded from cdnjs |
| Typefaces | Chakra Petch and Inter (Open Font License), from Google Fonts |
| Sound | made in the page from plain tones; off until you switch it on |

MOONKEEPER is a student project for the NASA Space Apps Challenge 2026. It is not made, certified or endorsed by NASA, and it uses no NASA logo.
