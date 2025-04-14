const toggleTag = document.querySelector("a.toggle-nav");
const mainTag = document.querySelector("main");

toggleTag.addEventListener("click", function () {
    mainTag.classList.toggle("open");

    if (mainTag.classList.contains("open")) {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/menu.svg"> Close`;
    }
    else {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/close.svg"> Menu`;
    }

});