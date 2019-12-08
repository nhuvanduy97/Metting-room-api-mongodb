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

    findBooking: function (req, res) {
        let query = {
            room: req.query.room,
            date: req.query.date,
    
        }
        Booking.find(query).exec((err, result) => {
            if(err) throw err;
            res.json({
                message: true,
                result: result
            })
        })
        
    },
    updateBooking: function (req, res) {
        Booking.findByIdAndUpdate(req.body._id, {
            $set: {
                status: 1
            },
        }, {upsert: true} ,function(err, result){
            if (err) throw err;
            if (result){
                res.json({
                    message: true
                })
                Room.findById(result.room, function (err, room) {
                    if (err) throw err;
                    User.findById(result.user, function(err, user) {
                        if (err) throw err;
                        let Noti = new Notification({
                            create_at: new Date(),
                            status: 0,
                            type: 0,
                            message: "<u>"+ room.name+ "</u>" + " is accepted. Please invited members" + "<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime,
                            idBooking: result._id,
                            idReceiver: user._id
                        })
                        Noti.save(function (err, rs) {
                            if (err) throw err;
                            console.log(rs)
                        });
                    })
                })
            }
        })
    },
    reserveRoom: function (req, res) {
        let data = req.body;
        let newBooking = new Booking({
            title: data.title,
            room: data.room,
            date: data.date,
            startTime: data.startTime,
            endTime: data.endTime,
            note: data.note,
            status: 0,
            inviters: data.inviters,
            user: req.decoded.data._id,
            members: data.members
        })
        newBooking.save(function (err, result) {
            if (err) throw err;
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
                            message: "<u>"+ user.name + "</u>" + "is created booking room " + room.name +"<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime,
                            idBooking: result._id,
                            idReceiver: room.manager
                        })
                        Noti.save(function (err, rs) {
                            if (err) throw err;
                        });
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