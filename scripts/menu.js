const toggleTag = document.querySelector("a.toggle-nav");
const navTag = document.querySelector("header nav");

toggleTag.addEventListener("click", function (event) {
    event.preventDefault(); // 👈 prevents that annoying scroll-to-top
    navTag.classList.toggle("open");

    if (navTag.classList.contains("open")) {
        //  toggleTag.innerHTML = `<img src="./assets/home-page-assets/close.svg"> Close`;
        toggleTag.innerHTML = `Close`;
        toggleTag.style.color = "var(--color-offwhite)";
    }
    else {
        // toggleTag.innerHTML = `<img src="./assets/home-page-assets/menu.svg"> Menu`;
        toggleTag.innerHTML = `Menu`;
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
        logoImg.style.filter = 'none'; // Reset filter for light mode
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





// images in about page

const slideArea = document.querySelector("div.slides");
const images = slideArea.querySelectorAll(".showcase-imgs");

let currentSlide = 0;
let z = 1;

//when I click on slide area, change slide based on z-index

slideArea.addEventListener("click", function () {

    currentSlide = currentSlide + 1;

    if (currentSlide > images.length - 1) {
        currentSlide = 0;
    }

    z = z + 1;

    images.forEach(image => {
        image.style.animation = "";
    });

    images[currentSlide].style.zIndex = z;
    images[currentSlide].style.animation = "fade cubic-bezier(0.075, 0.82, 0.165, 1) 3s";

});

slideArea.addEventListener("mouseover", function () {
    images.forEach(image => {
        const x = 25 * (Math.floor(Math.random() * 5)) - 50;
        const y = 25 * (Math.floor(Math.random() * 5)) - 50;

        image.style.transform = `translate(${x}px, ${y}px)`;
    });
});

slideArea.addEventListener("mouseout", function () {
    images.forEach(image => {

        image.style.transform = ``;
    });
});