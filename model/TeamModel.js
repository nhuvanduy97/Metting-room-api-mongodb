var mongoose = require('../config/dbContext')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const TeamSchem = new Schema({
    name: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    }
}, { collection: 'team' })

const Team = mongoose.model('Team', TeamSchem)
module.exports = Team