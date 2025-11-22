// src/pages/admin/AdminProjetos.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://gremio-pantanal-sistema.onrender.com/api';

function AdminProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [form, setForm] = useState({ titulo: '', descricao: '', status: 'Em Andamento', imagem_url: '' });

  useEffect(() => { carregar(); }, []);

  const carregar = async () => {
    const res = await axios.get(`${API_URL}/public/projetos`);
    setProjetos(res.data);
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/admin/projetos`, form);
    alert('Projeto Salvo!');
    setForm({ titulo: '', descricao: '', status: 'Em Andamento', imagem_url: '' });
    carregar();
  };

  const handleExcluir = async (id) => {
    if(confirm('Apagar projeto?')) {
      await axios.delete(`${API_URL}/admin/projetos/${id}`);
      carregar();
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>🏗️ Gestão de Projetos e Obras</h2>
      
      <form onSubmit={handleSalvar} style={{ display: 'grid', gap: '10px', marginBottom: '30px', maxWidth: '500px' }}>
        <input placeholder="Título (ex: Reforma da Piscina)" value={form.titulo} onChange={e=>setForm({...form, titulo: e.target.value})} required style={{ padding: '8px' }} />
        <textarea placeholder="Descrição..." value={form.descricao} onChange={e=>setForm({...form, descricao: e.target.value})} required style={{ padding: '8px' }} />
        <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} style={{ padding: '8px' }}>
          <option value="Em Andamento">Em Andamento 🚧</option>
          <option value="Concluido">Concluído ✅</option>
        </select>
        <input placeholder="URL da Imagem (Opcional)" value={form.imagem_url} onChange={e=>setForm({...form, imagem_url: e.target.value})} style={{ padding: '8px' }} />
        <button type="submit" style={{ background: '#003366', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>Salvar Projeto</button>
      </form>

      <div style={{ display: 'grid', gap: '20px' }}>
        {projetos.map(proj => (
          <div key={proj.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{proj.titulo}</h3>
              <span style={{ background: proj.status === 'Concluido' ? 'green' : 'orange', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {proj.status}
              </span>
              <p style={{ color: '#666', margin: '5px 0' }}>{proj.descricao}</p>
            </div>
            <button onClick={() => handleExcluir(proj.id)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProjetos;