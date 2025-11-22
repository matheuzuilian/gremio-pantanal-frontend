// src/pages/admin/AdminMembros.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ⚠️ CONFIRA A URL CORRETA AQUI!
const API_URL = 'https://gremio-pantanal-sistema.onrender.com/api';

function AdminMembros() {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar lista ao carregar a página
  useEffect(() => {
    carregarMembros();
  }, []);

  const carregarMembros = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/membros`);
      setMembros(res.data);
      setLoading(false);
    } catch (error) {
      alert('Erro ao carregar membros.');
      setLoading(false);
    }
  };

  const handleExcluir = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja remover o militar ${nome}?`)) {
      try {
        await axios.delete(`${API_URL}/admin/membros/${id}`);
        alert('Membro removido!');
        carregarMembros(); // Recarrega a lista
      } catch (error) {
        alert('Erro ao excluir.');
      }
    }
  };

  if (loading) return <p>Carregando lista de militares...</p>;

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>👥 Gestão de Membros</h2>
        <button style={{ background: 'green', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          + Novo Membro (Em breve)
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Nome</th>
            <th style={{ padding: '10px' }}>Patente</th>
            <th style={{ padding: '10px' }}>Dependentes</th>
            <th style={{ padding: '10px' }}>Status</th>
            <th style={{ padding: '10px' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {membros.map(membro => (
            <tr key={membro.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px' }}>{membro.nomeCompleto}</td>
              <td style={{ padding: '10px' }}>{membro.patente}</td>
              <td style={{ padding: '10px' }}>{membro.total_dependentes}</td>
              <td style={{ padding: '10px' }}>
                <span style={{ color: membro.status === 'Ativo' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {membro.status}
                </span>
              </td>
              <td style={{ padding: '10px' }}>
                <button 
                  onClick={() => handleExcluir(membro.id, membro.nomeCompleto)}
                  style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminMembros;