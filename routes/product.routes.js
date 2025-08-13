const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const adminController = require("../controllers/admin.controller");
const upload = require("../utils/multer");
const { uploadProduct } = require("../controllers/admin.controller"); 
const authentication = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// users only
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

// admin only
router.post("/", authentication, authorizeAdmin, adminController.createProduct);
router.put("/:id", authentication, authorizeAdmin, adminController.updateProduct);
router.delete("/:id", authentication, authorizeAdmin, adminController.deleteProduct);

// Admin upload product with image
router.post("/upload", authentication, authorizeAdmin, upload.single("image"), uploadProduct);

module.exports = router;
