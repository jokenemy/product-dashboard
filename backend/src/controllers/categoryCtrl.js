// segundo controle. referente as categorias que irão manipular o backend
const prisma = require('../utils/database');


// get> listar todos as categorias. parte 1
exports.listarcategorias = async (req, res) => {
  try {
    const todascategorias = await prisma.category.findMany();
    res.status(200).json(todascategorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get> buscar categorias por id. parte 2
exports.buscarcategoriasporid = async (req, res) => {
  try {
    const { id } = req.params; 
    const categorias = await prisma.category.findUnique({
      where: { id: parseInt(id) }, 
    });
    if (categorias) {
      res.status(200).json(categorias);
    } else {
      res.status(404).json({ error: 'categoria não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// post> criar uma nova categoria. parte 3
exports.criarcategorias = async (req, res) => {
  try {
    const {nome, tamanho, sexo} = req.body;
    
    const novacategoriacriada = await prisma.category.create({
      data: {
        nome: nome,
        tamanho: tamanho,
        sexo: sexo
      }
    });
    let msg = `A categoria ${nome} foi cadastrada com sucesso!`;
    console.log(msg);
    res.status(201).json(novacategoriacriada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// put> atualizar uma categorias existente. parte 4
exports.atualizarcategorias = async (req, res) => {
  try {
    const { id } = req.params; 
    const { nome, tamanho, sexo } = req.body;
    const categoriaatualizada = await prisma.category.update({
      where: { id: parseInt(id) }, 
      data: { nome, tamanho, sexo },
    });
    let msg = `A categoria ${nome} foi atualizada com sucesso!`;
    console.log(msg);
    res.status(200).json(categoriaatualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete> deletar uma categoria. parte 5
exports.deletarcategoria = async (req, res) => {
  try {
    const { id } = req.params; 
    const categoriadeletada = await prisma.category.delete({
      where: { id: parseInt(id) }, 
    });
    let msg = `A categoria de id ${id} foi deletada com sucesso!`;
    console.log(msg);
    res.status(200).json(categoriadeletada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

