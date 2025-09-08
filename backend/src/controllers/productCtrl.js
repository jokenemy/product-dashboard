// Quinta rota
const prisma = require('../utils/database');

// GET > Listar todos os produtos
exports.listarprodutos = async (req, res) => {
  try {
    const todosprodutos = await prisma.product.findMany({
      include: { categoria: true, fornecedor: true }, // inclui as relações
    });
    res.status(200).json(todosprodutos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error.message);
    res.status(500).json({ error: "Erro ao listar produtos." });
  }
};

// GET > Buscar produto por ID
exports.buscarprodutoporid = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { categoria: true, fornecedor: true },
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json(produto);
  } catch (error) {
    console.error(`Erro ao buscar produto com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

// POST > Criar um novo produto
exports.criarproduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoriaId, fornecedorId } = req.body;

    const novoproduto = await prisma.product.create({
      data: {
        nome,
        descricao,
        preco,
        estoque,
        categoriaId,
        fornecedorId,
      },
    });

    console.log(`Produto "${nome}" cadastrado com sucesso!`);
    res.status(201).json(novoproduto);
  } catch (error) {
  console.error("Erro ao criar produto:", error); // mostra erro detalhado
  res.status(500).json({ error: error.message });
}
};

// PUT > Atualizar um produto existente
exports.atualizarproduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoriaId, fornecedorId } = req.body;

    // Verifica se o produto existe antes de atualizar
    const produtoExistente = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produtoExistente) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const produtoatualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco, estoque, categoriaId, fornecedorId },
    });

    console.log(`Produto "${nome}" atualizado com sucesso!`);
    res.status(200).json(produtoatualizado);
  } catch (error) {
    console.error(`Erro ao atualizar produto com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

// DELETE > Deletar um produto
exports.deletarproduto = async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o produto existe antes de deletar
    const produtoExistente = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!produtoExistente) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const produtodeletado = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    console.log(`Produto de id ${id} deletado com sucesso!`);
    res.status(200).json(produtodeletado);
  } catch (error) {
    console.error(`Erro ao deletar produto com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao deletar produto." });
  }
};