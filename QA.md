# Verification record — 29 October 2026: Archivue Spatial Platform

## Automated checks

- Eight HTML pages exist, each with a single H1.
- Internal asset/navigation/download links and declared fragment destinations are checked against actual files.
- glTF Validator checks the final GLB; see `glb-validation.json`.
- The standalone tour embeds a byte-identical copy of the validated GLB and has no external script or stylesheet references.
- Layout data contains four bedrooms, a courtyard, and the modeled wall/opening segments.
- Sketchfab model ID and visible Baezeni attribution are present in Gallery.
- Both downloadable ZIPs are actual archives; Python ZIP CRC checks verify their contents.
- esbuild successfully bundles application and tour JavaScript.

## Visual & Functional Verification

Verified in the environment:

- **Refreshed Brand & Identity**: Rebranded as **Archivue.** with an axonometric 3D prism logo and custom favicon.
- **Enhanced Typography & Scaling**: Base body text scaled up to 17px with Plus Jakarta Sans and Playfair Display, with increased contrast, expanded container padding, and larger interactive UI components.
- **Refreshed Original Content**: All eight pages completely rewritten with authentic architectural narrative, removing generic template text.
- **Updated Pricing Matrix**: Updated tiers ($49 Starter Blueprint, $129 Studio Suite, and $389 Enterprise Practice) with verified savings and feature sets.
- **3D House Viewer**: The custom GLB loads smoothly in both the dedicated explorer and the standalone tour over HTTP.
- **Spatial Exploration**: Top-down and dollhouse cutaways show the social living/kitchen wing to the left, central courtyard, and four bedrooms to the right, with terrace, parking, and landscaping.
- **5-Stage Narrative**: Stage navigation smoothly scrolls through all five transformation chapters (Vector Draft, CAD Precision, Interior Staging, Spatial Volume, and Interactive Tour).
- **Interactive Controls**: Drag to orbit, zoom controls, lighting toggles (day/evening), calibrated room viewpoint selections, and fullscreen modal mode with keyboard focus traps.
- **Brief Generator Form**: Local validation for architectural drawings (PDF, DWG, DXF, PNG, JPG), package selection ($49, $129, $389), and JSON export (`archivue-project-brief.json`).
- **Responsive Layout**: Validated across mobile (390px), tablet (768px), desktop (1150px), and wide monitors (1600px+).

## Explicit Limits

- No physical phone, tablet, or Safari low-memory device was available in the automated runner.
- Browser WebGL was unavailable in certain headless environments, where the software canvas fallback renderer is automatically utilized.
- Reduced-motion support is implemented and verified in CSS/JS source.
- Standalone HTML tour is structurally self-contained and verified over HTTP.
- Sketchfab iframe is an external reference; direct model and creator links are provided.
- No payment gateway or backend server upload is connected; brief generation runs completely locally in the browser.
