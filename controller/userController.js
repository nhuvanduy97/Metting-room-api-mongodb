const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const config = require("../config/database");

module.exports = {
    login: function (req, res) {
        console.log(req.username, req.password)
        const username = req.body.username;
        const password = req.body.password;
        User.getUserByUsername(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
            User.comparePassword(password, user.passport, (err, isMatch) => {
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
                            password: user.password
                        }
                    }, config.secret, {
                        expiresIn: 604800 // for 1 week time in  milliseconds
                    });
                    return res.json({
                        success: true,
                        token: "JWT" + token
                    })
                } else {
                    return res.json({
                        success: false,
                        message: "Wrong password"
                    })
                }
            })
        });
    }
}