const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true},
    address: {type: String},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    imagePath: {type: String, required: true},
    role: {type: String, required: true},
    schedule: {
        count: {type: Number},
        going: {type: String}
    },
    joined: { type: Date, required: true},
    dob: { type: Date, required: true},
    updated: { type: Date},
    weight: {type: Number},
    height: {type: Number},
    skills: [],
    specific: [],
    payments: {
        jan:{ type: String },
        feb:{ type: String },
        mar:{ type: String },
        apr:{ type: String },
        may:{ type: String },
        jun:{ type: String },
        jul:{ type: String },
        aug:{ type: String },
        sep:{ type: String },
        oct:{ type: String },
        nov:{ type: String },
        dec:{ type: String },
    },

})

module.exports = mongoose.model('User', userSchema);