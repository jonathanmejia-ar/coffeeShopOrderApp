
const orderController = {};
const createError = require('http-errors');
const Order = require('./order.model');
const OrderItem = require('../orderItems/orderItem.model');


orderController.home = (req, res) => res.status(200).send('Orders API');

orderController.createOrder = async (req, res, next) => {
    try {
        if (!req.body.orderNumber || !req.body.customerID || !req.body.customerName || !req.body.paymentMethod || !req.body.totalAmount || !req.body.OrderItem) {
            throw new createError.BadRequest('Client Bad Request');
        }
        const { orderNumber, customerID, customerName, paymentMethod, totalAmount } = req.body;
        let orderItemArray = req.body.OrderItem;
        if (!orderItemArray) throw new createError(404, 'Order Items not found');
        const newOrder = new Order({ orderNumber, customerID, customerName, paymentMethod, totalAmount });
        await newOrder.save();
        for (let item of orderItemArray) {
            const { itemID, quantity, itemName, price, total } = item;
            const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: newOrder._id, price, total });
            await newOrderItem.save();
        }
        return res.status(201).send('Order Created');
    }
    catch (err) {
        next(err);
    }
};

orderController.getOrder = async (req, res) => {
    const orderID = req.params.id;
    if (!orderID) throw new createError.BadRequest('Client Bad Request');
    let order = await Order.findById(orderID, { createdAt: false, updatedAt: false });
    if (!order) throw new createError(404, 'Order not found');
    let items = await OrderItem.find({ orderID: orderID }, { _id: true, itemID: true, itemName: true, quantity: true, orderID: true, price: true, total: true });
    if (!items) throw new createError(404, 'Items not found');
    return res.status(200).send({ order: order, orderItems: items });
};

orderController.getOrders = async (req, res) => {
    const orders = await Order.find();
    if (!orders) new createError(404, 'Orders not found');
    return res.status(200).send(orders);
};

orderController.updateOrder = async (req, res, next) => {
    try {
        let orderItemArray = req.body.OrderItem;
        let updateID = req.params.id;
        await Order.findById(req.params.id);
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
            await newOrderItem.save();
        }
        return res.status(200).send('Order Updated');
    } catch (err) {
        next(err);
    }
};

orderController.deleteOrder = async (req, res) => {
    const orderID = req.params.id;
    if (!orderID) throw new createError.BadRequest('Client Bad Request');
    let order = await Order.findByIdAndDelete(orderID);
    if (!order) throw new createError(404, 'Order not found');
    let orderItem = await OrderItem.deleteMany({ orderID: orderID });
    if (!orderItem) throw new createError(404, 'Order Item not found');
    return res.status(200).send('Order Deleted');
};

module.exports = orderController;
