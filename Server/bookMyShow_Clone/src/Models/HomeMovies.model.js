const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    genre:{
        type:[String],
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    poster:{
        type:String,
        required:true
    }
})

const HomeMovieModel = mongoose.model("MovieSchema", MovieSchema);

module.exports = HomeMovieModel;