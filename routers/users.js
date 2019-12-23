const express = require("express");
const router = express.Router();
const auth = require("../auth/auth")

const userController = require("../controller/userController")

router.post("/login", userController.login)
router.get("/get-user-by-teamid",auth ,userController.getUserByTeamId)
router.get("/get-user-by-id", auth, userController.getInfoUserById)
module.exports = router;
