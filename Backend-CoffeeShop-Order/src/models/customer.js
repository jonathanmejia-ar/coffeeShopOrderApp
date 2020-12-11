const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: String

}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Customer', customerSchema);
