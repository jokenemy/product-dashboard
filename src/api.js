import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Padronizando todos os exports para o formato 'export const'

// Produtos
export const listarProdutos = () => api.get("/produtos");
export const buscarProdutoPorId = (id) => api.get(`/produtos/${id}`);
export const criarProduto = (produto) => api.post("/produtos", produto);
export const atualizarProduto = (id, produto) => api.put(`/produtos/${id}`, produto);
export const removerProduto = (id) => api.delete(`/produtos/${id}`);

// Categorias
export const listarCategorias = () => api.get("/categorias");
export const buscarCategoriaPorId = (id) => api.get(`/categorias/${id}`);
export const criarCategoria = (categoria) => api.post("/categorias", categoria);
export const atualizarCategoria = (id, categoria) => api.put(`/categorias/${id}`, categoria);
export const deletarCategoria = (id) => api.delete(`/categorias/${id}`);

// Clientes
export const listarClientes = () => api.get("/clientes");
export const buscarClientePorId = (id) => api.get(`/clientes/${id}`);
export const criarCliente = (cliente) => api.post("/clientes", cliente);
export const atualizarCliente = (id, cliente) => api.put(`/clientes/${id}`, cliente);
export const deletarCliente = (id) => api.delete(`/clientes/${id}`);

// Pedidos
export const listarPedidos = () => api.get("/pedidos");
export const buscarPedidoPorId = (id) => api.get(`/pedidos/${id}`);
export const criarPedido = (pedido) => api.post("/pedidos", pedido);
export const atualizarPedido = (id, pedido) => api.put(`/pedidos/${id}`, pedido);
export const deletarPedido = (id) => api.delete(`/pedidos/${id}`);

// Avaliações
export const listarAvaliacoes = () => api.get("/avaliacoes");
export const buscarAvaliacaoPorId = (id) => api.get(`/avaliacoes/${id}`);
export const criarAvaliacao = (avaliacao) => api.post("/avaliacoes", avaliacao);
export const atualizarAvaliacao = (id, avaliacao) => api.put(`/avaliacoes/${id}`, avaliacao);
export const deletarAvaliacao = (id) => api.delete(`/avaliacoes/${id}`);

// Fornecedores
export const listarFornecedores = () => api.get("/fornecedores");
export const buscarFornecedorPorId = (id) => api.get(`/fornecedores/${id}`);
export const criarFornecedor = (fornecedor) => api.post("/fornecedores", fornecedor);
export const atualizarFornecedor = (id, fornecedor) => api.put(`/fornecedores/${id}`, fornecedor);
export const deletarFornecedor = (id) => api.delete(`/fornecedores/${id}`);

// Usuários
export const listarUsuarios = () => api.get("/usuarios");
export const buscarUsuarioPorId = (id) => api.get(`/usuarios/${id}`);
export const criarUsuario = (usuario) => api.post("/usuarios", usuario);
export const atualizarUsuario = (id, usuario) => api.put(`/usuarios/${id}`, usuario);
export const deletarUsuario = (id) => api.delete(`/usuarios/${id}`);

export default api;