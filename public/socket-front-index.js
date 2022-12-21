import { insereLinkDocumento } from "./index.js";

const socket = io();

socket.emit("get-documents", (documentos) =>
  documentos.forEach((documento) => insereLinkDocumento(documento.nome))
);

socket.on('update-documents-list', (nomeDocumento) => {
  insereLinkDocumento(nomeDocumento);
});

socket.on('duplicate-document', (nomeDocumento) => alert(`O documento ${nomeDocumento} já existe!`));

function emiteCreateDocument(nomeDocumento) {
  socket.emit('create-document', nomeDocumento);
}

export { emiteCreateDocument }
