// js/features/skills-render.js

function renderSkills(filter = "All") {
    const skillsContainer = document.getElementById("skills-container");
    if (!skillsContainer) return;

    skillsContainer.innerHTML = "";

    const filteredSkills = filter === "All"
        ? skillsData
        : skillsData.filter(skill => skill.category === filter);

    if (filteredSkills.length === 0) {
        skillsContainer.innerHTML = "<p class='col-span-full text-center text-gray-500 dark:text-gray-400 py-8'>No skills found in this category.</p>";
        return;
    }

    // Category gradient map
    const categoryGradients = {
        "Frontend": "from-blue-500 via-indigo-500 to-violet-500",
        "Backend": "from-emerald-500 via-teal-500 to-cyan-500",
        "Tools": "from-orange-500 via-amber-500 to-yellow-500",
    };

    filteredSkills.forEach(function(skill, index) {

        const gradient = categoryGradients[skill.category] || "from-indigo-500 via-violet-500 to-pink-500";

        const card = document.createElement("div");
        card.className = "group relative p-[2px] rounded-2xl bg-gradient-to-br " + gradient + " hover:scale-105 transition-all duration-300 hover:shadow-lg";
        card.style.animationDelay = `${index * 60}ms`;

        // INNER CARD
        const inner = document.createElement("div");
        inner.className = "p-5 rounded-2xl bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center gap-3 h-full transition-all duration-300";

        // ICON BOX
        const iconBox = document.createElement("div");
        iconBox.className = "w-14 h-14 rounded-xl bg-gradient-to-br " + gradient + " flex items-center justify-center text-white font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3";
        iconBox.textContent = skill.shortLabel;

        // NAME
        const skillName = document.createElement("h3");
        skillName.className = "text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors";
        skillName.textContent = skill.name;

        // DESCRIPTION
        const skillDescription = document.createElement("p");
        skillDescription.className = "text-xs text-gray-500 dark:text-gray-400 leading-relaxed";
        skillDescription.textContent = skill.description;

        // CATEGORY TAG
        const catTag = document.createElement("span");
        catTag.className = "text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400";
        catTag.textContent = skill.category;

        inner.appendChild(iconBox);
        inner.appendChild(skillName);
        inner.appendChild(skillDescription);
        inner.appendChild(catTag);

        card.appendChild(inner);
        skillsContainer.appendChild(card);
    });
}
