const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: Number,
    customerID: String,
    customerName: String,
    paymentMethod: String,
    totalAmount: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Order', orderSchema);
