const express = require("express");
const mongoose = require("mongoose")
const cros = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")
const PORT = process.env.PORT || 3000
const config = require("./config/database")
const users = require("./routers/users")


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
// Initialize the app 
const app = express();
// Defining the Midlewares
app.use(cros());
// Set a static forder
app.use(express.static(path.join(__dirname, 'public')));
// BodyParser Midleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Midleware
app.use(passport.initialize());
app.use(passport.session());
//Mongodb config
mongoose.set('useCreateIndex', true)
// Connect to database
mongoose.connect(config.database, options).then(() =>{
    console.log("Database connected..." + config.database)
}).catch(err => {
    console.log(err)
}) 


app.get("/", (req,res) => {
    console.log("req", req)
    return res.json({
        message: "Hello Server API."
    })
})

// Router
app.use("/api", users)


app.listen(PORT, () => {
    console.log("server starting...")
})

