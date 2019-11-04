const mongoose = require('mongoose')
const configDB = require("./configDB")
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Connect to database
mongoose.connect(configDB.database, options).then(() => {
    console.log("Database connected..." )
}).catch(err => {
    console.log(err)
})
module.exports = mongoose