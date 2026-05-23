// js/features/scroll-spy.js
// Highlights active nav link based on scroll position

(function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav ul a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    function clearAll() {
        navLinks.forEach(link => link.classList.remove("active-nav"));
    }

    function setActive(id) {
        clearAll();
        navLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active-nav");
            }
        });
    }

    function onScroll() {
        if (window.scrollY < 100) {
            clearAll();
            return;
        }

        let activeSectionId = null;
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom > 0) {
                activeSectionId = section.id;
            }
        });

        if (activeSectionId) {
            setActive(activeSectionId);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();
