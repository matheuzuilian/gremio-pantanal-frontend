// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://gremio-pantanal-api.onrender.com/api';

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [faturas, setFaturas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Verificar se tem usuário logado
    const userStorage = localStorage.getItem('usuario');
    if (!userStorage) {
      navigate('/'); // Se não tiver logado, chuta pro Login
      return;
    }
    
    const user = JSON.parse(userStorage);
    setUsuario(user);

    // 2. Buscar Faturas (Apenas testando conexão geral por enquanto)
    // O ideal seria criar uma rota no back-end tipo /faturas/meus-dados/:id
    // Mas vamos listar todas como teste inicial
    axios.get(`${API_URL}/faturas`)
      .then(res => setFaturas(res.data))
      .catch(err => console.error(err));

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Olá, {usuario.nome}! 👋</h1>
        <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px' }}>Sair</button>
      </header>

      <div className="status-card" style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Seu Status: <strong>{usuario.status}</strong></h3>
        <p>Patente: {usuario.patente} | Tipo Serviço: {usuario.tipoServico}</p>
      </div>

      <h2>💰 Minhas Faturas</h2>
      {faturas.map(fatura => (
        <div key={fatura.id} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0', borderRadius: '5px' }}>
          <p><strong>Vencimento:</strong> {fatura.data_vencimento}</p>
          <p><strong>Valor:</strong> R$ {fatura.valor_total}</p>
          <p>Status: <strong style={{ color: fatura.status === 'Pago' ? 'green' : 'orange' }}>{fatura.status}</strong></p>
        </div>
      ))}

      <hr />
      <h2>🍽️ Rancho (Almoço)</h2>
      <p>Em breve: Botões para pedir almoço aqui.</p>
    </div>
  );
}

export default Dashboard;