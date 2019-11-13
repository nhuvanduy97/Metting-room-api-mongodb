const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController")
const auth = require("../auth/auth")

router.get("/get-booking-room", auth , bookingController.getAllBooking)

module.exports = router;