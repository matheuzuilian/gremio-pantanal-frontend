import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    // Substitua pela sua URL do Render
    axios.get('https://gremio-pantanal-api.onrender.com/api/public/noticias')
      .then(res => setNoticias(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📰 Últimas Notícias</h2>
      {noticias.length === 0 ? <p>Nenhuma notícia publicada.</p> : (
        <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {noticias.map(noticia => (
            <div key={noticia.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
              <h3>{noticia.titulo}</h3>
              <p>{noticia.conteudo.substring(0, 100)}...</p>
              <small>{new Date(noticia.criado_em).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Noticias;