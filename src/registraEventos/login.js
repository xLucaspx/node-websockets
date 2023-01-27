import { encontraUsuario } from "../db/usuariosDb.js";
import autenticaUsuario from "../utils/autenticaUsuario.js";

function registraEventosLogin(socket, io) {
  socket.on("user-login", async ({ user, password }) => {
    const usuario = await encontraUsuario(user);

    if (usuario) {
      const autenticado = autenticaUsuario(usuario, password);

      if (autenticado) {
        socket.emit("login-success");
      } else {
        socket.emit("login-error");
      }
    } else {
      socket.emit("user-not-found");
    }
  });
}

export default registraEventosLogin;
