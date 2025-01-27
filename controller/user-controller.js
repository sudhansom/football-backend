const HttpError = require('../models/http-error.js')


const users = [
    {
        id: 1,
        name: "Bal Krishna",
        age: "45",
        address: "United Kingdom"
    },
    {
        id: 2,
        name: "Sudhan Krishna",
        age: "42",
        address: "Danmark"
    },
    {
        id: 3,
        name: "Resham Krishna",
        age: "40",
        address: "Kathmandu"
    },
    {
        id: 4,
        name: "Birendra Kumar",
        age: "40",
        address: "Pokhara"
    },
]

const getUserById = (req, res, next)=> {
    const userId = req.params.uid;
    const user = users.find(u => u.id == userId);
    if(!user){
        // return res.status(404).json({message: "user not found!!"})
        throw new HttpError("User not found", 404)
    }
    res.json({user}) ;
}

exports.getUserById = getUserById;