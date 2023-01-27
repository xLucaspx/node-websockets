import criaHashESalSenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function cadastraUsuario({ user, password }) {
  const { hashSenha, salSenha } = criaHashESalSenha(password);

  return usuariosColecao.insertOne({ user, hashSenha, salSenha });
}

function encontraUsuario(user) {
  return usuariosColecao.findOne({ user });
}

export { cadastraUsuario, encontraUsuario };
