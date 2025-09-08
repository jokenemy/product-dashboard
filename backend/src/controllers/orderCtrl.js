const prisma = require('../utils/database');

// GET > Listar todos os pedidos
exports.listarpedidos = async (req, res) => {
  try {
    const todospedidos = await prisma.order.findMany({
      include: { produto: true, cliente: true }, // inclui as relações
    });
    res.status(200).json(todospedidos);
  } catch (error) {
    console.error("Erro ao listar pedidos:", error.message);
    res.status(500).json({ error: "Erro ao listar pedidos." });
  }
};

// GET > Buscar pedido por ID
exports.buscarpedidoporid = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { produto: true, cliente: true },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error(`Erro ao buscar pedido com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

// POST > Criar um novo pedido
exports.criarpedido = async (req, res) => {
  try {
    const { quantidade, total, produtoId, clienteId } = req.body;

    const novopedido = await prisma.order.create({
      data: {
        quantidade,
        total,
        produtoId,
        clienteId,
      },
      include: { produto: true, cliente: true },
    });

    console.log(`Pedido criado com sucesso!`);
    res.status(201).json(novopedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error); // mostra erro detalhado
    res.status(500).json({ error: error.message });
  }
};

// PUT > Atualizar um pedido existente
exports.atualizarpedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade, total, produtoId, clienteId } = req.body;

    const pedidoExistente = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    const pedidoatualizado = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { quantidade, total, produtoId, clienteId },
      include: { produto: true, cliente: true },
    });

    console.log(`Pedido atualizado com sucesso!`);
    res.status(200).json(pedidoatualizado);
  } catch (error) {
    console.error(`Erro ao atualizar pedido com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};

// DELETE > Deletar um pedido
exports.deletarpedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedidoExistente = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pedidoExistente) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    const pedidodeletado = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    console.log(`Pedido de id ${id} deletado com sucesso!`);
    res.status(200).json(pedidodeletado);
  } catch (error) {
    console.error(`Erro ao deletar pedido com id ${req.params.id}:`, error.message);
    res.status(500).json({ error: "Erro ao deletar pedido." });
  }
};
