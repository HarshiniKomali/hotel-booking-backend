const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");

const Schema=mongoose.Schema;



//Creating Hotel Schema

const hotelSchema= new Schema({

    "name":{
        type:String,
        required:[true,'Hotel Name is required.']
    },
    "star":{
        type:Number,
        required:[true,'Star Type is required.']
    },
    "rooms":[
        {"availableDates":{type:Date},"singleRoomCount":{type:Number},"doubleRoomCount":{type:Number},"suiteRoomCount":{type:Number}
    }],
    "prices":{
        "singleRoom":{type:Number},"doubleRoom":{type:Number},"suiteRoom":{type:Number}
    },
    "amenities":{
        "breakFast":{type:String},"swimmingPool":{type:String},"jacuzzi":{type:String},"gym":{type:String},"ac":{type:String}
    },
    "address":{
        type:String,
        required:[true,'Address is required.']
    },
    "city":{
        type:String,
        required:[true,'City is required.']
    },
    date:{type:Date},
    "state":{
        type:String,
        required:[true,'State is required.']
    },
    "country":{
        type:String,
        required:[true,'Country is required']
    },
    "zipcode":{
        type:String,
    },
    "contact":{
        type:String
    },
   
});

const Hotel=mongoose.model('Hotel',hotelSchema);
module.exports=Hotel;



