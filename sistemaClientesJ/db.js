// db.js

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:root123@127.0.0.1:3306/sistemaClientes');

// Importe todos os modelos aqui
const Cliente = require('./models/Cliente');

// Sincronize os modelos com o banco de dados
async function syncModels() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados com o banco de dados.');
  } catch (error) {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error);
  }
}

module.exports = { sequelize, syncModels };
