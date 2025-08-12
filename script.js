// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Glow effect on scroll for sections
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight + 200) {
            section.style.boxShadow = "0 0 20px #a020f0, 0 0 40px #a020f0";
            section.style.transition = "box-shadow 0.5s";
        } else {
            section.style.boxShadow = "none";
        }
    });
});

// Typewriter effect for tagline
function typewriterEffect(element, text, speed = 1000) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    element.textContent = ""; // clear before starting
    typing();
}

// Run typewriter on page load
document.addEventListener("DOMContentLoaded", () => {
    const tagline = document.querySelector(".tagline");
    if (tagline) {
        const text = tagline.textContent;
        typewriterEffect(tagline, text, 80); // speed: 80ms per character
    }
});