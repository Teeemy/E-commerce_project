const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/category.controller");
const authentication = require("../middleware/auth.middleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");

// Public route - get all categories
router.get("/", getCategories);

// Admin-only - create new category
router.post("/", authentication, authorizeAdmin, createCategory);

module.exports = router;
