// src/layouts/AdminLayout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function AdminLayout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Proteção de Rota: Só deixa entrar se for ADMIN
    const userStorage = localStorage.getItem('usuario');
    if (!userStorage) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStorage);
    if (user.perfil !== 'admin') {
      alert("Acesso Negado! Área restrita à Secretaria.");
      navigate('/dashboard'); // Manda de volta para a área do sócio comum
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) return <p>Verificando permissões...</p>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: '250px', padding: '40px', background: '#f4f6f8', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;