const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    price: Number,
    itemID: Number

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Item', itemSchema);
