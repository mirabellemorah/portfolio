// Builds the blog from the Markdown files in content/blog.
//
//   content/blog/*.md  +  templates/*.html   ->   blog/index.html and blog/<post>.html
//
// Run it with:  npm run build
// GitHub runs it automatically every time you (or Pages CMS) save a change.
//
// Post links have no ".html" on purpose (clean addresses). To put ".html" back,
// add ".html" right after "slug" wherever a post address is built (search for ".slug").
//
// What it works out for you:
//   - reading time (word count divided by WORDS_PER_MINUTE)
//   - previous / next links (by publish date)
//   - the category filter buttons on the list page
//   - the share links, using each post's real public address

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { marked } from "marked";

// ---------- Settings you may want to change ----------
const SITE_URL = "https://www.mirabellemorah.com";
const WORDS_PER_MINUTE = 225;
const DEFAULT_SHARE_IMAGE = "/assets/home-page-assets/kish1.png";
const AUTHOR = "Mirabelle Morah";
// -----------------------------------------------------

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const POSTS_DIR = path.join(ROOT, "content", "blog");
const OUT_DIR = path.join(ROOT, "blog");
const ROOT_PREFIX = "../"; // every generated page lives one folder down, in blog/

const read = (...p) => fs.readFileSync(path.join(ROOT, ...p), "utf8");

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const toDate = (v) => {
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
};
const fmt = (d, month) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month, year: "numeric", timeZone: "UTC" });

// Point "assets/x.png" and "/assets/x.png" at the site root; leave full URLs alone.
const assetUrl = (p) => {
  if (!p) return "";
  if (/^(https?:)?\/\//.test(p)) return p;
  return "/" + String(p).replace(/^\/+/, "");
};
const absoluteUrl = (p) => (/^https?:/.test(p) ? p : SITE_URL + assetUrl(p));

const plainText = (md) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~]/g, " ");

const countWords = (md) =>
  plainText(md)
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
const readingTime = (md) => Math.max(1, Math.ceil(countWords(md) / WORDS_PER_MINUTE));

// Structured data for search engines. The "<" is escaped so the data can never close the script tag early.
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const authorLd = { "@type": "Person", name: AUTHOR, url: SITE_URL };

// ---------- Markdown -> HTML ----------
marked.use({
  gfm: true,
  renderer: {
    image(href, title, text) {
      const t = title ? ` title="${esc(title)}"` : "";
      return `<img src="${esc(assetUrl(href))}" alt="${esc(text)}"${t} loading="lazy" />`;
    },
  },
});

// ---------- Templates ----------
const partials = {
  header: read("templates", "partials", "header.html"),
  footer: read("templates", "partials", "footer.html"),
};

function render(templateName, vars) {
  let html = read("templates", templateName)
    .replaceAll("{{header}}", partials.header)
    .replaceAll("{{footer}}", partials.footer);
  return html.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in vars)) throw new Error(`Template ${templateName} uses {{${key}}} but the build has no value for it.`);
    return vars[key];
  });
}

// ---------- Share buttons (outline icons, same style as the footer icons) ----------
const ICONS = {
  x: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  whatsapp:
    '<path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/>',
  email:
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
};
const icon = (name) =>
  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;

function shareHtml(url, title) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const link = (name, label, href, external = true) =>
    `<a class="btn blog-share-icon" href="${esc(href)}" aria-label="${label}" title="${label}"${external ? ' target="_blank" rel="noopener"' : ""}>${icon(name)}</a>`;
  return `<div class="blog-share">
        <span class="blog-share-label">Share</span>
        ${link("x", "Share on X", `https://twitter.com/intent/tweet?url=${u}&text=${t}`)}
        ${link("linkedin", "Share on LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}
        ${link("facebook", "Share on Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`)}
        ${link("whatsapp", "Share on WhatsApp", `https://wa.me/?text=${t}%20${u}`)}
        ${link("email", "Share by email", `mailto:?subject=${t}&body=${u}`, false)}
        <button type="button" class="blog-share-icon copy-link" data-url="${esc(url)}" aria-label="Copy link" title="Copy link">${icon("link")}</button>
        <span class="copy-status" role="status"></span>
      </div>`;
}

// ---------- Load posts ----------
const posts = [];
for (const file of fs.readdirSync(POSTS_DIR)) {
  if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") continue;
  const { data, content } = matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
  const slug = file.replace(/\.md$/, "");
  const date = toDate(data.date);

  if (data.draft === true) {
    console.log(`  skipped (draft): ${file}`);
    continue;
  }
  if (!data.title || !date) {
    console.warn(`  skipped (needs a title and a date): ${file}`);
    continue;
  }

  const category = String(Array.isArray(data.category) ? data.category[0] ?? "" : data.category ?? "").trim();
  const summary =
    String(data.summary ?? "").trim() ||
    plainText(content).replace(/\s+/g, " ").trim().slice(0, 160);

  posts.push({
    slug,
    title: String(data.title).trim(),
    date,
    summary,
    category,
    categorySlug: category ? slugify(category) : "",
    cover: data.cover ? String(data.cover) : "",
    coverAlt: data.cover_alt ? String(data.cover_alt) : "",
    seoTitle: String(data.seo_title ?? "").trim(),
    seoDescription: String(data.seo_description ?? "").trim(),
    html: marked.parse(content),
    words: countWords(content),
    minutes: readingTime(content),
  });
}
posts.sort((a, b) => b.date - a.date || a.title.localeCompare(b.title)); // newest first

// ---------- Write pages ----------
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

const navCard = (post, kind) => {
  if (!post) return `<span></span>`;
  const label = kind === "prev" ? "&larr; Previous" : "Next &rarr;";
  return `<a class="blog-${kind}" href="${esc(post.slug)}" rel="${kind}"><small>${label}</small>${esc(post.title)}</a>`;
};

posts.forEach((post, i) => {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const older = posts[i + 1]; // "Previous" goes back in time
  const newer = posts[i - 1];
  const cover = post.cover
    ? `<figure class="blog-cover"><img src="${esc(assetUrl(post.cover))}" alt="${esc(post.coverAlt)}" /></figure>`
    : "";
  const pill = post.category
    ? `<p class="blog-tags"><a href="${ROOT_PREFIX}blog/?category=${post.categorySlug}">${esc(post.category)}</a></p>`
    : "";

  // Optional SEO boxes: fall back to the normal title and summary when left empty.
  const pageTitle = post.seoTitle || `${post.title} | ${AUTHOR}`;
  const description = post.seoDescription || post.summary;
  const imageUrl = absoluteUrl(post.cover || DEFAULT_SHARE_IMAGE);
  const imageAlt = post.coverAlt || post.title;

  const html = render("blog-post.html", {
    root: ROOT_PREFIX,
    title: esc(post.title),
    page_title: esc(pageTitle),
    summary: esc(post.summary),
    meta_description: esc(description),
    url,
    og_image: esc(imageUrl),
    og_image_alt: esc(imageAlt),
    json_ld: jsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description,
      image: [imageUrl],
      datePublished: post.date.toISOString().slice(0, 10),
      dateModified: post.date.toISOString().slice(0, 10),
      author: authorLd,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      url,
      ...(post.category ? { articleSection: post.category } : {}),
      wordCount: post.words,
      timeRequired: `PT${post.minutes}M`,
      inLanguage: "en",
    }),
    date_iso: post.date.toISOString().slice(0, 10),
    date_display: fmt(post.date, "long"),
    read_time: String(post.minutes),
    content: post.html,
    cover,
    share: shareHtml(url, post.title),
    category_pill: pill,
    prev: navCard(older, "prev"),
    next: navCard(newer, "next"),
  });
  fs.writeFileSync(path.join(OUT_DIR, `${post.slug}.html`), html);
});

// List page (text only)
const categories = [...new Map(posts.filter((p) => p.category).map((p) => [p.categorySlug, p.category])).entries()].sort(
  (a, b) => a[1].localeCompare(b[1]),
);

const listHtml = render("blog-list.html", {
  root: ROOT_PREFIX,
  url: `${SITE_URL}/blog/`,
  og_image: esc(absoluteUrl(DEFAULT_SHARE_IMAGE)),
  og_image_alt: esc(`${AUTHOR}, writing`),
  json_ld: jsonLd({
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Writing by ${AUTHOR}`,
    url: `${SITE_URL}/blog/`,
    inLanguage: "en",
    author: authorLd,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date.toISOString().slice(0, 10),
    })),
  }),
  category_filters: categories
    .map(([slug, name]) => `<button type="button" data-filter="${slug}">${esc(name)}</button>`)
    .join("\n        "),
  post_list: posts
    .map(
      (p) => `<li class="blog-item" data-category="${p.categorySlug}">
          <a href="${esc(p.slug)}">
            <div class="blog-item-meta">${[p.category && esc(p.category), fmt(p.date, "short"), `${p.minutes} min read`]
              .filter(Boolean)
              .join(" &middot; ")}</div>
            <h2>${esc(p.title)}</h2>
            <p>${esc(p.summary)}</p>
          </a>
        </li>`,
    )
    .join("\n        "),
});
fs.writeFileSync(path.join(OUT_DIR, "index.html"), listHtml);

// ---------- sitemap.xml and robots.txt (written to the site root) ----------
const xmlEsc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Your existing pages: index.html becomes "/", the rest keep their file names.
// post.html is skipped because it is a template page, not a real page.
const SKIP_PAGES = new Set(["post.html"]);
const rootPages = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith(".html") && !SKIP_PAGES.has(f))
  .map((f) => (f === "index.html" ? "/" : `/${f}`));
const workDir = path.join(ROOT, "work");
const workPages = fs.existsSync(workDir)
  ? fs.readdirSync(workDir).filter((f) => f.endsWith(".html")).map((f) => `/work/${f}`)
  : [];

const sitemapEntries = [
  ...[...rootPages, ...workPages].sort().map((u) => ({ loc: SITE_URL + u })),
  { loc: `${SITE_URL}/blog/`, lastmod: posts[0]?.date.toISOString().slice(0, 10) },
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date.toISOString().slice(0, 10) })),
];
fs.writeFileSync(
  path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    sitemapEntries
      .map((e) => `  <url><loc>${xmlEsc(e.loc)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`)
      .join("\n") +
    `\n</urlset>\n`,
);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`Built ${posts.length} post(s) and the blog list into blog/`);
console.log(`Wrote sitemap.xml (${sitemapEntries.length} addresses) and robots.txt`);
for (const p of posts) console.log(`  ${p.slug}.html  (${p.minutes} min read)`);
