import { cadastraUsuario, encontraUsuario } from "../db/usuariosDb.js";

function registraEventosCadastro(socket, io) {
  socket.on("register-user", async (dados) => {
    const user = await encontraUsuario(dados.user);
    // tratando para não cadastrar usuários com o mesmo nome:
    if (user == null) {
      const resultado = await cadastraUsuario(dados);

      if (resultado.acknowledged) {
        socket.emit("register-success");
      } else {
        socket.emit("register-error");
      }
    } else {
      socket.emit('user-exists');
    }
  });
}

export default registraEventosCadastro;
