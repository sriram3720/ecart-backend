const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.userLogin = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ name });
    if (!user) {
    
      return res.status(401).json({ error: "Invalid credentials" });

    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
