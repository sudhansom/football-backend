const HttpError = require('../models/http-error.js');
const uuid = require('uuid');


const Price = require('../models/price.js')

const getPrices = async (req, res, next)=> {
    let allPrices = [];
    try{
        allPrices = await Price.find()
    }catch(err){
        const error = new HttpError(err, 5000)
        return next(error)
    }
    res.json(allPrices.map(user => user.toObject({getters:true}))) ;
}

const createPrice = async (req, res, next)=> {
    const { price, times, serial } = req.body;
    const newPrice = new Price({
        id:uuid.v4(),
        price,
        times,
        serial
    })
    try{
        await newPrice.save();
    }catch(err){
        const error = new HttpError(err, 500)
        return next(error)
    }
    res.json({newPrice: newPrice.toObject({getters:true})}) ;
}

exports.getPrices = getPrices;
exports.createPrice = createPrice;

