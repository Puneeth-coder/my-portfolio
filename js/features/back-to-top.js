// js/features/back-to-top.js

function scrollInit() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove("hidden");
            backToTopBtn.classList.add("flex");
        } else {
            backToTopBtn.classList.add("hidden");
            backToTopBtn.classList.remove("flex");
        }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
