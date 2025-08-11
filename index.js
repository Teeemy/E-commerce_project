const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const authRouters = require("./routes/auth.routes");
const userRouters = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const categoryRoutes = require("./routes/category.routes")


const app = express();

// Middleware
app.use(express.json());
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

const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connection successful"))
    .catch((error) => console.error("MongoDB connection error:", error));
//console.log("Connecting to Mongo URL:", process.env.MONGO_URL);




// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
