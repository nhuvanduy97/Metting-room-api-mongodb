const mongoose = require('mongoose')
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Connect to database
mongoose.connect("mongodb://localhost:27017/manager", options).then(() => {
    console.log("Database connected..." )
}).catch(err => {
    console.log(err)
})

module.exports = mongoose