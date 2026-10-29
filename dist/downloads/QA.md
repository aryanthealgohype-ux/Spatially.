# Verification record — 29 October 2026

## Automated checks

- Eight HTML pages exist, each with a single H1.
- Internal asset/navigation/download links and declared fragment destinations are checked against actual files.
- glTF Validator checks the final GLB; see `glb-validation.json`.
- The standalone tour embeds a byte-identical copy of the validated GLB and has no external script or stylesheet references.
- Layout data contains four bedrooms, a courtyard, and the modeled wall/opening segments.
- Sketchfab model ID and visible Baezeni attribution are present in Gallery.
- Both downloadable ZIPs are actual archives; Python ZIP CRC checks verify their contents.
- esbuild successfully bundles application and tour JavaScript.

## Browser verification

The managed cloud browser has WebGL disabled. Browser checks use the real GLB through the canvas triangle renderer; the WebGL shading/shadow path cannot be visually verified in this environment. Third-party browser-extension metadata errors are unrelated to this website.

Verified in the browser:

- The custom GLB loads in the dedicated explorer and the single-file tour over HTTP.
- Top-down and dollhouse views show living/kitchen to the left, central courtyard and four bedrooms to the right, with terrace, parking and garden.
- Stage navigation reaches all five stages, and reverses from stage 4 to 1 and 0. The furnished-overhead and tilted 3D stages were inspected.
- Dragging changes the camera (`18.72,30.16,32.24` to `-12.90,40.15,22.83` in the tested full-window view).
- Keyboard orbit and zoom change the camera; reset, evening selection, fullscreen/close and Escape exit respond. Living-room and master-bedroom fixed viewpoints were selected; the living-room eye position is 1.65 m.
- Actual iframe viewports at 390 and 768 CSS px (375 / 753 px content width after scrollbars) were checked for all eight pages. Document scrollWidth equaled clientWidth in every check. Desktop pages were also visually reviewed.
- Mobile menu expands and collapses. Focus styles and reduced-motion rules were inspected in source; a screen-reader or OS reduced-motion test was not performed.
- The local form accepts a generated PNG drawing, rejects an unsupported TXT, requires project details and acknowledgment, and downloads a real JSON brief. The downloaded brief was captured by the browser.
- Copy-link and copy-embed actions show success feedback; displayed embed code points to the current tour. Cross-runtime clipboard reading was not a reliable verification signal, so clipboard persistence is not claimed verified.
- ZIP fetching completes with a real ZIP signature and displays the actual file name. The browser automation download event timed out for the ZIP; an OS-saved ZIP from that browser is not claimed verified. Both original downloadable ZIPs pass local CRC/content checks and are supplied directly as deliverables.
- The external Sketchfab iframe loads its own attribution/UI but reports a 3D-viewer error in this WebGL-disabled browser. The direct model and creator links remain visible.
- No website-origin blocking console errors were observed during final viewer/form checks. Browser-extension metadata errors and the external Sketchfab rendering limitation are separate.


## Explicit limits

- No physical phone, tablet, Safari or low-memory device was available.
- Browser WebGL was unavailable, so GPU appearance, real-device frame rate and mobile pinch gestures are not claimed tested.
- Reduced-motion support is implemented and inspected in source; the browser's operating-system preference was not emulated.
- The single HTML tour is structurally self-contained and tested over HTTP; an actual offline file:// launch on a separate device is not claimed.
- Sketchfab iframe is external. Its successful playback and original-model download permission were not verified. A direct link and creator attribution are provided.
- No payment, submission, conversion, automatic external publishing or continuous walking service is connected or represented as working.
