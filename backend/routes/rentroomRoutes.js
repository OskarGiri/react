const express = require('express');
const router = express.Router();
const rentRoomController = require('../controller/rentRoomController');
const upload = require('../middleI/multer'); // Import multer

// Create a RentRoom

// Get all RentRooms
router.get('/getAllrentrooms', rentRoomController.getAllRentRooms);
router.get('/getTotalRooms', rentRoomController.getTotalRooms);

// Get a specific RentRoom by ID
router.get('/getbyIdrentroom/:id', rentRoomController.getRentRoomById);

router.post('/createrentroom', upload.single('picture'), rentRoomController.createRentRoom);

// Update a RentRoom (with image upload)
router.put('/updaterentroom/:id', upload.single('picture'), rentRoomController.updateRentRoom);

// Delete a RentRoom by ID
router.delete('/delRentroom/:id', rentRoomController.deleteRentRoom);

module.exports = router;
