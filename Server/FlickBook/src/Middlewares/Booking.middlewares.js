const { default: mongoose } = require("mongoose");
const ShowModel = require("../Models/Show.model")

const validateAndCreateBookingRequest = async(req,res,next) =>{
    const {show, seats, transactionId} = req.body;

    if (!mongoose.Types.ObjectId.isValid(show)){
        return res.status(400).send({
            success:false,
            message:"Show Id is in invalid format"
        })
    }

    try{
        const showDetails = await ShowModel.findById(show);


        if (!showDetails){
            return res.status(400).send({
                success:false,
                message:"Show Id is not availabel"
            }) 
        }

        const bookedSeats = showDetails.bookedSeats;

        seats.forEach((seat) =>{
            if (bookedSeats.includes(seat)){
                return res.status(400).send({success:false, message:"seats which you are tying to book is already booked"});
            }
        })

        next();

    }catch(err){
        console.log(err);
        return res.status(500).send({success:false, message:"Internal System Error",err:err.message});
    }
}

module.exports = {
    validateAndCreateBookingRequest
}