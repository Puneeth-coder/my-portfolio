// js/main.js
// BUG FIX: Single DOMContentLoaded listener, correct init call order.
// All feature functions are defined by the time this runs because scripts
// are loaded before main.js in index.html.

document.addEventListener("DOMContentLoaded", function () {

    // 1. Render data-driven sections
    renderSkills();
    renderProject(projectsData);

    // 2. Init features (order matters — filter needs renderProject to exist)
    initThemeToggle();
    initTypingEffect();
    setupSkillFilters();
    projectFilterInit();
    scrollInit();
    initContactValidation();

    // 3. Let's Talk button
    const letsTalkBtn = document.getElementById("lets-talk");
    if (letsTalkBtn) {
        letsTalkBtn.addEventListener("click", () => {
            // Smooth scroll to contact
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
                // Focus name input after scroll
                setTimeout(() => {
                    const nameInput = document.getElementById("contact-name");
                    if (nameInput) nameInput.focus();
                }, 600);
            }
        });
    }

    // 4. Search input (live search across all projects)
    const searchInput = document.getElementById("project-search");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const val = searchInput.value.toLowerCase();
            const filtered = val
                ? projectsData.filter(p =>
                    p.name.toLowerCase().includes(val) ||
                    p.description.toLowerCase().includes(val) ||
                    p.technologies.toLowerCase().includes(val)
                )
                : projectsData;
            renderProject(filtered);
        });

        // Clear on Escape
        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                searchInput.value = "";
                renderProject(projectsData);
            }
        });
    }

});
