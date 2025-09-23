import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioCliente from '../components/FormularioCliente';
import '../components/CadastrarProduto.css';

export default function CadastrarCliente() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <FormularioCliente onSuccess={handleSuccess} />
        <div 
          className="image-section"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579389083046-e3df9c2b3325')" }}
        />
      </div>
    </div>
  );
}