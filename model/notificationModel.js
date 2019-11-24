var mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const moment = require('moment-timezone')
const dateVietNam = moment.tz(Date.now(), "Asia/Ho_Chi_Minh")
const Schema = mongoose.Schema

const NotificationSchem = new Schema({
    create_at: {
        type: Date,
        default: dateVietNam
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    idBooking: {
        type: ObjectId,
        required: true,
        ref: 'Booking'
    },
    idReceiver: {
        type: ObjectId,
        required: true,
        ref: 'User'
    }
}, { collection: 'notifications' })

const Notification = mongoose.model('Notification', NotificationSchem)
module.exports = Notification