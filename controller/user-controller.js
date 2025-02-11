const HttpError = require('../models/http-error.js');
const uuid = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const User = require('../models/user.js')
 

const loginUser = async (req, res, next)=> {
    if(req.method==='OPTIONS'){
        return next();
    }
    const { email, password } = req.body;
    let user = null;
    try{
        user = await User.findOne({ email });
    }catch(err){
        const error = new HttpError("error on find user", 404);
        return next(error);
    }
    if(!user){
        return next(new HttpError("user does not exist", 404))
    }
     // Compare hashed password with user input
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
        const error = new HttpError("Invalid password", 401);
        return next(error);
     }

    const result = {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
        schedule: user.schedule
    }
    const token = jwt.sign({ userId: user.id, userRole:user.role }, "your-top-secret-key", { expiresIn: "1h" });
    console.log('Created token: ', token);

    res.json({ result,token });
}

const getAllUsers = async (req, res, next)=> {
    let allUsers = [];
    try{
        allUsers = await User.find().select('-password');
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
        user = await User.findById(userId).select('-password');
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
    const {name, address, dob, role, password, email} = req.body;
    const url = 'https://football-backend-dbpassword.up.railway.app/';//req.protocol + "://" + req.get('host');

    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.json({message: "not a valid name"})
    }
    const [day, month, year] = dob.split('-');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
        id: uuid.v4(),
        name,
        dob: new Date(),
        imagePath: url + '/images/' + req.file.filename,
        address,
        role,
        email,
        password: hashedPassword,
        updated: new Date(),
        weight: 0,
        height: 0,
        joined:new Date(),
        skills: [],
        specific: [],
        payments: {
            jan:"",
            feb:"",
            mar:"",
            apr:"",
            may:"",
            jun:"",
            jul:"",
            aug:"",
            sep:"",
            oct:"",
            nov:"",
            dec:"",
        },

    })
    try{
        await user.save();
    }catch(err){
        console.log(err);
        return next(new HttpError('not saved.', 500))
    }
    return res.json({message: 'saved successfully'});
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

const editSchedule = async(req, res, next) => {
    const { schedule } = req.body;
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
    user.schedule = schedule;
    try{
        user = await user.save();
    }catch(err){
        const error = new HttpError("Could not save height weight and weight", 500)
        return next(error)
    }
    res.json({message: "Successfully saved.", user: user.toObject({getters: true})})
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
exports.loginUser = loginUser;
exports.editSchedule = editSchedule;