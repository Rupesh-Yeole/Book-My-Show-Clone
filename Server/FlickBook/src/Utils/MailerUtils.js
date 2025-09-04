const nodemailer = require("nodemailer");

const sendEmail = async(recipientEmail, subject, htmlContent)=>{
    const recipientEmailStr = recipientEmail.join(", ");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AUTH_MAILER_USER,
            pass: process.env.AUTH_MAILER_PASSWORD,
        },
    });

    const mailDetails = {
        from: process.env.AUTH_MAILER_USER, 
        to: recipientEmailStr, 
        subject:subject, 
        html: htmlContent
    }

    try{
        const info = await transporter.sendMail(mailDetails);
        console.log("Email sent Successfully", info);

    }catch(err){
        console.log("Unable to send Mail", err);
    }
}

module.exports = {
    sendEmail
}