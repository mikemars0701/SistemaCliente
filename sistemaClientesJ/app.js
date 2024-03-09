const express = require('express');
const { sequelize, syncModels } = require('./db'); 
const clientesRoutes = require('./routes/clientesRoutes');
const cors = require('cors');

const app = express();

// Middleware para analisar o corpo da solicitação como JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rotas para clientes
app.use('/clientes', clientesRoutes);

// Chame a função syncModels() durante a inicialização da aplicação
syncModels().then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch(error => {
  console.error('Erro ao inicializar a aplicação:', error);
});
