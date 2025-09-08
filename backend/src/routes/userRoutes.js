// Primeira rota. Referente aos usuarios que irão manipular o backend
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');


router.get('/usuarios', userCtrl.listarusuarios); //funciona
router.get('/usuarios/:id', userCtrl.buscarusuarioporid); //funciona
router.post('/usuarios', userCtrl.criarusuario); //funciona
router.put('/usuarios/:id', userCtrl.atualizarusuario); //funciona
router.delete('/usuarios/:id', userCtrl.deletarusuario); //funciona


module.exports = router;