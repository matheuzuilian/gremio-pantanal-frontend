// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';

// Páginas Públicas
import Home from './pages/public/Home';
import Noticias from './pages/public/Noticias';
import Sobre from './pages/public/Sobre';
import Login from './pages/public/Login'; // Note o novo caminho!

// Páginas do Usuário
import Dashboard from './pages/user/Dashboard'; // Note o novo caminho!

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
      </Routes>
    </Router>
  );
}

export default App;