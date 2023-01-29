import { emiteCreateDocument } from "./socket-front-index.js";
import { buscaCookie } from "./utils/cookies.js";

const tokenJwt = buscaCookie("tokenJwt");
console.log(tokenJwt);

const listaDocumentos = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocumento = document.getElementById("input-documento");

function insereLinkDocumento(nomeDocumento) {
  listaDocumentos.innerHTML += `<a href="/documento/index.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action" id="documento-${nomeDocumento}">${nomeDocumento}</a>`;
}

function removeLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`);
  listaDocumentos.removeChild(documento);
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  emiteCreateDocument(inputDocumento.value);
  inputDocumento.value = "";
});

export { insereLinkDocumento, removeLinkDocumento };
