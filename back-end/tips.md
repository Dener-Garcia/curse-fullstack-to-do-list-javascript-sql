# Indice

- [Iniciando Projeto](#start)
- [Dependências](#dependencies)
- [Git Ignore](#gitignore)
- [Configurando ESlint](#eslint)
- [Criando Scripts Personalizados](#scripts)
- [Usando o Nodemmon](#usenodemon)
- [Criando Servidor Express](#startexpress)
- [Criando Rotas no Express](#rotas)
- [Estrutura de Pastas](#folders)
- [Variáveis de Ambiente](#dotenv)
- [Configuração do Banco Dados](#database)
- [Subindo Banco SQL Docker](#sqlDocker)
- [Sintaxe SQL](#sqlSintaxe)


<a id="start"></a>

## Inicializando projeto em node

> npm init -y

Esse comando cria um package.json 

<a id="dependencies"></a>

## Instalando dependências

Vamos usar o Express para criar nosso servidor, o nodemon que serve para atualizar nosso código como se fosse o live server, dotenv para criar e usar variaveis de ambiente e o sql para banco de dados.

Quando uma dependência é só de desenvolvimento passe o -d como parâmetro.

> npm install express

> npm install nodemon -d

> npm install dotenv

> npm install mysql2

<a id="gitignore"></a>

## Configurando git ignore

Como a pasta node_modules é muito grande não há necessidade de subirmos ela para o github então vamos criar um arquivo .gitignore e adicione a ele a pasta ou arquivos a serem ignorados

> backend/node_modules

<a id="eslint"></a>

## Configurando o Eslint

Vamos instalar o ESlint para mantermos um padrão de código

> npx eslint --init

Nossa configuração sera para checar sintaxe, encontrar problemas e forçar um estilo de código.
Também usaremos o commom.js
Selecione que o projeto vai rodar somente no Node.

<a id="scripts"></a>

## Criando scripts para otimizar desenvolvimento no Node

Dentro do arquivo package.json na parte de scripts, crie seus próprios scripts.

#### npm start = inicia um arquivo .js do node

> "scripts": {

>   "test": "echo \"Error: no test specified\" && exit 1",

>   "start": "node caminhoDaPasta/arquivo.js"
> },

<a id="usenodemon"></a>

#### npm run nomdeDoScript (dev) = inicia um arquivo .js do node pelo nodemon que se auto atualiza

> "scripts": {

>   "test": "echo \"Error: no test specified\" && exit 1",

>   "dev": "nodemon caminhoDaPasta/arquivo.js"
> },

<a id="startexpress"></a>

## Criando um server em nodeJS

crie um arquivo .js e adicione as linhas abaixo.

> const express = require('express')

> const app = express()

> app.listen(3333, () => console.log('Servidor rodando na porta 3333'))

<a id="rotas"></a>

## Criando rotas com express

As rotas sempre recebem 2 parãmetros no caso request e response e nós podemos fazer algumas coisas com esses parâmetros dentro de uma função.

#### Response: Eu envio uma resposta para meu cliente
#### Request: Eu recebo uma resposta do meu cliente

Veja o exemplo abaixo, ao acessarmos a rota "/" pelo navegador nós recebemos um status 200 do servidor.

> app.get('/', (request, response) => response.status(200).send("Ola mundo, meu servidor subiu"))

Para organizar as rotas vamos chamar funções dentro da pasta controllers em vez de passar as funções na mão.

> router.get("/tasks", taskControllers.getAll)

<a id="folders"></a>

## Arquitetando o projeto

### Crie uma pasta src na raiz do projeto

#### server.js: nesse arquivo voce deve colocar nele somente a parte do servidor, lembre-se de fazer o import do arquivo usando o require

> const app = require("./app")

> app.listen(3033, () => console.log('Servidor rodando na porta 3033') )

#### router.js: nesse arquivo vamos organizar nossas rotas, nele vamos fazer um require do express e depois usar as rotas que criarmos dentro do app.js como a funcao .use(nomeArquivoRota)

> const express = require("express")

> const router = express.Router()

##### Exemplo de uma rota:  router.tipoRota("caminhoDaRota", (request, response) =>{funcaoDaRota})

> router.get("/", (req, res) => res.status(200).send("O router funciona"))

> module.exports = router

#### app.js: nesse arquivo vamos colocar a parte do express nele, todo arquivo que for utilizar em outro arquivo voce deve fazer o export dele.

> const expressServer = require("express")

> const app = expressServer()

> app.use(router)

> module.exports = app

### Crie uma pasta dentro de src chamada models

Tudo que for acessar diretamente o banco de dados ficara nessa pasta, como boa prática no nome dos arquivos coloque o model como tarefasModel.js

Nosso arquivo de conexão com banco de dados vai ficar dentro dessa pasta também.

No arquivo taskModels vamos selecionar todas as tarefas da tabela usando uma query de sql pela função execute.

* lembre-se que operações em banco de dados demoram acontecer por isso use o await async nas suas funções.

> const tasks = connection.execute('QUERY SQL * FROM nomeTabela')

### Crie uma pasta dentro de src chamada controllers

Nessa pasta vamos deixar nossas funções que vão após os endpoints das rotas dessa forma quando houver algum problema de lógica os arquivos de funções estarão mais separados e não junto as rotas em sí.

<a id="dotenv"></a>

## variáveis de ambiente com dotenv

Vamos criar um arquivo na raiz chamado .env onde vamos alocar variáveis sensiveis que não podem ir para o github por exemplo, no nosso caso seria os dados do banco de dados, e a porta do server.

> PORT=NrPorta

> MYSQL_HOST=HostDaAplicacao

> MYSQL_USER=nomeUsuario

> MYSQL_PASSWORD=senhaUsuario

> MYSQL_DATABASE=nomeBanco

* Como boa prática crie um arquivo .env.example com os mesmos dados mas com outras variáveis.

Para usar a lib dotenv vamos fazer a configuração dentro do arquivo server.js dessa forma toda a aplicação tera acesso a essas variáveis.

> const dotenv = require("dotenv")

> dotenv.config()

Agora para usar uma variávei basta usar o método process.env.NOMEVARIAVEL após declarar uma variável, no caso da porta vamos passar uma OU caso a variavel portServer não esteja disponível ela usará o que está depois da OU 

> const portServer = process.env.PORT || 3003

* Outra forma de escrever esse import é:

> require("dotenv").config()

<a id="database"></a>

## Configurando banco de dados com docker

Criamos um arquivo chamado connectionModel.js onde vamos passar as variáveis de ambiente que criamos no .env

> const mysql = require("mysql2/promixe")

> const connection = mysql.createPool({
>    host: process.env.MYSQL_HOST,
>    user: process.env.MYSQL_USER,
>    password: process.env.MYSQL_PASSWORD,
>    database: process.env.MYSQL_DATABASE,})

> module.exports = connection

Caso você tenha algum erro dessas variáveis de ambiente chame novamente o dotenv através de uma variável

> const dotenv = require("dotenv").config()

<a id="sqlDocker"></a>

### Baixando e rodando um mysql com docker

Para rodar o banco de dados vamos baixar uma imagem do docker hub e passar algumas configurações para essse container.

> docker run --name to-do-mysql -e MYSQL_ROOT_PASSWORD=root123 -p 3306:3306 -d mysql

No VS code use a extensão docker para administrar seus constainers, e use a extensão database client para fazer algumas query ao banco de dados.

#### Usando extensão Connect to server

Preencha o numero da porta que você usou na hora de dar start no container

Preencha o Username de acordo com as variáveis que você definiu no arquivo .env

Preenchar o Password de acordo com as variáveis que você definiu no arquivo .env

<a id="sqlSintaxe"></a>

### Sintaxe do SQL

Dentro da extensão database após conectar com o banco vamos criar um banco e sua tabela

> CREATE DATABASE IF NOT EXISTS todoList;

> USE todoList;
* Serve para ativar o banco de dados para escrevermos nesse banco

> CREATE TABLE tasks (
>    id INT PRIMARY KEY AUTO_INCREMENT,
>    title VARCHAR(45) NOT NULL,
>    status VARCHAR(45) NOT NULL,
>    created_at VARCHAR(45) NOT NULL);

Varchar aceita qualquer tipo de caracter os campos da tabela você define o nome no caso definimos id, title, status, created_at.

Esse processo pode ser feito quando subimos o container tambem automatizando esse processo.

Agora executamos as queries e conferimos pela extensão se foi criado todas as tabelas e seus campos