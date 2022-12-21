import { emiteTextEdit, selecionaDocumento } from "./socket-front-documento.js";

const params = new URLSearchParams(window.location.search);
const nomeDocumento = params.get('nome');

const tituloDocumento = document.getElementById('titulo-documento');
tituloDocumento.textContent = nomeDocumento || 'Documento sem título';
selecionaDocumento(nomeDocumento);

const editorTexto = document.getElementById('editor-texto');
editorTexto.addEventListener('keyup', () => emiteTextEdit({
  texto: editorTexto.value,
  nomeDocumento
}));

function atualizaEditorTexto(texto) {
  editorTexto.value = texto;
}

export { atualizaEditorTexto }
