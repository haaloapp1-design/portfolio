#!/usr/bin/env node
// Reads every projects/<slug>/project.json and writes data/projects.js,
// which the website loads. Run after adding or editing a project:
//
//     node scripts/build-projects.mjs
//
// No packages to install. Needs Node 18 or newer.

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = join(root, "projects");
const outFile = join(root, "data", "projects.js");

const REQUIRED = ["title", "tagline", "description", "category", "status", "year"];
const COVER_NAMES = ["cover.png", "cover.jpg", "cover.jpeg", "cover.webp"];

const projects = [];
const problems = [];

for (const slug of readdirSync(projectsDir).sort()) {
  const dir = join(projectsDir, slug);
  if (!statSync(dir).isDirectory() || slug.startsWith("_") || slug.startsWith(".")) continue;

  const file = join(dir, "project.json");
  if (!existsSync(file)) { problems.push(`${slug}: no project.json`); continue; }

  let p;
  try { p = JSON.parse(readFileSync(file, "utf8")); }
  catch (e) { problems.push(`${slug}: project.json is not valid JSON (${e.message})`); continue; }

  for (const key of REQUIRED) {
    if (p[key] === undefined || p[key] === "") problems.push(`${slug}: missing "${key}"`);
  }

  // Use a cover image if one is in the folder, unless project.json names one.
  if (!p.cover) p.cover = COVER_NAMES.find((n) => existsSync(join(dir, n))) || "";
  else if (!existsSync(join(dir, p.cover))) { problems.push(`${slug}: cover "${p.cover}" not found`); p.cover = ""; }

  projects.push({ slug, ...p });
}

if (problems.length) {
  console.error("Fix these before publishing:\n  - " + problems.join("\n  - "));
  process.exit(1);
}

// Featured first, then by "order" (small numbers first), then newest year.
projects.sort((a, b) =>
  (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
  (a.order ?? 999) - (b.order ?? 999) ||
  String(b.year).localeCompare(String(a.year)) ||
  a.title.localeCompare(b.title)
);

writeFileSync(
  outFile,
  "// GENERATED FILE. Do not edit by hand.\n" +
  "// Edit projects/<name>/project.json, then run: node scripts/build-projects.mjs\n" +
  "window.PROJECTS = " + JSON.stringify(projects, null, 2) + ";\n"
);

console.log(`Wrote data/projects.js with ${projects.length} projects:`);
for (const p of projects) console.log(`  ${p.featured ? "*" : " "} ${p.title}  [${p.category}]`);
