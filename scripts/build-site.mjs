// Builds the finished website into the _site folder.
//   1. runs the blog build (Markdown posts -> blog pages)
//   2. copies the website files into _site
//   3. fills in every <!-- @include ... --> line from the components/ folder
// GitHub runs this on every save. To try it on your own computer: npm run site
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { expandIncludes, rootFor } from "./lib/components.mjs";

const OUT = "_site";
// Things that belong to the build, not to the website.
const SKIP = new Set([
  "_site", ".git", ".github", ".vscode", "node_modules", "templates", "content", "components",
  "HIDDEN-FILES-visible-copies", ".pages.yml", "package.json", "package-lock.json",
  ".gitignore", ".DS_Store",
]);
const skip = (name) => SKIP.has(name) || /^BLOG-.*\.md$/.test(name);

execFileSync("node", ["scripts/build-blog.mjs"], { stdio: "inherit" });

fs.rmSync(OUT, { recursive: true, force: true });
function copy(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    if (skip(entry.name)) continue;
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) copy(src, dest);
    else fs.copyFileSync(src, dest);
  }
}
copy(".", OUT);

let pages = 0;
function fill(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) fill(file);
    else if (entry.name.endsWith(".html")) {
      const html = fs.readFileSync(file, "utf8");
      if (!html.includes("@include")) continue;
      const root = rootFor(path.relative(OUT, file));
      fs.writeFileSync(file, expandIncludes(html, { root }));
      pages++;
    }
  }
}
fill(OUT);
console.log(`Site built in ${OUT}/ (components filled into ${pages} pages).`);
