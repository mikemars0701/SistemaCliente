const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para listar todos os clientes
router.get('/', clientesController.getClientes);

// Rota para calcular a rota mais eficiente
router.get('/calcular-rota', clientesController.calcularRota);

// Rota para criar um novo cliente
router.post('/', clientesController.createCliente);

// Rota para atualizar um cliente existente
router.put('/:id', clientesController.updateCliente);

// Rota para excluir um cliente existente
router.delete('/:id', clientesController.deleteCliente);

// Rota para buscar todos os clientes
router.get('/clientes', clientesController.getClientes);

module.exports = router;
