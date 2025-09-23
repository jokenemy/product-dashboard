const prisma = require('../utils/database');

// GET > Listar todos os pedidos
exports.listarpedidos = async (req, res) => {
  try {
    const todospedidos = await prisma.order.findMany({
      include: {
        cliente: true,
        items: {
          include: {
            produto: true,
          },
        },
      },
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
      include: { 
        cliente: true,
        items: { include: { produto: true } }
      },
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

// POST > Criar um novo pedido
exports.criarpedido = async (req, res) => {
  const { clienteId, items, total } = req.body;
  if (!clienteId || !items || items.length === 0 || !total) {
    return res.status(400).json({ error: 'Dados do pedido incompletos.' });
  }
  try {
    const novopedido = await prisma.order.create({
      data: {
        clienteId: parseInt(clienteId),
        total: parseFloat(total),
        items: {
          create: items.map(item => ({
            quantidade: parseInt(item.quantidade),
            preco: parseFloat(item.preco),
            produtoId: parseInt(item.produtoId),
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json(novopedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: error.message });
  }
};

// PUT > Atualizar um pedido existente
exports.atualizarpedido = async (req, res) => {
    const { id } = req.params;
    const { clienteId, items, total } = req.body;

    try {
        // Deleta os itens antigos para depois recriá-los
        await prisma.orderItem.deleteMany({
            where: { orderId: parseInt(id) },
        });

        const pedidoAtualizado = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                clienteId: parseInt(clienteId),
                total: parseFloat(total),
                items: {
                    create: items.map(item => ({
                        quantidade: parseInt(item.quantidade),
                        preco: parseFloat(item.preco),
                        produtoId: parseInt(item.produtoId),
                    })),
                },
            },
            include: { items: true },
        });
        res.status(200).json(pedidoAtualizado);
    } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
        res.status(500).json({ error: "Erro ao atualizar pedido." });
    }
};

// DELETE > Deletar um pedido
exports.deletarpedido = async (req, res) => {
    const { id } = req.params;
    try {
        // Primeiro deleta os itens do pedido
        await prisma.orderItem.deleteMany({
            where: { orderId: parseInt(id) },
        });
        // Depois deleta o pedido
        const pedidoDeletado = await prisma.order.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(pedidoDeletado);
    } catch (error) {
        console.error("Erro ao deletar pedido:", error);
        res.status(500).json({ error: "Erro ao deletar pedido." });
    }
};