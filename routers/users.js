const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

router.post("/login", userController.login)
router.post("/get-user-by-teamid", userController.getUserById)
module.exports = router;
