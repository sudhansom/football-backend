const HttpError = require('../models/http-error.js');
const uuid = require('uuid');
const { validationResult } = require('express-validator');

const User = require('../models/user.js')

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
        return next(new HttpError("User not found", 404))
    }
    res.json(user.toObject({getters: true})) ;
}

const createUser = async (req, res, next)=>{
    const {name, address, dob, role} = req.body;
    const user = {
        name,
        address,
        dob,
        role
    }
    // const result = validationResult(req);
    // if(!result.isEmpty()){
    //     return res.json({message: "not a valid name"})
    // }
    // const { name, dob, address, email, password, role } = req.body;
    // const [day, month, year] = dob.split('/');
    
    // const user = new User({
    //     id: uuid.v4(),
    //     name,
    //     dob: new Date(`${year}-${month}-${day}`),
    //     address,
    //     role,
    //     email,
    //     password,
    //     updated: null,
    //     weight: 0,
    //     height: 0,
    //     joined:new Date(),
    //     skills: [],
    //     specific: [],
    //     payments: {
    //         jan:"",
    //         feb:"",
    //         mar:"",
    //         apr:"",
    //         may:"",
    //         jun:"",
    //         jul:"",
    //         aug:"",
    //         sep:"",
    //         oct:"",
    //         nov:"",
    //         dec:"",
    //     },

    // })
    // try{
    //     await user.save();
    // }catch(err){
    //     console.log(err);
    //     return next(new HttpError('not saved.', 400))
    // }
    // return res.json(user.toObject({getters: true}));
    return res.json({message: 'saved successfully', user});
}

const editPayments = async(req, res, next) => {
    const {month, value} = req.body;
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
    user.payments[month] = value;
    try{
        user = await user.save();
    }catch(err){
        const error = new HttpError("Could not save...", 500)
        return next(error)
    }
    res.json({message: "Successfully saved."})
}

const editMeasures = async(req, res, next) => {
    const {height, weight} = req.body;
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
    user.height = height;
    user.weight = weight;
    user.updated = new Date();
    try{
        user = await user.save();
    }catch(err){
        const error = new HttpError("Could not save height weight and weight", 500)
        return next(error)
    }
    res.json({message: "Successfully saved.", user: user.toObject({getters: true})})
}

const editSkills = async(req, res, next) => {
    const {skill, index} = req.body;
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
    if(index!=null){
        user.skills[index] = skill;
    }else {
        user.skills.push(skill)
    }

    try{
        user = await user.save();
    }catch(err){
        const error = new HttpError("Could not save skill", 500)
        return next(error)
    }
    res.json({message: "Successfully saved skill.", user: user.toObject({getters: true})})
}

const deleteSkill = async(req, res, next) => {
    const {index} = req.body;
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
    user.skills.splice(index, 1)

    try{
        user = await user.save();
    }catch(err){
        const error = new HttpError("Could not save skill", 500)
        return next(error)
    }
    res.json({message: "Successfully saved skill.", user: user.toObject({getters: true})})
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
        return next(new HttpError("Error on Saving...", 500));
    }
    return res.status(222).json(user.toObject({getters: true}))
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.id;
    let user = null;
    try{
        user = await User.findById(userId);
    }catch(error){
        return next(new HttpError(' something went wrong...1', 400));
    }
    if(!user){
        return next(new HttpError(' no such user...', 500));
    }
    try{
        await user.deleteOne();
    }catch(error){
        console.log(error);
        return next(new HttpError('something went wrong...', 400)); 
    }
    res.json({message: "Successfully deleted..."})
}

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.editPayments = editPayments;
exports.editMeasures = editMeasures;
exports.editSkills = editSkills;
exports.deleteSkill = deleteSkill;