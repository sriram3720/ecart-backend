const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.registerUser = async (req,res,next) =>{
    try {
        const { name, email, password } = req.body;
    
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new user instance
        const user = new User({ name, email, password: hashedPassword });
    
        // Save the user to the database
        await user.save();
    
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}
