import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CadastroProduto from './components/CadastroProduto';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const addProduct = (name) => {
    const newProduct = { id: Date.now(), name };
    setProducts([...products, newProduct]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciador de Produtos</h1>
      <button onClick={() => addProduct("Produto Exemplo")}>Adicionar Produto</button>
      <button onClick={() => navigate('/cadastro')} style={{ marginLeft: "10px" }}>
        Ir para Cadastro de Produto
      </button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
