const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true,
        maxlength: 500,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
},
    { timestamps: true }
);

const Review = mongoose.model("Reviews", reviewSchema)

module.exports = Review;