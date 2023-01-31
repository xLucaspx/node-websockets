import jwt from "jsonwebtoken";

function autorizaUsuario(socket, next) {
  /* socket.handshake se refere a conexão que está tentando ser estabelecida
 entre cliente e servidor, auth é a propriedade que passamos para a função io
 e, neste caso, token é a propriedade que nós nomeamos dentro de auth: */
  const tokenJwt = socket.handshake.auth.token;

  /* Abordando jwt.verify com função callback + if/else: quando o token JWT é verificado
  com sucesso, o parâmetro erro tem valor null e o parâmetro tokenJwt guarda o valor do
  token. Em caso de falha, erro é personalizado de acordo com o erro, e tokenJwt torna-se undefined */
  jwt.verify(tokenJwt, process.env.SEGREDO_JWT, (error, payloadToken) => {
    if (!error) {
      socket.emit("successful-authorization", payloadToken);
      next(); // É importante que o next seja sempre executado, em caso de sucesso ou de erro
    } else {
      next(new Error("É necessário fazer o login para acessar esta página!"));
    }
  });

  // Abordando jwt.verify com trycatch:
  // try {
  //   // o retorno de jwt.verify é o payload do token, no caso dele ter sido verificado
  //   // com sucesso. Caso ele não seja verificado com sucesso, um erro é lançado pelo método
  //   const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT);
  //   socket.emit('successful-authorization', payloadToken);
  //   next();
  // } catch (error) {
  //   next(error);
  // }
}

export default autorizaUsuario;
