const Rating = require("../models/rating.model");

// Add or update rating for a product by user
const addOrUpdateRating = async (req, res) => {
    try {
        const { productId, rating } = req.body;
        if (!productId || !rating) {
            return res.status(400).json({ message: "Product ID and rating are required" });
        }

        // Check if rating exists by this user for the product
        let existingRating = await Rating.findOne({ user: req.user.id, product: productId });

        if (existingRating) {
            existingRating.rating = rating; // update rating
            await existingRating.save();
            return res.json({ message: "Rating updated", rating: existingRating });
        }

        // Else create new rating
        const newRating = new Rating({
            user: req.user.id,
            product: productId,
            rating,
        });

        await newRating.save();
        res.status(201).json({ message: "Rating added", rating: newRating });
    } catch (error) {
        res.status(500).json({ message: "Failed to add/update rating", error: error.message });
    }
};

// Get all ratings for a product
const getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ product: req.params.productId })
            .populate("user", "firstName lastName");

        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: "Failed to get ratings", error: error.message });
    }
};

module.exports = {
    addOrUpdateRating,
    getRatings,
};
