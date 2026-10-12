import connection from "../config/sequelize-config.js";
import Sequelize from "sequelize";

const Jogador = connection.define(`jogadores`, {
  nome: {
    type: Sequelize.STRING,
    allownull: false,
  },
  posicao: {
    type: Sequelize.STRING,
    allownull: false,
  },
  altura: {
    type: Sequelize.STRING,
    allownull: false,
  },
  idade: {
    type: Sequelize.STRING,
    allownull: false,
  },
});

Jogador.sync({force: false})

export default Jogador;