
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { produtos } from '../data';

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    const encontrado = produtos.find((p) => p.id === parseInt(id));
    if (encontrado) {
      setProduto({ ...encontrado });
    } else {
      alert("Produto não encontrado");
      navigate('/');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Produto atualizado:", produto);
    alert("Produto atualizado!");
    navigate('/');
  };

  if (!produto) return <p>Carregando...</p>;

  return (
    <div>
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input name="nome" value={produto.nome} onChange={handleChange} />
        </div>
        <div>
          <label>Preço:</label>
          <input name="preco" type="number" value={produto.preco} onChange={handleChange} />
        </div>
        <div>
          <label>Estoque:</label>
          <input name="estoque" type="number" value={produto.estoque} onChange={handleChange} />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
