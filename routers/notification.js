const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController")
const auth = require("../auth/auth")

router.get("/get-notification", auth , notificationController.getNotification)

module.exports = router;