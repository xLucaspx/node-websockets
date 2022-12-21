import { atualizaEditorTexto } from "./documento.js";

/* Uma vez que o front-end está sendo servido no mesmo domínio e porta
que o servidor (http://localhost:3000), nós não precisamos passar nenhum
parâmetro para io().; nesse caso, o Socket.IO deduz a URL do servidor pela
URL do navegador. Mas se esse não fosse o caso, precisaríamos informar qual
a URL do servidor. Por exemplo, se o cliente estivesse sendo servido em
http://localhost:5000, e o servidor Socket.IO estivesse escutando em
http://localhost:3000, precisaríamos escrever o seguinte código:

const socket = io("http://localhost:3000"); 

Sempre que a função io() é executada no front-end, um evento “connection” é
emitido; assim, podemos escutá-lo do lado do servidor, obtendo as informações
do cliente que se conectou. */
const socket = io();

// socket.on('disconnect', (motivo) => console.log(`Servidor desconectado; motivo: ${motivo}`));

function selecionaDocumento(nome) {
  socket.emit('select-document', nome);
}

function emiteTextEdit(dados) {
  socket.emit('text-edit', dados);
}

socket.on('text-edit', (texto) => {
  atualizaEditorTexto(texto);
});

export { emiteTextEdit, selecionaDocumento }
