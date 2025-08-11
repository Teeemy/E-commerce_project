const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses"
    }],
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
    },
},
    { timestamps: true }
);

const Address = mongoose.model("Addresses", addressSchema)

module.exports = Address;