const customers = require('../api/customers/customer.routes');
const items = require('../api/items/item.routes');
const orderItems = require('../api/orderItems/orderItem.routes');
const orders = require('../api/orders/order.routes');
const express = require('express');
const router = express.Router();

// /* Home page*/

router.get('/', (req, res) => res.send('Welcome to Coffee Shop Order API'));
router.use('/customers', customers);
router.use('/items', items);
router.use('/orderItems', orderItems);
router.use('/orders', orders);

module.exports = router;