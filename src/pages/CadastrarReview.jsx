import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioReview from '../components/FormularioReview';
import '../components/CadastrarProduto.css';

export default function CadastrarReview() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="cadastro-container">
      <FormularioReview onSuccess={handleSuccess} />
    </div>
  );
}