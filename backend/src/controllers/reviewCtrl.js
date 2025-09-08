const prisma = require('../utils/database');

// GET > Listar todas as avaliações
exports.listaravaliacoes = async (req, res) => {
  try {
    const todasAvaliacoes = await prisma.review.findMany({
      include: { produto: true, cliente: true },
    });
    res.status(200).json(todasAvaliacoes);
  } catch (error) {
    console.error("Erro ao listar avaliações:", error.message);
    res.status(500).json({ error: "Erro ao listar avaliações." });
  }
};

// GET > Buscar avaliação por ID
exports.buscaravaliacaoporid = async (req, res) => {
  try {
    const { id } = req.params;
    const avaliacao = await prisma.review.findUnique({
      where: { id: parseInt(id) },
      include: { produto: true, cliente: true },
    });

    if (!avaliacao) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    res.status(200).json(avaliacao);
  } catch (error) {
    console.error(`Erro ao buscar avaliação com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao buscar avaliação." });
  }
};

// POST > Criar uma nova avaliação
exports.criaravaliacao = async (req, res) => {
  try {
    const { rating, comentario, produtoId, clienteId } = req.body;

    const novaAvaliacao = await prisma.review.create({
      data: {
        rating,
        comentario,
        produtoId,
        clienteId,
      },
      include: { produto: true, cliente: true },
    });

    console.log(`Avaliação criada com sucesso!`);
    res.status(201).json(novaAvaliacao);
  } catch (error) {
    console.error("Erro ao criar avaliação:", error);
    res.status(500).json({ error: error.message });
  }
};

// PUT > Atualizar uma avaliação existente
exports.atualizaravaliacao = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comentario, produtoId, clienteId } = req.body;

    const avaliacaoExistente = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });

    if (!avaliacaoExistente) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    const avaliacaoAtualizada = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { rating, comentario, produtoId, clienteId },
      include: { produto: true, cliente: true },
    });

    console.log(`Avaliação atualizada com sucesso!`);
    res.status(200).json(avaliacaoAtualizada);
  } catch (error) {
    console.error(`Erro ao atualizar avaliação com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao atualizar avaliação." });
  }
};

// DELETE > Deletar uma avaliação
exports.deletaravaliacao = async (req, res) => {
  try {
    const { id } = req.params;

    const avaliacaoExistente = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });

    if (!avaliacaoExistente) {
      return res.status(404).json({ error: "Avaliação não encontrada." });
    }

    const avaliacaoDeletada = await prisma.review.delete({
      where: { id: parseInt(id) },
    });

    console.log(`Avaliação de id ${id} deletada com sucesso!`);
    res.status(200).json(avaliacaoDeletada);
  } catch (error) {
    console.error(`Erro ao deletar avaliação com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao deletar avaliação." });
  }
};
