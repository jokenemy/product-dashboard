// Quinta rota. 
const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/orderCtrl');


router.get('/pedidos', orderCtrl.listarpedidos); //funciona
router.get('/pedidos/:id', orderCtrl.buscarpedidoporid); //funciona
router.post('/pedidos', orderCtrl.criarpedido); //funciona
router.put('/pedidos/:id', orderCtrl.atualizarpedido); //funciona
router.delete('/pedidos/:id', orderCtrl.deletarpedido); //funciona


module.exports = router;