var mongoose = require('../config/dbContext')
const Schema = mongoose.Schema
const roleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'role'
})
const Role = mongoose.model('Role', roleSchema)
module.exports = Role