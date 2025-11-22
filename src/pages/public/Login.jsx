// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Vamos criar esse CSS depois

// ⚠️ SUBSTITUA PELA SUA URL DO RENDER AQUI!
const API_URL = 'https://gremio-pantanal-sistema.onrender.com/api';

function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { cpf, senha });
      
      const usuarioLogado = response.data.user; // Pega os dados do usuário

      // Salva na memória do navegador
      localStorage.setItem('usuario', JSON.stringify(usuarioLogado));
      
      // 🛑 AQUI ESTÁ A CORREÇÃO DO "GPS":
      if (usuarioLogado.perfil === 'admin') {
        console.log("Usuário é Admin -> Indo para Painel");
        navigate('/admin/dashboard'); // Leva para o Painel da Secretaria
      } else {
        console.log("Usuário é Militar -> Indo para Área do Sócio");
        navigate('/dashboard'); // Leva para o Dashboard Comum
      }
      
    } catch (error) {
      if (error.response) {
        setErro(error.response.data.message);
      } else {
        setErro("Erro ao conectar com o servidor.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Grêmio Pantanal 🐊</h1>
        <p>Acesso ao Portal</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>CPF (apenas números)</label>
            <input 
              type="text" 
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="00011122233"
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input 
              type="password" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          {erro && <p className="error-msg">{erro}</p>}

          <button type="submit" className="btn-login">ENTRAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;