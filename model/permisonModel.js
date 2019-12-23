var mongoose = require('../config/dbContext')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId
const Booking = require("../model/bookingModel")
const User = require("../model/userModel")
const permisonSchema = new Schema({
    idUser: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    idBooking: {
        type: ObjectId,
        required: true,
        ref: 'Booking'
    }
}, {
    collection: 'permison'
})
const Permison = mongoose.model('Permison', permisonSchema)
module.exports = Permison