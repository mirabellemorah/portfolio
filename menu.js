const toggleTag = document.querySelector("a.toggle-nav");
const mainTag = document.querySelector("main");

toggleTag.addEventListener("click", function (event) {
    event.preventDefault(); // 👈 prevents that annoying scroll-to-top
    mainTag.classList.toggle("open");

    if (mainTag.classList.contains("open")) {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/close.svg"> Close`;
    }
    else {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/menu.svg"> Menu`;
    }
});


/* FILTERS

document.addEventListener("DOMContentLoaded", function () {
    const filterLinks = document.querySelectorAll(".fp-project-filter-list a");
    const allProjects = document.querySelectorAll(".fp-projects .project");

    filterLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            // Highlight the selected filter
            filterLinks.forEach(link => link.classList.remove("selected"));
            this.classList.add("selected");

            const filterValue = this.getAttribute("data-filter");

            allProjects.forEach(project => {
                if (filterValue === ".project") {
                    project.classList.remove("hidden");
                } else {
                    project.classList.toggle(
                        "hidden",
                        !project.classList.contains(filterValue.slice(1))
                    );
                }
            });
        });
    });
});
 */

document.addEventListener("DOMContentLoaded", () => {
    const filterLinks = document.querySelectorAll(".fp-project-filter-list a");
    const allProjects = document.querySelectorAll(".fp-projects .project");

    filterLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            // Update active filter UI
            document.querySelector(".fp-project-filter-list .selected")?.classList.remove("selected");
            link.classList.add("selected");

            const filter = link.dataset.filter.slice(1); // Remove the dot from class name

            allProjects.forEach(project => {
                const show = filter === "project" || project.classList.contains(filter);
                project.classList.toggle("hidden", !show);
            });
        });
    });
});
