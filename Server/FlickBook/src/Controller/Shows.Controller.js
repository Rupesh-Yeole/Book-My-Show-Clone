const mongoose = require('mongoose');
const ShowModel = require('../Models/Show.model');
const TheaterModel = require('../Models/Theatre.model');
const MovieModel = require('../Models/HomeMovies.model');


const createShows = async(req,res)=>{

    const {theater, movie} = req.body;
    try{

        const theaterObj = await TheaterModel.findById(theater);

        if (!mongoose.Types.ObjectId.isValid(theaterObj)){
            return res.status(400).send({
                success:false,
                message:"Theater Id passed is invalid"
            })
        }

        const movieObj = await MovieModel.findById(movie);

        if (!mongoose.Types.ObjectId.isValid(movieObj)){
            return res.status(400).send({
                success:false,
                message:"Movie Id paased in invalid"
            })
        }

        const newShow = new ShowModel(req.body);
        const response = await newShow.save();

        if (response != null){
            return res.status(201).send({
                success:true,
                message:"Show Created Successfully",
                data:response
            })
        }
    }catch(err){
        return res.status(500).send({success:false, message:"Internal system Error", err:err.message});
    }
}

const fetchAllTheShows = async(req, res)=>{
    try{
        const allShows = await ShowModel.find({}).populate('movie').populate('theater');
        return res.status(200).send({
            success:true, 
            message:"All the shows fetched succcessfully",
            data:allShows
        });

    }catch(err){
        return res.status(500).send({success:false, message:"Internal system Error", err:err.message});
    }
}

const getShowById = async(req,res) =>{
    try{
        const showId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(showId)){
            return res.status(400).send({
                success:false,
                message:"Invalid Show Id passed"
            })
        }

        const showDetails = await ShowModel.findById(showId).populate('movie').populate('theater');

        if (!showDetails){
            return res.status(400).send({
                success:false,
                message:`Show Id ${showId} doest not exist in the system!`
            })
        }

        return res.status(200).send({
            success:true,
            message:"Show Details fetched successfully",
            data:showDetails
        })
        
    }catch(err){
        return res.status(500).send({success:false, message:"Internal system error", err:err.message});
    }
}

const getTheatersAndShowsByMovieId = async(req,res)=>{
    try{
        const MovieId = req.params.movieId;
        const showDate = req.query.showDate;


        if (!mongoose.Types.ObjectId.isValid(MovieId)){
            return res.status(400).send({
                success:false,
                message:"Movie Id format passed is invalid"
            })
        }

        const movieObj = await MovieModel.findById(MovieId);

        if (movieObj == null){
            return res.status(400).send({
                success:false,
                message:"Movie Id is not valid"
            })
        }

        const allShows = await ShowModel.find({movie:MovieId /*,showDate:showDate*/}).populate('movie').populate('theater');


        let showsByTheaterId = {};

        allShows.forEach((show)=>{

            const theaterId= show.theater._id;

            if(!showsByTheaterId[theaterId]){
                showsByTheaterId[theaterId] = [];
            }

            showsByTheaterId[theaterId].push(show);

        })

        return res.status(200).send({
            success:true,
            data:showsByTheaterId
        })


    }catch(err){
        return res.status(500).send({success:false, message:"Internal system error", err:err.message});
    }
}

module.exports = {
    createShows,
    fetchAllTheShows,
    getShowById,
    getTheatersAndShowsByMovieId
}