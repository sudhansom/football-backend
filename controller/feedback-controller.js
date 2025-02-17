const HttpError = require('../models/http-error.js');
const uuid = require('uuid');

const Feedback = require('../models/feedback.js')

const getFeedbacks = async (req, res, next)=> {
    let allFeedbacks = [];
    try{
        allFeedbacks = await Feedback.find()
    }catch(err){
        const error = new HttpError(err, 5000)
        return next(error)
    }
    res.json(allFeedbacks.map(user => user.toObject({getters:true}))) ;
}

const createFeedback = async (req, res, next)=> {
    const { message, user } = req.body;
    const newFeedback = new Feedback({
        id:uuid.v4(),
        flag:false,
        message,
        user
    })
    try{
        await newFeedback.save();
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json({newFeedback: newFeedback.toObject({getters:true})}) ;
}

const updateFeedback = async(req, res, next) => {
    const {flag} = req.body;
    const id = req.params.id;
    let targetedFeedback;
    try{
        targetedFeedback = await Feedback.findById(id);
    }catch(err){
        const error = new HttpError("Unknown error", 500)
        return next(error)
    }
    if(!targetedFeedback){
        const error = new HttpError("No such user...", 404);
        return next(error);
    }
    targetedFeedback.flag = flag;
    try{
        await targetedFeedback.save();
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json(targetedFeedback)
}

const deleteFeedback = async(req, res, next) => {
    const id = req.params.id;
    let targetedFeedback;
    try{
        targetedFeedback = await Feedback.findById(id);
    }catch(err){
        const error = new HttpError("Unknown error", 500)
        return next(error)
    }
    if(!targetedFeedback){
        const error = new HttpError("No such Feedback...", 404);
        return next(error);
    }
    try{
        await targetedFeedback.deleteOne();
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json({message: "Successfully deleted feedback."})
}

exports.getFeedbacks = getFeedbacks;
exports.createFeedback = createFeedback;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;