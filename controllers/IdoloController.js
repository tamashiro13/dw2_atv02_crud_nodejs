import express from "express";

import Idolo from "../models/Idolo.js";
const rota = express.Router();

// ROTA ÍDOLOS
rota.get("/idolos", function (req, res) {
  Idolo.findAll()
    .then((idolos) => {
      res.render("idolos", {
        idolos: idolos,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os ídolos. Erro: ${error}.`);
    });
});

// ROTA DE CADASTRO DE IDOLOS
rota.post("/idolos/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const apelido = req.body.apelido;
  const nascimento = req.body.nascimento;
  const jogos = req.body.jogos;

  Idolo.create({
    nome: nome,
    apelido: apelido,
    nascimento: nascimento,
    jogos: jogos,
  })
    .then(() => {
      res.redirect("/idolos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao cadastrar o ídolo. Erro: ${error}.`);
    });
});

// ROTA PARA EXCLUIR UM IDOLOS
rota.get("/idolos/excluir/:id", (req, res) => {
  const id = req.params.id;

  Idolo.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/idolos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao excluir o ídolo. Erro: ${error}.`);
    });
});

// ROTA DE EDIÇÃO DE IDOLO
rota.get("/idolos/editar/:id", (req, res) => {
  const id = req.params.id;
  Idolo.findByPk(id)
    .then((idolo) => {
      res.render("idoloEditar", {
        idolo: idolo,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao editar o ídolo. Erro: ${error}.`);
    });
});

// ROTA QUE ALTERA UM IDOLO NO BANCO DE DADOS
rota.post("/idolos/alterar", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const apelido = req.body.apelido;
  const nascimento = req.body.nascimento;
  const jogos = req.body.jogos;

  Idolo.update(
    {
      nome: nome,
      apelido: apelido,
      nascimento: nascimento,
      jogos: jogos,
    },
    { where: { id: id } },
  )
    .then(() => {
      res.redirect("/idolos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao alterar o ídolo. Erro: ${error}.`);
    });
});
export default rota;
