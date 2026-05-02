# VellumFull — Deploy Guide

Your site reads directly from your Obsidian vault. No manual exporting ever.
Edit a poem in Obsidian → push to GitHub → site updates automatically.

---

## Step 1 — Install Node.js (once only)

1. Go to **https://nodejs.org** and download the LTS version
2. Run the installer — click through all defaults
3. Open **Terminal** (Cmd + Space → type Terminal → Enter)
4. Type this and press Enter to confirm it worked:
   ```
   node --version
   ```
   You should see something like `v20.11.0`

---

## Step 2 — Put the project folder in place

1. Move the `vellumfull` folder (this folder) somewhere permanent on your Mac,
   e.g. your Desktop or Documents. **Don't put it inside the VellumFull vault.**

2. Open Terminal and navigate to it:
   ```
   cd ~/Desktop/vellumfull
   ```
   (adjust the path if you put it elsewhere)

3. Install dependencies:
   ```
   npm install
   ```

---

## Step 3 — Test it locally

In Terminal (inside the vellumfull folder):
```
npm run dev
```

Open your browser to **http://localhost:4321**

You should see your site with all 374 poems loaded from your vault.
Press Ctrl+C in Terminal to stop it.

---

## Step 4 — Put it on GitHub (free)

1. Go to **https://github.com** and create a free account if you don't have one
2. Click the **+** button → **New repository**
   - Name it: `vellumfull`
   - Set it to **Private** (your poems stay private; only the built site is public)
   - Click **Create repository**

3. Back in Terminal:
   ```
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/vellumfull.git
   git push -u origin main
   ```
   (replace YOUR-USERNAME with your GitHub username)

---

## Step 5 — Deploy to Netlify (free)

1. Go to **https://netlify.com** → Sign up / Log in with GitHub
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub** → select your `vellumfull` repo
4. Build settings (Netlify usually auto-detects these, but confirm):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **Deploy site**

Your site will be live at a URL like `https://graceful-moon-abc123.netlify.app`

You can set a custom domain (e.g. vellumfull.com) in Netlify's settings for ~$12/year.

---

## Step 6 — Update the site after editing poems

After editing poems in Obsidian, in Terminal:
```
cd ~/Desktop/vellumfull
git add .
git commit -m "update poems"
git push
```

Netlify rebuilds and redeploys automatically within ~60 seconds.

---

## Customising the site

### Change your name / description
- Open `src/pages/index.astro` → find "Anatta Nergui" and edit
- Open `src/pages/about.astro` → edit the paragraph text there

### Change the vault path (if you move your vault)
- Open `src/lib/poems.js` → find the `VAULT_PATH` line at the top → update it

### Add a custom domain
- In Netlify: Site settings → Domain management → Add custom domain

---

## Troubleshooting

**"Cannot find vault" error**
→ Check the VAULT_PATH in `src/lib/poems.js` matches exactly where your vault lives

**Poems not showing**
→ Make sure your .md files have frontmatter between `---` lines at the top

**Build fails on Netlify**
→ The vault path won't work on Netlify's servers (it's your local machine path).
   See the note below.

---

## Important: Netlify needs your poems too

Because your vault is on your local machine, Netlify can't read it directly.
You have two options:

### Option A — Copy poems into the project (simplest)
Create a `poems/` folder inside `vellumfull/` and copy your `.md` files there.
Then in `src/lib/poems.js`, change:
```js
const VAULT_PATH = '/Users/anattanergui/Desktop/VellumFull';
```
to:
```js
const VAULT_PATH = new URL('../../poems', import.meta.url).pathname;
```
When you update poems in Obsidian, copy the changed files to `vellumfull/poems/` and push.

### Option B — Symlink (advanced, seamless)
Create a symbolic link so the `poems/` folder inside the project
always points to your live vault:
```
ln -s /Users/anattanergui/Desktop/VellumFull ~/Desktop/vellumfull/poems
```
Then update VAULT_PATH as in Option A. Edits in Obsidian are instantly reflected.
When you push, Git follows the symlink and includes your poems.

**Option A is recommended** if you're not comfortable with terminal.
