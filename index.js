// Importando o Express com ES6 Modules
import express from "express";
// Importando o arquivo de conexão do Sequelize
import connection from "./config/sequelize-config.js";
// Iniciando o Express
const app = express();

// Importando o Controller
import JogadorController from "./controllers/JogadorController.js";
import IdoloController from "./controllers/IdoloController.js";
import TituloController from "./controllers/TituloController.js";

// Importando os Models
import Jogador from "./models/Jogador.js";
import Idolo from "./models/Idolo.js";
import Titulo from "./models/Titulo.js";

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", JogadorController);
app.use("/", IdoloController);
app.use("/", TituloController);

// REALIZANDO A CONEXÃO COM O BANCO DE DADOS
connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados realizada com sucesso!");
  })
  .catch((error) => {
    console.log(
      `Ocorreu um erro ao se conectar ao banco de dados. Erro: ${error}`,
    );
  });

// CRIANDO O BANCO DE DADOS SE ELE NÃO EXISTIR
const DB_NAME = "timaodex";
connection
  .query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`)
  .then(() => {
    console.log(`O banco de dados ${DB_NAME} está criado!`);
  })
  .catch((error) => {
    console.log(`Ocorreu um erro ao criar o banco de dados. Erro: ${error}`);
  });

// ROTA PRINCIPAL
app.get("/", function (req, res) {
  res.render("index");
});

// INICIA O SERVIDOR NA PORTA 8080
const port = 8080;
app.listen(port, function (erro) {
  if (erro) {
    console.log("Ocorreu um erro!");
  } else {
    console.log(`Servidor iniciado com sucesso em http://localhost:${port}`);
  }
});
