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
     docker-compose up -d build
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


## Integrantes:
  - Lucas Venturin Trindade - GRR20231001
  - João Vitor Liskoski Walter - GRR20231005
  - Rafael Fernando Nunho Correr - GRR20235365
  - Sophia Costa Soares de Silva - GRR20231011
  - Pedro Augusto Lemos - GRR20234188
