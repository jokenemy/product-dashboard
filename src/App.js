import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const addProduct = () => {
    if (!newProductName.trim()) return;
    const newProduct = { id: Date.now(), name: newProductName };
    setProducts([...products, newProduct]);
    setNewProductName("");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditingName(product.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEditing = () => {
    setProducts(
      products.map((p) =>
        p.id === editingId ? { ...p, name: editingName } : p
      )
    );
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Gerenciador de Produtos</h1>

      {/* Container para input e botão com flex column */}
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Nome do produto"
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={addProduct} style={{ padding: "8px 16px" }}>
          Adicionar Produto
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ marginBottom: "10px" }}>
            {editingId === p.id ? (
              <>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  style={{ padding: "5px" }}
                />
                <button onClick={saveEditing} style={{ marginLeft: "5px" }}>
                  Salvar
                </button>
                <button onClick={cancelEditing} style={{ marginLeft: "5px" }}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                {p.name}
                <button
                  onClick={() => startEditing(p)}
                  style={{ marginLeft: "10px" }}
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ marginLeft: "5px" }}
                >
                  Excluir
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;