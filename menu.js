const toggleTag = document.querySelector("a.toggle-nav");
const mainTag = document.querySelector("main");
const HTag = document.querySelector("header nav");

toggleTag.addEventListener("click", function (event) {
    event.preventDefault(); // 👈 prevents that annoying scroll-to-top
    mainTag.classList.toggle("open");
      HTag.classList.toggle("open");

    if (mainTag.classList.contains("open")) {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/close.svg"> Close`;
    }
    else {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/menu.svg"> Menu`;
    }

});