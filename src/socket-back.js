import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumento from "./registraEventos/documento.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import io from "./server.js";

// escutando o evento de conexão do cliente:
io.on("connection", (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`);
  // socket.on('disconnect', (motivo) => console.log(`Cliente ${socket.id} desconectado; motivo: ${motivo}`));

  registraEventosInicio(socket, io);
  registraEventosDocumento(socket, io);
  registraEventosCadastro(socket, io);
});
