import { documentosColecao } from "./dbConnect.js";

function encontraDocumento(nome) {
  return documentosColecao.findOne({ nome });
}

function atualizaDocumento(nome, texto) {
  return documentosColecao.updateOne({ nome }, { $set: { texto } });
}

export { encontraDocumento, atualizaDocumento };
