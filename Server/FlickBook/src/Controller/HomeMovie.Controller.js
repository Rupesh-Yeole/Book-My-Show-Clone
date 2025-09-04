const HomeMovieModel = require("../Models/HomeMovies.model")
const mongoose = require("mongoose");

const getAllMovies = async(req,res)=>{
    try{

        const allMovies = await HomeMovieModel.find({});

        return res.status(200).send({
            success:true,
            message:"All movies fetched successfully",
            data:allMovies
        })

    }catch(err){
        return res.status(500).send({message:"Internal System Error.."});
    }
}

const insertMovies = async(req,res) =>{
    try{
        const {name, poster} = req.body;
        const existingMovie = await HomeMovieModel.findOne({name: { $regex: new RegExp(`^${name}$`, 'i') } });

        if (existingMovie){
            return res.status(400).send({
                success:false,
                message:"This movie is already present in the database"
            });
        }

        const newMovie = new HomeMovieModel(req.body);
        const dbResponse = await newMovie.save();

        if (dbResponse != null) {
            res.status(201).send({
                success:true,
                message:"Movie inserted Successfully into the Database",
                data:dbResponse
            });
        }

    }catch(err){
        return res.status(500).send({success:false, message:"Internal System Error..",err});
    }
}

const getMovieDetails = async(req,res) =>{

    try{
        console.log(req.params.id);
        const MovieId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(MovieId)){
            return res.status(400).send({
                success:false,
                message:"MovieId format is Invalid"
            })
        }

        const movieDetails = await HomeMovieModel.findById(MovieId);
        if(!movieDetails){
            return res.status(400).send({
                success:false, message:`MovieId ${MovieId} details is not exist in our system`
            })
        }
        
        return res.status(200).send({
            success:true,
            message:"Movie details fetched Succesfully",
            data:movieDetails
        })

    }catch(err){
        return res.status(500).send({message:"Internal System Error.."});
    }
}

module.exports = {
    getAllMovies, insertMovies, getMovieDetails
}