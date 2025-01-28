const HttpError = require('../models/http-error.js');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const User = require('../models/user.js')

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

const getAllUsers = async (req, res, next)=> {
    let allUsers = [];
    try{
        allUsers = await User.find()
    }catch(err){
        const error = new HttpError(err, 5000)
        return next(error)
    }
    res.json(allUsers.map(user => user.toObject({getters:true}))) ;
}

const getUserById = async (req, res, next)=> {
    const userId = req.params.id;
    let user = null;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError("user not found", 404);
        return next(error);
    }
    if(!user){
        // return res.status(404).json({message: "user not found!!"})
        throw new HttpError("User not found", 404)
    }
    res.json(user.toObject({getters: true})) ;
}

const createUser = async (req, res, next)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.json({message: "not a valid name"})
    }
    const { name, age, address } = req.body;
    const user = new User({
        id: uuid.v4(),
        name,
        age,
        address
    })
    await user.save()
    return res.json(user.toObject({getters: true}));
}

const updateUser = async (req, res, next) => {
    const {name, age, address} = req.body;
    const userId = req.params.id;
    let user = null;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError("Unknown error", 500)
        return next(error)
    }
    if(!user){
        const error = new HttpError("No such user...", 404);
        return next(error);
    }
    user.name = name;
    user.age=age;
    user.address = address;
    try{
        await user.save();
    }catch(error){
        throw new HttpError("Error on Saving...", 500)
    }
    return res.status(222).json(user.toObject({getters: true}))
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