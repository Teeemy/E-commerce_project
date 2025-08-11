const Category = require("../models/category.model");

// Create new category
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Category name is required" });

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const newCategory = new Category({ name, description });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// Get all categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

module.exports = { createCategory, getCategories };
