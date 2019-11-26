const express = require("express");
const router = express.Router();
const notificationController = require("../controller/notificationController")
const auth = require("../auth/auth")

router.get("/get-notification", auth , notificationController.getNotification);
router.get("/get-notification-by-id-receiver", auth , notificationController.getNotificationByIdReceiver);
router.put("/makup-noti", auth , notificationController.makupNotification);

module.exports = router;