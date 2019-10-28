const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const uniqueValidator = require("mongoose-unique-validator")
const ObjectId = mongoose.Types.ObjectId


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    roleId: {
        type: ObjectId,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true,
        require: true
    }

});
UserSchema.plugin(uniqueValidator);
const User = module.exports = mongoose.model('user', UserSchema);

// Find user by Id
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}
// Find user by username
module.exports.getUserByUsername = function (username, callback) {
    const query = {
        username : username
    }
    User.findOne(query, callback);
}
// Compare password
module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    })
}