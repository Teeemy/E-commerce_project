const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, ...others } = req.body;
  if (!email || !password) {
    return res.send("Provide valid email or password");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.json({ message: "User already exists, please login" });
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password:hashedPassword,
      ...others,
    });
    console.log("User created successfully")
    const savedUser = await newUser.save();
    return res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "No User Found" });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { firstName: user.firstName, id: user.id, role: user.role }, 
      process.env.JWT_SECRET,
      { expiresIn: "2hr" }
    );
    console.log(token);

    res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 2,  // 2 hours
        secure: true,
        httpOnly: true,
      })
      .json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { registerUser, loginUser };
