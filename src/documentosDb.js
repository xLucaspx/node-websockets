import { documentosColecao } from "./dbConnect.js";

function adicionaDocumento(nome) {
  return documentosColecao.insertOne({ nome, texto: "" });
}

function buscaDocumentos() {
  return documentosColecao.find().toArray();
}

function encontraDocumento(nome) {
  return documentosColecao.findOne({ nome });
}

function atualizaDocumento(nome, texto) {
  return documentosColecao.updateOne({ nome }, { $set: { texto } });
}

function deletaDocumento(nome) {
  return documentosColecao.deleteOne({ nome });
}

export {
  adicionaDocumento,
  atualizaDocumento,
  buscaDocumentos,
  encontraDocumento,
  deletaDocumento,
};
