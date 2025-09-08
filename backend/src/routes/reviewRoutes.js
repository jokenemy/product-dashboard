const express = require('express');
const router = express.Router();
const reviewCtrl = require('../controllers/reviewCtrl');

router.get('/avaliacoes', reviewCtrl.listaravaliacoes);
router.get('/avaliacoes/:id', reviewCtrl.buscaravaliacaoporid);
router.post('/avaliacoes', reviewCtrl.criaravaliacao);
router.put('/avaliacoes/:id', reviewCtrl.atualizaravaliacao);
router.delete('/avaliacoes/:id', reviewCtrl.deletaravaliacao);

module.exports = router;
