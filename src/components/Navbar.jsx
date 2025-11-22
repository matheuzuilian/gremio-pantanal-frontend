// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🐊 Grêmio Pantanal
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">Início</Link>
          </li>
          <li className="nav-item">
            <Link to="/noticias" className="nav-links">Notícias</Link>
          </li>
          <li className="nav-item">
            <Link to="/sobre" className="nav-links">Sobre Nós</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-links-btn">
              <button className="btn-header">Área do Sócio</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;