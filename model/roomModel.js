const mongoose = require('../config/dbContext')
const Schema = mongoose.Schema
const roomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    seatnumber: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    des: {
        type: String,
        required: true
    }
}, {
    collection: 'room'
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
