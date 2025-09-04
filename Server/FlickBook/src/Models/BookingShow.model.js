const mongoose = require("mongoose");

const BookShowSchema = mongoose.Schema({

    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ShowSchema",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    seats:{
        type:Array,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    }
})

const BookingModel = mongoose.model("BookingShow" , BookShowSchema);

module.exports = BookingModel;