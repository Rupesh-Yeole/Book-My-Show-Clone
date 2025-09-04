const { makePayment, createBooking } = require("../Controller/BookingShow.Controller");
const {verifyToken } = require("../Middlewares/auth.middlewares");
const { validateAndCreateBookingRequest } = require("../Middlewares/Booking.middlewares");

const intialiseBookingShow = (app)=>{
    app.post("/payments", [verifyToken], makePayment);
    app.post("/bookings", [verifyToken, validateAndCreateBookingRequest], createBooking);
}

module.exports = intialiseBookingShow;