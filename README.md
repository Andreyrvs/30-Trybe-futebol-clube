# Trybe Futebol Clube

## Contexto

**Eu desenvolvi os arquivos contigos em `/app/backend/src`.
Todos arquivos exeto os citados acima foram desenvolvidos pela [Trybe](https://www.betrybe.com/).**

O TFC é um site informativo sobre partidas e classificações de futebol! :soccer:.

No time de desenvolvimento do TFC, Meu squad ficou responsável por desenvolver uma API (utilizando o método TDD) e também integrar - através do docker-compose - as aplicações para que elas funcionem consumindo um banco de dados.

Nesse projeto, eu construi um back-end dockerizado utilizando modelagem de dados através do Sequelize. Desenvolvimento respeita regras de negócio providas no projeto e a API deve ser capaz de ser consumida por um `**front-end** já provido nesse projeto.`

Desafios:

- Para adicionar uma partida é necessário ter um token, portanto a pessoa deverá estar logada para fazer as alterações. Teremos um relacionamento entre as tabelas teams e matches para fazer as atualizações das partidas.

- O seu back-end deverá implementar regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

## Técnologias usadas

Front-end:
> Desenvolvido usando: React, Redux, CSS3, HTML5, Redis, ES6

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MongoDB, MYSQL, ES6

## Instalando Dependências

- clone o projeto:

  ```bash
  git clone git@github.com:Andreyrvs/30-Trybe-futebol-clube.git
  ```

  > Aplicação

    ```bash
    cd 30-Trybe-futebol-clube
    ```

  > Backend

  ```bash
  cd backend/ 
  npm install
  ```

  > Frontend

  ```bash
  cd frontend/
  npm install
  ```

## Executando aplicação

* Para rodar o back-end:

  ```bash
  cd api/ && npm start
  ```

* Para rodar o front-end:

  ```bash
  cd src/ && npm start
  ```

## Executando Testes

* Para rodar todos os testes:

  ```bash
  npm test
  ```
