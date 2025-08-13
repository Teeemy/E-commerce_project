const mongoose = require("mongoose");
const slugify = require("slugify");

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
    image: {
        public_id: {
            type: String,
            required: true,
        },
    },
    url: {
        type: String,
        required: true,
    },
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
    warranty: {
        type: String,
    },
    ratings: {
        type: Number,
        ref: "Ratings",
    },
    reviews: {
        type: String,
        ref: "Reviews",
    },
}, { timestamps: true });

// Pre-save hook to generate slug from name
productSchema.pre("save", function (next) {
    if (!this.slug && this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
