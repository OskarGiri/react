const express = require('express');
const cors = require('cors');
const { syncDB } = require('./config/db'); // Import syncDB function from db.js
const userRoutes = require('./routes/userroutes');
const rentRoomRoutes = require('./routes/rentroomRoutes');
const bodyParser = require('body-parser');

const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use('/users', userRoutes);
app.use('/api', rentRoomRoutes);

// Start Server
app.listen(PORT, async () => {
    await syncDB(); // Sync DB on startup
    console.log(`Server running on port ${PORT}`);
});
