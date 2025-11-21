// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Mantenha o arquivo CSS padrão se ele existir (App.css ou index.css)
import './App.css'; 

function App() {
  const [faturas, setFaturas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os dados no Back-end Node.js
  useEffect(() => {
    // ⚠️ ATENÇÃO: Use a porta 3001, onde o Back-end está rodando
    axios.get('https://gremio-pantanal-sistema.onrender.com/api/faturas')
      .then(response => {
        setFaturas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar faturas:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Carregando Dados do Grêmio...</h1>;
  }

  return (
    <div className="App">
      <h1>Portal do Associado - Status Financeiro</h1>
      <p>Conexão com o Back-end estabelecida. (Porta 3001)</p>
      
      <h2>Últimas Faturas ({faturas.length} Encontradas):</h2>
      <div className="faturas-list">
        {faturas.map(fatura => (
          <div key={fatura.id} className="fatura-item">
            <p><strong>Fatura ID:</strong> {fatura.id}</p>
            <p><strong>Valor:</strong> R$ {fatura.valor_total}</p>
            <p><strong>Vencimento:</strong> {fatura.data_vencimento}</p>
            <p><strong>Status:</strong> <span className={fatura.status === 'Pago' ? 'status-paid' : 'status-pending'}>{fatura.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
