const express = require('express');
const router = express.Router();

const customersController = require('./customer.controller');

//Routes
router.get('/', customersController.getCustomers);

module.exports = router;