/* com a lista local é possível manter o registro de quem entrou em
cada sala; esse é o tipo de informação que faz sentido ser mantida de
forma local pelo servidor, e não no banco de dados ou no navegador,
afinal, se o servidor cair, realmente faz sentido que os usuários sejam
desconectados das salas e percam a comunicação entre eles. */
const conexoesDocumentos = [];

function adicionaConexao(conexao) {
  conexoesDocumentos.push(conexao);
}

function removeConexao(idConexao) {
  const index = conexoesDocumentos.findIndex(
    (conexao) => conexao.id == idConexao
  );

  if (index != -1) {
    conexoesDocumentos.splice(index, 1);
  }
}

function buscaUsuariosDocumento(nomeDocumento) {
  return conexoesDocumentos
    .filter((conexao) => conexao.nomeDocumento == nomeDocumento)
    .map((conexao) => conexao.nomeUsuario);
}

function buscaConexao(nomeDocumento, nomeUsuario) {
  return conexoesDocumentos.find(
    (conexao) =>
      conexao.nomeDocumento == nomeDocumento &&
      conexao.nomeUsuario == nomeUsuario
  );
}

export { adicionaConexao, buscaUsuariosDocumento, removeConexao, buscaConexao };
