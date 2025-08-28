const Review = require("../models/review.model");

// Add a review
const addReview = async (req, res) => {
    try {
        const { productId, reviewText } = req.body;
        if (!productId || !reviewText) {
            return res.status(400).json({ message: "Product ID and review text are required" });
        }

        const review = new Review({
            user: req.user.id,
            product: productId,
            reviewText,
        });

        await review.save();
        res.status(201).json({ message: "Review added", review });
    } catch (error) {
        res.status(500).json({ message: "Failed to add review", error: error.message });
    }
};

// Get reviews for a product
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .populate("user", "firstName lastName"); // populate user name

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Failed to get reviews", error: error.message });
    }
};

module.exports = {
    addReview,
    getReviews,
};
