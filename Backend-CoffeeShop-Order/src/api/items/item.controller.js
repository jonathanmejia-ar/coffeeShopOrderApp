const itemsController = {}
const Item = require('./item.model');
const createError = require('http-errors')

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res, next) => {
    try {
        const { name, price, itemID } = req.body;
        const newItem = new Item({ name, price, itemID });
        const itemSaved = await newItem.save();
        if (!itemSaved) throw new createError(500, 'Item not saved');
        res.status(201).send('Item Created');
    }
    catch (err) {
        next(err);
    }
}

itemsController.getItems = async (req, res) => {
    const items = await Item.find();
    if (!items) createError(404, 'Items not found');
    res.status(200).send(items);
}

module.exports = itemsController;