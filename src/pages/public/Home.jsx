import React from 'react';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px 0' }}>
      <h1 style={{ fontSize: '3rem', color: '#003366' }}>Bem-vindo ao Grêmio Pantanal</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Lazer, Integração e Família Militar.</p>
      <img 
        src="https://via.placeholder.com/800x400?text=Foto+do+Clube+Pantanal" 
        alt="Clube" 
        style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }} 
      />
    </div>
  );
}
export default Home;