const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");

router.post("/signup", authController.registerUser);
router.post("/signin", authController.loginUser);

module.exports = router;