import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Importar componentes da branch railane2
import CadastroProduto from './components/CadastrarProduto';
import EditarProduto from './pages/EditarProdutos'; 
import Home from './pages/Home'; 

// Importar componentes da branch larissa
import carregarProdutos from './api.js';
import Css from './css.jsx';
import HomeComponent from './componentes.jsx';

export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchdados() {
      try {
        let dados = await carregarProdutos();
        setProdutos(dados);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    }

    fetchdados();
  }, []);

  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Página inicial</Link>
        <Link to="/cadastro" style={{ marginRight: '1rem' }}>Cadastro</Link>
        <Link to="/larissa" style={{ marginRight: '1rem' }}>Versão Larissa</Link>
      </nav>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
        <Route path="/larissa" element={<Css produtos={produtos} />} />
      </Routes>
    </Router>
  );
}
    