# Binary Brains company website

A complete, dependency-free static company website. The hero uses a real looping MP4 video, with binary digits assembling the brain and wordmark together. The binary lettering stays inside the final solid wordmark outlines.

## Files

| File | Purpose |
| --- | --- |
| `dist/index.html` | Company page, services, concept projects, sample figures and testimonials |
| `dist/styles.css` | Desktop, tablet and phone layouts |
| `dist/app.js` | Device-aware video playback, navigation, project dialogs, testimonials and brief download |
| `dist/assets/hero-desktop-v3.mp4` | 12-second, 1280 × 720, 24 fps desktop video (1.63 MB) |
| `dist/assets/hero-mobile-v3.mp4` | 12-second, 640 × 640, 24 fps phone/tablet video (1.43 MB) |
| `vercel.json` | Static output directory and video cache headers |

## Performance and mobile layout

The site loads one video source: the square version at viewport widths up to 900px and the landscape version above that. Source selection happens once per page visit to avoid downloading another file when the device rotates. The video starts after the initial page paint and only when its panel is in view. It pauses when scrolled offscreen or when the tab is hidden. Manually paused video stays paused.

Devices requesting reduced motion or data saving get a play button and no automatic video download. Explicit play enables the animation. There is no logo-image background. Both videos use H.264, contain no audio, and put MP4 metadata first for progressive playback. Phones use a stacked hero layout that keeps the entire animation visible. Controls have at least 44px touch targets, and form inputs use 16px text on phones.

The immersive web/3D service and related projects remain removed. Projects, company figures and testimonials are labeled as illustrative samples. Replace these with verified company information. The project brief form downloads a text file locally; it does not send an inquiry.

## Upload to GitHub

1. Extract the ZIP.
2. Upload the extracted contents into your repository root, preserving the complete `dist` folder.
3. Commit the changes. If replacing the older site, remove its obsolete `dist/assets/hero.mp4`.

Do not upload only the ZIP or flatten the `dist` folder. No dependencies, secrets, environment variables or build command are required.

## Deploy on Vercel

Import the GitHub repository into Vercel, with the repository root as Root Directory. Choose **Other** as Framework Preset, leave Build Command empty, and use `dist` as Output Directory. The included `vercel.json` sets the output directory. An already connected Vercel project redeploys when you commit the replacement files to its connected branch.

## Preview locally

```sh
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serve the folder rather than opening the HTML file directly, so asset paths resolve correctly.

## Customize

Edit company copy and service cards in `dist/index.html`, project and testimonial data in `dist/app.js`, and styling in `dist/styles.css`. For future video changes, increment the `v3` filenames, HTML data attributes and Vercel cache rule together so browsers fetch the new media.

## Verification

JavaScript syntax, playback state transitions, local asset references, MP4 dimensions/duration/streaming metadata and final wordmark outlines were checked. No browser Lighthouse score or physical-device performance benchmark is claimed. Check your final Vercel deployment on your target devices before launch.
