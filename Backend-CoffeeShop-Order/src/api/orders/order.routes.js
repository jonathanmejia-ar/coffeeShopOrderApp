const express = require('express');
const router = express.Router();

const ordersController = require('./order.controller');

router.get('/', ordersController.home);
router.post('/createOrder', ordersController.createOrder);
router.get('/getOrder/:id', ordersController.getOrder);
router.get('/getOrders', ordersController.getOrders);
router.put('/updateOrder/:id', ordersController.updateOrder);
router.delete('/deleteOrder/:id', ordersController.deleteOrder);

module.exports = router;
