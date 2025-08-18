const mongoose = require("mongoose");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).send("Please provide productId and quantity");
    }

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send("Product not found");

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            const totalPrice = product.price * quantity;
            const discount = 0; // You can modify this logic
            const totalDiscountedPrice = totalPrice - discount;

            cart = new Cart({
                user: req.user.id,
                items: [{ product: productId, quantity }],
                totalPrice,
                totalItem: quantity,
                discount,
                totalDiscountedPrice,
            });
        } else {
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            // Recalculate cart values
            let totalPrice = 0;
            let totalItem = 0;
            for (let item of cart.items) {
                const prod = await Product.findById(item.product);
                if (!prod) continue;
                totalPrice += prod.price * item.quantity;
                totalItem += item.quantity;
            }

            const discount = 0; // Or some custom logic
            const totalDiscountedPrice = totalPrice - discount;

            cart.totalPrice = totalPrice;
            cart.totalItem = totalItem;
            cart.discount = discount;
            cart.totalDiscountedPrice = totalDiscountedPrice;
        }

        const savedCart = await cart.save();
        res.json(savedCart);
    } catch (error) {
        console.error("Cart Error:", error.message);
        res.status(500).send("Something went wrong while adding to cart");
    }
};


// Get Cart
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart) {
            return res.status(404).send("Cart not found for this user");
        }

        return res.json(cart);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong while fetching cart");
    }
};
    // remove item from cart
    const removeCartItem = async (req, res) => {
        const { productId } = req.params;

        try {
            const cart = await Cart.findOne({ user: req.user.id });

            if (!cart) return res.status(404).send("Cart not found");

            const initialItemCount = cart.items.length;

            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );

            if (cart.items.length === initialItemCount) {
                return res.status(404).json({ message: "Item not found in cart" });
            }

            const updatedCart = await cart.save();

            return res.json({
                message: "Item removed from cart",
                cart: updatedCart,
            });
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Something went wrong while removing item");
        }
    };

// Admin: Get All Carts
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate('user', 'name email')
            .populate('items.product', 'name price image');
        res.status(200).json(carts);
    } catch (error) {
        console.error("Error fetching all carts:", error);
        res.status(500).json({ message: "Something went wrong while fetching all carts", error: error.message });
    }
};
  
module.exports = {
    addToCart,
    getCart,
    removeCartItem,
    getAllCarts,
};
