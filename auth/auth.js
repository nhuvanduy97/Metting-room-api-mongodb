const jwt = require('jsonwebtoken')
const config = require("../config/configDB")

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log(token);
    var decoded = jwt.verify(token, config.secret);
    console.log(decoded)
    if (!token) return res.status(401).send('Denied Access');
    try {
        console.log("begin")
        const verify = jwt.verify(token,config.secret);
        console.log("verify", verify)
        req.token = verify
        next()
    } catch (error) {
        // res.status(401).send({ error: 'Not authorized to access this resource' })
        res.json({ error: 'Not authorized to access this resource' })
    }

}

module.exports = auth