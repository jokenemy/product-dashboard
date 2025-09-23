import React from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioPedido from '../components/FormularioPedido';
import '../components/CadastrarProduto.css';

export default function CadastrarPedido() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    setTimeout(() => navigate('/pedidos'), 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <FormularioPedido onSuccess={handleSuccess} />
        <div 
          className="image-section"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740738-b6a63e27c4df')" }}
        />
      </div>
    </div>
  );
}
