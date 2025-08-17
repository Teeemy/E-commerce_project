;
const adminController = require("../controllers/admin");

const express = require("express");

const router = express.Router();

// /admin/add-product => GET
//router.get("/add-product", adminController.uploadProduct);

// /admin/add-product => POST
router.post("/add-product", adminController.createProduct);

// /admin/edit-product => GET
router.put("/edit-product/:productId", adminController.updateProdut);

// /admin/edit-product => GET
router.post("/edit-product", adminController.postEditProduct);

// /admin/product-list => GET
router.get("/product-list", adminController.getProducts);

// /admin/delete-product => POST
router.post("/delete-product", adminController.deleteProduct);

module.exports = router;