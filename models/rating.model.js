const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
},
    { timestamps: true }
);

const Rating = mongoose.model("Ratings", ratingSchema)

module.exports = Rating;