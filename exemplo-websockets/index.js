import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => console.log(`Alguém se conectou com o id ${socket.id}`));

// Alterando o valor que é mostrado em index.html a cada segundo
setInterval(() => {
  io.emit('cotação', (Math.random() * 100).toFixed(2));
}, 1000);

server.listen(2000, () => console.log('Rodando em http://localhost:2000'));
