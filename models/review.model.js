const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
},
    { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema)

module.exports = Review;