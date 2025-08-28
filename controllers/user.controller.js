const User = require("../models/user.model");
const bcrypt = require("bcryptjs")

const createUser = async (req, res) => {
    const { firstName, lastName, email, password, ...others } = req.body;
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
  
const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send("User not found, please provide valid email :", email)
    }
  } catch (error) {
    res.send(error.message)
    
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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

const updateUser = async (req, res) => {
  const { id } = req.query;
  const payload = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true }
  ); 
  return res.send(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.query;
  const deletedUser = await userModel.findByIdAndDelete(id);
  return res.json(deletedUser);
};

module.exports = { createUser,getUserByEmail,getUserProfile,getAllUsers,updateUser,deleteUser };
