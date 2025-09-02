const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Users.model")

const verifyToken = (req,res,next)=>{

    const token = req.headers['accesstoken'];
    if (!token){
        return res.status(403).send({success:false, message:"JWT token is not passed"});
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, payload) =>{
        if (err){
            return res.status(403).send({success:false, message:"You are not authenticated user to see all the movies"})
        }
        
        const UserId = payload.userid;
        try{
            const userDetails = await UserModel.findById(UserId);
            req.userDetails = userDetails;
            next();
        }catch(err){
            return res.status(500).send({success:false, message:"Internal Server Error"});
        }

    });
}

const verifyAdmin = (req,res,next) =>{

    const user = req.userDetails;

    if (!user || user.role !== 'Admin') {
        return res.status(403).send({
            success: false,
            message: "You are not authorized to insert movies into the database"
        });
    }

    next();
}

const verifyAdminAndPartner = (req,res,next) =>{
    const user = req.userDetails;

    if (!user || (user.role !== 'Admin' && user.role !== 'Partner')) {
        return res.status(403).send({
            success: false,
            message: "You are not authorized to insert movies into the database"
        });
    }

    next();
}

module.exports= {verifyToken,verifyAdmin, verifyAdminAndPartner}