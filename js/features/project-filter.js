// js/features/project-filter.js
// BUG FIX: Removed projectFilterInit() auto-call at bottom — was running before
// DOM was ready and before renderProject was called. main.js calls it once.

function projectFilterInit() {

    const filterButtons = document.querySelectorAll(".filter-btn");
    const searchInput = document.getElementById("project-search");

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {

            // Reset all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove(
                    "bg-gradient-to-r", "from-indigo-600", "to-violet-600",
                    "text-white", "shadow-md", "shadow-indigo-200"
                );
                btn.classList.add("bg-white", "dark:bg-gray-800", "text-gray-600");
            });

            // Activate clicked button
            button.classList.remove("bg-white", "dark:bg-gray-800", "text-gray-600");
            button.classList.add(
                "bg-gradient-to-r", "from-indigo-600", "to-violet-600",
                "text-white", "shadow-md"
            );

            const selectedCategory = button.dataset.category;
            const searchValue = searchInput ? searchInput.value.toLowerCase() : "";

            let filteredList = projectsData;

            if (selectedCategory !== "All") {
                filteredList = filteredList.filter(p => p.category === selectedCategory);
            }

            if (searchValue) {
                filteredList = filteredList.filter(p =>
                    p.name.toLowerCase().includes(searchValue) ||
                    p.description.toLowerCase().includes(searchValue)
                );
            }

            renderProject(filteredList);
            document.dispatchEvent(new Event("projectsUpdated"));
        });
    });
}
