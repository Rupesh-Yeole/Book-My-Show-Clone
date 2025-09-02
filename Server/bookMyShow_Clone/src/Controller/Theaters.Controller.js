const TheaterModel = require('../Models/Theatre.model');

const insertTheaters = async(req, res) =>{

    req.body.theaterOwner = req.userDetails._id;
    try{
        
        const newTheater = new TheaterModel(req.body);
        const dbResponse = await newTheater.save();

        if (dbResponse != null){
            return res.status(201).send({
                success:true,
                message:"Theater Created Succesfully",
                data:dbResponse
            });
        }
    }catch(err){
        return res.status(500).send({success:false, message:"Internal system error"});
    }
}

const fetchAllTheaters = async(req, res) =>{
    try{
        const allTheaterDetails = await TheaterModel.find({}).populate("theaterOwner");
        return res.status(200).send({
            success:true,
            message:"Theater Details fetched successfully",
            data:allTheaterDetails
        });
    }catch(err){
        return res.status(500).send({success:false, message:"Internal system error",err:err.message});
    }
}

module.exports = {
    fetchAllTheaters,
    insertTheaters
}