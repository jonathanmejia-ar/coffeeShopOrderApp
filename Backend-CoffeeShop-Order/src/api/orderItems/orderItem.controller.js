const orderItemController = {};
const OrderItem = require('./orderItem.model');

orderItemController.home = (req, res) => res.status(200).send('Order Items API');

module.exports = orderItemController;