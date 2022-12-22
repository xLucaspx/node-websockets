import { emiteDeleteDocument, emiteTextEdit, selecionaDocumento } from "./socket-front-documento.js";

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

const btnExcluir = document.getElementById('excluir-documento');
btnExcluir.addEventListener('click', () => {
  emiteDeleteDocument(nomeDocumento);
});

function atualizaEditorTexto(texto) {
  editorTexto.value = texto;
}

function alertaERedireciona(nome) {
  if (nome == nomeDocumento) { // para redirecionar apenas quem está na página excluída
    alert(`O documento ${nome} foi excluído com sucesso!`);
    window.location.href = '/';
  }
}

export { atualizaEditorTexto, alertaERedireciona }
