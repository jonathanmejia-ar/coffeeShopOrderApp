const itemsController = {}
const Item = require('./item.model');
const createError = require('http-errors')

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res, next) => {
    try {
        const { name, price, itemID } = req.body;
        const newItem = new Item({ name, price, itemID });
        const itemSavedErr = await newItem.save().catch(err => err);
        if (itemSavedErr) throw new createError(500, 'Item not saved');
        res.status(201).send({ msg: 'Item Created' });
    }
    catch (err) {
        next(err);
    }
}

itemsController.getItems = (req, res) => {
    Item.find()
        .then(data => res.status(200).send(data))
        .catch(err => createError(404, 'Items not found'));
}

module.exports = itemsController;