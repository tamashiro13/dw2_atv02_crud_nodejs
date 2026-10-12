import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Titulo = connection.define(`titulos`, {
  nome: {
    type: Sequelize.STRING,
    allownull: false,
  },
  temporada: {
    type: Sequelize.STRING,
    allownull: false,
  },
});

Titulo.sync({force: false})

export default Titulo;