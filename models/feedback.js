const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    flag: {type: Boolean},
    message: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Feedback', feedbackSchema);