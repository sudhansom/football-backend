const HttpError = require('../models/http-error.js');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

let users = [
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
    const userId = req.params.id;
    const user = users.find(u => u.id == userId);
    if(!user){
        // return res.status(404).json({message: "user not found!!"})
        throw new HttpError("User not found", 404)
    }
    res.json({user}) ;
}

const createUser = (req, res, next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.json({message: "not a valid name"})
    }
    const { name, age, address } = req.body;
    const user = {
        id: uuid.v4(),
        name,
        age,
        address
    }
    users.push(user);
    return res.json(user);
}

const updateUser = (req, res, next) => {
    const {name, age} = req.body;

    const userId = req.params.id;
    const user = users.find(u => u.id == userId);
    if(!user){
        throw new HttpError("No such user...", 404);
    }
    const position = users.findIndex(u => u.id == userId);
    user.age = age;
    user.name = name;
    users[position] = user;
    return res.status(222).json({users})

}

const deleteUser = (req, res, next) => {
    const userId = req.params.id;
    users = users.filter(u => u.id != userId)
    return res.status(200).json({message: 'deleted successfully', users})

}

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;