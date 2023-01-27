import { usuariosColecao } from "./dbConnect.js";

function cadastraUsuario({ user, password }) {
  return usuariosColecao.insertOne({ user, password });
}

function encontraUsuario(user) {
  return usuariosColecao.findOne({ user });
}

export { cadastraUsuario, encontraUsuario };
