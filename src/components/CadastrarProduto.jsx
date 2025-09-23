import React from "react";
import { useNavigate } from "react-router-dom";
import FormularioProduto from "./FormularioProduto";
import "./CadastrarProduto.css";

const CadastroProduto = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Atraso de 2 segundos para o usuário ver a mensagem de sucesso
    setTimeout(() => {
      navigate("/"); // Redireciona para a página de gerenciamento
    }, 2000);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <FormularioProduto onSuccess={handleSuccess} />
        <div className="image-section" />
      </div>
    </div>
  );
};

export default CadastroProduto;