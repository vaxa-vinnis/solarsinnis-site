const params = new URLSearchParams(window.location.search);
const eventoKey = params.get("evento");

const titulo = document.getElementById("eventoTitulo");
const listado = document.getElementById("eventosListado");
const carousel = document.getElementById("carouselContainer");

// Cargar índice de eventos
fetch("js/eventos.json")
  .then(res => res.json())
  .then(eventos => {

    // ───────── LISTADO DE EVENTOS ─────────
    if (!eventoKey || !eventos[eventoKey]) {
      titulo.innerText = "Eventos";

      let html = "";

      Object.keys(eventos).forEach(key => {
        const ev = eventos[key];

        html += `
          <div class="col-md-6 col-lg-4">
            <a href="eventos.html?evento=${key}" class="evento-card text-decoration-none">
              <div class="evento-bg" style="background-image:url('${ev.cover}')">
                <div class="evento-overlay"></div>
                <div class="evento-title">
                  ${ev.titulo}
                </div>
              </div>
            </a>
          </div>
        `;
      });

      listado.innerHTML = html;
      carousel.innerHTML = "";
      return;
    }

    // ───────── DETALLE DE EVENTO ─────────
      const evento = eventos[eventoKey];
      titulo.innerText = evento.titulo;

      let slides = "";

      evento.imagenes.forEach((img, index) => {
        slides += `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${img}"
                class="d-block w-100 evento-carousel-img">
          </div>
        `;
      });

      carousel.innerHTML = `
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

  });
