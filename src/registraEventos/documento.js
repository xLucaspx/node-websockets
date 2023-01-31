import {
  atualizaDocumento,
  deletaDocumento,
  encontraDocumento,
} from "../db/documentosDb.js";
import {
  adicionaConexao,
  buscaConexao,
  buscaUsuariosDocumento,
  removeConexao,
} from "../utils/conexoesDocumentos.js";

function registraEventosDocumento(socket, io) {
  socket.on(
    "select-document",
    async ({ nomeDocumento, nomeUsuario }, devolveTexto) => {
      const documento = await encontraDocumento(nomeDocumento);
      if (documento) {
        const conexaoEncontrada = buscaConexao(nomeDocumento, nomeUsuario);
        if (!conexaoEncontrada) {
          // socket.join agrupa clientes por "sala"; neste caso, cada documento é uma sala
          socket.join(nomeDocumento);

          adicionaConexao({ nomeDocumento, nomeUsuario });
          io.to(nomeDocumento).emit(
            "users-in-document",
            buscaUsuariosDocumento(nomeDocumento)
          );

          socket.data = {
            userInDocument: true,
          };

          // socket.emit emite o evento para o cliente deste socket
          // socket.emit('document-text', documento.texto);

          // forma mais sucinta: não é necessário emitir um novo evento,
          // apenas chamar uma função callback no front (acknowledgements);
          // é similar ao modelo requisição-resposta (http)
          devolveTexto(documento.texto);

          /* No momento em que saímos de uma página ocorre uma desconexão daquele socket, já que um
          socket só está presente em uma determinada página do HTML; no momento em que mudamos de página,
          o socket é desconectado, ainda que estejamos logados, pois temos um socket em cada página.
          Aqui estamos basicamente registrando esse ouvinte do evento de "disconnect" apenas para clientes
          específicos, ou seja, aqueles que já selecionaram esse documento (evento "select-document") */
          socket.on("disconnect", () => {
            if (socket.data.userInDocument) {
              removeConexao(nomeDocumento, nomeUsuario);

              io.to(nomeDocumento).emit(
                "users-in-document",
                buscaUsuariosDocumento(nomeDocumento)
              );
            }
          });
        } else {
          socket.emit("user-already-in-document");
        }
      }
    }
  );

  // ouvindo o evento 'text-edit' para cada conexão:
  socket.on("text-edit", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);

    if (atualizacao.modifiedCount) {
      /* socket.to(nomeDaSala).emit emite o evento para todos os
      clientes conectados na sala: */
      socket.to(nomeDocumento).emit("text-edit", texto);
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

  socket.on("delete-document", async (nome) => {
    const deletado = await deletaDocumento(nome);

    if (deletado.deletedCount) {
      io.emit("delete-document", nome);
    }
  });
}

export default registraEventosDocumento;
