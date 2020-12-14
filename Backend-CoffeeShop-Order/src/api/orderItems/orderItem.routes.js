const express = require('express');
const router = express.Router();

const orderItemsController = require('./orderItem.controller');

router.get('/', orderItemsController.home);

module.exports = router;

