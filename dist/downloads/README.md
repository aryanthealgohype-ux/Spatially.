# Spatially — The Courtyard House

An original warm-ivory / forest-green architectural website with eight real HTML pages, a custom furnished courtyard-house GLB, editable parametric model source, and a standalone tour.

## Run and edit

Requirements for rebuilding: Node.js 20+ and npm. Serving the generated website does not require Node.

```sh
npm ci
npm run model
npm run build
python3 scripts/package.py
npm run check
python3 -m http.server 8080 --directory dist
```

Open http://localhost:8080/ . Use an HTTP server for the multipage website; its assets and navigation use root-relative paths. For a domain subdirectory, change those paths before deploying. Production is a static `dist/` deployment. All Three.js dependencies are bundled locally; no runtime CDN is required by the custom viewer.

The **standalone `dist/tour.html`** embeds the model, JavaScript and CSS. Copy just this file to another device or host. It makes no asset fetches for the house. A modern browser with WebGL is preferred; a simpler canvas renderer projects the same real GLB triangles if WebGL is unavailable. The tour offers orbit and fixed room viewpoints, not a free-walking camera. No installation or account is needed by the file itself. Hosted access follows the hosting provider's access settings; this Sites preview is owner-private.

## Pages

- `/` — Home and complete transformation.
- `/how-it-works/` — Five-stage sticky narrative.
- `/projects/` — Custom project and separately attributed Sketchfab inspiration.
- `/projects/courtyard-house/` — Custom-house explorer, notes and model downloads.
- `/delivery/` — Actual copy-link, copy-embed and downloads.
- `/pricing/` — Original reference service packages.
- `/questions/` — Six original reference questions and implementation clarifications.
- `/start/` — Local file selection, validation and JSON brief download.
- `/tour.html` — Additional standalone explorer.

Legacy home hashes `#delivery`, `#pricing`, `#faq`, `#start` and `#chapter-1` map to their new pages; `#how` opens the homepage demonstration.

## Model files and assumptions

`dist/assets/courtyard-house.glb` is actual 3D geometry: 41 material/category batches, 74,890 vertices and 88,452 triangles; approximately 2.3 MB, with embedded solid materials and no external textures. Every wall, opening, piece of furniture, floorboard, tree, car and path is geometry. This is not an image projected onto a plane. `model-source/courtyard-house.mjs` is the editable source; `scripts/export-model.mjs` exports it using Three.js GLTFExporter. No Blender was used, so no `.blend` file is claimed. The GLB can also be imported into Blender or another glTF-capable editor. `dist/assets/model-data.json` records wall/room layout and provenance.

The hand-drawn, dimensioned and furnished images were studied as design references only. They are not included in the website, embedded in the GLB, used as textures, or shipped as website assets. The sketch and clean-plan stages are regenerated SVG from the same model layout; the furnished stage is the actual GLB in overhead view.

The supplied drawings visibly annotate approximately **30 m × 12 m**, but their image aspect ratios and printed room areas do not agree. These annotations are not proof of a 360 m² internal floor area. The concept uses a 30 m width and approximately 8.8 m main-body depth, chosen to retain the visible room proportions. The garden/site boundary is illustrative, approximately 32 × 18 m including the presentation base. Units are metres, Y is up and north is -Z; the entrance faces south. The original generator coordinates are translated by (-15, 0, -4.5) in the exported scene.

Assumed: wall height 2.8 m, thickness 190 mm, opening and glazing heights, internal dimensions, furniture sizes, finishes, garden extents and plant species. The roof is deliberately omitted. The viewer scales walls and glazing down for a dollhouse cutaway and restores wall height in fixed room viewpoints. Lighting direction and evening colors are aesthetic, not a geographic daylight study. There is no verified total internal area, survey, construction, structural or regulatory accuracy.

Preserved relationships: central courtyard; foyer/entrance to its south; living, dining, kitchen, island and pantry to the west; family lounge and study east of the courtyard; master suite, walk-in and ensuite at the north-east; bedrooms 2 and 3 plus guest bedroom along the southern private wing; WC/shower/bathroom spaces in the eastern circulation band; rear terrace to the north; garden, paths and two-car parking to the south-west. The four-bedroom count is visible in all three drawings. Furniture is simplified original geometry rather than manufacturer product replicas.

## Viewer behavior

Drag to orbit; wheel/pinch zoom in the dedicated explorer and fullscreen; +/- zoom and arrow keys orbit while the viewer container is focused; R resets. Top-down, dollhouse, daylight, evening, fullscreen/close/Escape and ten room views are included. Room views are fixed camera viewpoints with orbit disabled; use Dollhouse to return. Fullscreen uses an accessible fixed viewport overlay and keyboard focus loop, so it works without a browser fullscreen permission.

The story intentionally lets page scrolling continue; wheel zoom is disabled there. Five label buttons navigate chapters. SVG transitions into the same furnished GLB, then walls grow and the camera tilts. Scrolling up reverses the sequence. Mobile places a shorter sticky visual above the chapter text. CSS/JS respect the reduced-motion preference. Intersection observers pause offscreen rendering. Rendering is on demand, GPU pixel density is capped, and geometry is batched by material/category. The emergency canvas path has simpler lighting/transparency and can show painter-order artifacts at close range; WebGL is recommended for the best appearance.

## Reference audit, attribution and licenses

Live reference inspected on 29 October 2026: https://www.spatially.pro/ . Its public HTML/CSS and linked `main.js`, `plan.js`, `plan2d.js`, `floors.js` and `scene3d.js` were accessible. All linked navigation was to sections of a single page. Its public code constructs the apartment procedurally; no downloadable GLB was verified. The displayed ZIP/scene.glb package was illustrative text, not a verified download. Original artwork/fonts/scripts were not redistributed because no asset redistribution license was established. This implementation and custom geometry are newly authored. The retained service copy and brand were supplied/requested by the user; service claims are distinguished from this implementation.

Original prices verified: Single, 1 apartment/building $29.99; Studio pack, 3 for $69.99 ($23.33 each, 22% saving, one free revision each, non-expiring credits); Practice pack, 15 for $249.99 ($16.67 each, 44% saving, revisions, own logo, priority). The reference's checkout URLs were empty.

Sketchfab reference: **3D Premium Floorplan C10**, by **Baezeni**.
- https://sketchfab.com/3d-models/3d-premium-floorplan-c10-a2475c32d03949479b7f68dd03a9f851
- https://sketchfab.com/baezeni

The requested responsive iframe and attribution are on Gallery, with a direct link. Search retrieval returned 403, so an accessible embed, downloadable original model and reuse license could not be verified. The model is not bundled, copied, or represented as the custom house.

Three.js is MIT licensed; its license is included in `THIRD_PARTY_LICENSES.txt`. System fonts are used. esbuild is a build tool, not a runtime dependency; gltf-validator is used only for checks.

## Integrations and explicit limits

- **No upload/conversion backend.** File selection is local to the browser session. Up to five PDF/DWG/DXF/PNG/JPG/JPEG files, 50 MiB each. Validation checks extension, size, non-empty files and count; it does not parse CAD content. Project name, email and acknowledgment are required. The exported JSON brief contains names/sizes and details; drawing contents are not included or transmitted. Nothing persists after reloading.
- **No checkout or payment service.** Package selection only preselects the local brief. No fabricated charge, upload, processing or conversion states exist.
- **No continuous first-person walking.** Fixed room views are explicitly named and labeled. No collision/navigation system is claimed.
- **No external auto-publishing.** Copy actions generate a real tour link/iframe for the current origin. Clipboard failure offers selectable text. Public visitors need hosting with appropriate access; copying a private link does not grant access.
- No surveyed accuracy, fast delivery guarantee, actual credit balance, automated furniture revision service or roof/exterior tour is claimed.

## Deliverables

- `dist/`: complete deployable multipage website with local assets.
- `dist/tour.html`: single-file self-contained house viewer.
- `dist/assets/courtyard-house.glb`: custom GLB.
- `model-source/`, `src/`, `scripts/`, `package.json`, lockfile: editable model and website source.
- `dist/downloads/courtyard-model-source.zip`: editable generator and export instructions.
- `dist/downloads/spatially-complete.zip`: complete source + built website + standalone tour, excluding recursive download packages and original reference images.
- `QA.md`, `glb-validation.json`: actual checks and verification limits.
