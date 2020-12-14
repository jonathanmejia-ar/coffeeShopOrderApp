const express = require('express');
const router = express.Router();

const itemsController = require('./item.controller');


router.get('/', itemsController.home);
router.post('/createItem', itemsController.createItem);
router.get('/getItems', itemsController.getItems);

module.exports = router;