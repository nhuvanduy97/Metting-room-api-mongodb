const mongoose = require('mongoose')
module.exports = {
    name: {
        type: String,
        required: true,
        trim: true
    }
}