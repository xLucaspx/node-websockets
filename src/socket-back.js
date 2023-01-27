import "dotenv/config"; // para utilizar variáveis de ambiente no JWT
import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumento from "./registraEventos/documento.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import registraEventosLogin from "./registraEventos/login.js";
import io from "./server.js";

// escutando o evento de conexão do cliente:
io.on("connection", (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`);
  // socket.on('disconnect', (motivo) => console.log(`Cliente ${socket.id} desconectado; motivo: ${motivo}`));

  registraEventosCadastro(socket, io);
  registraEventosLogin(socket, io);
  registraEventosInicio(socket, io);
  registraEventosDocumento(socket, io);
});
