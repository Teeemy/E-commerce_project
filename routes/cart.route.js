const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const authorizeAdmin = require('../middleware/authorizeAdmin');
const authentication = require("../middleware/auth.middleware");

//users
router.get("/", authentication, cartController.getCart);
router.post("/", authentication, cartController.addToCart);
router.delete("/remove/:productId", authentication, cartController.removeCartItem);

//admin
router.get('/all', authentication, authorizeAdmin, cartController.getAllCarts);


module.exports = router;
