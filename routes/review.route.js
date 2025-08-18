const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const authentication = require("../middleware/auth.middleware");

// Reviews
router.post("/", authentication, reviewController.addReview);
router.get("/:productId", reviewController.getReviews);

module.exports = router;
