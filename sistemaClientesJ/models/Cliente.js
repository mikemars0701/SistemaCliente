const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:root123@127.0.0.1:3306/sistemaClientes', {
  logging: console.log // Habilita o logging para todas as consultas SQL
});

const Cliente = sequelize.define('Cliente', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coordenadaX: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    coordenadaY: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
  // Desativa a criação automática de colunas 'createdAt' e 'updatedAt'
  timestamps: false,
  // Define o nome da tabela como 'clientes'
  tableName: 'clientes',
  // Habilita o logging apenas para este modelo
  logging: console.log
});

module.exports = Cliente;
