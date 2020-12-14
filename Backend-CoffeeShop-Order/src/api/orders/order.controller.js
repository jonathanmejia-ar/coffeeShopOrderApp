
const orderController = {};
const createError = require('http-errors');
const Order = require('./order.model');
const OrderItem = require('../orderItems/orderItem.model');


orderController.home = (req, res) => res.status(200).send('Orders API');

orderController.createOrder = async (req, res) => {
    try {
        if (!req.body.orderNumber || !req.body.customerID || !req.body.customerName || !req.body.paymentMethod || !req.body.totalAmount) {
            throw new createError.BadRequest('Client Bad Request');
        }
        const { orderNumber, customerID, customerName, paymentMethod, totalAmount } = req.body;
        let orderItemArray = req.body.OrderItem;
        if (!orderItemArray) throw new createError(400, 'Order Items not found');
        const newOrder = new Order({ orderNumber, customerID, customerName, paymentMethod, totalAmount });
        await newOrder.save((err) => {
            if (err) throw new createError(500, 'Order not saved');
        });
        for (let item of orderItemArray) {
            const { itemID, quantity, itemName, price, total } = item;
            const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: newOrder._id, price, total });
            await newOrderItem.save((err) => {
                if (err) throw new createError(500, 'Order Item not saved');
            });
        }
        res.status(201).send({ msg: 'Order Created' })
    }
    catch (err) {
        next(err);
    }
};

orderController.getOrder = async (req, res) => {
    try {
        const orderID = req.params.id;
        let order = await Order.findById(orderID, { createdAt: false, updatedAt: false });
        if (!order) throw new createError(400, 'Order not found');
        let items = await OrderItem.find({ orderID: orderID }, { _id: true, itemID: true, itemName: true, quantity: true, orderID: true, price: true, total: true });
        if (!items) throw new createError(400, 'Items not found');
        res.status(200).send({ order: order, orderItems: items });
    }
    catch (err) {
        next(err);
    }
};

orderController.getOrders = async (req, res) => {
    try {
        await Order.find()
            .then(data => res.status(200).send(data))
            .catch(err => res.status(404).send({ error: err }));
    } catch (err) {
        next();
    }
};

orderController.updateOrder = async (req, res) => {
    try {
        let orderItemArray = req.body.OrderItem;
        let updateID = req.params.id;

        await Order.findById(req.params.id)
        let edit = {
            orderNumber: req.body.orderNumber,
            customerID: req.body.customerID,
            customerName: req.body.customerName,
            paymentMethod: req.body.paymentMethod,
            totalAmount: req.body.totalAmount
        }
        await Order.findByIdAndUpdate(updateID, { $set: edit }, { new: true });
        await OrderItem.deleteMany({ orderID: updateID });
        for (let item of orderItemArray) {
            const { itemID, quantity, itemName, price, total } = item;
            const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: updateID, price, total });
            await newOrderItem.save((err) => {
                if (err) throw new createError(500, 'Order not saved')
            });
        }
        res.status(200).send({ msg: 'Order Updated' });
    } catch (err) {
        next(err);
    }
};

orderController.deleteOrder = async (req, res) => {
    try {
        const orderID = req.params.id;
        if (!orderID) throw new createError.BadRequest('Client Bad Request');
        let order = await Order.findByIdAndDelete(orderID);
        if (!order) throw new createError(400, 'Order not found');
        let orderItem = await OrderItem.deleteMany({ orderID: orderID });
        if (!orderItem) throw new createError(400, 'Order Item not found');
        res.status(200).send({ msg: 'Order Deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = orderController;
