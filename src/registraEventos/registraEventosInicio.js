import {
  adicionaDocumento,
  buscaDocumentos,
  encontraDocumento,
} from "../db/documentosDb.js";

function registraEventosInicio(socket, io) {
  socket.on("get-documents", async (devolveDocumentos) => {
    const documentos = await buscaDocumentos();
    devolveDocumentos(documentos);
  });

  socket.on("create-document", async (nomeDocumento) => {
    const documentoExiste = (await encontraDocumento(nomeDocumento)) || null;

    if (documentoExiste) {
      socket.emit("duplicate-document", nomeDocumento);
    } else {
      const novoDocumento = await adicionaDocumento(nomeDocumento);
      if (novoDocumento.acknowledged) {
        io.emit("update-documents-list", nomeDocumento);
      }
    }
  });
}

export default registraEventosInicio;
