# Projeto Blogs API

Neste repositório contém o codigo desenvolvido no projeto Blogs API durante o curso de desenvolvimento web na [Trybe](https://www.betrybe.com/) no módulo de Back-end feito pelo aluno [Matheus Marinho](https://www.linkedin.com/in/matheus-marinhodsp/).

## Objetivo do projeto
O projeto tem o objetivo de desenvolver uma **API** e um banco de dados para produção de conteúdo para um blog, a aplicação foi feita em **node.js** utilizando os princípios do **REST**, o banco de dados utilizada a arquitetura **MSC** e o pacote **sequelize** para agir como CRUD para os posts, a API recebe requisições HTTP sejam elas de GET, POST, PUT e DELETE, e com isso manipula o banco de dados tanto para leitura e/ou escrita, além disso, o projeto possui uma camada para verificação de token gerado pelo **JWT** ao realizar uma ação de login na API, o token dura 1 dia e precisa ser renovado com um novo login após isso, além de possuir outras validações na hora da escrita de dados como, o nome precisa possuir no mínimo 8 caracteres, a senha precisa possuir no mínimo 6 caracteres, e-mail precisa ser um e-mail valido, entre outras validações.


## Tecnologias utilizadas

- **MySQL, Node.js, Javascript, Sequelize, Docker, Express, JWT, REST.**

## Importante!

- Caso deseje executar o projeto localmente, clone o repositório e instale suas dependências com o comando `npm install` após isso rode com o comando `npm start` ou `npm run debug`(Caso deseje utilizar ele em um container docker utilize o comando `docker-compose up -d`).

- Ao clonar perceberá um arquivo **.env.example** nele contém as variaveis de ambiente utilizar no projeto antes de executar o projeto, de fato altere o nome do arquivo para apenas **.env**, pois isso é necessário para que o projeto funcione, são elas por padrão:
```
#### SERVER VARS
NODE_ENV=development
API_PORT=3000

#### DATABASE VARS
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB_NAME=blogs-api
MYSQL_USER=root
MYSQL_PASSWORD=password

#### SECRECT VARS
JWT_SECRET=suaSenhaSecreta

```
Sinta-se livre para alterar o valor delas sem modificar o nome da chave.

- O arquivo **.sequelizerc** é responsável por mapear os diretórios utilizados no sequelize, caso mude o nome de algum arquivo/diretório altere tambem no **.sequelizerc**.


## Scripts prontos

- Deleta o banco de dados:
```
"drop": "npx sequelize-cli db:drop"
```

- Cria o banco de dados e gera as tabelas:
```
"prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
```

- Insere dados/popula a tabela:
```
"seed": "npx sequelize-cli db:seed:all"
```

## Tabelas e colunas do banco de dados e seus retornos

- Uma tabela chamada **Users**, contendo dados com a seguinte estrutura:
```json
{
    "id": 1,
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

- Uma tabela chamada **Categories**, contendo dados com a seguinte estrutura:
```json
{
    "id": 18,
    "name": "News"
}
```

- Uma tabela chamada **BlogPosts**, contendo dados com a seguinte estrutura:
```json
{
    "id": 21,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 14, // Foreign Key
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.947Z",
}
```

- Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:
```json
{
    "postId": 50, // Primary key e Foreign Key, referenciando o id de `BlogPosts`
    "categoryId": 20 // Primary key e Foreign Key, referenciando o id de `Categories`
}
```
*Os dados acima são fictícios, e estão aqui apenas como exemplo*