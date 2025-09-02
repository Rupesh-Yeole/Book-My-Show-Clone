const { verifyAdminAndPartner, verifyToken } = require("../Middlewares/auth.middlewares");
const { createShows, fetchAllTheShows, getShowById , getTheatersAndShowsByMovieId} = require("../Controller/Shows.Controller");


const initialiseShowRoutes = (app)=>{
    app.post('/shows', [verifyToken, verifyAdminAndPartner], createShows);
    app.get('/shows', [verifyToken], fetchAllTheShows);
    app.get('/shows/:id', [verifyToken], getShowById);
    app.get('/shows/movies/:movieId', [verifyToken], getTheatersAndShowsByMovieId);
}

module.exports = initialiseShowRoutes;