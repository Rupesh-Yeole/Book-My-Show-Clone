require('dotenv').config()

const { BookingConfirmedTemplate } = require("../EmailTemplates/BookingConfirmedTemplate.js");
const BookingModel = require("../Models/BookingShow.model");
const ShowModel = require("../Models/Show.model");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { sendEmail } = require("../Utils/MailerUtils.js");


const makePayment = async(req,res) =>{
    const {token, amount} = req.body;

    console.log(token, amount);

    //create a new stripe customer 
    const customer = await stripe.customers.create({
        email:req.userDetails.email,
        source:token
    });

    //create the payment intent 
    const paymentIntent = await stripe.paymentIntents.create({
        customer:customer.id,
        amount:amount,
        currency:'usd',
        payment_method_types:['card']
    })

    console.log(paymentIntent);


    return res.status(200).send({
        success:true,
        message:"Payment successful",
        transactionId:paymentIntent.id
    })
}

const createBooking = async(req, res) =>{
    const {show, seats, transactionId} = req.body;

    const userId = req.userDetails._id;

    try{
        const newBooking = new BookingModel({show, user:userId, seats, transactionId});
        const newBookingResponse = await newBooking.save();

        const showDetails = await ShowModel.findById(show).populate("movie").populate("theater");

        const updatedSeats = [...showDetails.bookedSeats, ...seats];

        await ShowModel.findByIdAndUpdate(show, {
            bookedSeats:updatedSeats
        });

        //trigger an email , booking is successfully created 
        const {subject, body} = BookingConfirmedTemplate(req.userDetails, showDetails, newBookingResponse, seats);
        sendEmail([req.userDetails.email], subject,body);

        return res.status(201).send({success:true, message:`Booking successfully created with ${newBookingResponse._id}`, data:newBookingResponse});

    }catch(err){
        console.log(err);
        return res.status(500).send("Internal system error");
    }
}

module.exports = {
    makePayment,
    createBooking
}