const { default: slugify } = require("slugify");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs/promises");

const uploadProduct = async (req, res, next) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Parse variants if present
    let variants = [];
    if (req.body.variants) {
      try {
        variants = JSON.parse(req.body.variants);
      } catch (error) {
        return res.status(400).json({ message: "Invalid variants format" });
      }
    }

    const { name, description, price, category, quantity, ...others } =
      req.body;
    const slug = slugify(name, { lower: true, strict: true });

    // Create product then upload image
    const product = new Product({
      name,
      slug,
      description,
      price,
      quantity,
      category,
      variants,
      image: {
        public_id: result.public_id,
      },
      url: result.secure_url,
      ...others,
    });

    await product.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    res
      .status(500)
      .json({ message: "Error uploading product", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, ...others } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      ...others,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// update product
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

//delete product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

//get all orders by user
const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .populate("products.product");
  res.json(orders);
};
// update order status
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


// delete order 
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete order", error });
  }
};

// get sales report
const getSalesReport = async (req, res) => {
  const report = await Order.aggregate([
    { $match: { status: "delivered" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$totalPrice" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(report[0] || { totalSales: 0, count: 0 });
};

module.exports = {
  uploadProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
  getSalesReport,
};
