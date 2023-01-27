import { MongoClient } from "mongodb";

const cliente = new MongoClient('mongodb+srv://admin:admin@node-express-cluster.zzssqvh.mongodb.net/?retryWrites=true&w=majority');

let documentosColecao;
try {
  await cliente.connect();

  const db = cliente.db('node-websockets');
  documentosColecao = db.collection('documentos-aluradoc');

  console.log('Conectado ao banco de dados!');

} catch (error) {
  console.log(error);
}

export { documentosColecao };
