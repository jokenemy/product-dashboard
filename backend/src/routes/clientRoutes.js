// Quarta rota. 
const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/clientCtrl');


router.get('/clientes', clientCtrl.listarclientes); //funciona
router.get('/clientes/:id', clientCtrl.buscarclienteporid); //funciona
router.post('/clientes', clientCtrl.criarcliente); //funciona
router.put('/clientes/:id', clientCtrl.atualizarcliente); //funciona
router.delete('/clientes/:id', clientCtrl.deletarcliente); //funciona


module.exports = router;