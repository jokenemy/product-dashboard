// primeiro controle. referente aos clientes que irão manipular o backend
const prisma = require('../utils/database');


// get> listar todos os clientes. parte 1
exports.listarclientes = async (req, res) => {
  try {
    const todosclientes = await prisma.client.findMany();
    res.status(200).json(todosclientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get> buscar cliente por id. parte 2
exports.buscarclienteporid = async (req, res) => {
  try {
    const { id } = req.params; 
    const cliente = await prisma.client.findUnique({
      where: { id: parseInt(id) }, 
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ error: 'cliente nao encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post> criar um novo cliente. parte 3
exports.criarcliente = async (req, res) => {
  try {
    const {nome, idade, sexo, email, contato} = req.body;
    
    const novoclientecriado = await prisma.client.create({
      data: {
        nome: nome,
        idade: idade,
        sexo: sexo,
        email : email,
        contato : contato
      }
    });
    let msg = `o cliente ${nome} foi cadastrado com sucesso!`;
    console.log(msg);
    res.status(201).json(novoclientecriado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// put> atualizar um cliente existente. parte 4
exports.atualizarcliente = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nome, idade, sexo, email, contato } = req.body;
    const clienteatualizado = await prisma.client.update({
      where: { id: parseInt(id) }, 
      data: { nome, idade, sexo, email, contato },
    });
    let msg = `o cliente ${nome} foi atualizado com sucesso!`;
    console.log(msg);
    res.status(200).json(clienteatualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete> deletar um cliente. parte 5
exports.deletarcliente = async (req, res) => {
  try {
    const { id } = req.params; 
    const clientedeletado = await prisma.client.delete({
      where: { id: parseInt(id) }, 
    });
    let msg = `o cliente de id ${id} foi deletado com sucesso!`;
    console.log(msg);
    res.status(200).json(clientedeletado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

