import { emiteCreateDocument } from "./socket-front-index.js";

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById('input-documento');

function insereLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action">${nomeDocumento}</a>`;
}

form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  emiteCreateDocument(inputDocumento.value);
  inputDocumento.value = '';
});

export { insereLinkDocumento }
