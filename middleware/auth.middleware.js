const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Access denied, Not logged in" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
        console.log("Decoded JWT payload:", payload);

        // attach user info including role from token to request
        req.user = { id: payload.id, role: payload.role };
        next();
    });
};

module.exports = authentication;
