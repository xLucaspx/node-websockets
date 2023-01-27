import {scryptSync, timingSafeEqual} from 'crypto';

function autenticaUsuario (usuario, senhaDigitada) {
  const hashTeste = scryptSync(senhaDigitada, usuario.salSenha, 64);
  const hashReal = Buffer.from(usuario.hashSenha, 'hex');

  return timingSafeEqual(hashTeste, hashReal);
}

export default autenticaUsuario;
