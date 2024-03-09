import React from 'react';
import './App.css';
import ClientesList from './components/ClientesList';

function App() {
  return (
    <div className="App">
      <h1>Lista de Clientes</h1>
      <ClientesList />
    </div>
  );
}

export default App;