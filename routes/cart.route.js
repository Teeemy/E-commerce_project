const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authentication = require("../middleware/auth.middleware");

router.get("/", authentication, cartController.getCart);
router.post("/", authentication, cartController.addToCart);

module.exports = router;
