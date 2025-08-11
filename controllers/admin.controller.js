const Product = require("../models/product.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs/promises");

// Upload product with image
const uploadProduct = async (req, res, next) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Remove file from local storage
    await fs.unlink(req.file.path);

    // Extract other fields from request body
    const { name, description, price, category, ...others } = req.body;

    // Create product in DB
    const product = new Product({
      name,
      description,
      price,
      category,
      image: result.secure_url, // Cloudinary image URL
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

// Create a product (admin only, without file upload)
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

// Admin: Update product
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
};

// Admin: Delete product
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};
module.exports = { uploadProduct, createProduct, updateProduct, deleteProduct };
