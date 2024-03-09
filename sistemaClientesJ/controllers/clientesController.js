const Cliente = require('../models/Cliente');

// Função para calcular a distância euclidiana entre dois pontos
// ela vai retornar a distância entre dois pontos
// (x1, y1) e (x2, y2) no plano cartesiano.
function calcularDistancia(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.calcularRota = async (req, res) => {
    try {
        // Obtenha todos os clientes
        const clientes = await Cliente.findAll();

        // Ordene os clientes pela distância euclidiana até o ponto (0, 0)
        clientes.sort((a, b) => {
            const distanciaA = calcularDistancia(0, 0, a.coordenadaX, a.coordenadaY);
            const distanciaB = calcularDistancia(0, 0, b.coordenadaX, b.coordenadaY);
            return distanciaA - distanciaB;
        });

        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createCliente = async (req, res) => {
    try {
        // Obtenha os dados do corpo da solicitação
        const { nome, email, telefone, coordenadaX, coordenadaY } = req.body;

        // Crie um novo cliente no banco de dados
        const novoCliente = await Cliente.create({
            nome,
            email,
            telefone,
            coordenadaX,
            coordenadaY
        });

        // Envie uma resposta com os dados do cliente criado
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const { nome, email, telefone, coordenadaX, coordenadaY } = req.body;

        // Verifique se o cliente existe
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Atualize os dados do cliente
        cliente.nome = nome;
        cliente.email = email;
        cliente.telefone = telefone;
        cliente.coordenadaX = coordenadaX;
        cliente.coordenadaY = coordenadaY;

        // Salve as alterações no banco de dados
        await cliente.save();

        res.json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
    
exports.deleteCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;

        // Verifique se o cliente existe
        const cliente = await Cliente.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }

        // Exclua o cliente do banco de dados
        await cliente.destroy();

        res.status(204).end(); // Retorna uma resposta de sucesso sem conteúdo
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
