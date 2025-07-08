const API_URL = https//686d00cd14219674dcc9fce0.mockapi.io/:endpoint = 'produtos';

export async function buscarProdutos() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}
export async function buscarProdutoPorId(id) {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Produto com ID ${id} não encontrado`);
  }
  const data = await response.json();
  return {
    id: data.id,
    nome: data.name || data.nome,
    preco: data.price || data.preco,
    categoria: data.categoria || 'Sem categoria',
    estoque: data.estoque || 10,
    disponivel: data.disponivel !== false
  };
}

export async function adicionarProduto(produto) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: produto.nome,
      price: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
      descricao: produto.descricao,
      estoque: produto.estoque,
      disponivel: produto.disponivel
    })
  });
  
  return await response.json();
}
export async function atualizarProduto(id, produto) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: produto.nome,
      price: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem,
      descricao: produto.descricao,
      estoque: produto.estoque,
      disponivel: produto.disponivel
    })
  });
  
  return await response.json();
}

export async function removerProduto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao remover produto com ID ${id}`);
  }
  
  return { message: 'Produto removido com sucesso' };
}

export async function buscarCategorias() {
  const response = await fetch(`${API_URL}/categorias`);
  if (!response.ok) {
    throw new Error('Erro ao buscar categorias');
  }
  return await response.json();
}

export async function adicionarCategoria(categoria) {
  const response = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: categoria.nome })
  });
  
  if (!response.ok) {
    throw new Error('Erro ao adicionar categoria');
  }
  
  return await response.json();
}

export async function atualizarCategoria(id, categoria) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: categoria.nome })
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao atualizar categoria com ID ${id}`);
  }
  
  return await response.json();
}

export async function removerCategoria(id) {
  const response = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE'
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao remover categoria com ID ${id}`);
  }
  
  return { message: 'Categoria removida com sucesso' };
}

export async function buscarProdutosPorCategoria(categoriaId) {
  const response = await fetch(`${API_URL}?categoria=${categoriaId}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos da categoria com ID ${categoriaId}`);
  }
  return await response.json();
}

export async function buscarProdutosEmEstoque() {
  const response = await fetch(`${API_URL}?estoque_gte=1`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos em estoque');
  }
  return await response.json();
}

export async function buscarProdutosDisponiveis() {
  const response = await fetch(`${API_URL}?disponivel=true`);
  if (!response.ok) {
    throw new Error('Erro ao buscar produtos disponíveis');
  }
  return await response.json();
}

export async function buscarProdutosPorNome(nome) {
  const response = await fetch(`${API_URL}?nome_like=${nome}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos com nome ${nome}`);
  }
  return await response.json();
}
export async function buscarProdutosPorPreco(min, max) {
  const response = await fetch(`${API_URL}?preco_gte=${min}&preco_lte=${max}`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos com preço entre ${min} e ${max}`);
  }
  return await response.json();
}