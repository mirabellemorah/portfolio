// Small helpers for the blog pages.

// 1. "Copy link" buttons. The address is stored on the button at build time,
//    so it is always the real public address of the post.
document.querySelectorAll(".copy-link").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var url = btn.getAttribute("data-url") || window.location.href;
    var status = btn.parentElement.querySelector(".copy-status");
    navigator.clipboard.writeText(url).then(function () {
      if (!status) return;
      status.textContent = "Link copied";
      setTimeout(function () {
        status.textContent = "";
      }, 1800);
    });
  });
});

// 2. Blog list page: category filter + page numbers.
//    How many posts show per page is set by POSTS_PER_PAGE in scripts/build-blog.mjs.
//    Addresses look like  blog/?page=3  or  blog/?category=reflections&page=2
(function () {
  var filters = document.querySelectorAll(".blog-filters button");
  var items = Array.prototype.slice.call(document.querySelectorAll(".blog-item"));
  var empty = document.querySelector(".blog-empty");
  var pager = document.querySelector(".blog-pager");
  var top = document.querySelector(".blog-filters") || document.querySelector(".blog-items");
  if (!items.length) return;

  var perPage = parseInt(pager && pager.getAttribute("data-per-page"), 10) || 10;
  var PAGES_AHEAD = 3; // page numbers shown after the current one
  var state = { slug: "all", page: 1 };

  function matching() {
    return items.filter(function (li) {
      if (state.slug === "all") return true;
      var cats = (li.getAttribute("data-category") || "").split(" ");
      return cats.indexOf(state.slug) !== -1;
    });
  }

  function addressFor(slug, page) {
    var parts = [];
    if (slug !== "all") parts.push("category=" + encodeURIComponent(slug));
    if (page > 1) parts.push("page=" + page);
    return window.location.pathname + (parts.length ? "?" + parts.join("&") : "");
  }

  function pageLink(label, page, opts) {
    opts = opts || {};
    var a = document.createElement("a");
    a.textContent = label;
    a.href = addressFor(state.slug, page);
    if (opts.aria) a.setAttribute("aria-label", opts.aria);
    if (opts.current) {
      a.setAttribute("aria-current", "page");
      a.className = "current";
    }
    if (opts.disabled) {
      a.className = "disabled";
      a.setAttribute("aria-disabled", "true");
      a.removeAttribute("href");
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        go(state.slug, page, true);
      });
    }
    return a;
  }

  function buildPager(total) {
    if (!pager) return;
    pager.innerHTML = "";
    if (total <= 1) {
      pager.hidden = true;
      return;
    }
    pager.hidden = false;

    var row = document.createElement("div");
    row.className = "blog-pager-row";
    row.appendChild(pageLink("← Previous", state.page - 1, { disabled: state.page <= 1, aria: "Previous page" }));

    // Show the current page and the next few page numbers (PAGES_AHEAD, set at the top).
    for (var n = state.page; n <= Math.min(total, state.page + PAGES_AHEAD); n++) {
      row.appendChild(pageLink(String(n), n, { current: n === state.page, aria: "Page " + n }));
    }

    row.appendChild(pageLink("Next →", state.page + 1, { disabled: state.page >= total, aria: "Next page" }));
    pager.appendChild(row);

    var status = document.createElement("p");
    status.className = "blog-pager-status";
    status.textContent = "Page " + state.page + " of " + total;
    pager.appendChild(status);
  }

  function render(scroll) {
    var list = matching();
    var total = Math.max(1, Math.ceil(list.length / perPage));
    if (state.page > total) state.page = total;
    if (state.page < 1) state.page = 1;
    var start = (state.page - 1) * perPage;

    items.forEach(function (li) {
      li.hidden = true;
      li.classList.remove("is-last");
    });
    var shown = list.slice(start, start + perPage);
    shown.forEach(function (li) {
      li.hidden = false;
    });
    if (shown.length) shown[shown.length - 1].classList.add("is-last");

    filters.forEach(function (b) {
      b.classList.toggle("selected", b.getAttribute("data-filter") === state.slug);
    });
    if (empty) empty.hidden = list.length !== 0;
    buildPager(total);
  }

  function go(slug, page, push) {
    state.slug = slug;
    state.page = page;
    history[push ? "pushState" : "replaceState"](null, "", addressFor(state.slug, state.page));
    render(push);
  }

  function readAddress() {
    var params = new URLSearchParams(window.location.search);
    state.slug = params.get("category") || "all";
    state.page = parseInt(params.get("page"), 10) || 1;
  }

  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      go(b.getAttribute("data-filter"), 1, true);
    });
  });

  // Back and forward buttons keep working.
  window.addEventListener("popstate", function () {
    readAddress();
    render(false);
  });

  readAddress();
  render(false);
})();
