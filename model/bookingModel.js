var mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
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
    inviters: {
        type: Array,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
} , {collection: 'booking'})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking