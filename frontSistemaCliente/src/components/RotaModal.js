import React from 'react';

const RotaModal = ({ rotaCalculada, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h3>Ordem de Visitação da Rota Calculada</h3>
        <ul>
          {rotaCalculada.map(cliente => (
            <li key={cliente.id}>{cliente.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RotaModal;
