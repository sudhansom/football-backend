const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    active: {type: Boolean, required: true},
    message: {type: String, required: true},
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Message', messageSchema);