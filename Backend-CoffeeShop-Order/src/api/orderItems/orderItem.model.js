const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    orderID: { type: String, required: true },
    itemID: { type: String, required: true },
    itemName: { type: String, required: true },
    quantity: { type: Number, required: [true, 'A quantity is required.'] },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
