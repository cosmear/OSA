document.addEventListener("DOMContentLoaded", () => {
  // Slider existente
  const slides = document.querySelectorAll(".hero-slider .slide");
  let current = 0;

  function showNextSlide() {
    const prev = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];

    prev.classList.remove("active");
    prev.classList.add("prev");
    next.classList.add("active");

    setTimeout(() => prev.classList.remove("prev"), 1000);
  }

  setInterval(showNextSlide, 5000);

  // Toggle menú hamburguesa
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("nav-open");
    nav.classList.toggle("nav-closed");
  });
});

 let currentSlide = 0;

    function showSlide(index) {
      const slides = document.querySelectorAll('.slide');
      if (index >= slides.length) currentSlide = 0;
      else if (index < 0) currentSlide = slides.length - 1;
      else currentSlide = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
    }

    function changeSlide(direction) {
      showSlide(currentSlide + direction);
    }

    setInterval(() => changeSlide(1), 5000);

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Menú hamburguesa
    document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('nav-open');
      mainNav.classList.toggle('nav-closed');
    });
  }
});