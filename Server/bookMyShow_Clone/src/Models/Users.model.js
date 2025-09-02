const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['Admin','Partner', 'User'],
        default:'User'
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    }
})

const UserModel = mongoose.model("UserModel", UsersSchema);

module.exports = UserModel;