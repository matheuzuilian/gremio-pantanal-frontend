// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* O Outlet é onde o conteúdo das páginas (Home, Sobre) será carregado */}
        <Outlet />
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', background: '#eee', marginTop: 'auto' }}>
        <p>&copy; 2025 Grêmio Pantanal - Força e Honra</p>
      </footer>
    </>
  );
}

export default PublicLayout;