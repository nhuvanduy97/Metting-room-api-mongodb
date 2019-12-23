var mongoose = require('../config/dbContext')
const Booking = require("../model/bookingModel")
const Room = require("../model/roomModel")
const User = require("../model/userModel")
const ObjectId = mongoose.Types.ObjectId
const Permisson = require("../model/permisonModel")

module.exports = {
    findPermissonInvite: function(req, res){
        Permisson.find({idUser: ObjectId(req.query.idUser)}).populate({ 
            path: 'idBooking',
            model: 'Booking',
            populate: [{
                path: 'room',
                model: 'Room'
            }]
         }).exec((err, result) => {
            if (err) throw err;
            return res.json({
                success: true,
                permisson: result
            })
        })
    }
}