const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    variants: [{
        color: String,
        size: String,
        quantity: Number,
        material: String,
    }],
    tag: [String],

    images: [{
        url:String, public_id: String
    }],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
    },
    brand: {
        type: String,
    },
    currency: { 
        type: String,
        default: "EUROS",
    },
    returnPolicy: {
        type: String,
    },
    waranty: {
        type: String,
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ratings",
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
    }],
},
    { timestamps: true }
);
const Product = mongoose.model("Products", productSchema)

module.exports = Product;