const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        orderItems: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
                name: String,
                price: Number,
                quantity: Number,
                image: String
            }
        ],
        shippingAddress: {
            fullName: String,
            address: String,
            city: String,
            postalCode: String,
            country: String
        },
        paymentDetails: {
            paymentMethod: String,
            transactionId: String,
            paymentId: String,
            paymentStatus: {
                type: String,
                enum: ["PENDING", "PAID", "FAILED", "REFUNDED"],
                default: "PENDING"
            }
        },
        totalPrice: { type: Number, required: true },
        totalDiscountedPrice: { type: Number, required: true },
        discount: { type: Number, required: true },
        orderStatus: {
            type: String,
            enum: ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING"
        },
        totalItem: { type: Number, required: true }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
