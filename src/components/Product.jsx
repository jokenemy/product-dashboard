import React, { useState, useEffect } from "react";
import { buscarProdutos } from "../../services/api";

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await buscarProdutos(); 
      setProdutos(response);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <div>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{produto.nome}</h3>
            <p>Preço: R$ {produto.preco}</p>
            <p>Categoria: {produto.categoria}</p>
            <p>Estoque: {produto.quantidadeEstoque}</p>
            <p>Criado em: {new Date(produto.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
