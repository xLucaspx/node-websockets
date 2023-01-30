import { insereLinkDocumento, removeLinkDocumento } from "./index.js";
import { buscaCookie } from "./utils/cookies.js";

/* a função middleware é executada antes da conexão do cliente, antes do
socket se conectar ao servidor. Isso significa que não conseguiremos escrever
socket.emit e enviar o tokenJwt, pois não sabemos se o socket foi realmente
estabelecido. Sendo assim, precisamos enviar essa informação antes dessa conexão
ser estabelecida. Podemos fazer isso utilizando a função io: */
const socket = io("/usuarios", { auth: { token: buscaCookie("tokenJwt") } });
// "/usuarios" = namespace

socket.on("connect_error", (error) => {
  alert(error.message);
  window.location.href = "/login/index.html";
});

socket.emit("get-documents", (documentos) =>
  documentos.forEach((documento) => insereLinkDocumento(documento.nome))
);

socket.on("update-documents-list", (nomeDocumento) => {
  insereLinkDocumento(nomeDocumento);
});

socket.on("duplicate-document", (nomeDocumento) =>
  alert(`O documento ${nomeDocumento} já existe!`)
);

socket.on("delete-document", (nomeDocumento) =>
  removeLinkDocumento(nomeDocumento)
);

function emiteCreateDocument(nomeDocumento) {
  socket.emit("create-document", nomeDocumento);
}

export { emiteCreateDocument };
