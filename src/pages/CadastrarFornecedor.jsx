import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioFornecedor from '../components/FormularioFornecedor';
import '../components/CadastrarProduto.css';

export default function CadastrarFornecedor() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <FormularioFornecedor onSuccess={handleSuccess} />
        <div 
          className="image-section"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556742502-ec7c0e2f34b1')" }}
        />
      </div>
    </div>
  );
}