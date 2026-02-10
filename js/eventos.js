// js/eventos.js

const eventos = {
  viking25: {
    titulo: "Viking Fest 2025",
    imagenes: [
      "img/eventos/marquesa/01.jpg",
      "img/eventos/marquesa/02.jpg",
      "img/eventos/marquesa/03.jpg"
    ]
  },
  queretaro24: {
    titulo: "Festival Medieval Querétaro 2024",
    imagenes: [
      "img/eventos/queretaro/01.jpg",
      "img/eventos/queretaro/02.jpg"
    ]
  }
};

// Obtener parámetro ?evento=
const params = new URLSearchParams(window.location.search);
const eventoKey = params.get("evento");

const evento = eventos[eventoKey];

const titulo = document.getElementById("eventoTitulo");
const container = document.getElementById("carouselContainer");

if (!evento) {
  titulo.innerText = "Evento no encontrado";
  container.innerHTML = `<p class="text-center text-muted">Este evento no existe.</p>`;
} else {
  titulo.innerText = evento.titulo;

  let slides = "";

  evento.imagenes.forEach((img, index) => {
    slides += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${img}" class="d-block w-100 evento-carousel-img" alt="">
      </div>
    `;
  });

  container.innerHTML = `
    <div id="eventoCarousel" class="carousel slide carousel-fade shadow-lg" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${slides}
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#eventoCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#eventoCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>
  `;
}
