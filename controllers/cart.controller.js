const Cart = require("../models/cart.model");

// Add to Cart
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).send("Please provide productId and quantity");
    }

    try {
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({
                user: req.user.id,
                items: [{ product: productId, quantity }],
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
        }

        const savedCart = await cart.save();
        return res.json(savedCart);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong while adding to cart");
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

// Remove Item
const removeCartItem = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) return res.status(404).send("Cart not found");

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        const updatedCart = await cart.save();
        return res.json(updatedCart);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong while removing item");
    }
};

// Clear Cart
const clearCart = async (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user.id });
        return res.send("Cart cleared successfully");
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong while clearing cart");
    }
};

// Admin: Get All Carts
const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find().populate("user").populate("items.product");
        return res.json(carts);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Something went wrong while fetching all carts");
    }
};

module.exports = {
    addToCart,
    getCart,
    removeCartItem,
    clearCart,
    getAllCarts,
};
