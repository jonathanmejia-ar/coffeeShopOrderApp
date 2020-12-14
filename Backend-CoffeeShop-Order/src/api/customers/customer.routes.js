const express = require('express');
const router = express.Router();

const customersController = require('./customer.controller');

//Routes
router.get('/', customersController.home);
router.get('/getCustomers', customersController.getCustomers);

module.exports = router;