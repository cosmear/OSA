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

