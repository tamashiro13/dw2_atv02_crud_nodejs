import express from "express";

import Jogador from "../models/Jogador.js";
const rota = express.Router();

// ROTA JOGADORES
rota.get("/jogadores", function (req, res) {
  Jogador.findAll()
    .then((jogadores) => {
      res.render("jogadores", {
        jogadores: jogadores,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os jogadores. Erro: ${error}.`);
    });
});

// ROTA DE CADASTRO DE JOGADORES
rota.post("/jogadores/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const posicao = req.body.posicao;
  const altura = req.body.altura;
  const idade = req.body.idade;

  Jogador.create({
    nome: nome,
    posicao: posicao,
    altura: altura,
    idade: idade,
  })
    .then(() => {
      res.redirect("/jogadores");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao cadastrar o jogador. Erro: ${error}.`);
    });
});

// ROTA PARA EXCLUIR UM JOGADOR
rota.get("/jogadores/excluir/:id", (req, res) => {
  const id = req.params.id;

  Jogador.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/jogadores");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao excluir o jogador. Erro: ${error}.`);
    });
});

// ROTA DE EDIÇÃO DE JOGADOR
rota.get("/jogadores/editar/:id", (req, res) => {
  const id = req.params.id;
  Jogador.findByPk(id)
    .then((jogador) => {
      res.render("jogadorEditar", {
        jogador: jogador,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao editar o jogador. Erro: ${error}.`);
    });
});

// ROTA QUE ALTERA UM JOGADOR NO BANCO DE DADOS
rota.post("/jogadores/alterar", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const posicao = req.body.posicao;
  const altura = req.body.altura;
  const idade = req.body.idade;

  Jogador.update(
    {
      nome: nome,
      posicao: posicao,
      altura: altura,
      idade: idade,
    },
    { where: { id: id } },
  )
    .then(() => {
      res.redirect("/jogadores");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao alterar o jogador. Erro: ${error}.`);
    });
});
export default rota;
