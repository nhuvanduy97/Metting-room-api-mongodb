var mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const NotificationSchem = new Schema({
    create_at: {
        type: Date,
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
    }
}, { collection: 'notifications' })

const Notification = mongoose.model('Notification', NotificationSchem)
module.exports = Notification