const mongoose = require('mongoose');

const ShowSchema = mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'MovieSchema',
        required:true
    },
    theater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TheaterModel',
        required:true
    },
    showDate:{
        type:Date,
        required:true
    },
    showTime:{
        type:String,
        required:true
    },
    totalSeats:{
        type:Number,
        required:true
    },
    ticketPrice:{
        type:Number,
        required:true,
        default:500,
    },
    bookedSeats:{
        type:Array,
        default:[]
    }
})

const ShowModel = mongoose.model("ShowSchema", ShowSchema);

module.exports = ShowModel;