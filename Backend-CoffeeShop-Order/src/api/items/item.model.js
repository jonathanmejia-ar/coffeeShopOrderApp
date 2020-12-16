const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    itemID: Number

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Item', itemSchema);
