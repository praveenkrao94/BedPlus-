const mongoose = require('mongoose')

const placeSchemea = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId , ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkIn:Number,
    checkOut:Number,
    maxGuest:Number
});

const PlaceModel = mongoose.model('Place',placeSchemea)

module.exports = PlaceModel




  