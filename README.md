# Projeto Final de WEB II
*Sistema de gerenciamento de solicitações de manutenção de equipamentos*


## Instalação:

#### Requirements:
  - Git
  - Docker
  - Docker-compose
  - Angular-cli (caso queira adicionar componentes no front-end)

Graças à "containerização" do projeto conseguimos padronizar o ambiente de desenvolvimento diminuindo então, problemas de versão entre desenvolvedores e maior facilidade na instalação/uso do programa

#### Instalação:
Com todos os Requeriments instalados e siga os seguintes passo:

  1. Baixe o repositório dentro da pasta de sua escolha:
     ```
     git clone https://github.com/WindFox8/projeto_final_web-II.git
     ```
  2. Entre na pasta criada pelo *git clone*
     ```
     cd projeto_final_webII
     ```
  3. Use o docker-compose para criar os contâiners e inicializar eles
     (*Este processo pode demorar de acordo com a sua rede e computador*)
     ```
     docker-compose up -d --build
     ```
  4. Para testar se funcionou digite:
    ```docker ps``` no terminal, caso apareça os 3 contâiners, a criação teve sucesso.
    Ex:
    ![image](https://github.com/user-attachments/assets/270acd7a-6123-45dc-8ec2-e79be9db97c6)
  5. Dentro do seu navegador acesse o *localhost:80* e *localhost:8080*, onde a porta 80 é a saída web do nosso contâiner que possui a parte front-end e a 8080 nosso back-end.
    (*Site irá alterar de acordo com o desenvolvimento do projeto*)
    ![image](https://github.com/user-attachments/assets/bf76ed25-2f0e-45ed-84ad-a5cf1e006f51)

## Uso:

Para realizar alterações dentro do back-end ou front-end basta navegar nas pastas disponíveis ao clonar o repositório e utilizar sua IDE de preferência para realizar as alterações.

As alterações serão automaticamente carregadas, os contâiners constam com a função de *hot reload*, para que ao alterar um trecho do código, ele detecte e altere automaticamente.

## Padrões de commit:
```
<tipo>(<escopo>): <descrição resumida>
```
### Tipos
Os tipos de commit indicam a natureza da mudança no código
| Tipo     | Descrição                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------ |
| feat     | Adiciona uma nova funcionalidade ao código                                                             |
| fix      | Corrige um erro ou bug                                                                                 |
| docs     | Relacionado à documentação apenas (nenhuma alteração no código)                                        |
| style    | Alterações de formatação, indentação, espaço em branco, etc., que não afetam o funcionamento do código |
| refactor | Refatoração do código sem mudanças de funcionalidade ou correção de bug                                |
| test     | Adiciona ou altera testes                                                                              |
| perf     | Melhoria de performance                                                                                |
| build    | Alterações que afetam o sistema de build ou dependências externas                                      |
| ci       | Alterações na configuração de integração contínua (CI/CD)                                              |
| chore    | Outras mudanças que não afetam o código-fonte nem os testes (ex.: atualização de pacotes               |
| revert   | Reverte um commit anterior                                                                             |

### Escopo
O escopo define a área afetada dentro do projeto, como um módulo ou componente específico.
| Escopo (opcional)| Descrição                                                                          |
| ---------------- | ---------------------------------------------------------------------------------- |
| common           | Relacionado ao pacote @angular/common                                              |
| compiler         | Relacionado ao compilador Angular (@angular/compiler)                              |
| compiler-cli     | Relacionado ao CLI do compilador                                                   |
| core             | Relacionado ao núcleo do Angular (@angular/core)                                   |
| elements         | Relacionado ao uso de Web Components (@angular/elements)                           |
| http             | Relacionado ao módulo de HTTP Client (@angular/common/http)                        |
| language-service | Mudanças no serviço de linguagem (suporte ao autocomplete no VS Code, por exemplo) |
| platform-browser | Relacionado ao renderizador no navegador (@angular/platform-browser)               |
| platform-server  | Relacionado ao suporte para server-side rendering (SSR)                            |
| router           | Mudanças no módulo de roteamento (@angular/router)                                 |

Além desses escopos, também é comum utilizar escopos específicos do projeto.
### Descrição resumida
Use **verbos no infinitivo** para descrever a mudança: "adicionar", "corrigir", "remover", etc.\
Não é necessário começar com letra maiúscula ou adicionar ponto final.\
Se necessário, o commit pode conter mais detalhes na linha abaixo da descrição. Pule uma linha e explique melhor a mudança.

Se quiser ler mais sobre padrões de commit, acesse [Commit Message Format](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md).

## Integrantes:
  - Lucas Venturin Trindade - GRR20231001
  - João Vitor Liskoski Walter - GRR20231005
  - Rafael Fernando Nunho Correr - GRR20235365
  - Sophia Costa Soares de Silva - GRR20231011
  - Pedro Augusto Lemos - GRR20234188
