import React, { useState } from 'react';
import { criarFornecedor } from '../api';
import './CadastrarProduto.css';

export default function FormularioFornecedor({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    contato: '',
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarFornecedor(formData);
      setMensagem('Fornecedor cadastrado com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error) {
      setMensagem(`Erro ao cadastrar fornecedor: ${error.message}`);
    }
  };

  return (
    <div className="form-section">
      <h2>Adicionar Novo Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Fornecedor *</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contato (Telefone) *</label>
          <input name="contato" value={formData.contato} onChange={handleChange} required />
        </div>
        <button type="submit">Cadastrar Fornecedor</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}