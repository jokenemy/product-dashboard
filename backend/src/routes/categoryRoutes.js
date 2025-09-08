// Primeira rota. Referente as categorias que irão manipular o backend
const express = require('express');
const router = express.Router();
const categoryCtrl = require('../controllers/categoryCtrl');


router.get('/categorias', categoryCtrl.listarcategorias); //funciona
router.get('/categorias/:id', categoryCtrl.buscarcategoriasporid); //funciona
router.post('/categorias', categoryCtrl.criarcategorias); //funciona
router.put('/categorias/:id', categoryCtrl.atualizarcategorias); //funciona
router.delete('/categorias/:id', categoryCtrl.deletarcategoria); //funciona


module.exports = router;