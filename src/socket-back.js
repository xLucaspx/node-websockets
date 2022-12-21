import io from "./server.js";

// escutando o evento de conexão do cliente:
io.on('connection', (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`)

  socket.on('disconnect', (motivo) => console.log(`Cliente ${socket.id} desconectado; motivo: ${motivo}`));

  // ouvindo o evento 'text-edit' para cada conexão:
  socket.on('text-edit', (texto) => {
    // socket.broadcast emite o evento para todos os clientes MENOS
    // o que está conectado neste socket:
    socket.broadcast.emit('text-edit', texto);

    /* o protocolo WebSockets permite que tanto o cliente quanto o servidor possam emitir eventos;
    quando um dos lados da comunicação emite um evento, apenas o outro lado pode escutá-lo, ou seja,
    se o cliente emitir um evento chamado "texto_editor", apenas o servidor escutará essa emissão;
    da mesma forma, se o servidor também emitir um evento com o mesmo nome, apenas os clientes escutarão
    essa emissão. Dessa forma, o dev pode escolher que dois eventos diferentes tenham o mesmo nome se
    julgar que eles são intrínsecos, ou que um seja uma “continuação” do outro. */
  });
});
