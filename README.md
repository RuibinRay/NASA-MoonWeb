# MOONKEEPER: Beyond Earth

**One spaceship. Three worlds. One mission beyond Earth.**

A cinematic showcase site for [MOONKEEPER](https://ruibinray.github.io/NASA-MoonKeeper/), a free browser game about keeping a base alive on the Moon and on Mars, built on real NASA data. This repository is the showcase only; the game lives in [RuibinRay/NASA-MoonKeeper](https://github.com/RuibinRay/NASA-MoonKeeper).

Live site: https://ruibinray.github.io/NASA-MoonWeb/

## What is on the page

1. **Launch**: a spacecraft appears out of the dark. Scrolling moves four films forwards and backwards; in the last one REGO, the game's robot, welcomes you aboard.

   **REGO is with you the whole way.** REGO stands in the corner of the screen, rolls as you scroll, looks toward your pointer, and says something different in every part of the page (35 lines, in `js/data.js`). Click REGO for a menu of places to go. **Quiet** stops the talking; **Hide** tucks REGO away; both choices are remembered. With the page's sound switched on REGO also speaks aloud, using the voice built into your device. REGO appears in four of the films too: in the cockpit, beside a broken solar panel on the Moon, rolling onto Mars, and waving goodbye at the end.
2. **Three worlds**: a live 3D view of Earth, the Moon and Mars. Hover to read, click to fly there, drag to look around.
3. **Earth**: the creator, and how the project came together.
4. **Moon**: the game's story and five scenes (the impact, survival, the station's eleven rooms, the sixteen job games, the two-week night), with clips recorded from the game and its 30-second trailer.
5. **Mars**: the game's second world, with clips recorded from it.
6. **The game**: what you do, who it is for, and the keys.
7. **How it was built**: the workflow, who did what, and the architecture.
8. **Science**: Earth, Moon and Mars side by side, three small experiments, a "real or made up?" quiz, and the sources.
9. **The goal**, **Contact**, and the **author**: Ruibin Jin Yao ([portfolio](https://ruibinray.github.io/Profile/)).

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
| `js/rego.js` | REGO: the same robot as in the game, built from shapes in code, and the guide in the corner of the screen |
| `lib/three.module.min.js` | Three.js r160 |
| `assets/video/` | the cinematic clips and their first frames |
| `assets/clips/` | clips recorded from the game |
| `assets/tex/` | the pictures wrapped round the three worlds |
| `tools/` | how the films and the Mars globe were made, and a small server |
| `docs/HIGGSFIELD_SHOTS.md` | every cinematic shot: its prompt, where it is used, how to make it again |

The page still works if something fails to load: without the 3D scene, a film or the animation library, every section is readable and every button works. People who ask their device for less motion get the page without pinned scrolling, and REGO stands still and shows each line at once.

### Phones, Mac and Windows

- **Phones:** film stages use the small-viewport height, so the browser's address bar does not make them jump; films are started by the first touch, as iOS requires; the header and REGO keep clear of the notch and the home bar; REGO is smaller and sits on a soft dark fade so the words stay readable; tap targets are larger and the side rail is hidden.
- **Mac:** frosted panels work in Safari; text keeps its size when a phone or tablet is turned.
- **Windows:** thin dark scrollbars instead of the wide light ones; the page declares itself dark, so form controls and scrollbars match; high-contrast mode keeps borders on buttons and cards.

Checked in a Chromium browser at desktop, tablet and phone sizes (phone by emulation). Not yet checked on a real iPhone or in Safari on a Mac.

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
