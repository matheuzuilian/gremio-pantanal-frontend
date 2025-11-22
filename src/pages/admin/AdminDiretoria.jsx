// src/pages/admin/AdminDiretoria.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://gremio-pantanal-sistema.onrender.com/api';

function AdminDiretoria() {
  const [diretoria, setDiretoria] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [foto, setFoto] = useState(''); // URL da foto

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const res = await axios.get(`${API_URL}/public/diretoria`);
    setDiretoria(res.data);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/admin/diretoria`, { nome, cargo, foto_url: foto, ordem: 1 });
    alert('Membro adicionado!');
    setNome(''); setCargo(''); setFoto('');
    carregar();
  };

  const handleExcluir = async (id) => {
    if(confirm('Remover este diretor?')) {
      await axios.delete(`${API_URL}/admin/diretoria/${id}`);
      carregar();
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>🎖️ Gestão da Diretoria</h2>
      
      {/* Formulário Simples */}
      <form onSubmit={handleSalvar} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input placeholder="Nome (ex: Cel. Silva)" value={nome} onChange={e=>setNome(e.target.value)} required style={{ padding: '8px' }} />
        <input placeholder="Cargo (ex: Presidente)" value={cargo} onChange={e=>setCargo(e.target.value)} required style={{ padding: '8px' }} />
        <input placeholder="URL da Foto (Opcional)" value={foto} onChange={e=>setFoto(e.target.value)} style={{ padding: '8px' }} />
        <button type="submit" style={{ background: '#003366', color: 'white', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>Adicionar</button>
      </form>

      {/* Lista Visual */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {diretoria.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', borderRadius: '8px' }}>
            <div style={{ width: '80px', height: '80px', background: '#eee', borderRadius: '50%', margin: '0 auto', overflow: 'hidden' }}>
              {item.foto_url ? <img src={item.foto_url} alt={item.nome} style={{ width: '100%' }} /> : <span style={{ lineHeight: '80px' }}>📷</span>}
            </div>
            <h4>{item.nome}</h4>
            <p style={{ color: '#666' }}>{item.cargo}</p>
            <button onClick={() => handleExcluir(item.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDiretoria;