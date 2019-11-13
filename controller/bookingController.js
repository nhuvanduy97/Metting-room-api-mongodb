const Booking = require("../model/bookingModel")


module.exports = {
    getAllBooking: function (req, res) {
        Booking.find().exec((err, booking) => {
            if(err) throw err;
            res.json({
                success: true,
                booking: booking
            })
        })
    }
}