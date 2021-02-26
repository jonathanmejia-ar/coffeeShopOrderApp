const express = require('express');
const router = express.Router();

const itemsController = require('./item.controller');

router.post('/', itemsController.createItem);
router.get('/', itemsController.getItems);

module.exports = router;