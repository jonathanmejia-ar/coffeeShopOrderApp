const itemsController = {}
const Item = require('./item.model');

itemsController.home = (req, res) => res.status(200).send('Items API');

itemsController.createItem = async (req, res) => {
    const { name, price, itemID } = req.body;
    const newItem = new Item({ name, price, itemID });
    await newItem.save((err) => {
        if (err) throw new Error('Item not saved')
    });
    console.log(newItem);
    res.status(201).send({ status: 'Item Created' })
}

itemsController.getItems = async (req, res) => {
    await Item.find()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send(`Item not found, error: ${err}`));
}

module.exports = itemsController;