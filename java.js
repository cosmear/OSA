document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slider .slide");
  let current = 0;

  function showNextSlide() {
    const prev = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];

    // Estado previo y nuevo
    prev.classList.remove("active");
    prev.classList.add("prev");
    next.classList.add("active");

    // Limpia clases viejas
    setTimeout(() => prev.classList.remove("prev"), 1000);
  }

  setInterval(showNextSlide, 5000);
});
