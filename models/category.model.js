const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        lowercase: true,
    },
    level: {
        type: Number,
        required: false,
    },

},
    { timestamps: true }
);
const Category = mongoose.model("Categories", categorySchema)

module.exports = Category;