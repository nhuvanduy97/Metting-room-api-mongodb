const Notification = require("../model/notificationModel")
const Booking = require("../model/bookingModel")

module.exports = {
    getNotification: function(req, res) {
        Notification.find().populate('idBooking').populate('room.manager').exec((err, result) => {
            if (err) throw err;
            if(result){
                res.json({
                    message: true,
                    notification: result
                })
            }
        })
    }
}