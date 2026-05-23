// js/features/project-render.js
// BUG FIX: Added dark mode text color classes to all elements

function renderProject(dataToRender = projectsData) {

    const container = document.getElementById("projects-container");
    const emptyState = document.getElementById("no-projects");

    if (!container) return;

    container.innerHTML = "";

    if (!dataToRender.length) {
        if (emptyState) emptyState.classList.remove("hidden");
        return;
    } else {
        if (emptyState) emptyState.classList.add("hidden");
    }

    // Category color map
    const categoryColors = {
        "Hardware": { badge: "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700/40", icon: "🔧" },
        "IoT": { badge: "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700/40", icon: "📡" },
        "Full Stack": { badge: "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700/40", icon: "🌐" },
    };

    dataToRender.forEach((project, index) => {

        const cat = categoryColors[project.category] || {
            badge: "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
            icon: "📁"
        };

        const card = document.createElement("div");
        card.className = "project-card group p-6 rounded-2xl flex flex-col gap-4";
        card.style.animationDelay = `${index * 80}ms`;

        // TOP ROW: Category + Status
        const topRow = document.createElement("div");
        topRow.className = "flex items-center justify-between";

        const categoryBadge = document.createElement("span");
        categoryBadge.className = `px-3 py-1 text-xs font-semibold rounded-full border ${cat.badge}`;
        categoryBadge.textContent = `${cat.icon} ${project.category}`;

        const statusBadge = document.createElement("span");
        statusBadge.className = "px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700/40";
        statusBadge.textContent = `✓ ${project.status}`;

        topRow.appendChild(categoryBadge);
        topRow.appendChild(statusBadge);

        // TITLE
        const title = document.createElement("h3");
        title.className = "text-lg font-bold text-gray-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug";
        title.textContent = project.name;

        // DESCRIPTION
        const desc = document.createElement("p");
        desc.className = "text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1";
        desc.textContent = project.description;

        // TECHNOLOGIES
        const techWrapper = document.createElement("div");
        techWrapper.className = "flex flex-wrap gap-2 mt-auto";

        project.technologies.split(",").forEach(tech => {
            const badge = document.createElement("span");
            badge.className = "px-3 py-1 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700/40 font-medium";
            badge.textContent = tech.trim();
            techWrapper.appendChild(badge);
        });

        // APPEND ALL
        card.appendChild(topRow);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(techWrapper);

        container.appendChild(card);
    });

    // Trigger updates
    document.dispatchEvent(new Event("projectsUpdated"));
}
