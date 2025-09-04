const express = require("express");
const mongoose = require("mongoose");
const initialiseUserRoutes = require("./src/Routes/Users.route");
const bodyParser = require("body-parser");
const cors = require("cors");
const initialiseHomeRoutes = require("./src/Routes/HomeMovie.route");
const initialiseTheaterRoutes =require("./src/Routes/Theater.route");
const initialiseShowRoutes = require("./src/Routes/Show.route");
const intialiseBookingShow = require("./src/Routes/BookingShow.route");
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');


require('dotenv').config();

const app = express();

//connection to the database of mongoDB atlas
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("connected to DB Successfully")
})
.catch((err)=>{
    console.log(err);
})

//middlewares 
app.use(bodyParser.json());
app.use(cors());

/* //Liiting a rate for DoS attack
const limiter = rateLimiter({
    windowMs : 15 * 1000,
    max: 5,
    message: "Too many request..!, please try again after sometime"
}) */

/* app.use(limiter);
 */app.use(helmet());


initialiseUserRoutes(app);
initialiseHomeRoutes(app);
initialiseTheaterRoutes(app);
initialiseShowRoutes(app);
intialiseBookingShow(app);


const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
