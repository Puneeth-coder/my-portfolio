// js/features/project-count.js
// BUG FIX: Original was creating a NEW #project-count element even though
// HTML already has one, causing duplicate IDs. Now uses the existing element.

(function () {

    const searchInput = document.getElementById("project-search");
    const container = document.getElementById("projects-container");
    const countEl = document.getElementById("project-count");

    if (!searchInput || !container || !countEl) return;

    function updateCount(total, visible) {
        countEl.classList.remove("text-emerald-600", "text-red-500", "text-gray-500");

        if (searchInput.value.trim() === "") {
            countEl.textContent = `Showing ${total} project${total !== 1 ? "s" : ""}`;
            countEl.classList.add("text-gray-500");
        } else {
            if (visible > 0) {
                countEl.textContent = `${visible} project${visible !== 1 ? "s" : ""} found`;
                countEl.classList.add("text-emerald-600");
            } else {
                countEl.textContent = "No projects found";
                countEl.classList.add("text-red-500");
            }
        }
    }

    function getCounts() {
        const cards = container.querySelectorAll(".project-card");
        let visible = 0;
        cards.forEach(card => {
            if (card.style.display !== "none" && !card.classList.contains("hidden")) {
                visible++;
            }
        });
        return { total: cards.length, visible };
    }

    function refreshCount() {
        setTimeout(() => {
            const { total, visible } = getCounts();
            updateCount(total, visible);
        }, 60);
    }

    searchInput.addEventListener("input", refreshCount);
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Escape") setTimeout(refreshCount, 60);
    });

    // Watch for DOM changes (filter/search rerenders)
    const observer = new MutationObserver(refreshCount);
    observer.observe(container, { childList: true, subtree: false });

    window.addEventListener("load", refreshCount);

})();
