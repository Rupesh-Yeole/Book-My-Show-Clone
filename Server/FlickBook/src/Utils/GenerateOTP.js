function generateOTP() {
    return Math.floor(Math.random()*90000)+100000
}

module.exports = {
    generateOTP
}