// src/pages/admin/AdminNoticias.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://gremio-pantanal-sistema.onrender.com/api';

function AdminNoticias() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handlePublicar = async (e) => {
    e.preventDefault();
    try {
      // Precisamos criar essa rota no Back-end jaja!
      await axios.post(`${API_URL}/admin/noticias`, {
        titulo,
        conteudo,
        status: 'Publicado' // Já publica direto para facilitar
      });
      
      setMensagem('✅ Notícia publicada com sucesso!');
      setTitulo('');
      setConteudo('');
    } catch (error) {
      console.error(error);
      setMensagem('❌ Erro ao publicar notícia.');
    }
  };

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h2>📰 Publicar Nova Notícia</h2>
      <p>Use este formulário para adicionar avisos ao site público.</p>
      
      {mensagem && <p style={{ padding: '10px', background: '#e8f5e9', color: 'green' }}>{mensagem}</p>}

      <form onSubmit={handlePublicar} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Título da Notícia</label>
          <input 
            type="text" 
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Conteúdo / Texto</label>
          <textarea 
            value={conteudo}
            onChange={e => setConteudo(e.target.value)}
            rows="5"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd' }}
            required
          ></textarea>
        </div>

        <button type="submit" style={{ padding: '10px 20px', background: '#003366', color: 'white', border: 'none', cursor: 'pointer' }}>
          PUBLICAR NO SITE
        </button>
      </form>
    </div>
  );
}

export default AdminNoticias;