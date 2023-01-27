import { emiteUserLogin } from "./socket-front-login.js";

const form = document.getElementById("form-login");

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const user = form["input-usuario"].value;
  const password = form["input-senha"].value;

  emiteUserLogin({ user, password });
});
