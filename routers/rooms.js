const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController")
const auth = require("../auth/auth")

router.get("/info-room", auth , roomController.getAllRoom)
router.post("/add-room", auth , roomController.addRoom)
router.put("/update-room", auth , roomController.updateRoom)
router.delete("/delete-room", auth , roomController.remoteRoom)

module.exports = router;