import io from "./server.js";

// escutando o evento de conexão do cliente:
io.on('connection', (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`)

  // ouvindo o evento 'text-edit' para cada conexão:
  socket.on('text-edit', (texto) => {
    // socket.broadcast emite o evento para todos os clientes MENOS
    // o que está conectado neste socket:
    socket.broadcast.emit('text-edit-client', texto);
  });
});
