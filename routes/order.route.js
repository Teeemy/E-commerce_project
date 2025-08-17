const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const adminController = require("../controllers/admin.controller");
const authentication = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// Users
router.post("/", authentication, orderController.createOrder);
router.get("/my-orders", authentication, orderController.getUserOrders);

// Admin
router.get("/", authentication, authorizeAdmin, adminController.getAllOrders);
router.put("/:id/status", authentication, authorizeAdmin, adminController.updateOrderStatus);
router.delete("/:id", authentication, authorizeAdmin, adminController.deleteOrder);

module.exports = router;
