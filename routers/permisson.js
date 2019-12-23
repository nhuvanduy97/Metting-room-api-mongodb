const express = require("express");
const router = express.Router();
const Permisscontroller = require("../controller/permisonController")
const auth = require("../auth/auth")

router.get("/get-permisson-inviter-by-id", auth, Permisscontroller.findPermissonInvite)

module.exports = router;