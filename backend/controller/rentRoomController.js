const RentRoom = require('../model/rentRoom');

// Create a new RentRoom


// Get all RentRooms
const getAllRentRooms = async (req, res) => {
  try {
    const rooms = await RentRoom.findAll();

    if (rooms.length === 0) {
      return res.status(404).json({ message: 'No rent rooms found' });
    }

    return res.status(200).json({ rooms });
  } catch (error) {
    console.error('Error fetching RentRooms:', error);
    return res.status(500).json({ message: 'Error fetching RentRooms' });
  }
};

// controllers/roomController.js

// Controller function to get the total number of rooms
const getTotalRooms = async (req, res) => {
  try {
    const totalRooms = await RentRoom.count(); // Using Sequelize's `count` method to get the total count of rooms
    res.status(200).json({ totalRooms }); // Return the total rooms count as a JSON response
  } catch (error) {
    console.error('Error fetching total rooms:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



// Get a specific RentRoom by ID
const getRentRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RentRoom.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: 'RentRoom not found' });
    }

    return res.status(200).json({ room });
  } catch (error) {
    console.error('Error fetching RentRoom by ID:', error);
    return res.status(500).json({ message: 'Error fetching RentRoom by ID' });
  }
};



// Delete a RentRoom by ID
const deleteRentRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await RentRoom.findByPk(id);

    if (!room) {
      return res.status(404).json({ message: 'RentRoom not found' });
    }

    await room.destroy();

    return res.status(200).json({
      message: 'RentRoom deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting RentRoom:', error);
    return res.status(500).json({ message: 'Error deleting RentRoom' });
  }
};

const createRentRoom = async (req, res) => {
    try {
      const { title, price, description } = req.body;
      const picture = req.file ? req.file.filename : null; // Get the filename from the uploaded image
  
      // Validate if all required fields are provided
      if (!title || !price || !description || !picture) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Construct the full URL for the picture (http://localhost:5000/uploads/filename.jpg)
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${picture}`;
  
      // Create a new room with the full image URL
      const newRoom = await RentRoom.create({
        title,
        price,
        description,
        picture: imageUrl, // Save the full image URL
      });
  
      return res.status(201).json({
        message: 'New room created successfully',
        room: newRoom,
      });
    } catch (error) {
      console.error('Error creating RentRoom:', error);
      return res.status(500).json({ message: 'Error creating RentRoom' });
    }
  };
  
  
  // Update a RentRoom by ID
  const updateRentRoom = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, description } = req.body;
      let picture = req.file ? req.file.filename : null; // Get the filename of the uploaded image
  
      // Find the RentRoom by ID
      const room = await RentRoom.findByPk(id);
  
      if (!room) {
        return res.status(404).json({ message: 'RentRoom not found' });
      }
  
      // Create an object to hold the fields that need updating
      const updatedFields = {};
  
      // Only update the fields that were provided
      if (title) updatedFields.title = title;
      if (price) updatedFields.price = price;
      if (description) updatedFields.description = description;
      
      // If a new picture is uploaded, update the picture field with the full URL
      if (picture) {
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${picture}`;
        updatedFields.picture = imageUrl;
      } else {
        // If no new picture, keep the current picture
        updatedFields.picture = room.picture;
      }
  
      // If no fields are provided to update, return an error
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' });
      }
  
      // Update the RentRoom with the provided fields
      const updatedRoom = await room.update(updatedFields);
  
      return res.status(200).json({
        message: 'RentRoom updated successfully',
        room: updatedRoom,
      });
    } catch (error) {
      console.error('Error updating RentRoom:', error);
      return res.status(500).json({ message: 'Error updating RentRoom' });
    }
  };
  

module.exports = {
  createRentRoom,
  getAllRentRooms,
  getRentRoomById,
  getTotalRooms,
  updateRentRoom,
  deleteRentRoom,
};
