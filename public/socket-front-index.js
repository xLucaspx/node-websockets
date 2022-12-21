import { insereLinkDocumento } from "./index.js";

const socket = io();

socket.emit('get-documents', (documentos) => documentos.forEach(documento => {
  insereLinkDocumento(documento.nome);
}))
