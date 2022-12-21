import io from "./server.js";

const documentos = [
  {
    nome: 'JavaScript',
    texto: 'Texto de JavaScript'
  },
  {
    nome: 'Node.js',
    texto: 'Texto de Node.js'
  },
  {
    nome: 'Vue.js',
    texto: 'Texto de Vue.js'
  },
];

// escutando o evento de conexão do cliente:
io.on('connection', (socket) => {
  console.log(`Um cliente se conectou! Id: ${socket.id}`)

  // socket.on('disconnect', (motivo) => console.log(`Cliente ${socket.id} desconectado; motivo: ${motivo}`));

  // socket.join agrupa clientes por "sala"; neste caso, cada documento é uma sala
  socket.on('select-document', (nome, devolveTexto) => {
    socket.join(nome);

    const documento = encontraDocumento(nome);
    if (documento) {
      // socket.emit emite o evento para o cliente deste socket
      // socket.emit('document-text', documento.texto);

      // forma mais sucinta: não é necessário emitir um novo evento,
      // apenas chamar uma função callback no front (acknowledgements);
      // é similar ao modelo requisição-resposta (http)
      devolveTexto(documento.texto);
    }
  });

  // ouvindo o evento 'text-edit' para cada conexão:
  socket.on('text-edit', ({ texto, nomeDocumento }) => {
    const documento = encontraDocumento(nomeDocumento);

    if (documento) {
      documento.texto = texto;

      /* socket.to(nomeDaSala).emit emite o evento para todos os
      clientes conectados na sala: */
      socket.to(nomeDocumento).emit('text-edit', texto);
    }
    /* socket.broadcast emite o evento para todos os clientes MENOS
    o que está conectado neste socket: */
    // socket.broadcast.emit('text-edit', texto);

    /* o protocolo WebSockets permite que tanto o cliente quanto o servidor possam emitir eventos;
    quando um dos lados da comunicação emite um evento, apenas o outro lado pode escutá-lo, ou seja,
    se o cliente emitir um evento chamado "texto_editor", apenas o servidor escutará essa emissão;
    da mesma forma, se o servidor também emitir um evento com o mesmo nome, apenas os clientes escutarão
    essa emissão. Dessa forma, o dev pode escolher que dois eventos diferentes tenham o mesmo nome se
    julgar que eles são intrínsecos, ou que um seja uma “continuação” do outro. */
  });
});

function encontraDocumento(nome) {
  return documentos.find(documento => {
    return documento.nome == nome;
  });
}
