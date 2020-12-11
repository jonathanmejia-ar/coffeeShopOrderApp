const express = require('express');
const router = express.Router();

const OrderItem = require('../models/orderItem');


router.get('/', (req, res) => {
    res.send('Order Item API');
});



module.exports = router;