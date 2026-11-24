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

// 2. Category filter on the blog list page.
(function () {
  var filters = document.querySelectorAll(".blog-filters button");
  var items = document.querySelectorAll(".blog-item");
  var empty = document.querySelector(".blog-empty");
  if (!filters.length) return;

  function apply(slug) {
    var shown = 0;
    filters.forEach(function (b) {
      b.classList.toggle("selected", b.getAttribute("data-filter") === slug);
    });
    items.forEach(function (li) {
      var cats = (li.getAttribute("data-category") || "").split(" ");
      var match = slug === "all" || cats.indexOf(slug) !== -1;
      li.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  filters.forEach(function (b) {
    b.addEventListener("click", function () {
      var slug = b.getAttribute("data-filter");
      apply(slug);
      var url = slug === "all" ? window.location.pathname : "?category=" + slug;
      history.replaceState(null, "", url);
    });
  });

  // Open straight into a category, e.g. blog/?category=motion-design
  var wanted = new URLSearchParams(window.location.search).get("category");
  if (wanted) apply(wanted);
})();
