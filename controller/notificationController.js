var mongoose = require('../config/dbContext')
const Notification = require("../model/notificationModel")
const Booking = require("../model/bookingModel")
const ObjectId = mongoose.Types.ObjectId


module.exports = {
    getNotification: function(req, res) {
        Notification.find().populate([{ 
            path: 'idBooking',
            model: 'Booking',
            populate: [{
                path: 'user',
                model: 'User'
            }, {
                path: 'inviters',
                model: 'User'
            }]
         }, {
            path: 'idReceiver',
            model: 'User'
         }]).exec((err, result) => {
                 if (err) throw err;
            if(result){
                res.json({
                    message: true,
                    notification: result
                })
            }
         })
    },
    getNotificationByIdReceiver: function(req, res) {
        Notification.find({idReceiver: ObjectId(req.query.idReceiver) }).populate({ 
            path: 'idBooking',
            model: 'Booking',
            populate: [{
                path: 'user',
                model: 'User'
            }, {
                path: 'inviters',
                model: 'User'
            }]
         }).exec((err, noti) => {
            if (err) throw err;
            if (noti){
                return res.json({
                    message: true,
                    notification: noti
                })
            }
        })
        
    }
}