const Booking = require("../model/bookingModel")
const Notification = require("../model/notificationModel")


module.exports = {
    getAllBooking: function (req, res) {
        Booking.find().populate('user').populate('inviters').populate('room').exec((err, booking) => {
            if (err) throw err;
            res.json({
                success: true,
                booking: booking
            })
        })
    },
    reserveRoom: function (req, res) {
        let data = req.body
        let newBooking = new Booking({
            title: data.title,
            room: data.room,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            note: data.note,
            status: 0,
            inviters: data.inviters,
            user: req.decoded.data._id
        })
        newBooking.save(function (err, result) {
            if (result) {
                res.json({
                    success: true
                })
                console.log("result", result)
                let Noti = new Notification({
                    create_at: new Date(),
                    status: 0,
                    type: 0,
                    idBooking: result._id
                })
                Noti.save(function(err, rs){
                    if (err) throw err;
                    console.log(rs)
                })
            } else {
                return res.json({
                    success: false
                })
            }
        })

    }
}