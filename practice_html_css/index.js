const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const hamburger = document.querySelector(".hamburger i");
const offscreenlinks = document.querySelector(".off-screen-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("fa-bars");
  hamburger.classList.toggle("fa-times"); // X icon
  hamburger.classList.toggle("active");
  offscreenlinks.classList.toggle("active");
});

// Typewriter Effect

const words = [
  "Cloud Engineer",
  "DevOps Engineer",
  "SR Engineer",
  "Cybersecurity Undergraduate"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent =
      currentWord.substring(0, charIndex++);
  } else {
    typingElement.textContent =
      currentWord.substring(0, charIndex--);
  }

  let speed = 100;

  if (!isDeleting && charIndex === currentWord.length + 1) {
    speed = 2000;
    isDeleting = true;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

