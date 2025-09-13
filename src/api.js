import axios from "axios";

const api = axios.create({
  baseURL: "https://686d00cd14219674dcc9fce0.mockapi.io/"
});

export async function buscarprodutos() {
  const response = await api.get("/produtos");
  return response.data;
}

export async function criarproduto(produto) {
  const response = await api.post("/produtos", produto);
  return response.data;
}

export async function atualizarproduto(id, produto) {
  const response = await api.put(`/produtos/${id}`, produto);
  return response.data;
}

export async function deletarproduto(id) {
  const response = await api.delete(`/produtos/${id}`);
  return response.data;
}

export async function listarproduto(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}

export async function listarcategorias(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscarcategoriasporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criarcategorias(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletarcategoria(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function listarclientes(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscarclienteporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criarcliente(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletarcliente(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function listarpedidos(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criarpedido(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscarpedidoporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletarpedido(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function listaravaliacoes(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscaravaliacaoporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criaravaliacao(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletaravaliacao(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criarfornecedor(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function listarfornecedores(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscarfornecedorporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletarfornecedor(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function listarusuarios(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function buscarusuarioporid(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function criarusuario(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export async function deletarusuario(id) {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
}
export default api;
