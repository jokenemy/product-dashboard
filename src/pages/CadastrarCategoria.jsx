import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioCategoria from '../components/FormularioCategoria';
import '../components/CadastrarProduto.css';

export default function CadastrarCategoria() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => {
      navigate('/'); // Volta para a página de gerenciamento
    }, 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <FormularioCategoria onSuccess={handleSuccess} />
        <div
          className="image-section"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581044777550-4cfa6ce67943')" }}
        />
      </div>
    </div>
  );
}