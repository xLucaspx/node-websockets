import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin@node-express-cluster.zzssqvh.mongodb.net/?retryWrites=true&w=majority"
);

let documentosColecao;
let usuariosColecao;

try {
  await cliente.connect();

  const db = cliente.db("node-websockets");
  documentosColecao = db.collection("documentos-aluradoc");
  usuariosColecao = db.collection("usuarios-aluradoc");

  console.log("Conectado ao banco de dados!");
} catch (error) {
  console.log(error);
}

export { documentosColecao, usuariosColecao };
