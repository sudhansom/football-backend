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

exports.getSchedules = getSchedules;

const createSchedule = async (req, res, next)=> {
    const { day, slot, serial } = req.body;
    const schedule = new Schedule({
        id: uuid.v4(),
        day,
        slot,
        serial
    })
    try{
        await schedule.save();
    }catch(err){
        const error = new HttpError(err, 5000)
        return next(error)
    }
    res.json({schedule: schedule.toObject({getters:true})}) ;
}

exports.getSchedules = getSchedules;
exports.createSchedule = createSchedule;