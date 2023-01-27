import jwt from "jsonwebtoken";

function geraJwt(payload) {
  // Informações sensíveis, como o segredo do token, devem ser guardadas em variáveis de ambiente:
  const tokenJwt = jwt.sign(payload, process.env.SEGREDO_JWT, {
    expiresIn: "1h",
  });
  
  return tokenJwt;
}

export default geraJwt;
