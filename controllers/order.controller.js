const Order = require("../models/order.model");

// Create a new order from cart
const createOrder = async (req, res) => {
  try {
    const { cartItems, shippingAddress, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    const order = new Order({
      user: req.user.id,
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

// Get logged-in user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate({ user: req.user.id }).populate("orderItems.product")
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to get orders", error });
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders", error });
  }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

// Delete an order (admin only )
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
