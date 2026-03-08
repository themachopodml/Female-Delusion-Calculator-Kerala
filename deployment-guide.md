# Deployment Guide
## Kerala Female Delusion Calculator — by @themachopodml

---

## How the Project is Structured

The calculator is intentionally split into four separate files, each with a single responsibility. Understanding why this matters makes maintaining the project much easier over time.

`index.html` is the skeleton — it defines the page structure (header, three columns, footer) and the HTML of every card, checkbox, dropdown, and button. It does not contain any styles, data, or logic directly. It loads the other files in the correct order.

`styles.css` handles all visual rules — colours, fonts, spacing, animations, layout. If you want to change how something *looks*, this is the only file you ever need to touch.

`kerala-data.js` holds only static data constants — the `H_DATA` height table, the `CAT_RATING_TIERS` scarcity tiers, and the `TOTAL_MEN` population base. If a new census is released or you want to update a percentage, this is the only file you change. Nothing in `script.js` or `index.html` needs to be touched.

`script.js` contains all the application logic — the calculation engine, animation, PNG export, share feature, and the starfield animation. It reads from `kerala-data.js` but never writes to it.

---

## The Correct Load Order in index.html

The files must be loaded in a specific order because each one depends on the previous. In your `<head>` section:

```html
<!-- 1. Google Fonts — loaded first so the rest of the page can use them -->
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- 2. Stylesheet — loaded before any JS so the page renders styled on first paint -->
<link rel="stylesheet" href="styles.css">

<!-- 3. html2canvas — must be available before script.js runs exportImage() -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
```

And just before your closing `</body>` tag:

```html
<!-- 4. Data constants — must be loaded before script.js so TOTAL_MEN, H_DATA,
        and CAT_RATING_TIERS are defined when script.js references them -->
<script src="kerala-data.js"></script>

<!-- 5. Application logic — loaded last because it depends on everything above -->
<script src="script.js"></script>
```

If you accidentally load `script.js` before `kerala-data.js`, the browser will throw a `ReferenceError: TOTAL_MEN is not defined` error the moment the user clicks Build My Prince. Load order is not optional.

---

## Deploying to GitHub Pages (Browser Method — No Git Required)

This is the simplest approach and requires no software installation.

**Step 1 — Go to your repository.** Open `https://github.com/themachopodml/Female-Delusion-Calculator-Kerala` in your browser.

**Step 2 — Upload the new files.** Click the **Add file** button near the top right of the file list, then choose **Upload files**. Drag all five files — `index.html`, `styles.css`, `kerala-data.js`, `script.js`, and `deployment-guide.md` — into the upload area at once. You can also update them one at a time by clicking on the filename, clicking the pencil icon, selecting all with `Ctrl+A`, deleting, pasting the new content, and clicking **Commit changes**.

**Step 3 — Commit the upload.** Scroll down to the **Commit changes** section. Type a brief message like `Split into separate CSS and JS files`. Leave the radio button on "Commit directly to the main branch" and click **Commit changes**.

**Step 4 — Wait for GitHub Pages to rebuild.** GitHub Pages takes 1–3 minutes to detect the change and rebuild the site. You can watch the progress by clicking the **Actions** tab in your repository — a green tick means the deployment is complete.

**Step 5 — Hard-refresh the live site.** Visit `https://themachopodml.github.io/Female-Delusion-Calculator-Kerala/` and press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac) to force your browser to discard its cached version and load the new files fresh. This step is easy to forget and causes confusion when the old version appears to still be showing.

---

## Deploying with Git (Command Line Method)

If you have Git installed and a local copy of the repository, this is faster for bulk updates.

```bash
# Navigate to your local repo folder
cd Female-Delusion-Calculator-Kerala

# Copy the new files into the repo folder (adjust paths as needed)
cp ~/Downloads/index.html .
cp ~/Downloads/styles.css .
cp ~/Downloads/kerala-data.js .
cp ~/Downloads/script.js .

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Refactor: separate CSS, data, and logic into individual files"

# Push to GitHub — Pages will rebuild automatically
git push origin main
```

---

## Updating Census Data in the Future

When a new census or NSSO survey is published, the workflow is:

1. Open `kerala-data.js` only.
2. Find the relevant percentage (for example, the `pct` value for a height threshold, or the `above` threshold for a rating tier).
3. Update the number.
4. Commit and deploy as described above.

You do not need to touch `index.html`, `styles.css`, or `script.js` at all. This is the main benefit of separating the data layer — future maintainers know exactly where to look.

---

## Testing Locally Before Deploying

Because the calculator now loads external files via `<script src="...">`, you cannot open `index.html` by double-clicking it in your file manager. Browsers block local file loading for security reasons (the CORS policy). You need a local web server instead. The easiest way with no installation is Python's built-in server:

```bash
# In the repo folder:
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser. Every time you save a change to any file, just refresh the tab to see it.

---

## Troubleshooting Common Issues

**The page shows the old version after deploying.** This is almost always a browser cache issue. Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) for a hard refresh. If the issue persists, open DevTools (`F12`), go to the Network tab, tick **Disable cache**, and reload.

**"Build My Prince" does nothing and no error appears.** Open DevTools (`F12`), click the Console tab, and look for red error messages. The most common cause is a file missing from the repository — typically `kerala-data.js` or `script.js` not being uploaded. Check that all files appear in the GitHub file list.

**The PNG export button produces a blank or black image.** This usually means html2canvas could not load the logo image because of a CORS restriction. Make sure the CDN link for html2canvas in `index.html` is present and matches exactly: `https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js`.

**The page layout looks broken on first load.** This means `styles.css` is either missing or loaded after the HTML renders. Check that the `<link rel="stylesheet" href="styles.css">` tag is inside the `<head>` section of `index.html`, not at the bottom of `<body>`.

---

## File Checklist for Each Deployment

Before pushing, confirm all of the following files are present and up to date in the repository:

- `index.html` — page structure and HTML markup
- `styles.css` — all visual rules
- `kerala-data.js` — population base, height table, rating tiers
- `script.js` — calculator logic, animation, export, sharing
- `README.md` — project documentation
- `deployment-guide.md` — this file

---

*Kerala Female Delusion Calculator · by @themachopodml · Malappuram, Kerala*
