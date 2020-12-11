const express = require('express');
const router = express.Router();

//Model Schema
const Item = require('../models/item');

//routes
router.get('/', (req, res) => res.send('item route'));

router.post('/newItem', async (req, res) => {
    const { name, price, itemID } = req.body;
    const newItem = new Item({ name, price, itemID });
    await newItem.save();
    console.log(newItem);
    res.status(201).send({ status: 'Item Created!' })

});

router.get('/itemList', async (req, res) => {
    await Item.find().then(data => res.status(200).send(data)).catch(err => res.status(404).send(err));
});

module.exports = router;