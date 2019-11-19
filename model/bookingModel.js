var mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const Room = require("../model/roomModel")
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    room: {
        type: ObjectId,
        required: true,
        ref: 'Room'
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true
    },
    inviters: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    note: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
} , {collection: 'booking'})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking