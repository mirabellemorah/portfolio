# Blog setup guide for mirabellemorah.com

This guide explains how the new blog works, how to switch it on, and how to write posts with Pages CMS. It is written in plain language, with small examples.

## 1. The big idea (the bakery)

Your website is made of plain HTML pages. Pages CMS cannot turn writing into web pages by itself, so we added a small helper called a **build script**.

Think of a bakery:

- You write a **recipe card** (a post in Pages CMS). It is saved as a small text file.
- The **oven** (the build script) turns each recipe card into a real page.
- GitHub **delivers** the finished pages to your website.

You only ever write the recipe cards. The oven and delivery run by themselves every time you save.

## 2. What is in this zip

| File or folder | What it does | Do you touch it? |
|---|---|---|
| `.pages.yml` | Tells Pages CMS which boxes to show (title, date, category, image...) | Rarely |
| `content/blog/` | Your posts, one text file each | Via Pages CMS |
| `content/categories/` | Your list of categories | Via Pages CMS |
| `assets/blog-assets/` | Images you upload for posts | Via Pages CMS |
| `templates/` | The look of a post page and the list page (header and footer too) | Only to change layout |
| `styles/blog-style.css` | Colours, widths and spacing of the blog | Only to change the look |
| `scripts/build-blog.mjs` | The oven. Builds the pages, share links, reading time, prev/next, search data, sitemap and robots file | Rarely |
| `scripts/blog.js` | Copy link button and category filter | No |
| `.github/workflows/deploy.yml` | Tells GitHub to build and publish the site | No |
| `package.json`, `package-lock.json` | List of two tools the oven needs | No |
| `BLOG-FILES-AND-CHANGES.md` | A list of every file in this zip and what changed along the way | No |
| `.gitignore` | Stops generated files (`blog/`, `sitemap.xml`, `robots.txt`) being saved into the repo | No |

The three posts and three categories inside are **samples**. Delete or replace them.

## 3. One-time setup

1. **Unzip** into the root of your `portfolio` repo (the same folder that holds `index.html`). If asked about merging folders, say yes.
2. **Push** the new files to GitHub (GitHub Desktop, or `git add .`, `git commit`, `git push`).
3. In GitHub open your repo, then **Settings, Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. This is the step people forget.
4. Open the **Actions** tab. You should see "Build blog and deploy site" running. When it turns green, visit `https://www.mirabellemorah.com/blog/`.
5. Go to **pagescms.org**, sign in with GitHub, choose the `portfolio` repo. You will see two menus: **Blog posts** and **Categories**.

If the Actions run turns red, click it and read the first red line. The most common causes are step 3 not being done, or a post with no title or date.

## 4. Writing a post

1. In Pages CMS click **Blog posts, Add**.
2. Fill in the boxes:
   - **Title**: shows at the top and in the browser tab.
   - **Publish date**: used for ordering and the previous and next links.
   - **Category**: pick one from the dropdown.
   - **Short summary**: shows on the blog list and when someone shares the post.
   - **SEO title** and **SEO description** (both optional): what Google shows in search results. See section 7c.
   - **Header image** and its **description**: the small picture at the top.
   - **Draft**: tick it to keep the post hidden while you work.
   - **Post**: your writing.
3. Save. Wait about a minute and refresh the site.

## 5. Categories

Categories are their own list in Pages CMS.

- **Add one:** Categories, Add, type a name (for example "Motion Design"), save. It now appears in the Category dropdown when you write a post.
- **Rename one:** edit it in Categories, then open the posts that used the old name and pick the new one.
- **Delete one:** delete it in Categories. Posts that still use it keep the name until you change them.

A category only shows on the blog list once at least one published post uses it.

## 6. How to make the quote

The pull quote (the one with a line on the left) is a Markdown "blockquote". Start a line with `>` and a space:

```
> A price is not an apology. It is a clear statement of what the work is worth.
```

In Pages CMS you have two ways:

1. In the **Post** box, use the quote button in the toolbar if you see one.
2. Switch the box from **Editor** to **Source** (top of the box), type `> ` at the start of the line, and switch back.

Example: type `> Be kind to your future self.` and it becomes a quote with a line beside it.

## 7. Things that happen by themselves

- **Share buttons:** X, LinkedIn, Facebook, WhatsApp, Email and Copy link all use that post's own web address. You set nothing up.
- **Share preview:** the title, summary and header image are added to the page so it looks good when shared.
- **Reading time:** the oven counts the words and divides by 225 words a minute, rounding up. A 900 word post says "4 min read". To change the speed, edit `WORDS_PER_MINUTE` at the top of `scripts/build-blog.mjs`.
- **Previous and next:** worked out from the publish dates. Previous is the older post, next is the newer one.
- **Blog list:** newest first, text only, with category filter buttons.

## 7b. Sharing links people can use

- Blog list: `https://www.mirabellemorah.com/blog/`
- A post: `https://www.mirabellemorah.com/blog/<file-name-of-post>.html`
- A category: `https://www.mirabellemorah.com/blog/?category=motion-design`

## 7c. SEO (search engines)

SEO means making your pages easy for Google to find and understand. Think of a library: the **title** and **description** are the label on the book's spine, and the **sitemap** is the catalogue that lists every book.

What the build adds for you, with nothing to set up:

- **Sitemap** (`sitemap.xml`): a list of every public page, including your existing pages and each blog post. Draft posts are left out.
- **Robots file** (`robots.txt`): tells search engines they are welcome and where the sitemap is.
- **Structured data**: hidden labels on each post (author, date, headline, image, word count, reading time) in a format search engines read. The blog list gets its own. The format is JSON-LD with the schema.org types `BlogPosting` and `Blog`.
- **Extra tags**: an author tag, plus a title, description, image and image description for X (Twitter) and for other social previews. The image description comes from the post's "Header image description" box.

Two optional boxes on every post:

- **SEO title**: the title Google shows. Aim for about 60 characters. Leave it empty and the page title becomes "Post title | Mirabelle Morah".
- **SEO description**: the grey text under the title in search results. Aim for about 155 characters. Leave it empty and the short summary is used.

Example: the sample post "Pricing creative work with confidence" has both boxes filled in, so you can see where they land.

After your first deploy, do this once:

1. Go to Google Search Console and add `https://www.mirabellemorah.com`.
2. Open **Sitemaps** and submit `sitemap.xml`.

Good to know: `post.html` (your old template page) is left out of the sitemap on purpose. If you ever add your own `sitemap.xml` or `robots.txt`, the generated ones will overwrite them every build, so change the build script instead. SEO helps search engines read your pages, but it does not promise a ranking.

## 8. Previewing on your own computer

You need Node.js installed. In the repo folder:

```
npm install
npm run build
npx serve .
```

Then open the address it prints and go to `/blog/`. Run `npm run build` again after changing a post.

## 9. Good to know

- The `blog/` folder, `sitemap.xml` and `robots.txt` are built fresh every time and are not stored in the repo, so never edit them by hand. Change the templates or the posts instead.
- Your nav "Blog" link on the other pages still goes to Medium. Change it to `blog/` when you are ready.
- Pages on the blog use your theme toggle (star button) like the rest of the site.
- `menu.js` shows a harmless console error on pages without the About page image slides.
- Images in posts should be uploaded through Pages CMS so they land in `assets/blog-assets/`.
