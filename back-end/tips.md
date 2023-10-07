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
- [Dicas do Projeto](#tips)


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

### Crie uma pasta dentro de src chamada middlewares

Nessa pasta vamos alocar nossas lógicas de middlewares como a validação dos compos recebidos pelo post.
Vamos validar basicamente duas coisas, se o campo title está vázio e se existe o campo title, veja mais no arquivo taskMiddleware.
O interessante dessa função fica por conta do router onde primeiro vai chamar o função de validação e só depois a função de escrever no banco de dados.

> router.post("/tasks", taskMiddleware.validadeBody, taskControllers.createdTask)

Dentro do arquivo taskMiddleware existe um parametro chamado next onde após executar tudo ele vai executar a proxima função do router.post no caso taskControllers

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

#### Usando extensão Database Client

Similar a um phpMyAdmin

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

Agora executamos as queries e conferimos pela extensão se foi criado todas as tabelas e seus campos.
Faça uma nova requisição a API pelo navegador ou pelo Postman, note que vai retornar 2 arrays só precisaremos do primeiro array 0: []

#### Selectionando todos objetos numa tabela

> SELECT * FROM nomedaTabela;

#### Adicionando um item a tabela

Cada ? corresponde ao valor desejado a ser inserido na coluna, nesse caso colocamos toda nossa query dentro de uma variável para depois poder escrever valores dentro dela, veja mais no arquivo taskModel.js

> const query = 'INSERT INTO nomedaTabela(coluna1, coluna2, coluna3) VALUES (?, ?, ?)';

#### Deletando um item da tabela

Para deletar um item da tabela primeiro precisamos saber que item é esse então como parâmetro vamos usar o id.
Traduzindo o código abaixo temos DELETE DA TABELA ONDE O ID SEJA IGUAL O ID PASSADO NO ARRAY

>  const removeTask = await connection.execute('DELETE FROM nomedaTabela WHERE id = ?', [id])

Para deletar um item não vamos passar um json e sim na própria URL

> localhost:3003/tasks/nrIdDesejado 

Se observar o arquivo do router quando adicionamos o :nomeDoParametro conseguimos utilizalo na função deleteTask dentro do arquivo taskControllers.js dessa forma ao fazer uma requisição de delete nós pegamos o parametro do request para usar na função

> const { id } = req.params

> router.delete("/tasks/:id", taskControllers.deleteTask)

#### Editando um item da tabela

Para atualizar uma task no banco de dados precisamos receber o id dela e os campos que seram alterados, e posteriormente atualizar o banco de dados.

> const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';


<a id="tips"></a>

### Dicas do projeto

* tasksModel.js
    
    Como ao fazer uma requisição o sql me devolve alem da minha tabela do banco um array de buffer temos 2 soluções para não receber esse array, selecionar o array desejado no return da function ou fazer uma desistruturação de array na const.

> return tasks[0]

>  const [tasks, buffer] = await connection.execute('SELECT * FROM tasks')

#### Trabalhando com datas

Vamos trabalhar com data em UTC dessa forma fica mais simples para trabalhar no front end, através do Date.now() que retorna o tempo decorrido em segundos desde 1970.
Então através do método new Date() basta colocar dentro dele o Date.now

> const today = new Date(Date.now()) 

Usando esse método podemos utilizar alguns metódos como toLocaleDateString para retornar somente a data

> today.toLocaleDateString()
    * o retorno será: "9/26/2023" 

Caso precise da data e hora basta usar o toLocaleString()

> today.toLocaleSting()
    * o retorno será: "9/26/2023, 5:52:16 PM" 

#### Trabalhando com json

Para nossa API entender e saber trabalhar com dados em json é necessário no arquivo app.js informar essa instrunção através do código abaixo:

> app.use(expressServer.json())

#### Trabalhando com desistruturação do Javascript

Com esse recurso podemos pegar coisas de um objeto javascript para usar, veja por exemplo nas nossas funções dentro de model.js onde conseguimos pegar parametros ou mesmo tags do body.

No Front end em script.js usamos essa mesma forma para pegar as informações do Json retornado da API para montar nosso html

A desistruturacao é basicamente colocar entre chaves os valores que você quer pegar de um objeto, abaixo estamos retirando esses valores e criando uma const com esse nome, tudo isso de um objeto chamado task:

> const {id, title, created_at, status} = task

#### Trabalhando com desistruturação do Javascript

Para adicionar uma tarefa vamos fazer um fetch mas vamos passar um objeto com as configurações que o end point precisa

await fetch("http://localhost:3003/task", {objeto})

#### Pegando parametros da url e o body

Na função de atualizar uma tarefa do banco de dados precisamos passar o id da tarefa e tambem todo o conteudo da tarefa para isso podemos usar o mesmo metódo de capturar o o parâmetro da URL através de uma const com { id } = req.params
e agora podemos chamar a função de updateTask que realmente faz a alteração no banco tudo isso aproveitando o req dessa função do controller.

> await taskModel.updateTask(id, req.body)

#### Atualizando uma task no banco de dados

Na função de updateTask do front-end do arquivo script.js temos que enviar uma requisição ao servidor fazendo um fetch, no body passamos um objeto com as variáveis que retiramos por desistruturação do objeto "task", como nossa key (chave) lá no banco de dados chama "title" e "status" e ao fazer a desistruturação demos o mesmo nome não é necessário passar os dois valores conforme abaixo:

> const [id, title, created_at, status] = task

> body: JSON.stringify(task) {"title": title , "status": status}

Podemos resumir da seguinte forma

> body: JSON.stringify(task) {title, status}

#### Problema de carregamento das tasks duplicado

Ao inserir uma nova tarefa nós chamamos a função de loadTasks() porém ela mostra todas as tasks que ja foram carregadas anteriormente também.

Para resolver utilizei um metódo de recarregar a página após adicionar uma task nova.

> window.location.reload();

#### Formantando data UTC para pt-br

Como retornarmos uma string no formato UTC podemos trabalhar esse formato criando uma função.

Ao receber do banco de dados a string no momento de montar nossa task em assemblyTask() temos o campo created_at, então criamos uma nova função chamada formatDate(dateUTC).

Nessa função recebemos um parametro (dateUTC) que é justamente a data vinda do banco de dados e então criamos um objeto com nossas configurações que é o estilo da data em si, depois usamos o metodo new Date e jogamos dentro dele a nossa data vinda do banco.

> const formatDate = (dateUTC) => {
> const optionDate = { dateStyle: "short", timeStyle: "short"}
> const date = new Date(dateUTC).toLocaleString("pt-br", optionDate)
> return date}

O primeiro parametro dessa funcao vai ser o proprio elemento que estamos verificando
e a funcao espera que retorna um valor verdadeiro ou falso 
 const tasksFilteres = tasks.filter()