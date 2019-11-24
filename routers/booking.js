const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController")
const auth = require("../auth/auth")

router.get("/get-booking-room", auth , bookingController.getAllBooking)
router.get("/get-bookingofuser", auth , bookingController.getBookingOfUser)
router.post("/reserve-room", auth, bookingController.reserveRoom)

module.exports = router;