const mongoose = require('mongoose');

const TheaterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    theaterOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:true
    }
})

const TheaterModel = mongoose.model("TheaterModel", TheaterSchema);
module.exports = TheaterModel;