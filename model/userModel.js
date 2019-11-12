var mongoose = require('../config/dbContext')
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Types.ObjectId
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    roleId: {
        type: ObjectId,
        required: true,
        trim: true,
        ref: 'Role'
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    teamId: {
        type: ObjectId,
        required: true,
        trim: true,
        ref: 'Team'
    },
    avatar: {
        type: String,
        required: true
    },
    isInviter: {
        type: Number,
        required: true
    }
}, {
    collection: 'user'
});
const User = mongoose.model('User', UserSchema);
module.exports = User

// Find user by username
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username : username
    }
    User.findOne(query, callback).populate('roleId').populate('teamId');
}
 // Compare password
module.exports.comparePassword = function(password, hashPassword ,callback) {
    bcrypt.compare(password, hashPassword ,function (err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    })
}