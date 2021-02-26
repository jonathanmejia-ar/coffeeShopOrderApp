const express = require('express');
const router = express.Router();

const ordersController = require('./order.controller');

router.get('/', ordersController.home);
router.post('/', ordersController.createOrder);
router.get('/:id', ordersController.getOrder);
router.get('/', ordersController.getOrders);
router.put('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
