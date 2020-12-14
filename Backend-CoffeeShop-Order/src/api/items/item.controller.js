const itemsController = {}
const Item = require('./item.model');
const createError = require('http-errors')

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res) => {
    try {
        const { name, price, itemID } = req.body;
        const newItem = new Item({ name, price, itemID });
        await newItem.save((err) => {
            if (err) throw new createError(500, 'Item not saved')
        });
        res.status(201).send({ msg: 'Item Created' })
    }
    catch (err) {
        next(err);
    }
}

itemsController.getItems = async (req, res) => {
    await Item.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send(`Item not found, error: ${err}`));
}

module.exports = itemsController;