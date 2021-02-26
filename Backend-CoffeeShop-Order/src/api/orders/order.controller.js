
const orderController = {};
const createError = require('http-errors');
const Order = require('./order.model');
const OrderItem = require('../orderItems/orderItem.model');


orderController.home = (req, res) => res.status(200).send('Orders API');

orderController.createOrder = async (req, res, next) => {
    try {
        if (!req.body.orderNumber || !req.body.customerID || !req.body.customerName || !req.body.paymentMethod || !req.body.totalAmount || !req.body.OrderItem) {
            throw new createError.BadRequest('Something is missing');
        }
        const { orderNumber, customerID, customerName, paymentMethod, totalAmount } = req.body;
        const orderItemArray = req.body.OrderItem;
        if (!orderItemArray) throw new createError(400, 'Order Items is required');
        const newOrder = new Order({ orderNumber, customerID, customerName, paymentMethod, totalAmount });
        await newOrder.save();
        for (let item of orderItemArray) {
            const { itemID, quantity, itemName, price, total } = item;
            const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: newOrder._id, price, total });
            await newOrderItem.save();
        }
        return res.status(201).json({ message: 'Order Created' });
    }
    catch (err) {
        next(err);
    }
};

orderController.getOrder = async (req, res, next) => {
    try {
        const orderID = req.params.id;
        if (!orderID) throw new createError(400, 'Order Id is required');
        const order = await Order.findById(orderID, { createdAt: false, updatedAt: false });
        if (!order) throw new createError(404, 'Order not found');
        const items = await OrderItem.find({ orderID: orderID }, { _id: true, itemID: true, itemName: true, quantity: true, orderID: true, price: true, total: true });
        return res.status(200).json({ order: order, orderItems: items });
    } catch (err) {
        next(err);
    }
};

orderController.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        return res.status(200).send(orders);
    } catch (err) {
        next(err);
    }
};

orderController.updateOrder = async (req, res, next) => {
    try {
        const orderItemArray = req.body.OrderItem;
        if (!orderItemArray) throw new createError(400, 'Order Items is required');
        const updateID = req.params.id;
        let edit = {
            orderNumber: req.body.orderNumber,
            customerID: req.body.customerID,
            customerName: req.body.customerName,
            paymentMethod: req.body.paymentMethod,
            totalAmount: req.body.totalAmount
        }
        const orderUpdated = await Order.findByIdAndUpdate(updateID, { $set: edit }, { new: true });
        if (!orderUpdated) throw new createError(404, 'Order not found');
        await OrderItem.deleteMany({ orderID: updateID });
        for (let item of orderItemArray) {
            const { itemID, quantity, itemName, price, total } = item;
            const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: updateID, price, total });
            await newOrderItem.save();
        }
        return res.status(200).json({ message: 'Order Updated' });
    } catch (err) {
        next(err);
    }
};

orderController.deleteOrder = async (req, res, next) => {
    try {
        const orderID = req.params.id;
        if (!orderID) throw new createError(400, 'Order Id is required');
        const order = await Order.findByIdAndDelete(orderID);
        if (!order) throw new createError(404, 'Order not found');
        await OrderItem.deleteMany({ orderID: orderID });
        return res.status(200).json({ message: 'Order Deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = orderController;
