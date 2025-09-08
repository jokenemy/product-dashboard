// Terceira rota.
const express = require('express');
const router = express.Router();
const supplierCtrl = require('../controllers/supplierCtrl');


router.get('/fornecedores', supplierCtrl.listarfornecedores); //funciona
router.get('/fornecedores/:id', supplierCtrl.buscarfornecedorporid); //funciona
router.post('/fornecedores', supplierCtrl.criarfornecedor); //funciona
router.put('/fornecedores/:id', supplierCtrl.atualizarfornecedor); //funciona
router.delete('/fornecedores/:id', supplierCtrl.deletarfornecedor); //funciona


module.exports = router;