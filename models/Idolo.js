import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Idolo = connection.define(`idolos`, {
  nome: {
    type: Sequelize.STRING,
    allownull: false,
  },
  apelido: {
    type: Sequelize.STRING,
    allownull: false,
  },
  nascimento: {
    type: Sequelize.STRING,
    allownull: false,
  },
  jogos: {
    type: Sequelize.STRING,
    allownull: false,
  },
});

Idolo.sync({force: false})

export default Idolo;