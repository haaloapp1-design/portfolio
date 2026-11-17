# Ghulam Abbas portfolio

A static portfolio website. Plain HTML, CSS and JavaScript, no framework and no
packages. It is hosted free on GitHub Pages from the `main` branch, root folder.

## Layout of the repo

| Path | What it is |
| --- | --- |
| `index.html` | The whole page: hero, projects, teaching, skills, about, contact |
| `css/style.css` | All styles. Colours and fonts are variables at the top |
| `js/main.js` | Draws the project list, filters, mobile menu |
| `projects/<slug>/project.json` | One folder per project. The source of truth |
| `data/projects.js` | GENERATED from the project folders. Never edit by hand |
| `scripts/build-projects.mjs` | Regenerates `data/projects.js` |
| `new-projects/` | Inbox. Ghulam drops rough material here for a new project |
| `assets/` | Profile photo (`profile.png` or `profile.jpg`), favicon |

## Adding a project (the main recurring task)

When Ghulam says "add the new project", "add my project" or runs `/add-project`:

1. Look in `new-projects/`. Each sub-folder is one project to add. It may hold
   notes in any form (a `notes.txt`, a README, a pasted description) and
   screenshots. If the folder is empty or missing, ask him for: name, one-line
   summary, what it does, tech used, status, and any links.
2. Pick a slug: lower case, words joined with hyphens, for example `seer-notes`.
3. Create `projects/<slug>/project.json` using the schema below. Write the text
   in the same voice as the existing projects: first person, plain words, two or
   three sentences, say what problem it solves. Do not invent features, users,
   numbers or links. If something is unknown, leave it out and ask.
4. Images: copy the best screenshot to `projects/<slug>/cover.png` (or .jpg /
   .webp). Landscape, about 1600 x 1100, under 400 KB. The build script finds a
   file named `cover.*` on its own. With no cover, the site draws a coloured
   title card from `color` and `short`, which is fine.
5. Run `node scripts/build-projects.mjs`. It validates every project and
   rewrites `data/projects.js`. Fix anything it reports.
6. Delete the processed folder from `new-projects/` (keep `new-projects/README.md`).
7. Open `index.html` in a browser, or check the generated data, to confirm the
   project appears and the filter for its category works.
8. Commit and push: `git add -A && git commit -m "Add project: <Title>" && git push`.
   GitHub Pages updates the live site within a minute or two.

If Node is not available, edit `data/projects.js` by hand in the same shape the
script produces, and say so in the commit message.

## project.json schema

```json
{
  "title": "Seer Notes",
  "short": "Seer Notes",
  "tagline": "A fast notes app for voice, photos and text",
  "description": "Two or three plain sentences.",
  "category": "Apps",
  "status": "In development",
  "year": "2026",
  "tech": ["Flutter", "Dart"],
  "color": "#27348b",
  "featured": false,
  "order": 20,
  "links": { "live": "", "repo": "", "store": "" }
}
```

- Required: `title`, `tagline`, `description`, `category`, `status`, `year`.
- `short`: one or two words shown large on the title card when there is no cover.
- `category`: reuse an existing one where it fits: `Apps`, `AI`, `Web and tools`,
  `Education`. A new category automatically gets its own filter button.
- `status`: honest wording. `Live`, `Published`, `In use` show green.
  `In development`, `Live pilot` show amber. Anything else shows blue.
- `featured`: `true` puts it in the large two-up cards at the top. Keep exactly
  two featured projects. When featuring a new one, un-feature the older one.
- `order`: smaller numbers come first. New projects usually go near the top, so
  give a low number and shift others if needed.
- `links`: include only real, working URLs. Leave out empty ones.

## Updating or removing a project

Edit or delete its folder in `projects/`, run the build script, commit, push.

## Other content

Teaching history, skills, about and contact details are written directly in
`index.html`. Edit them there.

## Design rules

- Keep the look as it is unless Ghulam asks for a design change. Palette:
  indigo `#27348b`, ink `#141a3a`, madder red `#bf3a2b`, turmeric `#e8b02e`,
  paper `#f3f5fb`. Fonts: Sofia Sans Extra Condensed (headings), Sofia Sans
  (text), Newsreader italic (greeting lines only).
- The page must stay mobile friendly. After layout changes check widths of
  390px and 1440px for horizontal scrolling.
- No build tools, frameworks or npm packages. The site must work by opening
  `index.html` directly and on GitHub Pages.
- Do not publish his phone number or home address on the site.
