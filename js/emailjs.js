const btn = document.querySelector('#enviarForm');
const mainContacto = document.querySelector('.mainContacto');

function limpiarContenido(nodo) {
  while (nodo.hasChildNodes()) {
    nodo.removeChild(nodo.firstChild);
  }
}

document.querySelector('#formulario')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_3p3420p';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {

        limpiarContenido(mainContacto);

        const postFormulario = document.createElement('h1');
        postFormulario.innerText = "Gracias por tu consulta, te responderemos lo antes posible!";
        postFormulario.classList.add('text-center');
        mainContacto.appendChild(postFormulario);

        const enlaceIndex = document.createElement('a');
        enlaceIndex.href = '../index.html';
        mainContacto.appendChild(enlaceIndex);

        const botonVolver = document.createElement('button');
        botonVolver.classList.add('btn', 'btn-primary', 'botonVolver');
        botonVolver.innerText = "Volver a Home";
        enlaceIndex.appendChild(botonVolver);


      }, (err) => {
        console.log(JSON.stringify(err));
      });
  });