const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    orderID: String,
    itemID: String,
    itemName: String,
    quantity: Number,
    price: Number,
    total: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
