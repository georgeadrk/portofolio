// Page loader fade-out (with minimum display time)
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const minDisplayTime = 1000; // 1 second
    const startTime = performance.now();

    const endLoader = () => {
        loader.classList.add("fade-out");
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    };

    const elapsed = performance.now() - startTime;
    if (elapsed < minDisplayTime) {
        setTimeout(endLoader, minDisplayTime - elapsed);
    } else {
        endLoader();
    }
});

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

// Highlight active nav link on scroll
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// Scroll reveal effect
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 100;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Particle background for hero section
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = document.querySelector(".hero").offsetHeight;

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = document.querySelector(".hero").offsetHeight;
    initParticles();
});

// Particle class
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.02;
    }
    draw() {
        ctx.fillStyle = "#631395ff";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#a020f0";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Create particles
function initParticles() {
    particlesArray = [];
    const numberOfParticles = 60;
    for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
            particle.x = Math.random() * canvas.width;
            particle.y = Math.random() * canvas.height;
            particle.size = Math.random() * 3 + 1;
        }
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Project modal functionality
const modal = document.getElementById("project-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
        modalImage.src = card.getAttribute("data-image");
        modalTitle.textContent = card.getAttribute("data-title");
        modalDescription.textContent = card.getAttribute("data-description");
        
        modal.style.display = "block";

        // Restart animation
        const modalContent = modal.querySelector(".modal-content");
        modalContent.style.animation = "none";
        modalContent.offsetHeight; // trigger reflow
        modalContent.style.animation = "modalZoom 0.3s ease";
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// 3D tilt effect for project cards
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 10; // tilt up/down
        const rotateY = ((x / rect.width) - 0.5) * -10; // tilt left/right

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
});

// Back to Top Button Logic
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.pointerEvents = "auto";
    } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.pointerEvents = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.querySelector(".scroll-down-indicator").addEventListener("click", () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    }
});

const scrollIndicator = document.querySelector(".scroll-down-indicator");

scrollIndicator.addEventListener("click", () => {
    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    }
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        scrollIndicator.classList.add("hidden");
    } else {
        scrollIndicator.classList.remove("hidden");
    }
});

scrollIndicator.addEventListener("click", (event) => {
    event.preventDefault();

    const nextSection = document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
        // Temporarily disable all focusable elements
        const focusables = nextSection.querySelectorAll("input, textarea, select, [tabindex]");
        focusables.forEach(el => {
            el.dataset.oldTabindex = el.tabIndex;
            el.tabIndex = -1;
        });

        // Smooth scroll
        nextSection.scrollIntoView({ behavior: "smooth" });

        // Restore tab index after scroll finishes
        setTimeout(() => {
            focusables.forEach(el => {
                if (el.dataset.oldTabindex) {
                    el.tabIndex = el.dataset.oldTabindex;
                    delete el.dataset.oldTabindex;
                } else {
                    el.removeAttribute("tabindex");
                }
            });
            document.activeElement.blur();
        }, 800); // time to finish scroll
    }
});

const cursor = document.querySelector('.custom-cursor');

// Move cursor
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover effect
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('clickable'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('clickable'));
});

// Click effect + glowing ripple
document.addEventListener('mousedown', e => {
    cursor.classList.add('click');

    const ripple = document.createElement('div');
    ripple.classList.add('cursor-ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 900); // match animation duration
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('click');
});

// Create custom cursor element
const customCursor = document.createElement("div");
customCursor.id = "custom-cursor";
document.body.appendChild(customCursor);

document.addEventListener("mousemove", e => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // Animate out when leaving
      }
    });
  }, { threshold: 0.3 }); // Only trigger when 30% visible

  sections.forEach(section => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const popItems = document.querySelectorAll(".pop-section, .skill-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, { threshold: 0.3 });

  popItems.forEach(item => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
  const popItems = document.querySelectorAll(".pop-section, .skill-card");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target.classList.contains("skill-card")) {
          const bar = entry.target.querySelector(".skill-level");
          if (bar) {
            const level = bar.getAttribute("data-level");
            bar.style.width = level + "%";
          }
        }
      } else {
        entry.target.classList.remove("visible");
        if (entry.target.classList.contains("skill-card")) {
          const bar = entry.target.querySelector(".skill-level");
          if (bar) {
            bar.style.width = "0";
          }
        }
      }
    });
  }, { threshold: 0.3 });

  popItems.forEach(item => observer.observe(item));
});