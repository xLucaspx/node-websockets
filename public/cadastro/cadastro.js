import { emiteRegisterUser } from "./socket-front-cadastro.js";

const form = document.getElementById("form-cadastro");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Esta é uma forma de acessar os inputs dos forms do front, pois são como propriedades do objeto form:
  const user = form["input-usuario"].value;
  const password = form["input-senha"].value;

  emiteRegisterUser({ user, password });
});
