import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClienteList.css'; // Importa o arquivo CSS
import editIcon from '../components/icons/editicon.png';
import deleteIcon from '../components/icons/deleteIcon.png';
import salvarIcon from '../components/icons/salvarIcon.png';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);
  const [rotaCalculada, setRotaCalculada] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [novoCliente, setNovoCliente] = useState({
    nome: '',
    email: '',
    telefone: '',
    coordenadaX: 0,
    coordenadaY: 0
  });
  const [editavel, setEditavel] = useState(null); // Armazena o ID do cliente sendo editado

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/clientes/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const calcularRota = async () => {
    try {
      const response = await axios.get('http://localhost:3001/clientes/calcular-rota');
      setRotaCalculada(response.data);
      setModalAberta(true);
    } catch (error) {
      console.error('Erro ao calcular rota:', error);
    }
  };

  const criarCliente = async () => {
    try {
      await axios.post('http://localhost:3001/clientes', novoCliente);
      setNovoCliente({
        nome: '',
        email: '',
        telefone: '',
        coordenadaX: 0,
        coordenadaY: 0
      });
      const response = await axios.get('http://localhost:3001/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  const atualizarCliente = async (id) => {
    try {
      // Encontra o cliente na lista
      const cliente = clientes.find(cliente => cliente.id === id);
      // Envie os dados atualizados para o servidor
      await axios.put(`http://localhost:3001/clientes/${id}`, cliente);
      console.log('Cliente atualizado com sucesso:', cliente);
      // Defina o estado de edição como null para sair do modo de edição
      setEditavel(null);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };

  const excluirCliente = async (id) => {
    try {
      // Lógica para excluir um cliente com base no ID
      await axios.delete(`http://localhost:3001/clientes/${id}`);
      const updatedClientes = clientes.filter(cliente => cliente.id !== id);
      setClientes(updatedClientes);
      console.log('Cliente excluído com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };

  const handleInputChange = (id, field, value) => {
    // Encontra o cliente na lista
    const clienteIndex = clientes.findIndex(cliente => cliente.id === id);
    // Cria uma cópia do array de clientes
    const updatedClientes = [...clientes];
    // Atualiza o campo do cliente específico
    updatedClientes[clienteIndex][field] = value;
    // Atualiza o estado dos clientes
    setClientes(updatedClientes);
  };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-4">
                <button className="btn btn-primary" onClick={calcularRota}>Calcular Rota</button>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome <i className="fa fa-sort"></i></th>
                <th>Email</th>
                <th>Telefone</th>
                <th>CoordenadaX</th>
                <th>CoordenadaY</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={cliente.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editavel === cliente.id ? (
                      <input type="text" value={cliente.nome} onChange={(e) => handleInputChange(cliente.id, 'nome', e.target.value)} />
                    ) : (
                      cliente.nome
                    )}
                  </td>
                  <td>
                    {editavel === cliente.id ? (
                      <input type="text" value={cliente.email} onChange={(e) => handleInputChange(cliente.id, 'email', e.target.value)} />
                    ) : (
                      cliente.email
                    )}
                  </td>
                  <td>
                    {editavel === cliente.id ? (
                      <input type="text" value={cliente.telefone} onChange={(e) => handleInputChange(cliente.id, 'telefone', e.target.value)} />
                    ) : (
                      cliente.telefone
                    )}
                  </td>
                  <td>
                    {editavel === cliente.id ? (
                      <input type="number" value={cliente.coordenadaX} onChange={(e) => handleInputChange(cliente.id, 'coordenadaX', e.target.value)} />
                    ) : (
                      cliente.coordenadaX
                    )}
                  </td>
                  <td>
                    {editavel === cliente.id ? (
                      <input type="number" value={cliente.coordenadaY} onChange={(e) => handleInputChange(cliente.id, 'coordenadaY', e.target.value)} />
                    ) : (
                      cliente.coordenadaY
                    )}
                  </td>
                  <td>
                    {editavel === cliente.id ? (
                      <a href="#"  className="edit" onClick={() => atualizarCliente(cliente.id)}>
                      <img src={salvarIcon} alt="Salvar" width="20" />
                      </a>
                    ) : (
                      <>
                        <a href="#" className="edit"  onClick={() => setEditavel(cliente.id)}>
                          <img src={editIcon} alt="Editar" width="20" />
                        </a>
                        <a href="#" className="delete" onClick={() => excluirCliente(cliente.id)}>
                          <img src={deleteIcon} alt="Excluir" width="20" />
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="clearfix">
            <div className="hint-text">Mostrando <b>{clientes.length}</b> de <b>{clientes.length}</b> Clientes</div>
          </div>
        </div>
      </div>
      {modalAberta && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalAberta(false)}>&times;</span>
            <h3>Ordem de Visitação da Rota Calculada</h3>
            <ul>
              {rotaCalculada.map(cliente => (
                <li key={cliente.id}>{cliente.nome}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="new-client">
        <h3>Novo Cliente</h3>
        <input type="text" placeholder="Nome" value={novoCliente.nome} onChange={(e) => setNovoCliente({...novoCliente, nome: e.target.value})} />
        <input type="text" placeholder="Email" value={novoCliente.email} onChange={(e) => setNovoCliente({...novoCliente, email: e.target.value})} />
        <input type="text" placeholder="Telefone" value={novoCliente.telefone} onChange={(e) => setNovoCliente({...novoCliente, telefone: e.target.value})} />
        <input type="number" placeholder="Coordenada X" value={novoCliente.coordenadaX} onChange={(e) => setNovoCliente({...novoCliente, coordenadaX: e.target.value})} />
        <input type="number" placeholder="Coordenada Y" value={novoCliente.coordenadaY} onChange={(e) => setNovoCliente({...novoCliente, coordenadaY: e.target.value})} />
        <button onClick={criarCliente}>Criar Cliente</button>
      </div>
    </div>
  );
};

export default ClientesList;
