const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");
const authentication = require("../middleware/auth.middleware");

// Ratings
router.post("/", authentication, ratingController.addOrUpdateRating);
router.get("/:productId", ratingController.getRatings);

module.exports = router;
