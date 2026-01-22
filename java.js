
// Función para inicializar el menú (se llama desde layout.js después de inyectar el header)
window.initMobileMenu = function() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    // Eliminar listeners previos para evitar duplicados (clonando el nodo)
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    newHamburger.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
      nav.classList.toggle("nav-closed");
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Slider existente (se mantiene igual)
  const slides = document.querySelectorAll(".hero-slider .slide");
  if (slides.length > 0) {
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
  } else {
    // Fallback para el otro slider si existe
    let currentSlide = 0;
    const items = document.querySelectorAll('.slide');
    if (items.length > 0) {
        function showSlide(index) {
            if (index >= items.length) currentSlide = 0;
            else if (index < 0) currentSlide = items.length - 1;
            else currentSlide = index;
            items.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
        }
        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }
        setInterval(() => changeSlide(1), 5000);
    }
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) { // Evita "#" vacío
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
      }
    });
  });
});