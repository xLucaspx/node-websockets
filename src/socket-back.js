import "dotenv/config"; // para utilizar variáveis de ambiente no JWT
import autorizaUsuario from "./middlewares/autorizaUsuario.js";
import registraEventosCadastro from "./registraEventos/cadastro.js";
import registraEventosDocumento from "./registraEventos/documento.js";
import registraEventosInicio from "./registraEventos/inicio.js";
import registraEventosLogin from "./registraEventos/login.js";
import io from "./server.js";

// função middleware:
// io.use((socket, next) => {
//   next(new Error("Você precisa fazer login para acessar essa página!"));
// });

// utilizando namespaces (sempre começa com '/'):
const nspUsuarios = io.of("/usuarios");

/* O que queremos fazer ao registrar um middleware é criar um intermediador
entre o cliente e o servidor, pois queremos que esse intermediador verifique
se o cliente tem autorização para acessar o servidor */
nspUsuarios.use(autorizaUsuario);

nspUsuarios.on("connection", (socket) => {
  registraEventosInicio(socket, nspUsuarios);
  registraEventosDocumento(socket, nspUsuarios);
});

// escutando o evento de conexão do cliente; io sem referência
// aponta para o namespace principal ('/'):
io.on("connection", (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`);
  // socket.on('disconnect', (motivo) => console.log(`Cliente ${socket.id} desconectado; motivo: ${motivo}`));

  registraEventosCadastro(socket, io);
  registraEventosLogin(socket, io);
});
