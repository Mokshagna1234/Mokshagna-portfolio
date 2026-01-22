/* =========================================
   PORTFOLIO INTERACTIONS
   Clean • Professional • Recruiter-friendly
   ========================================= */

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* ===== SCROLL REVEAL (SUBTLE) ===== */
const revealElements = document.querySelectorAll(
  ".hero-text, .service-card, .project-card, .skills-grid span, .contact-grid"
);

const revealOnScroll = () => {
  const triggerPoint = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < triggerPoint) {
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ===== SMOOTH NAV CLICK ===== */
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth"
      });
    }
  });
});

/* ===== DEBUG CHECK ===== */
console.log("Portfolio interactions loaded successfully");



document.addEventListener("DOMContentLoaded", () => {
  const roles = [
    "Full Stack Developer",
    "Backend Developer",
    "Python Developer",
    "Data Analyst",
    "Software Engineer",
  ];

  const role = document.getElementById("role");

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 140;     // typing speed
  const DELETE_SPEED = 90;   // deleting speed
  const HOLD_TIME = 1300;    // pause after full word

  function animateRole() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      role.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        setTimeout(() => {
          isDeleting = true;
        }, HOLD_TIME);
      }
    } else {
      role.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(
      animateRole,
      isDeleting ? DELETE_SPEED : TYPE_SPEED
    );
  }

  animateRole();
});


/* =========================
   NEON CURSOR FOLLOW
   ========================= */
const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;

  cursor.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateCursor);
}

animateCursor();

/* =========================
   MAGNETIC BUTTONS / CARDS
   ========================= */
const magneticElements = document.querySelectorAll(
  ".btn, .project-card, .service-card, .contact-link"
);

magneticElements.forEach((el) => {
  el.classList.add("magnetic");

  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translate(0,0)";
  });
});


