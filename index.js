const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const authRouters = require("./routes/auth.route");
const userRouters = require("./routes/user.routes");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const orderRoutes = require("./routes/order.route");
const categoryRoutes = require("./routes/category.route")
const reviewRoutes = require("./routes/review.route");
const ratingRoutes = require("./routes/ratings.route");



const app = express();

// Middleware
// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // for form-data and urlencoded bodies
app.use(cookieParser());
app.use(cors());


// Routes
app.get("/", (req, res) => {
    return res.json({ message: "Welcome to E-commerce" });
});

app.use("/auth", authRouters);
app.use("/users", userRouters);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes)
app.use("/categories", categoryRoutes)
app.use("/reviews", reviewRoutes);
app.use("/ratings", ratingRoutes);


const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connection successful"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
