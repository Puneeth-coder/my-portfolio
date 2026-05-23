// BUG FIX: Removed the duplicate DOMContentLoaded listener that was calling
// initTypingEffect() twice. main.js now calls it once via DOMContentLoaded.

function initTypingEffect() {
    const textElement = document.getElementById("typing-text");

    if (!textElement) {
        console.warn("Typing element not found!");
        return;
    }

    const words = ["MERN Enthusiast", "Competitive Programmer", "Full-Stack Developer", "EEE Graduate"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.slice(0, charIndex--);
            typeSpeed = 60;
        } else {
            textElement.textContent = currentWord.slice(0, charIndex++);
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex > currentWord.length) {
            isDeleting = true;
            typeSpeed = 2200; // Pause at end of word
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            charIndex = 0;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}
