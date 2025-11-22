// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';

// Páginas Públicas
import Home from './pages/public/Home';
import Noticias from './pages/public/Noticias';
import Sobre from './pages/public/Sobre';
import Login from './pages/public/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminNoticias from './pages/admin/AdminNoticias';

// Páginas do Usuário
import Dashboard from './pages/user/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* ROTAS PÚBLICAS (Com Menu Superior) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="sobre" element={<Sobre />} />
        </Route>

        {/* ROTAS DE ACESSO (Sem Menu Superior, tela cheia) */}
        <Route path="/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS (Logadas) */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ROTAS ADMINISTRATIVAS (Protegidas) */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<h2>Bem-vindo, Administrador!</h2>} />
        <Route path="noticias" element={<AdminNoticias />} />
        {/* Futuramente: Membros, Rancho, etc */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;