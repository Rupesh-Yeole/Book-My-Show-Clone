const { verifyToken,verifyAdminAndPartner } = require("../Middlewares/auth.middlewares");
const {insertTheaters, fetchAllTheaters} = require("../Controller/Theaters.Controller");

const initialiseTheaterRoutes = (app)=>{
    app.post('/theaters',[verifyToken,verifyAdminAndPartner], insertTheaters);
    app.get('/theaters',[verifyToken], fetchAllTheaters);
}

module.exports = initialiseTheaterRoutes;