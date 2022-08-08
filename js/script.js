const contenedorProductos = document.querySelector('#contenedorProductos');
const menuProductos = document.querySelectorAll('.menuProductos');
let productos;

function generarCard(producto) {

    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-6", "mt-3", "mb-3", "cardProducto");
    contenedorProductos.appendChild(card);

    const imagen = document.createElement("img");
    imagen.classList.add("img-fluid");
    imagen.src = `../${producto.imagenes[0]}`;
    card.appendChild(imagen);
}

function filtrarPorCategoria() {

    menuProductos.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const productosFiltrados = productos.filter(producto => producto.categoria === opcion.innerText);
            console.log(productosFiltrados)
        })
    })
}

function eliminarCards() {
    while (contenedorProductos.hasChildNodes()) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }
}


fetch("../productos.json")
    .then(res => res.json())
    .then(res => productos = res)
    .then(productos => {
        productos.forEach(producto => {
            generarCard(producto);
        });
    })
    .catch(error => console.log(error));

