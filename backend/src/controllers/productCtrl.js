const prisma = require('../utils/database');

// GET > Listar todos os produtos
exports.listarprodutos = async (req, res) => {
  try {
    const todosprodutos = await prisma.product.findMany({
      include: { categoria: true, fornecedor: true },
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
    res.status(500).json({ error: "Erro ao buscar produto." });
  }
};

// POST > Criar um novo produto
exports.criarproduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoriaId, fornecedorId, imagemUrl } = req.body;
    const novoproduto = await prisma.product.create({
      data: {
        nome,
        descricao,
        preco,
        estoque,
        imagemUrl,
        categoriaId,
        fornecedorId,
      },
    });
    console.log(`Produto "${nome}" cadastrado com sucesso!`);
    res.status(201).json(novoproduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: error.message });
  }
};

// PUT > Atualizar um produto existente
exports.atualizarproduto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, estoque, categoriaId, fornecedorId, imagemUrl } = req.body;
    const produtoatualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, preco, estoque, imagemUrl, categoriaId, fornecedorId },
    });
    console.log(`Produto "${nome}" atualizado com sucesso!`);
    res.status(200).json(produtoatualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

// DELETE > Deletar um produto (LÓGICA CORRIGIDA)
exports.deletarproduto = async (req, res) => {
  const { id } = req.params;
  const productId = parseInt(id);

  try {
    // A transação agora deleta as dependências corretas
    const transacaoDeExclusao = await prisma.$transaction([
      prisma.review.deleteMany({ where: { produtoId: productId } }),
      prisma.orderItem.deleteMany({ where: { produtoId: productId } }), // CORRIGIDO: Alvo é OrderItem
      prisma.product.delete({ where: { id: productId } }),
    ]);

    const produtodeletado = transacaoDeExclusao[2];

    console.log(`Produto de id ${id} e suas dependências foram deletados com sucesso!`);
    res.status(200).json(produtodeletado);
    
  } catch (error) {
    console.error(`Erro ao deletar produto com id ${id}:`, error);
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Produto não encontrado para deletar.' });
    }
    res.status(500).json({ error: "Erro no servidor ao deletar o produto." });
  }
};