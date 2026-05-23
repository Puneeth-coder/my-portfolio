// BUG FIX: theme-persist.js
// Correctly toggles 'dark' class on <html> for Tailwind darkMode:'class'
// Updates emoji and persists preference to localStorage

function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const html = document.documentElement;

    // Apply saved theme on load
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
        html.classList.add("dark");
        toggleBtn.textContent = "☀️";
        toggleBtn.setAttribute("title", "Switch to Light Mode");
    } else {
        html.classList.remove("dark");
        toggleBtn.textContent = "🌙";
        toggleBtn.setAttribute("title", "Switch to Dark Mode");
    }

    toggleBtn.addEventListener("click", function () {
        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
            localStorage.setItem("portfolio-theme", "dark");
            toggleBtn.textContent = "☀️";
            toggleBtn.setAttribute("title", "Switch to Light Mode");
        } else {
            localStorage.setItem("portfolio-theme", "light");
            toggleBtn.textContent = "🌙";
            toggleBtn.setAttribute("title", "Switch to Dark Mode");
        }
    });
}
