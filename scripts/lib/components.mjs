// Shared "include" helper. Pages (and the blog templates) contain lines like
//     <!-- @include navbar current="about" -->
// and this file swaps each one for the matching file in the components/ folder.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const COMPONENTS = path.resolve(here, "..", "..", "components");
const INCLUDE = /<!--\s*@include\s+([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*-->/g;

function parseAttrs(text) {
  const out = {};
  for (const m of text.matchAll(/([\w-]+)="([^"]*)"/g)) out[m[1]] = m[2];
  return out;
}

// Turns a page's depth into the "../" prefix that reaches the site's top folder.
export function rootFor(relativeFilePath) {
  const depth = relativeFilePath.split(path.sep).join("/").split("/").length - 1;
  return "../".repeat(depth);
}

export function expandIncludes(html, vars) {
  return html.replace(INCLUDE, (_, name, attrText) => {
    const file = path.join(COMPONENTS, `${name}.html`);
    if (!fs.existsSync(file)) throw new Error(`Component "${name}" not found. Expected components/${name}.html`);
    const merged = { ...vars, ...parseAttrs(attrText) };
    let part = fs.readFileSync(file, "utf8");
    // The note at the top of a component file is for you, not for visitors.
    part = part.replace(/^<!--[\s\S]*?-->\s*/, "");
    part = part.replace(/\{\{selected:([\w-]+)\}\}/g, (_m, key) => (merged.current === key ? 'class="selected" ' : ""));
    part = part.replace(/\{\{([\w-]+)(?:\|([^}]*))?\}\}/g, (_m, key, fallback) => {
      if (key in merged) return merged[key];
      if (fallback !== undefined) return fallback;
      throw new Error(`Component "${name}" needs a value for {{${key}}}.`);
    });
    return expandIncludes(part, merged);
  });
}
