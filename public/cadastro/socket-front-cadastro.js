const socket = io();

function emiteRegisterUser(dados) {
  socket.emit("register-user", dados);
}

socket.on('register-success', () => alert('Cadastro realizado com sucesso!'));
socket.on('register-error', () => alert('Erro ao realizar cadastro...'));
socket.on('user-exists', () => alert('Este nome de usuário já está sendo utilizado!'));

export { emiteRegisterUser };
