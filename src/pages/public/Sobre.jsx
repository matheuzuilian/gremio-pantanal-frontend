// src/pages/public/Sobre.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sobre() {
  const [diretoria, setDiretoria] = useState([]);

  useEffect(() => {
    // Busca os dados reais do banco
    axios.get('https://gremio-pantanal-sistema.onrender.com/api/public/diretoria')
      .then(res => setDiretoria(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Sobre o Grêmio Pantanal</h1>
      <p style={{ maxWidth: '600px', margin: '20px auto', fontSize: '1.1rem' }}>
        Fundado para servir a família militar, o Grêmio Pantanal é um espaço de lazer,
        integração e camaradagem no coração do Mato Grosso do Sul.
      </p>
      
      <hr style={{ margin: '40px 0' }} />

      <h2>🎖️ Nossa Diretoria</h2>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginTop: '20px' }}>
        {diretoria.length === 0 ? <p>Carregando equipe...</p> : diretoria.map(membro => (
          <div key={membro.id} style={{ width: '200px', padding: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
             <img 
                src={membro.foto_url || "https://via.placeholder.com/100"} 
                alt={membro.nome}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
             />
             <h3 style={{ margin: '10px 0 5px 0', fontSize: '1.2rem' }}>{membro.nome}</h3>
             <span style={{ color: '#003366', fontWeight: 'bold' }}>{membro.cargo}</span>
          </div>
        ))}
      </div>
      <hr style={{ margin: '40px 0' }} />

      <h2>🏗️ Nossos Projetos</h2>

      <ProjectsSection /> {/* Vamos criar esse pequeno componente interno aqui mesmo para simplificar */}

    </div>
  );
}

function ProjectsSection() {
  const [projetos, setProjetos] = React.useState([]);

  React.useEffect(() => {
    axios.get('https://gremio-pantanal-sistema.onrender.com/api/public/projetos')
      .then(res => setProjetos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginTop: '20px' }}>
      {projetos.map(proj => (
        <div key={proj.id} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', textAlign: 'left' }}>
          <div style={{ height: '150px', background: '#ccc', backgroundImage: `url(${proj.imagem_url})`, backgroundSize: 'cover' }}></div>
          <div style={{ padding: '15px' }}>
            <h3 style={{ marginTop: 0 }}>{proj.titulo}</h3>
            <p>{proj.descricao}</p>
            <span style={{ 
              background: proj.status === 'Concluido' ? 'green' : 'orange', 
              color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' 
            }}>
              {proj.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sobre;