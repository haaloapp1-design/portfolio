# Ghulam Abbas portfolio

A fast, mobile-friendly portfolio. Plain HTML, CSS and JavaScript, so it runs
free on GitHub Pages with nothing to install.

## 1. Add your photo

Save your photo as `assets/profile.png` (or `assets/profile.jpg`).

- Portrait shape, about 800 x 1000 pixels (4:5).
- Head near the top, plain background. A transparent-background PNG looks best
  inside the arch.

Until you add one, the site shows a placeholder.

## 2. Preview it

Double-click `index.html`. It opens in your browser, no server needed.

## 3. Publish free on GitHub Pages

1. On GitHub, create a new public repository. Two naming choices:
   - `YOUR-USERNAME.github.io` gives the address `https://YOUR-USERNAME.github.io/`
   - any other name, such as `portfolio`, gives `https://YOUR-USERNAME.github.io/portfolio/`
2. In this folder run:

   ```bash
   git init
   git add -A
   git commit -m "Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
   git push -u origin main
   ```

3. On GitHub open the repo, then Settings, Pages. Under "Build and deployment"
   choose Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`, Save.
4. Wait a minute or two. The live link appears on that same Pages screen.

You can also open this folder in Claude Code and say:
"Create a GitHub repo for this and publish it with GitHub Pages."

## 4. Add a new project later

1. Make a folder in `new-projects/`, for example `new-projects/my-app/`.
2. Drop in a `notes.txt` (a few lines about the project) and any screenshots.
3. In Claude Code type `/add-project`.

Claude Code follows the rules in `CLAUDE.md`: it creates the project entry,
rebuilds the site data, and pushes it live.

To do it by hand: copy any folder in `projects/`, edit its `project.json`, then
run `node scripts/build-projects.mjs` and push.

## Editing other content

- Teaching, skills, about, contact: `index.html`
- Colours and fonts: the variables at the top of `css/style.css`
- Projects: `projects/<name>/project.json`, then run the build script
