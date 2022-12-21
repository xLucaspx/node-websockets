import { emiteTextEdit } from "./socket-front-documento.js";

const editorTexto = document.getElementById('editor-texto');
editorTexto.addEventListener('keyup', () => emiteTextEdit(editorTexto.value));

function atualizaEditorTexto(texto) {
  editorTexto.value = texto;
}

export { atualizaEditorTexto }
