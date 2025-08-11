const User = require("../models/user.model");

const createUser = async (req, res) => {
    const { firstName, lastName,email, password, ...others } = req.body;
    if (!email || !password) {
        return res.send("please provide valid email and password");
    }
    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.send("User already exist, please login");
    }
    // create hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // continue with registration
    try {
        const newUser = new User({ email, password: hashedPassword, ...others }); 

        const savedUser = await newUser.save();
        return res.json(savedUser);
    } catch (error) {
        console.log(error.message);
        return res.send("something went wrong");
    }
  };


const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("address");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const getAllUSers = await User.find();
    return res.json(getAllUSers);
  } catch (error) {
    return res.send("something went wrong");
  }
};

module.exports = { createUser,getUserProfile, getAllUsers };
