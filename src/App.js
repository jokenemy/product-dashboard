import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CadastroProduto from './components/CadastroProduto';
import EditarProduto from './pages/EditarProdutos'; 
import Home from './pages/Home'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
      </Routes>
    </Router>
  );
}