const Order = require("../models/order.model");

// Create a new order from cart
const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod, discount = 0 } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const totalItem = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const totalDiscountedPrice = totalPrice - discount;

    const order = new Order({
      user: req.user.id,
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      totalItem,
      discount,
      totalPrice,
      totalDiscountedPrice,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// get user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ user: req.user.id })
      .populate("orderItems.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error });
  }
};
module.exports = {
  createOrder,getUserOrders
};
