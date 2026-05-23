// js/features/scroll-progress.js
// Shows a gradient progress bar at top of page while scrolling

(function () {
    const bar = document.createElement("div");
    bar.id = "scroll-progress-bar";

    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(to right, #4f46e5, #7c3aed, #ec4899);
        z-index: 9999;
        transition: width 0.08s linear;
        border-radius: 0 2px 2px 0;
    `;

    document.body.prepend(bar);

    function updateProgress() {
        const scrollY = window.scrollY;
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = totalScrollHeight > 0 ? (scrollY / totalScrollHeight) * 100 : 0;
        bar.style.width = percentage + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
})();
