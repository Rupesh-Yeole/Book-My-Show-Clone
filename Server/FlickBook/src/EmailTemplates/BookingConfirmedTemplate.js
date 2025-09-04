const BookingConfirmedTemplate = (userDetails, showDetails, bookingDetails,seats ) =>{

    const subject = `✅ Booking Confirmed – ${bookingDetails._id}`

    const body = `
        <html>
            <head>
            </head>

            <body style="font-family: Arial, sans-serif; color: #000;">
                <p>Hi ${userDetails.name},</p>

                <p>Great news! 🎉 Your booking has been <b>successfully confirmed</b>.<br/>
                <b>For Movie:</b> ${showDetails.movie.name}</p>

                <p><b>Booking Details:</b></p>
                <p>Booking ID: ${bookingDetails._id}<br/>
                Date: ${showDetails.showDate.toISOString().split("T")[0]}<br/>
                Time: ${showDetails.showTime}<br/>
                Venue: ${showDetails.theater.name}<br/>
                Seat Number: ${seats} </p>

                <p>Please keep this confirmation email for your records. You may need the booking ID when checking in or contacting support.<br/> If you have any questions, feel free to reach out to our support team.</p>

                <p>Thank you for booking with <b>FlickBook.com</b>. We look forward to serving you!</p>

                <p>Thank you,<br/>
                FlickBook.com Team</p>
            </body>
        </html>
    ` 

    return {subject, body}
}

module.exports = {BookingConfirmedTemplate}