const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    priority: {type: Number},
    message: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Feedback', feedbackSchema);