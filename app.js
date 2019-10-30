const express = require("express");
const cros = require("cors")
const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")
const PORT = process.env.PORT || 3000
const users = require("./routers/users")

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

