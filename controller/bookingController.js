const Booking = require("../model/bookingModel")
const Notification = require("../model/notificationModel")
const Room = require("../model/roomModel")
const User = require("../model/userModel")
const nodemailer = require("nodemailer")

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
    getBookingOfUser: function(req, res) {
        Booking.find({user: req.query._id}).populate('user').populate('inviters').populate('room').exec((err, booking) => {
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
                Room.findById(result.room, function (err, room) {
                    if (err) throw err;
                    User.findById(result.user, function(err, user) {
                        if (err) throw err;
                        let Noti = new Notification({
                            create_at: new Date(),
                            status: 0,
                            type: 0,
                            message: "<u>"+user.name+"</u>" + " created booking room " + room.name +"<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime,
                            idBooking: result._id,
                            idReceiver: room.manager
                        })
                        Noti.save(function (err, rs) {
                            if (err) throw err;
                            console.log(rs)
                        });
                        
                        let transporter = nodemailer.createTransport({
                            host: "smtp.ethereal.email",
                            port: 587,
                            secure: false,
                            auth: { 
                                user: 'haichanbo11@gmail.com',
                                pass: 'haichanbo'
                            }
                        })
                        let info = transporter.sendMail({
                            from: 'haichanbo11@gmail.com',
                            to: "nhuvanduy97@gmail.com",
                            subject: "Test",
                            text: "aaaa",
                            html: "<b>Hello</b>"
                        });
                        console.log(info.messageId)
                    })
                })
            } else {
                return res.json({
                    success: false
                })
            }
        })

    }
}