
document.addEventListener("DOMContentLoaded", function () {
  const contacto = document.getElementById("contacto");
  const navbar = document.getElementById("navbar");
  const footerSpacer = document.getElementById("footer-spacer");
  
  // Posición final para que contacto se quede pegado en la parte superior de la ventana
  const navbarHeight = navbar.offsetHeight;

  window.addEventListener("scroll", function () {
    const contactoTop = contacto.getBoundingClientRect().top;
    const contactoBottom = contacto.getBoundingClientRect().bottom;

    // Detectar si el contacto ha tocado el navbar
    if (contactoTop <= navbarHeight) {
      contacto.classList.add("fixed");
    } else {
      contacto.classList.remove("fixed");
    }

    // Si el contacto está tocando el footer spacer, dejar de moverse
    if (contactoBottom >= footerSpacer.getBoundingClientRect().top) {
      contacto.classList.remove("fixed");
    }
  });
});

