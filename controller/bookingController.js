const Booking = require("../model/bookingModel")
const Notification = require("../model/notificationModel")
const Room = require("../model/roomModel")
const User = require("../model/userModel")
const Permison = require("../model/permisonModel")
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
    findBookingById: function( req, res) {
        Booking.findById({_id: req.query._id}).exec((err, booking) => {
            if(err) throw err;
            res.json({
                success: true,
                booking
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
    deleteBooking: function(req, res){
        console.log(req)
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
    invitedMember: function (req, res) {
        Booking.findByIdAndUpdate(req.body._id, {
            $set: {
                members: req.body.members
            }
        }, {upsert: true}, function(err , result){
            if (err) throw err
            if (result) {
                res.json({
                    message: true
                });
            }
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
                            message: "<u>"+ room.name+ "</u> " + " is accepted. Please invited members" + "<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime,
                            idBooking: result._id,
                            idReceiver: user._id
                        })
                        Noti.save(function (err, rs) {
                            if (err) throw err;
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
                // permisson invited
                if (result.inviters){
                    for(let i=0;i<result.inviters.length;i++){
                        User.findByIdAndUpdate(result.inviters[i], {
                            $set: {
                                isInviter: 1
                            }
                        }, {upsert: true}, function(err, res) {
                            if (err) throw err;
                            if (res) {
                                let newPermison = new Permison({
                                    idUser: result.inviters[i],
                                    idBooking: result._id
                                })
                                newPermison.save(function(err, ress) {
                                    if (err) throw err;
                                });
                                User.findById(result.user, function(err, user) {
                                    if (err) throw err;
                                    let Noti = new Notification({
                                        create_at: new Date(),
                                        status: 0,
                                        type: 0,
                                        message: "<u>"+ user.name + "</u> " + " allows you to invite a metting",
                                        idBooking: result._id,
                                        idReceiver: result.inviters[i]
                                    })
                                    Noti.save(function (err, rs) {
                                        if (err) throw err;
                                    });
                                })
                            }
                        })
                    }
                }
                // created notification
                Room.findById(result.room, function (err, room) {
                    if (err) throw err;
                    User.findById(result.user, function(err, user) {
                        if (err) throw err;
                        let Noti = new Notification({
                            create_at: new Date(),
                            status: 0,
                            type: 0,
                            message: "<u>"+ user.name + "</u> " + " is created booking room " + room.name +"<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime,
                            idBooking: result._id,
                            idReceiver: room.manager
                        })
                        Noti.save(function (err, rs) {
                            if (err) throw err;
                        });

                        // send mail
                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'haichanbo11@gmail.com',
                                pass: 'haichanbo'
                            }
                        });
                        const mailOptions = {
                            from: '"ỨNG DỤNG QUẢN LÝ PHÒNG HỌP" haichanbo11@gmail.com', // sender address
                            to: 'nhuvanduy97@gmail.com', // list of receivers
                            subject: 'Booking Room', // Subject line
                            html: "<u>"+ user.name + "</u> " + " is created booking room " + room.name +"<br />" + "Date: " + result.date +"<br />"+ " Start time: "+ result.startTime + "  End time: " + result.endTime
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if(err)
                            console.log(err)
                            else
                            console.log(info);
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