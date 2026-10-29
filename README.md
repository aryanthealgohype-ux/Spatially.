# Archivue — The Courtyard Residence

An original warm-ivory / deep forest-green architectural spatial experience and website featuring eight responsive HTML pages, a custom-furnished courtyard residence 3D model (GLB), editable parametric generation source code, and a standalone offline interactive tour.

## Key Updates & Features
- **Brand Identity**: Reimagined as **Archivue.** (*Spatial Architecture, Made Tangible*), with a custom axonometric prism logo mark and bespoke favicon.
- **Enhanced Typography & Scale**: Scaled base typography (`17px`), larger headlines with `Plus Jakarta Sans` and `Playfair Display`, comfortable line-heights, and expansive layouts.
- **Refreshed Original Copy**: Comprehensive architectural narrative across all pages—eliminating generic template copy with authentic spatial terminology.
- **Revised Transparent Pricing**:
  - **Starter Blueprint**: $49 (1 complete project, 48h turnaround)
  - **Studio Suite**: $129 (3 projects, $43/space, styling revisions)
  - **Enterprise Practice**: $389 (10 projects, $38.90/space, dedicated visualizer, 4K render captures)
- **Interactive 3D Walkthrough**: Real 3D geometry rendered via Three.js (WebGL with software canvas fallback), featuring orbit controls, dual day/evening lighting, and dedicated fixed-room camera views.

## Run and Edit

Requirements for rebuilding: Node.js 20+ and npm. Serving the generated website does not require Node.

```sh
npm ci
npm run model
npm run build
python scripts/package.py
npm run check
python -m http.server 8080 --directory dist
```

Open `http://localhost:8080/`. Use an HTTP server for the multipage website; its assets and navigation use root-relative paths. Production is a static `dist/` deployment. All Three.js dependencies are bundled locally; no runtime CDN is required by the custom viewer.

The **standalone `dist/tour.html`** embeds the model, JavaScript, and CSS. Copy just this file to another device or host. It makes zero external asset fetches. A modern browser with WebGL is preferred; a simpler canvas renderer projects the same real GLB triangles if WebGL is unavailable.

## Pages

- `/` — Home with interactive 5-stage architectural journey and spotlights.
- `/how-it-works/` — Five-stage spatial methodology narrative.
- `/projects/` — Curated architectural portfolio and external showcase.
- `/projects/courtyard-house/` — Dedicated Courtyard Residence explorer, specs, and model downloads.
- `/delivery/` — Turnkey deliverables: instant share link, portfolio embed code, and offline package.
- `/pricing/` — Transparent per-project tiers ($49 / $129 / $389) and feature matrix.
- `/questions/` — In-depth architectural, technical, and delivery FAQ.
- `/start/` — Local plan validation and client project brief generation.
- `/tour.html` — Standalone, zero-install 3D tour.

Legacy home hashes `#delivery`, `#pricing`, `#faq`, `#start`, and `#chapter-1` map to their respective destinations; `#how` opens the homepage transformation demonstration.

## Model Specifications & Dimensions

`dist/assets/courtyard-house.glb` is actual 3D geometry: 41 material batches, 74,890 vertices, and 88,452 triangles (~2.3 MB) with embedded solid materials and zero external textures. Every wall, opening, piece of furniture, floorboard, tree, car, and path is geometry.

- **Envelope**: ~30 m width × 8.8 m depth main residence body, set on an illustrative ~32 m × 18 m landscaped site.
- **Ceiling & Wall**: Standardized 190 mm structural walls with 2.8 m interior clear ceiling height.
- **Layout**: West social wing (great room, culinary kitchen, concealed scullery), central open-air landscaped courtyard with specimen tree, north terrace, and eastern private wing (primary suite with walk-in wardrobe and ensuite bath, two family bedrooms, executive guest suite, and study).
- **Source**: `model-source/courtyard-house.mjs` is the editable procedural source; `scripts/export-model.mjs` compiles it into GLB.

## Viewer Controls

- **Orbit**: Click/touch and drag to rotate.
- **Zoom**: Scroll wheel, pinch, or keyboard `+` / `-`.
- **Pan / Reset**: Press `R` to reset the camera to the default isometric cutaway.
- **Lighting**: Toggle between afternoon daylight and warm golden-hour evening light.
- **Room Views**: Select calibrated perspective viewpoints (Living room, Courtyard, Kitchen, Master bedroom, etc.).
- **Fullscreen**: Click Expand or press Escape to exit fullscreen modal mode.

## Deliverables

- `dist/`: Complete deployable static website with local assets.
- `dist/tour.html`: Fully self-contained offline 3D house viewer.
- `dist/assets/courtyard-house.glb`: Custom architectural GLB binary.
- `model-source/`, `src/`, `scripts/`, `package.json`: Full source code and asset compilation scripts.
- `dist/downloads/courtyard-model-source.zip`: Model generator source package.
- `dist/downloads/spatially-complete.zip`: Complete project archive.
- `QA.md`, `glb-validation.json`: Verification and test records.
