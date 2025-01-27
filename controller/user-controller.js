const HttpError = require('../models/http-error.js');
const uuid = require('uuid')

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

const getAllUsers = (req, res, next)=> {
    
    res.json({users}) ;
}

const getUserById = (req, res, next)=> {
    const userId = req.params.uid;
    const user = users.find(u => u.id == userId);
    if(!user){
        // return res.status(404).json({message: "user not found!!"})
        throw new HttpError("User not found", 404)
    }
    res.json({user}) ;
}

const createUser = (req, res, next)=>{
    const { name, age, address } = req.body;
    const user = {
        id: uuid.v4(),
        name,
        age,
        address
    }
    return res.json(user);
}

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;