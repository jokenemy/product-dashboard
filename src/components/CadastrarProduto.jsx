import React, { useState } from "react";
import "./CadastrarProduto.css";

const CadastroProduto = () => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    categoria: "",
    descricao: "",
    fotos: "",
    quantidadeEstoque: "",
    codigoBarras: "",
    pesoTamanho: "",
    temDesconto: "",
    palavrasChave: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dados = { ...formData };

      // Conversões de tipos
      dados.preco = parseFloat(dados.preco);
      dados.quantidadeEstoque = parseInt(dados.quantidadeEstoque);
      if (dados.temDesconto !== "") {
        dados.temDesconto = dados.temDesconto === "true";
      } else {
        delete dados.temDesconto;
      }

      const resp = await fetch("https://686d00cd14219674dcc9fce0.mockapi.io/Produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resp.json();
      if (resp.ok) {
        setMensagem("Produto cadastrado com sucesso!");
        setFormData({
          nome: "", preco: "", categoria: "", descricao: "",
          fotos: "", quantidadeEstoque: "", codigoBarras: "",
          pesoTamanho: "", temDesconto: "", palavrasChave: ""
        });
      } else {
        setMensagem(`Erro ao cadastrar: ${JSON.stringify(resultado)}`);
      }
    } catch (error) {
      setMensagem("Erro ao enviar dados: " + error.message);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="form-section">
          <h2>Adicionar Novo Produto</h2>
          <form onSubmit={handleSubmit}>
            {[
              ["nome", "Nome do produto *"],
              ["preco", "Preço *", "number"],
              ["categoria", "Categoria *"],
              ["descricao", "Descrição *", "textarea"],
              ["fotos", "Fotos (URL)"],
              ["quantidadeEstoque", "Quantidade em estoque", "number"],
              ["codigoBarras", "Código de barras"],
              ["pesoTamanho", "Peso e tamanho"],
              ["palavrasChave", "Palavras-chave"]
            ].map(([name, label, type]) => (
              <div className="form-group" key={name}>
                <label>{label}</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={label.includes("*")}
                  />
                ) : (
                  <input
                    type={type || "text"}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={label.includes("*")}
                  />
                )}
              </div>
            ))}

            <div className="form-group">
              <label>Tem desconto?</label>
              <select name="temDesconto" value={formData.temDesconto} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <button type="submit">Cadastrar Produto</button>
          </form>

          {mensagem && <div className="mensagem">{mensagem}</div>}
        </div>

        <div className="image-section" />
      </div>
    </div>
  );
};

export default CadastroProduto;
