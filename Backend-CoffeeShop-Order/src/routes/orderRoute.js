const express = require('express');
const router = express.Router();

//Models 
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

router.get('/', (req, res) => {
    res.send('Orders API');
});

router.post('/newOrder', async (req, res) => {

    const { orderNo, customerID, customerName, paymentMethod, totalAmount } = req.body;
    let orderItemArray = req.body.OrderItem;

    const newOrder = new Order({ orderNo, customerID, customerName, paymentMethod, totalAmount });
    await newOrder.save();

    for (let item of orderItemArray) {

        const { itemID, quantity, itemName, price, total } = item;
        const newOrderItem = new OrderItem({ itemID, itemName, quantity, orderID: newOrder._id, price, total });
        await newOrderItem.save();

    }
    res.status(201).send({ status: 'New Order' })
});

router.get('/getOrder/:id', async (req, res) => {

    const orderID = req.params.id;
    let order = await Order.findById(orderID, { createdAt: false, updatedAt: false });
    let items = await OrderItem.find({ orderID: orderID }, { _id: true, itemID: true, itemName: true, quantity: true, orderID: true, price: true, total: true });
    res.status(200).send({ order: order, orderItems: items });

});

router.get('/orderList', async (req, res) => {

    await Order.find().then(data => res.status(200).send(data)).catch(err => res.status(404).send({ error: err }));

});

router.put('/updateOrder/:id', async (req, res) => {

    let orderItemArray = req.body.OrderItem;
    let updateID = req.params.id;

    await Order.findById(req.params.id)
    let edit = {
        orderNo: req.body.orderNo,
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
    res.status(200).send({ status: 'Order Updated' });

});

router.delete('/deleteOrder/:id', async (req, res) => {

    const orderID = req.params.id;
    await Order.findByIdAndDelete(orderID)
    await OrderItem.deleteMany({ orderID: orderID })
    res.status(200).send({ status: 'Order Deleted' });

});

module.exports = router;