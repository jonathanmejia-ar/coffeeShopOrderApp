const itemsController = {}
const Item = require('./item.model');
const createError = require('http-errors')

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res, next) => {
    try {
        const { name, price, itemID } = req.body;
        const newItem = new Item({ name, price, itemID });
        await newItem.save();
        return res.status(201).json({ message: 'Item Created' });
    }
    catch (err) {
        next(err);
    }
}

itemsController.getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        return res.status(200).send(items);
    } catch (err) {
        next(err);
    }
}

module.exports = itemsController;