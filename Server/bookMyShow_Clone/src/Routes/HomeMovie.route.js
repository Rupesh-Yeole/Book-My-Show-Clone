const { getAllMovies, insertMovies, getMovieDetails } = require("../Controller/HomeMovie.Controller");
const { verifyToken, verifyAdmin } = require("../Middlewares/auth.middlewares");

const initialiseHomeRoutes = (app) =>{
    app.get("/homeMovies",[verifyToken], getAllMovies);
    app.get("/homeMovies/:id",[verifyToken], getMovieDetails);
    app.post("/homeMovies",[verifyToken,verifyAdmin], insertMovies);
}

module.exports = initialiseHomeRoutes;