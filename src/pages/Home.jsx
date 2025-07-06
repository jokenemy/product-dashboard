import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
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
