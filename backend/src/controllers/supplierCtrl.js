// primeiro controle. referente aos fornecedores que irão manipular o backend
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
    const fornecedor = await prisma.supplier.findUnique({
      where: { id: parseInt(id) }, 
    });
    if (fornecedor) {
      res.status(200).json(fornecedor);
    } else {
      res.status(404).json({ error: 'fornecedor nao encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post> criar um novo fornecedor. parte 3
exports.criarfornecedor = async (req, res) => {
  try {
    const {nome, email, contato} = req.body;
    
    const novofornecedorcriado = await prisma.supplier.create({
      data: {
        nome : nome,   
        email : email, 
        contato : contato
      }
    });
    let msg = `o fornecedor ${nome} foi cadastrado com sucesso!`;
    console.log(msg);
    res.status(201).json(novofornecedorcriado);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    let msg = `o fornecedor ${nome} foi atualizado com sucesso!`;
    console.log(msg);
    res.status(200).json(fornecedoratualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete> deletar um fornecedor. parte 5
exports.deletarfornecedor = async (req, res) => {
  try {
    const { id } = req.params; 
    const fornecedordeletado = await prisma.supplier.delete({
      where: { id: parseInt(id) }, 
    });
    let msg = `o fornecedor de id ${id} foi deletado com sucesso!`;
    console.log(msg);
    res.status(200).json(fornecedordeletado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

