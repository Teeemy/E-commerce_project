const Product = require('../models/product.model');


// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// Get single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product', error: error.message });
    }
};

const getProductByVariantId = async (req, res) => {
    const { variantId } = req.params;

    try {
        const product = await Product.findOne({
            "variants._id": variantId,
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found for this variant ID" });
        }

        // Find the exact variant from the variants array
        const matchedVariant = product.variants.find(variant =>
            variant._id.toString() === variantId
        );

        res.status(200).json({
            productId: product._id,
            productName: product.name,
            variant: matchedVariant,
        });
    } catch (error) {
        res.status(500).json({ message: "Error finding product by variant", error: error.message });
    }
};
  

module.exports = {  getAllProducts, getProductById, getProductByVariantId};
