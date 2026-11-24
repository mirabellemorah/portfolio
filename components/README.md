# Components

Each file in this folder is one reusable piece of the website. Edit the file once and every page that uses it changes.

| File | What it is |
|---|---|
| `menu.html` | The links in the top bar (About, Work, Play, Blog, Studio, Contact) |
| `navbar.html` | The whole top bar: logo, the menu, and the MENU button on phones |
| `footer.html` | Email, copy button, social icons and credit line |
| `star-toggle.html` | The button that changes the colours of the page |
| `availability.html` | The "Not too available" button |
| `view-all.html` | The "View all projects" button |

## Using a component on a page

Put one line where the piece should appear:

```html
<!-- @include navbar current="about" -->
```

- `current="about"` highlights About in the menu. Use `about`, `work`, `play` or `blog`, or leave it out.
- Some components accept words of their own on that page:
  `<!-- @include availability text="Fully booked" -->`
  `<!-- @include view-all text="View other work" -->`
- `{{root}}` inside a component is filled in automatically so links work from any folder.

The first comment at the top of a component file is for you and is removed from the finished page.

## How it reaches the website

`npm run site` (GitHub runs it on every save) builds the blog, copies the website into `_site/`
and replaces each `@include` line with the matching file from this folder.
The files in the repo keep the short include lines; the finished pages are only in the deployed site.
To look at the finished site on your computer: `npm run site`, then open the `_site` folder with a local server.

## Adding a new component

1. Create `components/my-thing.html`.
2. Add `<!-- @include my-thing -->` to any page.
