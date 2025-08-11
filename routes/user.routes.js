const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")
const authentication = require("../middleware/auth.middleware")

router.get("/profile", authentication, userController.getUserProfile);
router.get("/", userController.getAllUsers);



module.exports = router;