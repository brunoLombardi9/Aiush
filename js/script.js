const contenedorProductos = document.querySelector('#contenedorProductos');
const menuProductos = document.querySelectorAll('.menuProductos');
const subMenuProductos = document.querySelectorAll('.menuProductos-subMenu');
const linksSubmenu = document.querySelectorAll('.links-subMenu');
const tituloModal = document.querySelector('#exampleModalLabel');
const botonesCarrousel = document.querySelectorAll('.botonesCarrousel');
const seccionProductos = "Aiush - Productos";
const carrousel = document.querySelector('.carousel-inner');
const contenidoProducto = document.querySelector('.contenidoProducto');
let productos = [];
let categoria;

function init() {
    comprobarCategoria();
    traerProductos();
    filtrarPorCategoria();
    borrarCategoria();
    redirigirProductos();
}


function generarCard(producto) {

    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-sm-6", "mt-3", "mb-3", "cardProducto");
    card.setAttribute("data-bs-toggle", "modal");
    card.setAttribute("data-bs-target", "#exampleModal");
    card.onclick = () => desplegarModal(producto.id);
    contenedorProductos.appendChild(card);


    const imagen = document.createElement("img");
    imagen.classList.add("img-fluid");
    imagen.src = `../${producto.imagenes[0]}`;
    card.appendChild(imagen);

}

function resaltarOpciones() {
    menuProductos.forEach(opcion => {
        if (opcion.innerText === categoria || opcion.innerText === "Todos los productos" && categoria === "Todos") {
            opcion.classList.add('opcionSeleccionada');
        } else {
            opcion.classList.remove('opcionSeleccionada');
        }
    })
}

function filtrarPorCategoria() {

    menuProductos.forEach(opcion => {
        opcion.addEventListener('click', () => {

            if (document.title === seccionProductos) {
                limpiarContenido(contenedorProductos)
            }

            if (opcion.innerText === "Todos los productos" || opcion.innerText === "Productos") {
                const todosLosProductos = productos.filter(producto => producto.id !== 0);
                todosLosProductos.forEach(producto => generarCard(producto));

                categoria = "Todos";
            } else {

                const productosFiltrados = productos.filter(producto => producto.categoria === opcion.innerText);
                productosFiltrados.forEach(producto => generarCard(producto));

                categoria = opcion.innerText;
            }

            retenerCategoria();

            resaltarOpciones();

        });


    });



}


function retenerCategoria() {
    localStorage.setItem("Categoria", JSON.stringify(categoria));
}


function comprobarCategoria() {
    JSON.parse(localStorage.getItem("Categoria")) !== null ?
        categoria = JSON.parse(localStorage.getItem("Categoria")) :
        categoria = "Todos";
}



function traerProductos() {

    if (document.title === seccionProductos) {

        fetch("../productos.json")
            .then(res => res.json())
            .then(res => productos = [...res])
            .then(productos => {


                const imagenesAgendasTodas = productos[0].imagenesComunes.imagenesAgendasTodas;
                const imagenesCuadernosLibretasTodas = productos[0].imagenesComunes.imagenesCuadernosLibretasTodas;

                productos.forEach(producto => {
                    if (producto.categoria === "Agendas") {
                        imagenesAgendasTodas.forEach(imagen => {
                            producto.imagenes.push(imagen);
                        })
                    }
                    if (producto.categoria === "Cuadernos A5" || producto.categoria === "Libretas") {
                        imagenesCuadernosLibretasTodas.forEach(imagen => {
                            producto.imagenes.push(imagen);
                        })
                    }
                });


                if (categoria !== null && categoria !== undefined) {

                    const productosFiltrados = productos.filter(producto => {
                        return producto.categoria === categoria;
                    });

                    productosFiltrados.forEach(producto => {
                        generarCard(producto);
                    });

                    resaltarOpciones();
                }
                if (categoria === "Todos") {

                    menuProductos.forEach(producto => {
                        if (producto.innerText === "Todos los productos") {
                            producto.classList.add('opcionSeleccionada');
                        }
                    });


                    productos.forEach(producto => {
                        if (producto.id !== 0) {
                            generarCard(producto);
                        }
                    });

                }
            })
            .catch(error => console.log(error));
    }
}


function borrarCategoria() {
    if (document.title === seccionProductos) {
        window.onbeforeunload = () => {
            localStorage.removeItem('Categoria');
        }
    }
}

function redirigirProductos() {

    linksSubmenu.forEach(link => {
        link.addEventListener('click', () => {
            if (link.innerText === "Todos los productos" || link.innerText === "Productos") {
                categoria = "Todos";
            } else {
                categoria = link.innerText;
            }

            retenerCategoria();

            if (document.title === "Aiush - Home") {
                window.location.href = "secciones/productos.html";
            } else if (document.title !== seccionProductos ) {
                window.location.href = "./productos.html";
            }
        });
    });
}

function desplegarModal(id) {
    const productoFiltrado = productos.find(producto => producto.id === id);
    tituloModal.innerText = productoFiltrado.nombre;

    const imagenesCarrousel = productoFiltrado.imagenes;

    imagenesCarrousel.length === 1 ?
        botonesCarrousel.forEach(boton => boton.classList.add('d-none')) :
        botonesCarrousel.forEach(boton => boton.classList.remove('d-none'));


    descripcionProducto(productoFiltrado);

    limpiarContenido(carrousel);

    for (i = 0; imagenesCarrousel.length > i; i++) {
        const carrouselItem = document.createElement('div');
        carrouselItem.classList.add('carousel-item');
        if (i === 0) {
            carrouselItem.classList.add('active');
        }
        const imagen = document.createElement('img');
        imagen.classList.add('d-block', 'w-100');
        imagen.src = `../${productoFiltrado.imagenes[i]}`;
        carrouselItem.appendChild(imagen);
        carrousel.appendChild(carrouselItem);
    }

}

function limpiarContenido(nodelist) {
    while (nodelist.hasChildNodes()) {
        nodelist.removeChild(nodelist.firstChild);
    }
}

function descripcionProducto(producto) {

    limpiarContenido(contenidoProducto);

    let descripciones;

    switch (producto.categoria) {
        case "L??pices plantables":
            descripciones = productos[0].descripciones.lapicesPlantables;
            break;
        case "Libretas":
            descripciones = productos[0].descripciones.libretas;
            break;
        case "Agendas":
            descripciones = productos[0].descripciones.agendas;
            break;
        case "Cuadernos A5":
            descripciones = productos[0].descripciones.cuadernos;
            break;
        case "Stickers":
            descripciones = productos[0].descripciones.stickers;
            break;
        case "Se??aladores":
            descripciones = productos[0].descripciones.se??aladores;
            break;
    }

    descripciones.forEach(texto => {
        const parrafo = document.createElement('p');
        parrafo.innerText = texto;
        parrafo.classList.add('mt-auto', "mb-auto");

        contenidoProducto.appendChild(parrafo);
    });




}