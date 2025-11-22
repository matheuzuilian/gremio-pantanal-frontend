// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/'); // Volta para o site público
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Painel Admin 🔒</h3>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/admin/dashboard">📊 Visão Geral</Link></li>
        <li><Link to="/admin/membros">👥 Gerenciar Membros</Link></li>
        <li><Link to="/admin/noticias">📰 Publicar Notícias</Link></li>
        <li><Link to="/admin/rancho">🍽️ Rancho do Dia</Link></li>
        <li><Link to="/admin/diretoria">🎖️ Diretoria</Link></li>
        <li><Link to="/admin/projetos">🏗️ Projetos</Link></li>
      </ul>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
    </div>
  );
}

export default Sidebar;