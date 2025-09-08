// primeiro controle. referente aos usuarios que irão manipular o backend
const prisma = require('../utils/database');


// get> listar todos os usuarios. parte 1
exports.listarusuarios = async (req, res) => {
  try {
    const todosusuarios = await prisma.user.findMany();
    res.status(200).json(todosusuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get> buscar usuario por id. parte 2
exports.buscarusuarioporid = async (req, res) => {
  try {
    const { id } = req.params; 
    const usuario = await prisma.user.findUnique({
      where: { id: parseInt(id) }, 
    });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'usuario nao encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post> criar um novo usuario. parte 3
exports.criarusuario = async (req, res) => {
  try {
    const {nome, idade, salario} = req.body;
    
    const novousuariocriado = await prisma.user.create({
      data: {
        nome: nome,
        idade: idade,
        salario: salario
      }
    });
    let msg = `o usuario ${nome} foi cadastrado com sucesso!`;
    console.log(msg);
    res.status(201).json(novousuariocriado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// put> atualizar um usuario existente. parte 4
exports.atualizarusuario = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nome, idade, salario } = req.body;
    const usuarioatualizado = await prisma.user.update({
      where: { id: parseInt(id) }, 
      data: { nome, idade, salario },
    });
    let msg = `o usuario ${nome} foi atualizado com sucesso!`;
    console.log(msg);
    res.status(200).json(usuarioatualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete> deletar um usuario. parte 5
exports.deletarusuario = async (req, res) => {
  try {
    const { id } = req.params; 
    const usuariodeletado = await prisma.user.delete({
      where: { id: parseInt(id) }, 
    });
    let msg = `o usuario de id ${id} foi deletado com sucesso!`;
    console.log(msg);
    res.status(200).json(usuariodeletado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

