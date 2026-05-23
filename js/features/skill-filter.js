// js/features/skill-filter.js
// BUG FIX: Removed duplicate DOMContentLoaded listener (was conflicting with main.js)
// FIX: Fixed active button state to use proper gradient classes instead of bg-green-900

function setupSkillFilters() {
    const buttons = document.querySelectorAll(".skill-filter-btn");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active from all
            buttons.forEach(b => {
                b.classList.remove(
                    "active",
                    "bg-gradient-to-r", "from-indigo-600", "to-violet-600",
                    "text-white", "shadow-md"
                );
                b.classList.add("bg-white", "dark:bg-gray-800", "text-gray-600", "dark:text-gray-300");
            });

            // Set active on clicked
            btn.classList.add("active");
            btn.classList.remove("bg-white", "dark:bg-gray-800", "text-gray-600", "dark:text-gray-300");
            btn.classList.add(
                "bg-gradient-to-r", "from-indigo-600", "to-violet-600",
                "text-white", "shadow-md"
            );

            const category = btn.getAttribute("data-category");
            if (typeof renderSkills === "function") {
                renderSkills(category);
            }
        });
    });
}
