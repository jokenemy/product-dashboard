const PORT = 5000;
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors()); // Padrão EXPRESS

//Teste para ver se o servidor está rodando, se não estiver, verificar o .env
app.get("/", (req, res) => {
  res.send("Servidor rodando");
});

// As rotas devem estar nessa sequencia: usuarios (userRoutes), categorias (categoryRoutes), fornecedores (supplierRoutes), clientes (clientRoutes), produtos (productRoutes), pedidos (orderRoutes), Avaliações (reviewRoutes), 

// userRoutes funcionando
const userRoutes = require('./routes/userRoutes'); 
app.use("/", userRoutes);

/* categoryRoutes funcionando
const categoryRoutes = require('./routes/categoryRoutes'); 
app.use("/", categoryRoutes);
*/







//Deve ser as últimas linhas do código
app.listen(PORT, () => {
    console.log("Servidor executando na porta: " + PORT);
})