const prisma = require('../utils/database');

// get> listar todos os fornecedores. parte 1
exports.listarfornecedores = async (req, res) => {
  try {
    const todosfornecedores = await prisma.supplier.findMany();
    res.status(200).json(todosfornecedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get> buscar fornecedor por id. parte 2
exports.buscarfornecedorporid = async (req, res) => {
  try {
    const { id } = req.params; 
    const fornecedor = await prisma.supplier.findUnique({ where: { id: parseInt(id) } });
    if (fornecedor) {
      res.status(200).json(fornecedor);
    } else {
      res.status(404).json({ error: 'fornecedornaoencontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post> criar um novo fornecedor. parte 3
exports.criarfornecedor = async (req, res) => {
  try {
    const { nome, email, contato } = req.body;
    if (!nome || !email || !contato) {
      return res.status(400).json({ error: "Nome, email e contato são obrigatórios." });
    }
    
    const novofornecedorcriado = await prisma.supplier.create({
      data: { nome, email, contato }
    });
    res.status(201).json(novofornecedorcriado);
  } catch (error) {
    // CORREÇÃO: Verifica se o erro é de violação de campo único (P2002)
    if (error.code === 'P2002' && error.meta?.target.includes('email')) {
      return res.status(409).json({ error: 'Este e-mail já está em uso.' }); // 409 Conflict
    }
    console.error("Erro ao criar fornecedor:", error);
    res.status(500).json({ error: 'Erro interno ao criar fornecedor.' });
  }
};

// put> atualizar um fornecedor existente. parte 4
exports.atualizarfornecedor = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nome, email, contato } = req.body;
    const fornecedoratualizado = await prisma.supplier.update({
      where: { id: parseInt(id) },
      data: { nome, email, contato },
    });
    res.status(200).json(fornecedoratualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete> deletar um fornecedor. parte 5
exports.deletarfornecedor = async (req, res) => {
  try {
    const { id } = req.params; 
    const fornecedordeletado = await prisma.supplier.delete({ where: { id: parseInt(id) } });
    res.status(200).json(fornecedordeletado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};