import { encontraUsuario } from "../db/usuariosDb.js";
import autenticaUsuario from "../utils/autenticaUsuario.js";
import geraJwt from "../utils/geraJwt.js";

function registraEventosLogin(socket, io) {
  socket.on("user-login", async ({ user, password }) => {
    const usuario = await encontraUsuario(user);

    if (usuario) {
      const autenticado = autenticaUsuario(usuario, password);

      if (autenticado) {
        // para funcionar corretamente, o payload que irá gerar o token deve ser passado como um objeto:
        const tokenJwt = geraJwt({ user });
        socket.emit("login-success", tokenJwt);
        
      } else {
        socket.emit("login-error");
      }
    } else {
      socket.emit("user-not-found");
    }
  });
}

export default registraEventosLogin;
