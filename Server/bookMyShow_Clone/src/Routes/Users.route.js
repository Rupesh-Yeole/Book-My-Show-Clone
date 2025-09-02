const { LoginUser, RegisterUser, ForgotPassword, ResetPassword } = require("../Controller/Users.Controller.js");

const initialiseUserRoutes = (app)=>{
    app.post("/users/login", LoginUser);
    app.post("/users/registerUser", RegisterUser);
    app.post("/users/forgotPassword", ForgotPassword);
    app.post("/users/resetPassword", ResetPassword)
}

module.exports = initialiseUserRoutes;