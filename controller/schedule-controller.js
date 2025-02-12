const HttpError = require('../models/http-error.js');
const uuid = require('uuid');


const Schedule = require('../models/schedule.js')

const getSchedules = async (req, res, next)=> {
    let allSchedules = [];
    try{
        allSchedules = await Schedule.find()
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json(allSchedules.map(sch => sch.toObject({getters:true}))) ;
}

const createSchedule = async (req, res, next)=> {
    const { day, slot, serial } = req.body;
    const schedule = new Schedule({
        id: uuid.v4(),
        day,
        slot,
        serial,
        participate:[]
    })
    try{
        await schedule.save();
    }catch(err){
        const error = new HttpError(err, 5000)
        return next(error)
    }
    res.json({schedule: schedule.toObject({getters:true})}) ;
}

const updateParticipate = async (req, res, next)=> {
    const id = req.params.id;
    const { userId, going } = req.body;
    let targetedSchedule;
    try{
        targetedSchedule = await Schedule.findById(id);
    }catch(err){
        const error = new HttpError("Unknown error", 500);
        return next(error)
    }
    if(!targetedSchedule){
        return new HttpError("No such schedule", 404);
    }
    if(going){
        if(!targetedSchedule.participate.includes(userId)){
            targetedSchedule.participate.push(userId);
        }
    }else {
        targetedSchedule.participate = targetedSchedule.participate.filter(user => user != userId);
    }
    await targetedSchedule.save();
    res.json({targetedSchedule: targetedSchedule.toObject({getters:true})}) ;
}

exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;
exports.updateParticipate = updateParticipate;