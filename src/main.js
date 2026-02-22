import "./style.css";

// ═══════════ NAVBAR SCROLL BEHAVIOR ═══════════
const navbar = document.getElementById("navbar");
let lastScrollY = 0;

function handleNavbarScroll() {
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    navbar.classList.add("bg-forest-dark/95", "shadow-lg", "backdrop-blur-md");
    navbar.classList.remove("bg-transparent");
  } else {
    navbar.classList.remove("bg-forest-dark/95", "shadow-lg", "backdrop-blur-md");
    navbar.classList.add("bg-transparent");
  }
  lastScrollY = scrollY;
}

window.addEventListener("scroll", handleNavbarScroll, { passive: true });
handleNavbarScroll();

// ═══════════ MOBILE MENU ═══════════
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("open");
  });
});

// ═══════════ SCROLL ANIMATIONS ═══════════
const animatedElements = document.querySelectorAll(
  ".animate-on-scroll, .animate-left, .animate-right, .animate-scale"
);

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

animatedElements.forEach((el) => scrollObserver.observe(el));

// ═══════════ COUNTER ANIMATION ═══════════
const counters = document.querySelectorAll(".counter");

function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out quad
    const eased = 1 - (1 - progress) * (1 - progress);
    el.textContent = Math.round(eased * target);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target;
      el.classList.add("counter-animate");
    }
  }

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((c) => counterObserver.observe(c));

// ═══════════ SMOOTH SCROLL FOR ANCHOR LINKS ═══════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  });
});

// ═══════════ FORM HANDLING (demo) ═══════════
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Message Sent!";
    btn.classList.add("bg-forest");
    btn.classList.remove("bg-earth");
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("bg-forest");
      btn.classList.add("bg-earth");
      form.reset();
    }, 3000);
  });
}
