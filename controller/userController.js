const jwt = require("jsonwebtoken");
var mongoose = require('../config/dbContext')
const User = require("../model/userModel")
const Role = require("../model/roleModel")
const Team = require("../model/TeamModel")
const configDB = require("../config/configDB")
const bcrypt = require("bcrypt")
const ObjectId = mongoose.Types.ObjectId
module.exports = {
    login: function (req, res) {
        // bcrypt.genSalt(12, function(err, salt) {
        //     bcrypt.hash("admin2", salt, function(err, hash) {
        //         console.log("hash",hash)
        //         // Store hash in your password DB.
        //     });
        // });
        username = req.body.username,
        password = req.body.password
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                // console.log(password)
                // console.log("match", isMatch)
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign({
                        type: "user",
                        data: {
                            _id: user._id,
                            name: user.name,
                            address: user.address,
                            email: user.email,
                            username: user.username,
                            password: user.password,
                            roleId: user.roleId
                        }
                    }, configDB.secret, {
                        expiresIn: 604800 // for 1 week time in  milliseconds
                    });
                    return res.json({
                        success: true,
                        user: user,
                        token: token
                    })
                } else {
                    return res.json({
                        success: false,
                        message: "Wrong password"
                    })
                }
            })
        });
    },
    getUserByTeamId: function(req,res) {
        User.find({teamId: ObjectId(req.query.teamId) }).exec((err, member) => {
            if(err) throw err;
            res.json({
                message: true,
                members: member
            })
        })
    }
}