const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const priceSchema = new Schema({
    price: {type: Number, required: true},
    times: {type: Number, required: true},
    serial: {type: Number, required: true}
})

module.exports = mongoose.model('Price', priceSchema);