const jwt = require("jsonwebtoken");
const User = require("../model/userModel")
const Role = require("../model/roleModel")
module.exports = {
    login: function (req, res) {
        console.log("aa", req.body.username)
        console.log("bb", req.body.password)
        username = req.body.username,
            password = req.body.password
        // User.findOne({ username: req.body.username })
        //     .populate('roleId')
        //     .then(data => {
        //         console.log(data);
        //     }).catch(err => {
        //         console.log(err);

        //     })
        // return res.json({
        //     "OK" : "ok"
        // })
        User.getUserByUsername(username, (err, user) => {
            console.log("user", user)
            if (err) throw err;
            if (!user) {
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
            console.log("userPassword", user.password)
            User.comparePassword(password, user.password, (err, isMatch) => {
                console.log("match", isMatch)
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