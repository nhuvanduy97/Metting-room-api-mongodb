const express = require("express");
const router = express.Router();
const roomController = require("../controller/roomController")
const auth = require("../auth/auth")

router.get("/info-room", auth , roomController.getAllRoom)
router.post("/add-room", auth , roomController.addRoom)

module.exports = router;