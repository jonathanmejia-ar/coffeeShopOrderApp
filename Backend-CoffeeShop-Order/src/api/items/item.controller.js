const itemsController = {}
const Item = require('./item.model');
const createError = require('http-errors')

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res, next) => {
    try {
        const { name, price, itemID } = req.body;
        const newItem = new Item({ name, price, itemID });
        await newItem.save();
        return res.status(201).send('Item Created');
    }
    catch (err) {
        next(err);
    }
}

itemsController.getItems = async (req, res) => {
    const items = await Item.find();
    if (!items) createError(404, 'Items not found');
    return res.status(200).send(items);
}

module.exports = itemsController;