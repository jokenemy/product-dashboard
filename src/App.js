import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (name) => {
    const newProduct = { id: Date.now(), name };
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <h1>Gerenciador de Produtos</h1>
      <button onClick={() => addProduct("Produto Exemplo")}>Adicionar Produto</button>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

