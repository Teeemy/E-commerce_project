const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    phoneNumber: {
        type: String,
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Addresses"
    }],
    paymentInfomation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment_infomation"
    }],
    // ratings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Ratings"
    // }],
    // reviews: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Reviews"
    // }],

},
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema)

module.exports = User;
