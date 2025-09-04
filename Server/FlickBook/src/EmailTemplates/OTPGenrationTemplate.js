const OTPGenerationTemplate = (userDetails, otp) =>{

    const subject = "🔒 Password Reset Request – Your OTP Code"

    const body = `
        <html>
            <head>
            </head>

            <body style="font-family: Arial, sans-serif; color: #000;">
                <p>Hi ${userDetails.name},</p>

                <p>We received a request to reset the password for your account.</p>
                <p>Please use the following One-Time Password (OTP) to complete the reset process:</p>

                <p><b>Your OTP: ${otp}</b></p>
                <p>⚠️ This OTP is valid for the next 2 minutes.</p>   

                <p>If you did not request a password reset, please ignore this email.</p>     

                <p>Thank you,<br/>
                FlickBook.com</p>
            </body>
        </html>
    ` 

    return {subject, body}
}

module.exports = {OTPGenerationTemplate}