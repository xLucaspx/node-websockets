# DevNotes

Projeto desenvolvido para estudar WebSockets com Node.js e a biblioteca Socket.IO. Consiste em uma aplicação onde é possível criar e editar documentos de texto, sendo que as alterações são salvas automaticamente e transmitidas em tempo real para todos os usuários.

## Download & deploy 

Clone ou baixe o projeto e execute `npm i` para instalar as dependências;

- `npm run exemplo` irá executar uma aplicação simples construída para entender o funcionamento do protocolo WebSockets, que consiste no valor de uma ação fictícia que sobe ou desce aleatoriamente a cada segundo; o valor será o mesmo em todas as janelas abertas. Roda na porta 2000.

- `npm run dev` irá subir a aplicação principal (DevNotes) na porta 3000.

## Sobre o projeto

Foi desenvolvido seguindo os cursos de WebSockets da Alura. O foco do projeto foi o estudo do protocolo WebSockets, então não foi destinado nenhum esforço especial em estilização ou acessibilidade; este protocolo foi utilizado até para funções como cadastro, login e autenticação de usuários para que fosse possível estudar features e soluções interessantes.

### Telas

- Cadastro: é informado um nome de usuário e uma senha; se o nome de usuário estiver disponível é cadastrado no banco de dados junto com a hash e o sal da senha (`scryptSync` - modulo `crypto` do Node.js).  

![image](https://user-images.githubusercontent.com/102704083/215846259-9ae30a69-8964-48b3-84ee-4178b3a31e97.png)

- Login: o usuário informa suas credenciais de acesso e, caso sejam válidas, o login é realizado e um token JWT é gerado, que por sua vez é armazenado nos *cookies* do navegador. Este token serve para autorizar o acesso do usuário às páginas de documentos e para identificá-lo.

![image](https://user-images.githubusercontent.com/102704083/215846360-0c906c77-3529-4ae8-90a2-66af256b7fa6.png)

- Home: é onde são mostrados os documentos existentes e também é possível acessá-los ou criar novos documentos.

![image](https://user-images.githubusercontent.com/102704083/215846521-fd997c11-c27f-4b41-b988-1cd5ffecd92b.png)

- Documento: página onde é possível editar texto, que é salvo no banco de dados, e as alterações são trasnmitidas em tempo real para todos os usuários conectados naquela página de documento específica; além disso, há uma lista que mostra todos os usuários conectados naquele documento no momento.

![image](https://user-images.githubusercontent.com/102704083/215846627-7dd7d886-1434-41ca-9ab1-1df2bdbd4a7d.png)

### Recursos utilizados

- Implantação do protocolo WebSockets para entender o funcionamento e as principais diferenças com o HTTP;
- Uso da biblioteca Socket.IO para tratativas de erros, vários tipos emissão de eventos, criação de salas, etc;
- MongoDB para armazenar usuários e documentos; 
- Uso do módulo `crypto` do Node.js para criptografar senhas;
- Geração de JWT e uso dos cookies para autenticação dos usuários, combinado com a aplicação de *middlewares* do Socket.IO e *namespaces*;
- Controle de informações local com uma lista no lado do servidor para gerenciar usuários conectados e `socket.data` para guardar informações no próprio socket.
