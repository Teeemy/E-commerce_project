const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const adminController = require("../controllers/admin.controller")
const authentication = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");


// users only
router.post("/", authentication, orderController.createOrder);
router.get("/my-orders", authentication, orderController.getUserOrders);

//admin only
router.get("/orders", authentication, authorizeAdmin, adminController.getAllOrders);
router.put("/orders/:id/status", authentication, authorizeAdmin, adminController.updateOrderStatus);
router.delete("/orders/:id", authentication, authorizeAdmin, adminController.deleteOrder);

module.exports = router;
