/* =====================
   WAIT FOR PAGE LOAD
===================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     TYPING ANIMATION (UNCHANGED)
  ===================== */
  const textArray = [
    "a Web Developer",
    "a Designer",
    "a Front-End Developer",
    "Creative"
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  const typingElement = document.querySelector(".typing");

  function typeEffect() {
    if (!typingElement) return;

    if (index >= textArray.length) index = 0;

    currentText = textArray[index];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex--);
    } else {
      typingElement.textContent = currentText.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      speed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index++;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();


  /* =====================
     ACTIVE NAV (MULTI-PAGE)
  ===================== */
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-link");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });


  /* =====================
     DARK / LIGHT MODE
  ===================== */
  const themeBtn = document.getElementById("themeBtn");

  if (themeBtn) {

    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
      themeBtn.textContent = "☀️ Light Mode";
    }

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");

      if (document.body.classList.contains("light-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "light");
      } else {
        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "dark");
      }
    });
  }


  /* =====================
     HERO AUTO + ARROWS
  ===================== */
  const hero = document.querySelector(".hero-home");
  const heroNext = document.querySelector(".hero-arrow.next");
  const heroPrev = document.querySelector(".hero-arrow.prev");

  if (hero) {

    const images = [
      "images/hero-home.jpg",
      "images/hero2.jpg",
      "images/hero3.jpg"
    ];

    let current = 0;
    let interval;

    function updateHero() {
      hero.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${images[current]})`;
    }

    function startAutoSlide() {
      interval = setInterval(() => {
        current = (current + 1) % images.length;
        updateHero();
      }, 4000);
    }

    function resetAutoSlide() {
      clearInterval(interval);
      startAutoSlide();
    }

    if (heroNext) {
      heroNext.addEventListener("click", () => {
        current = (current + 1) % images.length;
        updateHero();
        resetAutoSlide();
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener("click", () => {
        current = (current - 1 + images.length) % images.length;
        updateHero();
        resetAutoSlide();
      });
    }

    updateHero();
    startAutoSlide();

    hero.addEventListener("mouseenter", () => clearInterval(interval));
    hero.addEventListener("mouseleave", startAutoSlide);
  }


  /* =====================
     TIMELINE CAROUSEL
     (ARROWS + DOTS + AUTO)
  ===================== */
  const track = document.querySelector(".timeline-track");
  const dotsContainer = document.querySelector(".carousel-dots");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");

  if (track && dotsContainer) {

    const items = document.querySelectorAll(".timeline-item");
    let slideIndex = 0;
    const totalItems = items.length;

    // CREATE DOTS
    items.forEach((_, i) => {
      const dot = document.createElement("span");

      if (i === 0) dot.classList.add("active-dot");

      dot.addEventListener("click", () => {
        slideIndex = i;
        updateCarousel();
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    function updateCarousel() {
      track.style.transform = `translateX(-${slideIndex * 100}%)`;

      dots.forEach(dot => dot.classList.remove("active-dot"));
      dots[slideIndex].classList.add("active-dot");
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        slideIndex = (slideIndex + 1) % totalItems;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        slideIndex = (slideIndex - 1 + totalItems) % totalItems;
        updateCarousel();
      });
    }

    // AUTO
    setInterval(() => {
      slideIndex = (slideIndex + 1) % totalItems;
      updateCarousel();
    }, 4000);
  }


  /* =====================
     FORM VALIDATION (SAFE)
  ===================== */
  const form = document.querySelector("[data-form]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn) {
    form.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

});
/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
// EMAILJS INIT
(function(){
  emailjs.init("YOUR_PUBLIC_KEY"); // replace
})();

// SEND EMAIL
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.sendForm(
      "YOUR_SERVICE_ID",   // replace
      "YOUR_TEMPLATE_ID",  // replace
      this
    ).then(() => {
      alert("✅ Message sent successfully!");
      form.reset();
    }, () => {
      alert("❌ Failed to send. Try again.");
    });
  });
}
function showPopup() {
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = document.querySelector("[data-form-btn]");
  btn.classList.add("loading");

  // simulate sending (replace with EmailJS later)
  setTimeout(() => {
    btn.classList.remove("loading");
    showSuccessPopup();
  }, 2000);
});
form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    document.querySelectorAll(".form-input").forEach(input => {
      if (!input.checkValidity()) {
        input.classList.add("error");
        setTimeout(() => input.classList.remove("error"), 300);
      }
    });
  }
});
const cards = document.querySelectorAll(".project-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});
/* =====================
   SKILL ANIMATION ON SCROLL
===================== */
document.addEventListener("DOMContentLoaded", () => {

  const skillItems = document.querySelectorAll(".skills-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector(".skill-progress-fill");
        const value = entry.target.querySelector("data").value;

        bar.style.setProperty("--progress", value + "%");
        entry.target.classList.add("animate");
      }
    });
  }, { threshold: 0.5 });

  skillItems.forEach(item => observer.observe(item));

});
/* =====================
   SHRINK NAVBAR ON SCROLL
===================== */
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});
const track = document.querySelector(".timeline-track");
const items = document.querySelectorAll(".timeline-item");
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
const totalItems = items.length;

/* ===== CREATE DOTS ===== */
items.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active-dot");

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dots span");

/* ===== UPDATE FUNCTION ===== */
function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[index].classList.add("active-dot");
}

/* ===== NEXT ===== */
nextBtn.addEventListener("click", () => {
  index = (index + 1) % totalItems;
  updateCarousel();
});

/* ===== PREVIOUS ===== */
prevBtn.addEventListener("click", () => {
  index = (index - 1 + totalItems) % totalItems;
  updateCarousel();
});

/* ===== AUTO SLIDE ===== */
setInterval(() => {
  index = (index + 1) % totalItems;
  updateCarousel();
}, 4000);
