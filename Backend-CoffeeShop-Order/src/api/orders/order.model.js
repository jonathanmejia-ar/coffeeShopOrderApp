const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderNumber: { type: Number, required: true },
    customerID: { type: String, required: true },
    customerName: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalAmount: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Order', orderSchema);
