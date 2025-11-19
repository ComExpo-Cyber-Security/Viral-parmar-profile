// Mobile Navigation
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
  burger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    burger.classList.remove("active");
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "0 4px 30px rgba(0, 212, 255, 0.1)";
    return;
  }

  if (currentScroll > lastScroll) {
    // Scroll down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scroll up
    navbar.style.transform = "translateY(0)";
    navbar.style.boxShadow = "0 4px 30px rgba(0, 212, 255, 0.3)";
  }

  lastScroll = currentScroll;
});

// Particle generation
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 10 + 5 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    // Random colors between primary and accent
    const colors = ["#00d4ff", "#ff006e", "#8338ec"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    const navbarHeight = navbar.offsetHeight;
    const targetPosition = targetElement.offsetTop - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(50px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});

// Animate timeline items
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll(".timeline-item").forEach((item) => {
  item.style.opacity = "0";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  if (item.classList.contains("timeline-item:nth-child(odd)")) {
    item.style.transform = "translateX(-50px)";
  } else {
    item.style.transform = "translateX(50px)";
  }

  timelineObserver.observe(item);
});

// Animate cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "scale(1)";
      }, index * 100);
    }
  });
}, observerOptions);

document
  .querySelectorAll(".about-card, .skill-category, .achievement-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.9)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    cardObserver.observe(card);
  });

// Skill tags animation
document.querySelectorAll(".skill-tag").forEach((tag, index) => {
  tag.style.opacity = "0";
  tag.style.transform = "translateY(20px)";
  tag.style.transition = "opacity 0.4s ease, transform 0.4s ease";

  setTimeout(() => {
    tag.style.opacity = "1";
    tag.style.transform = "translateY(0)";
  }, index * 50);
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  const floatingCube = document.querySelector(".floating-cube");

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }

  if (floatingCube) {
    floatingCube.style.transform = `translateX(-50%) translateY(${
      scrolled * 0.3
    }px) rotateX(${scrolled * 0.5}deg) rotateY(${scrolled * 0.5}deg)`;
  }
});

// Dynamic cursor effect (optional enhancement)
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Create subtle glow effect near cursor
  const cards = document.querySelectorAll(
    ".stat-card, .about-card, .skill-category, .achievement-card"
  );

  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const cardX = rect.left + rect.width / 2;
    const cardY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(mouseX - cardX, 2) + Math.pow(mouseY - cardY, 2)
    );

    if (distance < 300) {
      const intensity = 1 - distance / 300;
      card.style.boxShadow = `0 10px 40px rgba(0, 212, 255, ${
        intensity * 0.4
      })`;
    }
  });
});

// Add typing effect to hero subtitle
const subtitle = document.querySelector(".hero-subtitle");
if (subtitle) {
  const text = subtitle.textContent;
  subtitle.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      subtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 1000);
}

// Counter animation for stats
function animateCounter(element, target, suffix = "", duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

// Observe stat cards for counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector(".stat-number");
        if (number && !number.classList.contains("animated")) {
          number.classList.add("animated");
          const text = number.textContent;

          // Extract number and suffix (like M+, +, etc.)
          let suffix = "";
          let numericValue = text;

          if (text.includes("M+")) {
            suffix = "M+";
            numericValue = text.replace("M+", "");
          } else if (text.includes("+")) {
            suffix = "+";
            numericValue = text.replace("+", "");
          }

          const value = parseInt(numericValue);
          number.textContent = "0" + suffix;

          setTimeout(() => {
            animateCounter(number, value, suffix);
          }, 300);
        }
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});

// Add 3D tilt effect to cards
document
  .querySelectorAll(".about-card, .achievement-card, .social-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

console.log(
  "%c🔐 Viral B. Parmar - Cybersecurity Portfolio",
  "color: #00d4ff; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cInterested in cybersecurity? Let's connect!",
  "color: #ff006e; font-size: 14px;"
);
