function defineCookie(chave, valor) {
  document.cookie = `${chave}=${valor};path=/`;
}

function buscaCookie(chave) {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${chave}=`))
    ?.split("=")[1];
}

export { defineCookie, buscaCookie };
