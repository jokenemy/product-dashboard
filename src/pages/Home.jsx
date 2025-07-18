import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home({produtos}) {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciador de Produtos</h1>
      <button onClick={() => navigate('/cadastro')}>Adicionar Novo Produto</button>
      <h2>Produtos Cadastrados</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado ainda.</p>
      ) : (
        <ul>
          {produtos.map((p) => (
            <li key={p.id}>{p.nome || p.name} - R$ {p.preco}</li>
          ))}
      </ul>
      )}
    </div>
  );
}
