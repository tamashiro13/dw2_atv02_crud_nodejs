import express from "express";

import Titulo from "../models/Titulo.js";
const rota = express.Router();

// ROTA TITULOS
rota.get("/titulos", function (req, res) {
  Titulo.findAll()
    .then((titulos) => {
      res.render("titulos", {
        titulos: titulos,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao listar os títulos. Erro: ${error}.`);
    });
});

// ROTA DE CADASTRO DE TITULOS
rota.post("/titulos/cadastrar", (req, res) => {
  const nome = req.body.nome;
  const temporada = req.body.temporada;

  Titulo.create({
    nome: nome,
    temporada: temporada
  })
    .then(() => {
      res.redirect("/titulos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao cadastrar o título. Erro: ${error}.`);
    });
});

// ROTA PARA EXCLUIR UM TITULOS
rota.get("/titulos/excluir/:id", (req, res) => {
  const id = req.params.id;

  Titulo.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/titulos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao excluir o título. Erro: ${error}.`);
    });
});

// ROTA DE EDIÇÃO DE TITULO
rota.get("/titulos/editar/:id", (req, res) => {
  const id = req.params.id;
  Titulo.findByPk(id)
    .then((titulo) => {
      res.render("tituloEditar", {
        titulo: titulo,
      });
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao editar o título. Erro: ${error}.`);
    });
});

// ROTA QUE ALTERA UM TITULO NO BANCO DE DADOS
rota.post("/titulos/alterar", (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const temporada = req.body.temporada;

  Titulo.update(
    {
      nome: nome,
      temporada: temporada,
    },
    { where: { id: id } },
  )
    .then(() => {
      res.redirect("/titulos");
    })
    .catch((error) => {
      console.log(`Ocorreu um erro ao alterar o título. Erro: ${error}.`);
    });
});
export default rota;
