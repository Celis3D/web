let index = 0;

function moverCarrusel(direccion) {
  const carrusel = document.querySelector(".carrusel");
  const items = document.querySelectorAll(".carrusel-item");
  const totalItems = items.length;
  const visibles = window.innerWidth <= 768 ? 1 : 3;

  index += direccion;
  if (index < 0) index = 0;
  if (index > totalItems - visibles) index = totalItems - visibles;

  const desplazamiento = items[0].offsetWidth + 20;
  carrusel.style.transform = `translateX(-${index * desplazamiento}px)`;

  actualizarIndicadores(index);
}

function actualizarIndicadores(actual) {
  const totalItems = document.querySelectorAll(".carrusel-item").length;
  const visibles = window.innerWidth <= 768 ? 1 : 3;
  const max = totalItems - visibles + 1;

  const contenedor = document.getElementById("indicadores");
  contenedor.innerHTML = "";

  for (let i = 0; i < max; i++) {
    const dot = document.createElement("span");
    if (i === actual) dot.classList.add("activo");
    contenedor.appendChild(dot);
  }
}

// Inicializar los indicadores al cargar
window.addEventListener("load", () => actualizarIndicadores(index));
window.addEventListener("resize", () => actualizarIndicadores(index));

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("form-status");
  
    form.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const submitBtn = form.querySelector("button[type='submit']");
  
      const hasTags = /<[^>]*>/g;
      if (hasTags.test(name) || hasTags.test(email) || hasTags.test(message)) {
        e.preventDefault();
        status.innerText = "No se permiten etiquetas HTML o código.";
        status.style.color = "red";
        return;
      }
  
      // Bloquea el botón para evitar múltiples envíos
      submitBtn.disabled = true;
      status.innerText = "Enviando mensaje...";
      status.style.color = "#333";
  
      // Escucha la respuesta del servidor si es FormSubmit
      form.addEventListener("formsubmit", () => {
        status.innerText = "¡Mensaje enviado con éxito!";
        status.style.color = "green";
  
        // Opcional: limpiar formulario
        form.reset();
  
        // Reactivar botón después de un tiempo
        setTimeout(() => {
          submitBtn.disabled = false;
          status.innerText = "";
        }, 3000);
      });
    });
  });
  
  
  