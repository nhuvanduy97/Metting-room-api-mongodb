const express = require("express");
const router = express.Router();
const bookingController = require("../controller/bookingController")
const auth = require("../auth/auth")

router.get("/get-booking-room", auth , bookingController.getAllBooking)
router.get("/get-bookingofuser", auth , bookingController.getBookingOfUser)
router.get("/find-booking", auth , bookingController.findBooking)

router.get("/find-booking-by-id", auth, bookingController.findBookingById)
router.put("/update-booking", auth , bookingController.updateBooking)
router.put("/invited-member", auth, bookingController.invitedMember)
router.get("/get-metting", auth, bookingController.findMemberBooking)
router.post("/reserve-room", auth, bookingController.reserveRoom)
router.delete("/delete-room", auth, bookingController.deleteBooking)

module.exports = router;