const toggleTag = document.querySelector("a.toggle-nav");
const navTag = document.querySelector("header nav");

toggleTag.addEventListener("click", function (event) {
    event.preventDefault(); // 👈 prevents that annoying scroll-to-top
    navTag.classList.toggle("open");

    if (navTag.classList.contains("open")) {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/close.svg"> Close`;
        toggleTag.style.color = "var(--color-offwhite)";
    }
    else {
        toggleTag.innerHTML = `<img src="./assets/home-page-assets/menu.svg"> Menu`;
        toggleTag.style.color = "";
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


/* copy email js*/

document.addEventListener('DOMContentLoaded', function () {
    const copyBtn = document.getElementById('copy-email-btn');
    const email = document.getElementById('email-address').textContent.trim();
    const feedback = document.getElementById('copy-feedback');

    copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(email).then(() => {
            feedback.style.display = 'inline';
            feedback.style.opacity = 1;
            setTimeout(() => {
                feedback.style.opacity = 0;
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 400);
            }, 1200);
        });
    });
});


// Night/Dark Mode Toggle

const starToggle = document.getElementById('star-toggle');

// Logo swap for night/dark mode
const logoImg = document.getElementById('header-logo');
function updateLogoForMode() {
    if (document.body.classList.contains('night-mode')) {
        logoImg.src = logoImg.getAttribute('data-dark');
    } else {
        logoImg.src = logoImg.getAttribute('data-light');
    }
}

starToggle.addEventListener('click', function () {
    document.body.classList.toggle('night-mode');
    // Swap CSS variables for offwhite and black
    if (document.body.classList.contains('night-mode')) {
        document.documentElement.style.setProperty('--color-offwhite', '#000');
        document.documentElement.style.setProperty('--color-black', '#f9f8f0');
        document.documentElement.style.setProperty('--color-link', '#f9f8f0');

    }

    else {
        document.documentElement.style.setProperty('--color-offwhite', '#f9f8f0');
        document.documentElement.style.setProperty('--color-black', '#000');
        document.documentElement.style.setProperty('--color-link', '#000');

    }
    updateLogoForMode();
});

// On page load, set correct logo
updateLogoForMode();