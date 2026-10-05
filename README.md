# Binary Brains company website

A complete static website built with HTML, CSS, and JavaScript. No package installation or build step is required.

## Included files

| File | Purpose |
| --- | --- |
| `dist/index.html` | Page layout, service descriptions, sample projects, testimonials, figures, and project brief form |
| `dist/styles.css` | Responsive styling for desktop, tablet, and mobile |
| `dist/app.js` | Video playback, mobile navigation, project dialogs, testimonial carousel, and brief download |
| `dist/assets/hero.mp4` | Original 12 second, 1080p Binary Brains logo animation |
| `vercel.json` | Vercel settings to serve the `dist` directory |
| `.gitignore` | Excludes local deployment files and environment files from Git |
| `README.md` | Upload, preview, and deployment instructions |

The hero uses an autoplaying, muted, looping video. A play button is available if the browser blocks autoplay. The immersive web and 3D service and its related projects have been removed.

## Upload to your GitHub repository

1. Extract the ZIP on your computer.
2. Open your GitHub repository and choose **Add file → Upload files**.
3. Upload the contents of the extracted folder, including the complete `dist` folder, `vercel.json`, and this README. Preserve the folder structure.
4. Commit the upload.

Place `vercel.json` at the repository root. Do not upload only the ZIP, and do not flatten the files inside `dist`.

## Deploy the GitHub repository on Vercel

1. In Vercel, create a new project and import this GitHub repository.
2. Use the repository root as the Root Directory.
3. Choose **Other** as the Framework Preset.
4. Leave the Build Command empty and set the Output Directory to `dist` if Vercel asks. The included `vercel.json` already sets this output directory.
5. Deploy.

There are no environment variables, dependencies, or backend services required for this version.

## Preview locally

From the extracted project folder, run:

```sh
python -m http.server 8000 --directory dist
```

Then open http://localhost:8000 in your browser. Python 3 is required for this optional preview command. Serving the folder ensures the stylesheet, script, and video URLs work correctly.

## Customize the website

- Edit `dist/index.html` to update company text, services, contact information, figures, and project cards.
- Edit the `projects` and `quotes` objects in `dist/app.js` to update project details and testimonials.
- Edit `dist/styles.css` to change colors, typography, spacing, and responsive layouts.
- Replace `dist/assets/hero.mp4` to change the video while keeping the same filename.

The projects, testimonials, and company figures are labeled as illustrative samples. Replace them with verified company information before presenting them as actual client work or business results.

The project brief form downloads a text file locally. It does not send email or submit an inquiry. Connect a form service or backend if you want to receive inquiries.

## Documentation

- [Upload files to GitHub](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
- [Vercel build configuration](https://vercel.com/docs/builds/configure-a-build)
- [Vercel configuration reference](https://vercel.com/docs/project-configuration/vercel-json)
