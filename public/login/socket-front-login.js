import { defineCookie } from "../utils/cookies.js";

const socket = io();

function emiteUserLogin(dados) {
  socket.emit("user-login", dados);
}

socket.on("login-success", (tokenJwt) => {
  // alert("Usuário autenticado com sucesso!");
  defineCookie("tokenJwt", tokenJwt);
  window.location.href = "/index.html";
});

socket.on("login-error", () =>
  alert("Falha ao realizar login: senha incorreta!")
);

socket.on("user-not-found", () =>
  alert("Falha ao realizar login: nome de usuário incorreto!")
);

export { emiteUserLogin };
