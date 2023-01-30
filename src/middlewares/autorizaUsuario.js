import jwt from "jsonwebtoken";

function autorizaUsuario(socket, next) {
  /* socket.handshake se refere a conexão que está tentando ser estabelecida
 entre cliente e servidor, auth é a propriedade que passamos para a função io
 e, neste caso, token é a propriedade que nós nomeamos dentro de auth: */
  const tokenJwt = socket.handshake.auth.token;

  // É importante que o next seja sempre executado, em caso de sucesso ou de erro
  try {
    jwt.verify(tokenJwt, process.env.SEGREDO_JWT);
    next();
  } catch (error) {
    next(error);
  }
}

export default autorizaUsuario;
