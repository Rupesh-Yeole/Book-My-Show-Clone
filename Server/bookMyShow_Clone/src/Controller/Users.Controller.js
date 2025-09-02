const UserModel = require("../Models/Users.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../Utils/GenerateOTP.js");
const { sendEmail } = require("../Utils/MailerUtils.js");
const { OTPGenerationTemplate } = require("../EmailTemplates/OTPGenrationTemplate.js");


const LoginUser = async(req,res) =>{

    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).send({success:false, message:"Missing required fields to login User!"});
    }

    try{
        const existingUser = await UserModel.findOne({email:email});

        if (!existingUser){
            return res.status(400).send({success:false, message:"User with this email doesn't exist in our system!"});
        }

        const hashedCorrectPassword = existingUser.password;
        const isPasswordValid = bcrypt.compareSync(password, hashedCorrectPassword);

        if (isPasswordValid){
            //jwt token create
            const accessToken = jwt.sign({userid: existingUser._id}, process.env.JWT_SECRET_KEY, { expiresIn:'1h' });

            return res.status(200).send({success:true, message:"User is logged in succesfully!", accessToken:accessToken});
        }

       
            
        return res.status(400).send({success:false, message:"sorry!, You have entered wrong password!"});
        

    }catch(err){
        return res.status(500).send({success:false, message:"Internal system Error!"});
    }
}

const RegisterUser = async (req, res)=>{
    
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.status(400).send({success:false, message: "Missing required fields to register User!"});
    }
    
    try{
        const existingUserEmail = await UserModel.findOne({email:email});
        if (existingUserEmail){
            return res.status(400).send({success:false, message: "User with this email is already Exist!"});
        }

        const hashedPassword = bcrypt.hashSync(password, 7);
        req.body.password = hashedPassword;

        const newUser = new UserModel(req.body);

        await newUser.save();
        return res.status(201).send({success:true, message: "User is registerd sucessfully.. Please Login to continue!"});
    }
    catch(err){
        return res.status(500).send({success:false, message:"Internal server Error!"});
    }
}

const ForgotPassword = async(req, res) =>{
    const {email} = req.body

    const User = await UserModel.findOne({email:email});

    if (User === null){
        return res.status(404).send({
            success:false,
            message:`${email} Email you have entered doesn't exist in our system!`
        })
    }

    //generate OTP
    const OTP = generateOTP();

    //Trigger an email after successfully generated an OTP
    const {subject, body} = OTPGenerationTemplate(User, OTP)
    sendEmail([email], subject, body);

    //Provide generated OTP to the user emailId
    User.otp = OTP;
    User.otpExpiry = Date.now() *2*60+1000 ;

    await User.save();


    //sent response the user OTP sent successfully
    return res.status(200).send({
        success:true,
        message:`OTP sent successfully to email: ${email}`
    })
}   

const ResetPassword = async(req, res) =>{
    const {OTP, New_password} = req.body;
    try{
        const user = await UserModel.findOne({otp:OTP})

        if (!user){
            return res.status(400).send({
                success:false,
                message:"OTP is incorrect"
            })
        }

        if (Date.now() > user.otpExpiry){
            return res.status(400).send({
                success:false,
                message:"OTP has been expired!"
            })
        }

        const newHashedPassword = bcrypt.hashSync(New_password, 7);

        user.otp = null;
        user.otpExpiry = null;
        user.password = newHashedPassword;

        await user.save();

        return res.status(200).send({success:true, message:"Password has been reset successfully!"})

    }catch(err){
        return res.status(500).send({success:false, message:"Iternal system error",});
    }
}

module.exports = {
    RegisterUser,
    LoginUser, 
    ForgotPassword,
    ResetPassword
}