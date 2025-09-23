import React, { useState } from 'react';
import { criarCliente } from '../api';
import './CadastrarProduto.css';

export default function FormularioCliente({ onSuccess }) {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '', // Começa como string para o campo de input
    sexo: '',
    email: '',
    contato: '',
  });
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // CORREÇÃO: Garante que a idade é convertida para número antes de enviar
      const dadosCliente = {
        ...formData,
        idade: parseInt(formData.idade, 10) || 0, // Converte para número ou usa 0
      };
      await criarCliente(dadosCliente);
      setMensagem('Cliente cadastrado com sucesso!');
      if (onSuccess) onSuccess();
    } catch (error) {
      setMensagem(`Erro ao cadastrar cliente: ${error.message}`);
    }
  };

  return (
    <div className="form-section">
      <h2>adicionarnovocliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>nome*</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>idade*</label>
          <input name="idade" type="number" value={formData.idade} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>sexo*</label>
          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="">selecione o gênero</option>
            <option value="Feminino">feminino</option>
            <option value="Masculino">masculino</option>
            <option value="Outro">outro</option>
          </select>
        </div>
        <div className="form-group">
          <label>email*</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>contato*</label>
          <input name="contato" value={formData.contato} onChange={handleChange} required />
        </div>
        <button type="submit">cadastrar cliente</button>
      </form>
      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}