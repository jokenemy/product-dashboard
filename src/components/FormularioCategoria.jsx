import React, { useState } from 'react';
import { criarCategoria } from '../api';
import './CadastrarProduto.css';

export default function FormularioCategoria({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    tamanho: '',
    sexo: '',
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarCategoria(formData);
      setMensagem('Categoria cadastrada com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error) {
      setMensagem(`Erro ao cadastrar categoria: ${error.message}`);
    }
  };

  return (
    <div className="form-section">
      <h2>Adicionar Nova Categoria</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome da Categoria *</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Tamanhos (ex: P, M, G) *</label>
          <input name="tamanho" value={formData.tamanho} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Sexo *</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">Selecione o gênero</option>
            <option value="Unissex">Unissex</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
        </div>
        <button type="submit">Cadastrar Categoria</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}