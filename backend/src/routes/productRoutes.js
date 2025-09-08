// Quinta rota. 
const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/productCtrl');


router.get('/produtos', productCtrl.listarprodutos); //funciona
router.get('/produtos/:id', productCtrl.buscarprodutoporid); //funciona
router.post('/produtos', productCtrl.criarproduto); //funciona
router.put('/produtos/:id', productCtrl.atualizarproduto); //funciona
router.delete('/produtos/:id', productCtrl.deletarproduto); //funciona


module.exports = router;