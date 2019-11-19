const mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const User = require("../model/userModel")
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
    },
    manager: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    collection: 'room'
})

const Room = mongoose.model('Room', roomSchema)
module.exports = Room
