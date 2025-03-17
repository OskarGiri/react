const User  = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT package

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'fullName', 'email', 'profilePic'] // Exclude password for security
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new user

const createUser = async (req, res) => {
    try {
        const { fullName, email, password, profilePic } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password directly
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user with the hashed password
        const user = await User.create({ fullName, email, password: hashedPassword, profilePic });

        // Return the created user without the password for security
        res.status(201).json({ 
            id: user.id, 
            fullName: user.fullName, 
            email: user.email, 
            profilePic: user.profilePic 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { createUser };


// Login user (password verification)


const getTotalUsers = async (req, res) => {
    try {
      const totalUsers = await User.count(); // Using Sequelize's `count` method to get the total count of users
      res.status(200).json({ totalUsers }); // Return the total users count as a JSON response
    } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Compare entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT token (with expiration time of 1 hour)
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success message with user data (excluding password) and token
        res.json({
            success: true,
            message: "Login successful",
            token, // Send token in the response
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                profilePic: user.profilePic
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Controller to fetch user details by ID
const getUserDetailsById = async (req, res) => {
    try {
        const userId = req.params.id;  // Get the userId from the request params

        // Check if userId is valid
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // Find user by ID in the database
        const user = await User.findOne({
            where: { id: userId }, // Fetch user with the matching id
            attributes: ['id', 'fullName', 'email', 'profilePic'], // Optional: specify fields to return
        });

        // If no user is found, return an error
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return the user data
        return res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePic || 'default-profile-pic-url', // Return default image if not set
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong while fetching user data" });
    }
};

const updateUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Get the updated data from request body
      const { fullName, email, password } = req.body;
  
      // Handle file upload, if any
      let profilePic = null;
  
      // If there's a new profile picture, handle the upload
      if (req.file) {
        profilePic = `/uploads/${req.file.filename}`;
      }
  
      // Use req.protocol and req.get('host') to construct the full image URL
      const imageUrl = profilePic ? `${req.protocol}://${req.get('host')}${profilePic}` : null;
  
      // Prepare the update object (only update fields that were provided)
      const updatedData = {};
      
      if (fullName) updatedData.fullName = fullName;
      if (email) updatedData.email = email;
      if (password) updatedData.password = await bcrypt.hash(password, 10); // Hash password if it's provided
      if (profilePic) updatedData.profilePic = imageUrl; // Save the full URL in the database
  
      // Update the user in the database
      const updatedUser = await User.update(updatedData, {
        where: { id: userId }
      });
  
      // Check if the user was found and updated
      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: 'User not found or no fields to update' });
      }
  
      // Retrieve the updated user data
      const user = await User.findByPk(userId);
  
      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  



module.exports = { getUsers, createUser, loginUser,getTotalUsers,getUserDetailsById,updateUser };
