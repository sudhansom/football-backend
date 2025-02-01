const HttpError = require('../models/http-error.js');
const uuid = require('uuid');


const Message = require('../models/message.js')

const getMessages = async (req, res, next)=> {
    let allMessages = [];
    try{
        allMessages = await Message.find()
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json(allMessages.map(message => message.toObject({getters:true}))) ;
}

const createMessage = async (req, res, next)=> {
    let activeMessage;
    try{
        activeMessage = await Message.findOne({active:true})
        if(activeMessage){
            activeMessage.active = false;
            await activeMessage.save()
        }
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }

    const message = new Message({
        message: req.body.message,
        active: true
    })

    try{
        await message.save()
    }catch(err){
        return next(new HttpError('Could not save message'))
    }
    
    res.json({message: message.toObject({getters:true})}) ;
}

exports.getMessages = getMessages;
exports.createMessage = createMessage;

