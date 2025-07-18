const API_URL = "https://686d00cd14219674dcc9fce0.mockapi.io/Produtos";

export async function buscarProdutos() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar produtos.");
  return await response.json();
}

export async function buscarProdutoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error(`Produto com ID ${id} não encontrado`);
  return await response.json();
}

export async function adicionarProduto(produto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  });
  if (!response.ok) throw new Error("Erro ao adicionar produto.");
  return await response.json();
}

export async function atualizarProduto(id, produto) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(produto)
  });
  if (!response.ok) throw new Error(`Erro ao atualizar produto com ID ${id}`);
  return await response.json();
}

export async function removerProduto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error(`Erro ao remover produto com ID ${id}`);
  return { message: 'Produto removido com sucesso' };
}

// ------------------ FILTROS OPCIONAIS ------------------
export async function buscarProdutosPorCategoria(categoria) {
  const response = await fetch(`${API_URL}?categoria=${encodeURIComponent(categoria)}`);
  if (!response.ok) throw new Error(`Erro ao buscar produtos da categoria "${categoria}"`);
  return await response.json();
}

export async function buscarProdutosDisponiveis() {
  const response = await fetch(`${API_URL}?disponivel=true`);
  if (!response.ok) throw new Error('Erro ao buscar produtos disponíveis');
  return await response.json();
}

export async function buscarProdutosComEstoque() {
  const response = await fetch(`${API_URL}?estoque_gte=1`);
  if (!response.ok) throw new Error('Erro ao buscar produtos com estoque');
  return await response.json();
}

export async function buscarProdutosPorNome(nome) {
  const response = await fetch(`${API_URL}?nome_like=${encodeURIComponent(nome)}`);
  if (!response.ok) throw new Error(`Erro ao buscar produtos com nome "${nome}"`);
  return await response.json();
}

export async function buscarProdutosPorPreco(min, max) {
  const response = await fetch(`${API_URL}?preco_gte=${min}&preco_lte=${max}`);
  if (!response.ok) throw new Error(`Erro ao buscar produtos com preço entre ${min} e ${max}`);
  return await response.json();
}