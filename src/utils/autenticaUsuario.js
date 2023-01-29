import { scryptSync, timingSafeEqual } from "crypto";

function autenticaUsuario(usuario, senhaDigitada) {
  const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64);
  const hashReal = Buffer.from(usuario.hashSenha, "hex");

  return timingSafeEqual(hashTeste, hashReal);
}
/* a função timingSafeEqual é capaz de comparar se dois Buffers são iguais,
então podemos utilizá-la para comparar a hash de teste com a hash do banco de
dados; no entanto, a hash do banco de dados está em formato string, então primeiro
é preciso transformá-la em um Buffer com o método Buffer.from(), e o guardar na
constante hashReal. O primeiro parâmetro de Buffer.from() é a hashSenha do banco de
dados, e o segundo parâmetro é o formato que ela está codificada, que é hexadecimal. */

export default autenticaUsuario;
