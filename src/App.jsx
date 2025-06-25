import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import carregarProdutos  from './api.js';
import AdicionarProduto from './api2.jsx';
import './App.css';
import './index.css';


 export default function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function fetchdados() {
      let dados= await carregarProdutos()
     setProdutos(dados)
    }

    fetchdados();
  }, []);

  return (
    <Router>
    <nav>
      <Link to="/">Página inicial</Link> | 
      <Link to="/adicionar">Adicionar Produto</Link>
    </nav>

    <Routes>
      <Route
        path="/"
        element={
          <>
      <div id="titulo">
        <p id="tt">Seja Bem-vindo à melhor loja de roupas do nordeste</p>
        <p id="loja">STUDIO YAY</p>
        <p id="t2">Uma loja de roupas e acessórios ideal para você!!</p>
      </div>

      <div id="produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="roupa">
            <img src={produto.imagem} alt={produto.nome} />
            <p><strong>{produto.nome}</strong></p>
            <p>{produto.descricao}</p>
            <p>Preço: R$ {produto.preco.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
}
/>
<Route path="/adicionar" element={<AdicionarProduto />} />
      </Routes>
    </Router>
  );
}