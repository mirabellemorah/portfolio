# Blog system: files and changes

Updated 19 November 2026.

## Summary

This zip holds 21 files, all new. None of your existing site files were changed or included.

An earlier message said 28. That number counted the 8 folders as well as the 20 files that existed then. This version adds one more file, this one, and the SEO features.

The three sample posts and three sample categories are placeholders to delete or replace.

## The 21 files

| Group | File | What it does |
| --- | --- | --- |
| Instructions | `BLOG-SETUP.md` | How the blog works, how to switch it on, how to write posts, SEO |
| Instructions | `BLOG-FILES-AND-CHANGES.md` | This list of files and changes |
| Setup and config | `.pages.yml` | Pages CMS settings (which boxes to show, including the SEO boxes) |
| Setup and config | `package.json` | The two tools the build script needs |
| Setup and config | `package-lock.json` | Pins those tool versions |
| Setup and config | `.gitignore` | Keeps generated files (`blog/`, `sitemap.xml`, `robots.txt`) out of the repo |
| Setup and config | `.github/workflows/deploy.yml` | Builds the blog and publishes the site |
| Posts and categories | `content/blog/why-small-motion-matters.md` | Sample post |
| Posts and categories | `content/blog/pricing-creative-work-with-confidence.md` | Sample post, with the SEO boxes filled in as an example |
| Posts and categories | `content/blog/five-habits-that-keep-a-creative-business-steady.md` | Sample post |
| Posts and categories | `content/categories/Motion Design.md` | Sample category |
| Posts and categories | `content/categories/Creative Business.md` | Sample category |
| Posts and categories | `content/categories/Reflections.md` | Sample category |
| Posts and categories | `assets/blog-assets/.gitkeep` | Placeholder so the image folder exists |
| Page maker and look | `scripts/build-blog.mjs` | Builds the pages, share links, reading time, prev/next, structured data, sitemap and robots file |
| Page maker and look | `scripts/blog.js` | Copy link button and category filter |
| Page maker and look | `styles/blog-style.css` | The Medium-style look |
| Page maker and look | `templates/blog-post.html` | Post page layout, including the SEO tags |
| Page maker and look | `templates/blog-list.html` | List page layout, including the SEO tags |
| Page maker and look | `templates/partials/header.html` | Your header, copied from `post.html` |
| Page maker and look | `templates/partials/footer.html` | Your footer, copied from `post.html` |

Generated on every build, not stored in the repo: the `blog/` folder, `sitemap.xml` and `robots.txt`.

## What changed along the way

- **First version:** a single standalone `blog-post.html`. It was replaced by a version that reuses your repo's own CSS, and it is not in the zip.
- **Medium-style layout:** a narrow reading column, serif body text and a byline, replacing the first plain design.
- **Pages CMS:** added the setup, the build script, the templates and the deploy workflow.
- **Widths:** the list is up to 1020px wide and the post up to 860px wide, both centred. I tried left-aligning them to your header margin, then went back to centred after your feedback, which also removed the gap on the right at tablet width.
- **Share buttons:** text buttons became round icons, with "Link copied" feedback when you copy the link.
- **Post header bug:** the first preview showed the title squashed into a box, because your site's `header` styling was applying to it. This is fixed.
- **Zip count:** corrected from 28 to 20 files, then 21 with this file.

### SEO (latest change)

- **Sitemap and robots file:** `sitemap.xml` lists your existing pages, the blog list and every published post. `robots.txt` allows all search engines and points to the sitemap. `post.html` is left out because it is a template page.
- **Structured data:** every post carries `BlogPosting` data (headline, description, image, dates, author, category, word count, reading time). The blog list carries `Blog` data.
- **Two optional CMS boxes:** "SEO title" and "SEO description". When empty, the title becomes "Post title | Mirabelle Morah" and the description is the short summary.
- **Extra tags:** an author tag, and the Twitter title, description, image and image description tags, plus an image description tag for social previews. Image descriptions come from the "Header image description" box, falling back to the post title.
- **Not added:** an RSS feed.

If you saved any earlier files, the zip replaces them.
