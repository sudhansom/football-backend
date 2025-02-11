const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    day: {type: String, required: true},
    slot: {type: String, required: true},
    serial: {type: Number, required: true},
    participate:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
})

module.exports = mongoose.model('Schedule', scheduleSchema);