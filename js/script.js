const contenedorProductos = document.querySelector('#contenedorProductos');

function generarCard(producto) {

    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-6", "mt-3", "mb-3", "cardProducto");
    contenedorProductos.appendChild(card);

    const imagen = document.createElement("img");
    imagen.classList.add("img-fluid");
    imagen.src = "../assets/Agendas/Modelo 1/Agenda modelo Epu 1.webp";
    card.appendChild(imagen);
}

fetch("../productos.json")
    .then(res => res.json())
    .then(productos => {
        productos.forEach(producto => {
            generarCard(producto);
        });
    });