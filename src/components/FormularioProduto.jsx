import React, { useState, useEffect } from "react";
import { 
  criarProduto, 
  atualizarProduto, 
  listarCategorias, 
  listarFornecedores 
} from "../api";
import "./CadastrarProduto.css";

export default function FormularioProduto({ produto, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    imagemUrl: "",
    categoriaId: "",
    fornecedorId: "",
  });
  const [mensagem, setMensagem] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  // Efeito para buscar categorias e fornecedores ao montar o componente
  useEffect(() => {
    async function carregarDadosParaSelecao() {
      try {
        const resCategorias = await listarCategorias();
        setCategorias(resCategorias.data);

        const resFornecedores = await listarFornecedores();
        setFornecedores(resFornecedores.data);
      } catch (error) {
        setMensagem("Erro ao carregar categorias ou fornecedores.");
        console.error("Erro ao buscar dados para os seletores:", error);
      }
    }
    carregarDadosParaSelecao();
  }, []);

  // Efeito para preencher o formulário no modo de edição
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        preco: produto.preco || "",
        estoque: produto.estoque || "",
        imagemUrl: produto.imagemUrl || "",
        categoriaId: produto.categoriaId || "",
        fornecedorId: produto.fornecedorId || "",
      });
    }
  }, [produto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dadosParaEnviar = {
        ...formData,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque, 10),
        categoriaId: parseInt(formData.categoriaId, 10),
        fornecedorId: parseInt(formData.fornecedorId, 10),
      };

      if (produto && produto.id) {
        await atualizarProduto(produto.id, dadosParaEnviar);
        setMensagem("Produto atualizado com sucesso!");
      } else {
        await criarProduto(dadosParaEnviar);
        setMensagem("Produto cadastrado com sucesso!");
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      setMensagem(`Erro ao processar o produto: ${error.message}`);
    }
  };

  const isEditMode = produto && produto.id;

  return (
    <div className="form-section">
      <h2>{isEditMode ? "Editar Produto" : "Adicionar Novo Produto"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do produto *</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descrição *</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Preço *</label>
          <input name="preco" type="number" step="0.01" value={formData.preco} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Estoque *</label>
          <input name="estoque" type="number" value={formData.estoque} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>URL da Imagem</label>
          <input name="imagemUrl" value={formData.imagemUrl} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Categoria *</label>
          <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome} (ID: {cat.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Fornecedor *</label>
          <select name="fornecedorId" value={formData.fornecedorId} onChange={handleChange} required>
            <option value="">Selecione um fornecedor</option>
            {fornecedores.map((forn) => (
              <option key={forn.id} value={forn.id}>
                {forn.nome} (ID: {forn.id})
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit">{isEditMode ? "Salvar Alterações" : "Cadastrar Produto"}</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}